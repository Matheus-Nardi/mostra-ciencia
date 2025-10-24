'use client';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

type Slide =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; alt: string; poster?: string };

function VideoBackground({
    src,
    poster,
    alt,
    onPlay,
    onEnded,
}: {
    src: string;
    poster?: string;
    alt: string;
    onPlay?: () => void;
    onEnded?: () => void;
}) {
    return (
        <video
            className="w-full h-full object-cover"
            aria-label={alt}
            autoPlay
            muted
            playsInline
            preload="metadata"
            // não fazer loop para o vídeo permanecer até o fim
            loop={false}
            onPlay={onPlay}
            onEnded={onEnded}
            poster={poster}
            src={src}
        />
    );
}

export default function Hero() {
    const plugin = useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );
    const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const update = () => setIsMobile(window.innerWidth < 768);
        update();
        window.addEventListener('resize', update, { passive: true });
        return () => window.removeEventListener('resize', update);
    }, []);

    const mobileSlides: Slide[] = [
        // Vídeo apenas para mobile 
       
        { type: 'image', src: 'https://images.pexels.com/photos/3825578/pexels-photo-3825578.jpeg', alt: 'Ciência (mobile)' },
          { type: 'image', src: ' https://images.pexels.com/photos/4145356/pexels-photo-4145356.jpeg', alt: ' Criança no vr (mobile)' },
        { type: 'video', src: 'https://www.pexels.com/pt-br/download/video/17953524/', alt: 'Vídeo drone (mobile)', poster: 'https://images.pexels.com/photos/997134/pexels-photo-997134.jpeg' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1560260240-c6ef90a163a4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1331', alt: 'Oceano' },
        { type: 'image', src: 'https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg', alt: 'Imagem sobre o evento' },
    ];

    const desktopSlides: Slide[] = [
        { type: 'image', src: 'https://images.pexels.com/photos/2399033/pexels-photo-2399033.jpeg', alt: 'Apresentacao trabalhos' },
        { type: 'image', src: 'https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg', alt: 'Imagem sobre o evento' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1560260240-c6ef90a163a4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1331', alt: 'Oceano' },
        { type: 'image', src: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg', alt: 'Muda de planta' },
    ];

    const slides = isMobile ? mobileSlides : desktopSlides;

    return (
        <section
            className="w-full relative overflow-hidden -mt-20 pt-20"
            aria-label="Seção principal do evento"
        >
            {/* Carousel com imagens/vídeo */}
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                setApi={setEmblaApi}
                aria-roledescription="carrossel"
                aria-label="Imagens do evento"
            >
                <CarouselContent className="ml-0">
                    {slides.map((item, index) => (
                        <CarouselItem className="pl-0" key={`${item.type}-${item.src}-${index}`} aria-roledescription="slide" aria-label={`Slide ${index + 1} de ${slides.length}`}>
                            <div className="relative w-full h-screen min-h-[600px] sm:min-h-[700px]">
                                <div className="absolute inset-0">
                                    {item.type === 'image' ? (
                                        <Image
                                            src={item.src}
                                            alt={item.alt}
                                            fill
                                            sizes="100vw"
                                            className="object-cover"
                                            priority={index === 0}
                                            loading={index === 0 ? 'eager' : 'lazy'}
                                        />
                                    ) : (
                                        <VideoBackground
                                            src={item.src}
                                            poster={item.type === 'video' ? item.poster : undefined}
                                            alt={item.alt}
                                            onPlay={() => plugin.current.stop()}
                                            onEnded={() => { emblaApi?.scrollNext(); plugin.current.reset(); }}
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-black/80" aria-hidden="true" />
                                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-40" aria-hidden="true" />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Elegant minimal navigation - Hidden on mobile, visible on desktop */}
                <CarouselPrevious
                    className="hidden md:flex absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 focus-visible:bg-white/30 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent text-white border-white/20 backdrop-blur-md h-12 w-12 sm:h-14 sm:w-14 transition-all duration-300 hover:scale-110 z-20 group"
                    aria-label="Slide anterior"
                />
                <CarouselNext
                    className="hidden md:flex absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 focus-visible:bg-white/30 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent text-white border-white/20 backdrop-blur-md h-12 w-12 sm:h-14 sm:w-14 transition-all duration-300 hover:scale-110 z-20 group"
                    aria-label="Próximo slide"
                />
            </Carousel>

            {/* Fixed elegant content overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4">
                <div className="container mx-auto px-2 sm:px-4 md:px-6">
                    <div className="max-w-5xl mx-auto">
                        {/* Main Title with elegant animation */}
                        <div className="text-center space-y-6 mb-12">
                            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold leading-tight animate-fade-in-up animation-delay-200 
                   flex flex-col gap-y-2">
                                <span className="block text-white drop-shadow-2xl" style={{ color: '#e2187f' }}>
                                    IX Mostra de
                                </span>
                                <span className="block text-3xl md:text-5xl lg:text-7xl font-light tracking-wide text-white">
                                    Ciência e Tecnologia 
                                </span>
                                <span className="block text-3xl md:text-5xl lg:text-7xl" style={{ color: '#e2187f' }}>
                                   da UNITINS 
                                </span>
                                 <span className="block text-3xl md:text-5xl lg:text-7xl font-light tracking-wide text-white">
                                    Câmpus Augustinópolis e Araguatins
                                </span>
                                
                            </h1>
                        </div>
                        {/* CTA Buttons - sophisticated design */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center pointer-events-auto">
                            <Button
                                size="xs"
                                asChild
                                className="!h-12 !px-8 !text-base !min-w-[200px]"
                                aria-label="Inscrever-se no evento"
                            >
                                <Link href={"https://www.unitins.br/Eventos/Inscricao/2397"} target='_blank' rel='noopener noreferrer'>
                                    Inscreva-se Agora
                                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                                </Link>
                            </Button>

                            <Button
                                size="xs"
                                asChild
                                className="!h-12 !px-8 !text-base !min-w-[200px]"
                            >
                                <a
                                    href="#programacao"
                                    aria-label="Ver programação completa do evento"
                                >
                                    Ver Programação
                                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}