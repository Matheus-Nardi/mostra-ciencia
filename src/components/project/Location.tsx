'use client'
import { MapPin } from "lucide-react"
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import Image from "next/image"

export default function Location() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, margin: "-100px" });

  return (
    <section id="localizacao" className="py-16 sm:py-20 px-4 relative overflow-hidden bg-white">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Text content */}
          <div ref={headerRef} className="text-center lg:text-left space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat text-primary leading-tight">
              Localização do evento
            </h2>

            <div className="flex justify-center lg:justify-start">
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
                aria-hidden="true"
              />
            </div>

            <p className="text-muted-foreground font-poppins text-sm sm:text-base md:text-lg leading-relaxed">
              Todo o evento acontecerá no campus Augustinópolis da UNITINS
            </p>

            {/* Address card */}
            <div className="bg-white border-2 border-primary/20 rounded-2xl p-6 sm:p-8 hover:transition-shadow duration-300">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary flex items-center justify-center" aria-hidden="true">
                  <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="font-bold text-lg sm:text-xl font-montserrat text-primary leading-tight">
                    UNITINS - Campus Augustinópolis
                  </h3>
                  <address className="text-muted-foreground text-sm sm:text-base not-italic leading-relaxed">
                    R. Planalto, 601 - Centro<br />
                    Augustinópolis-TO, CEP: 77960-000
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-md border-4 border-white/50 ring-2 ring-primary/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.6989372912744!2d-47.88626812501549!3d-5.462573194517036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92c511ce70754147%3A0xf90c64fa514879f7!2sUnitins%20-%20C%C3%A2mpus%20Augustin%C3%B3polis!5e0!3m2!1spt-BR!2sbr!4v1761308618393!5m2!1spt-BR!2sbr"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de localização: UNITINS Campus Graciosa, Palmas-TO"
              aria-label="Mapa interativo mostrando a localização da UNITINS Campus Graciosa em Palmas, Tocantins"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
