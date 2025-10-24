'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Menu, X, Info, Calendar, Users, Handshake, MapPin, HelpCircle, ArrowRight, Newspaper } from "lucide-react";
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

const navigationItems = [
    { href: "#sobre", text: "Sobre", icon: Info },
    { href: "#programacao", text: "Programação", icon: Calendar },
    // { href: "#palestrantes", text: "Palestrantes", icon: Users },
    { href: "#parceiros", text: "Parceiros", icon: Handshake },
    { href: "#noticias", text: "Notícias", icon: Newspaper },
    { href: "#faq", text: "FAQ", icon: HelpCircle },
    { href: "#localizacao", text: "Localização", icon: MapPin },
];

function MobileMenuPanel({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    // Fecha o menu automaticamente em telas grandes
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && isOpen) {
                onClose();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen, onClose]);

    if (!isMounted) {
        return null;
    }

    return createPortal(
        <div
            id="mobile-menu-panel"
            className={`fixed inset-0 z-50 lg:hidden bg-slate-950/40 backdrop-blur-lg transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            role="dialog"
            aria-modal="true"
            aria-label="Navegação mobile"
        >
            <div
                ref={mobileMenuRef}
                className={`absolute inset-0 flex flex-col overflow-y-auto pt-24 px-4 sm:px-6 pb-8 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Logo UNITINS */}
                <Link href="https://www.unitins.br/nPortal/" className="absolute top-4 left-4 h-10 flex items-center z-10" aria-label="Ir para o portal da UNITINS">
                    <Image
                        src="/logos/logo-unitins.png"
                        alt="Logo UNITINS"
                        width={120}
                        height={34}
                        className="w-auto h-8 brightness-0 invert"
                    />
                </Link>

                {/* Botão de Fechar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-300 z-10"
                    aria-label="Fechar menu"
                >
                    <X size={24} />
                </button>

                <nav className="flex-grow space-y-2">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link key={item.text} href={item.href} onClick={onClose} className="group flex items-center gap-4 px-4 py-4 bg-black/20 border-2 border-transparent hover:border-[#38B6FF]/50 hover:bg-[#083D77]/30 rounded-2xl transition-all duration-300">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 group-hover:bg-[#38B6FF]/20 transition-all">
                                    <Icon className="w-5 h-5 text-[#4FD1FF] group-hover:text-[#38B6FF]" />
                                </div>
                                <span className="flex-1 text-base font-semibold text-slate-200 group-hover:text-white transition-colors">{item.text}</span>
                                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-[#38B6FF] transition-colors" />
                            </Link>
                        );
                    })}
                </nav>
                <div className="pt-4 pb-safe">
                    <Link
                        href="https://www.unitins.br/Eventos/E007Evento/Abertos"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="block w-full px-6 py-5 bg-[#083D77] hover:bg-[#38B6FF] text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-lg hover:shadow-[#38B6FF]/20 text-center"
                    >
                        Inscreva-se Agora
                    </Link>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isSolid = isScrolled || pathname !== '/';

    useEffect(() => {
        const handleScroll = () => { setIsScrolled(window.scrollY > 20); };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
    }

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${isSolid ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`} role="banner">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        <Link href="https://www.unitins.br/nPortal/" aria-label="Ir para o portal da UNITINS">
                            <Image src="/logos/logo-unitins.png" alt="Logo UNITINS" width={160} height={45} priority className={`w-auto h-8 sm:h-10 transition-all duration-500 ${isSolid ? 'brightness-100' : 'brightness-0 invert'}`} />
                        </Link>

                        <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Navegação principal">
                            {navigationItems.map((item) => (
                                <Link key={item.text} href={item.href} className={`text-sm xl:text-base font-medium transition-colors duration-300 relative group py-2 px-0 ${isSolid ? 'text-[#0F3057] hover:text-[#38B6FF]' : 'text-white/90 hover:text-white'}`}>
                                    {item.text}
                                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${isSolid ? 'bg-[#38B6FF]' : 'bg-white'}`} aria-hidden="true" />
                                </Link>
                            ))}
                            <Link
                                href="https://www.unitins.br/Eventos/E007Evento/Abertos"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {/* <span className="relative z-10">Participar</span> */}
                                <Button className={`group relative z-10 top-[-4px] font-bold rounded-xl transition-all duration-300 overflow-hidden inline-block ${isSolid ? 'bg-[#083D77] text-white hover:bg-[#38B6FF]' : 'bg-white text-[#083D77] hover:bg-[#4FD1FF]'}`}>
                                    Participar
                                </Button>
                            </Link>
                        </nav>

                        <button onClick={toggleMobileMenu} className={`lg:hidden p-2 rounded-lg relative z-50 ${isSolid ? 'text-slate-800' : 'text-white'}`} aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={isMobileMenuOpen}>
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            <MobileMenuPanel isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
}