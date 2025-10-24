'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Newspaper, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { motion, useInView } from "motion/react";
import Image from "next/image";

interface NewsItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  url: string;
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, margin: "-50px" });

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      // Usa a API route do Next.js (executa no servidor, sem CORS)
      const response = await fetch('/api/news');

      if (!response.ok) {
        throw new Error('Erro ao buscar notícias');
      }

      const data = await response.json();

      if (data.news && Array.isArray(data.news)) {
        setNews(data.news);
      } else {
        throw new Error('Formato de resposta inválido');
      }

    } catch (err) {
      console.error('Erro ao buscar notícias:', err);
      setError('Não foi possível carregar as notícias da Unitins');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="animate-spin mx-auto text-blue-600 mb-4" size={48} />
            <p className="text-gray-600 font-medium text-sm sm:text-base">Carregando notícias da Unitins...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchNews}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return null;
  }

  return (
    <section id='noticias' className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12">
          {/* Cabeçalho */}
          <div ref={headerRef} className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 font-montserrat text-primary">
              Notícias da Unitins
            </h2>
            <div className="flex justify-center lg:justify-start mb-4">
              <motion.div 
                className="h-1 bg-primary rounded-full"
                initial={{ width: "4rem" }}
                animate={{ 
                  width: isHeaderInView ? "12rem" : "4rem" 
                }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeInOut" 
                }}
              />
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto lg:mx-0 text-sm sm:text-base lg:text-lg font-poppins">
              Fique por dentro das últimas novidades da Universidade Estadual do Tocantins
            </p>
          </div>

          {/* Elemento Visual */}
          <div className="hidden lg:flex aling-end justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-xs aspect-square"
            >
              <Image
                src="/semana-de-inovacao/elementos-Id-visual/SNCT-elemento-6.png"
                alt="Elemento decorativo da identidade visual"
                fill
                className="object-contain drop-shadow-2xl animate-float"
              />
            </motion.div>
          </div>
        </div>

        {/* Grid de Notícias */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {news.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 group"
            >
              {/* Imagem */}
              <div className="relative h-48 bg-primary overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Newspaper className="text-white/50" size={48} />
                  </div>
                )}


              </div>

              {/* Conteúdo */}
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4 line-clamp-3 leading-snug group-hover:text-blue-600 transition-colors font-montserrat">
                  {item.title}
                </h3>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-accent font-semibold transition-colors text-sm group/link"
                >
                  <span>Ler notícia completa</span>
                  <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Link para Ver Todas */}
        <div className="text-center">
          <a
            href="https://www.unitins.br/nPortal/portal/noticias"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Newspaper size={20} />
            Ver Todas as Notícias da Unitins
            <ExternalLink size={18} />  
          </a>
        </div>
      </div>
    </section>
  );
}
