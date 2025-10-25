"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Subscription() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const isLeftInView = useInView(leftRef, { once: false, margin: "-100px" });
  const isRightInView = useInView(rightRef, { once: false, margin: "-100px" });

  return (
    <section className="w-full py-16 sm:py-20 md:py-32 bg-gradient-5 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isLeftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 animate-float"
          >
            <div className="absolute inset-0 -z-10 scale-150" aria-hidden="true">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <path
                  d="M100,20 C120,25 140,35 155,55 C170,75 180,95 175,115 C170,135 155,150 135,160 C115,170 90,175 70,170 C50,165 35,150 25,130 C15,110 10,85 20,65 C30,45 50,30 70,25 C80,22 90,20 100,20 Z"
                  fill="rgba(34, 15, 139, 0.1)"
                />
              </svg>
            </div>
            <Image 
              src="/semana-de-inovacao/elementos-Id-visual/SNCT-elemento-10.png" 
              alt="Elemento decorativo da identidade visual" 
              fill 
              sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
              className="object-contain drop-shadow-xl" 
              loading="lazy"
            />
          </motion.div>

          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <Button
              size="lg"
              className="relative min-h-[56px] sm:min-h-[64px] bg-primary hover:bg-primary/90 focus-visible:bg-primary/90 text-white font-montserrat text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-md hover:shadow-lg focus-visible:shadow-lg transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              aria-label="Inscrever-se no evento da IX Mostra de Ciência, Tecnologia da UNITINS Câmpus Augustinópolis e Araguatins"
            >
              <span className="relative z-10 flex items-center gap-2">
                Inscreva-se Agora
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:translate-x-1 transition-transform duration-300"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Button>
            <p className="text-xs sm:text-sm text-muted-foreground font-poppins text-center max-w-xs">
              Vagas limitadas! Garanta sua participação
            </p>
          </div>

          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isRightInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 animate-float-delayed"
          >
            <div className="absolute inset-0 -z-10 scale-150" aria-hidden="true">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <path
                  d="M95,15 C115,18 135,28 150,45 C165,62 175,85 172,108 C169,131 152,148 130,158 C108,168 82,170 60,162 C38,154 20,138 12,115 C4,92 8,65 22,45 C36,25 58,15 78,13 C85,12 90,14 95,15 Z"
                  fill="rgba(233, 30, 99, 0.1)"
                />
              </svg>
            </div>
            <Image 
              src="/semana-de-inovacao/elementos-Id-visual/SNCT-elemento-12.png" 
              alt="Elemento decorativo da identidade visual" 
              fill 
              sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
              className="object-contain drop-shadow-xl" 
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
