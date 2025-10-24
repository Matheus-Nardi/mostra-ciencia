import React from 'react';
import { Linkedin, Instagram, Mail, MapPin, Phone, ExternalLink, Building2, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
export default function Footer() {

  const navLinks = [
    { text: 'Início', href: '#' },
    { text: 'Sobre', href: '#sobre' },
    { text: 'Programação', href: '#programacao' },
    { text: 'Parceiros', href: '#parceiros' },
    { text: 'Notícias', href:'#noticias'},
    { text: 'Inscrições', href: 'https://www.unitins.br/Eventos/E007Evento/Abertos' },
  ];

  const currentYear = new Date().getFullYear();
  const developers = [
    {
      name: "Italo Beckman",
      github: "https://github.com/italobeckman",
      bio: "Full Stack Developer",
    },
    {
      name: "Matheus Nardi",
      github: "https://github.com/Matheus-Nardi",
      bio: "Full Stack Developer",
    },
  ]
  return (
    <footer className="bg-gradient-soft-primary text-primary">
      {/* Seção Principal */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

          {/* Sobre o Evento */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-montserrat" style={{ color: '#e2187f' }}>
              III Semana de Tecnologia
            </h3>
            <p className="text-primary text-sm leading-relaxed font-poppins">
              Um evento dedicado a explorar as últimas tendências em tecnologia,
              inovação e desenvolvimento profissional.
            </p>
            <div className="flex justify-center">
              <a
                href="https://www.linkedin.com/school/unitins/"
                className="flex items-center justify-center text-primary hover:text-[#e2187f] transition-colors duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
                target='_blank'
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/unitins_oficial/"
                className="flex items-center justify-center text-primary hover:text-[#e2187f] transition-colors duration-300 transform hover:scale-110"
                aria-label="Instagram"
                target='_blank'
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4 ">
            <h3 className="text-lg font-semibold font-montserrat" style={{ color: '#e2187f' }}>
              Links Rápidos
            </h3>
            <ul className="space-y-2 grid grid-cols-2 gap-0">
              {navLinks.map((link) => (
                <li key={link.text} className="flex justify-center">
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : '_self'}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="group inline-flex items-start gap-2 text-primary hover:text-[#e2187f] transition-colors duration-300 text-sm"
                  >
                    <span className="inline-block">{link.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* UNITINS - Sede Administrativa */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold  gap-2 font-montserrat" style={{ color: '#e2187f' }}>
              UNITINS - Sede
            </h3>
            <ul className="space-y-3">
              <li className="justify-center space-x-3 text-primary text-sm">
                <span>
                  Quadra 108 Sul Alameda 11 Lote 03<br />
                  Plano Diretor Sul<br />
                  Palmas-TO, CEP: 77020-122
                </span>
              </li>
              <li className="justify-center space-x-3 text-primary text-sm">
                <span>(63) 3901-4000</span>
              </li>
              <li className="justify-center space-x-3 text-primary text-sm">
                <a
                  href="https://www.unitins.br/concursos/publico"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#e2187f] transition-colors underline"
                >
                  Editais e Concursos
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Linha Divisória com Gradiente */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

      {/* Logo SNCT */}
      <div className="flex justify-center py-6">
        <Image
          src="/logos/logo-snct.png"
          alt="Logo SNCT e SCTI UNITINS"
          width={500}
          height={50}
          className="w-full max-w-4xl h-auto"
        />
      </div>

      {/* Linha Divisória com Gradiente */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      {/* Seção de Copyright */}
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex flex-col items-center space-y-3">
          {/* Copyright */}
          <div className="text-center">
            <p className="text-primary text-sm font-poppins">
              © {currentYear} Universidade Estadual do Tocantins - UNITINS. Todos os direitos reservados.
            </p>
            <div className="mt-0">
              <a
                href="https://www.unitins.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-[#e2187f] transition-colors duration-300 text-sm"
              >
                www.unitins.br
              </a>
            </div>
          </div>

          {/* Desenvolvedores  */}
          <div className="text-center">
            <p className="text-xs text-primary/60 font-poppins">
              Desenvolvido por{' '}
              {developers.map((dev, index) => (
                <span key={index}>
                  <Link
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary/70 hover:text-[#e2187f] transition-colors duration-300"
                    aria-label={`GitHub de ${dev.name}`}
                  >
                    {dev.name}
                    <Github size={10} className="inline" />
                  </Link>
                  {index < developers.length - 1 && ' e '}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
