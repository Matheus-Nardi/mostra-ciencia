'use client'
import Image from "next/image"
import Link from "next/link"
import { Award } from "lucide-react"
import { motion, useInView } from "motion/react"
import { useRef } from "react"

export default function Partners() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, margin: "-100px" });

  const partnersItems = [
    { src: "/logos/logo-gov-to.png", alt: "Governo do Estado do Tocantins", href: "https://www.to.gov.br/" },
    {
      src: "/logos/logo-mcti.png",
      alt: "MCTI - Ministério da Ciência, Tecnologia e Inovação",
      href: "https://www.gov.br/mcti/pt-br",
    },
    {
      src: "/logos/logo-snct.png",
      alt: "SNCT - Semana Nacional de Ciência e Tecnologia",
      href: "https://semanact.mcti.gov.br/",
    },
    {
      src: "/logos/logo-fndct.png",
      alt: "FNDCT - Fundo Nacional de Desenvolvimento Científico e Tecnológico",
      href: "https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/fndct",
    },
    {
      src: "/logos/logo-capes.png",
      alt: "CAPES - Coordenação de Aperfeiçoamento de Pessoal de Nível Superior",
      href: "https://www.gov.br/capes/pt-br"
    },
    { src: "/logos/logo-cnpq.png", alt: "CNPq - Conselho Nacional de Desenvolvimento Científico e Tecnológico", href: "https://www.gov.br/cnpq/pt-br" },
    {
      src: "/logos/logo-fapt.png",
      alt: "FAPT - Fundação de Amparo à Pesquisa do Tocantins",
      href: "https://www.to.gov.br/fapt",
    },
    {
      src: "/logos/logo-pop.png",
      alt: "POP Ciência - Popularização da Ciência",
      href: "https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/popciencia"
    },
    {
      src: "/logos/logo-uab.png",
      alt: "UAB - Universidade Aberta do Brasil",
      href: "https://www.gov.br/capes/pt-br/acesso-a-informacao/acoes-e-programas/educacao-a-distancia/universidade-aberta-do-brasil"
    },
    { src: "/logos/logo-embrapa.png", alt: "Embrapa - Empresa Brasileira de Pesquisa Agropecuária", href: "https://www.embrapa.br/" },
    {
      src: "/logos/logo-sebrae.png",
      alt: "Sebrae Tocantins - Serviço Brasileiro de Apoio às Micro e Pequenas Empresas",
      href: "https://sebrae.com.br/sites/PortalSebrae/ufs/to?codUf=24",
    },
  ]

  return (
    <section id="parceiros" className="w-full py-16 sm:py-20 md:py-32 relative overflow-hidden bg-gradient-soft-primary">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Coluna Esquerda - Cabeçalho */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-12">
            {/* Section Header */}
            <div ref={headerRef} className="text-center lg:text-left space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance font-montserrat text-primary">
                Parceiros
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
            </div>

            {/* Partners Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center">
              {partnersItems.map((partner, index) => (
                <Link
                  key={index}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full h-20 sm:h-24 md:h-28 flex items-center justify-center transition-all duration-500 hover:scale-105 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
                  aria-label={`Visite o site de ${partner.alt} (abre em nova aba)`}
                >
                  {/* Partner logo */}
                  <div className="relative w-full h-full bg-white rounded-xl p-3 sm:p-4 border border-primary/10 group-hover:border-primary/30 group-focus-visible:border-primary/30 transition-all duration-300 shadow-sm group-hover:shadow-md group-focus-visible:shadow-md">
                    <div className="relative w-full h-full">
                      <Image
                        src={partner.src || "/placeholder.svg"}
                        alt={partner.alt}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Coluna Direita - Elemento Visual */}
          <div className="hidden lg:flex lg:col-span-4 items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full max-w-sm aspect-square"
            >
              <Image
                src="/semana-de-inovacao/elementos-Id-visual/SNCT-elemento-4.png"
                alt="Elemento decorativo da identidade visual"
                fill
                sizes="(max-width: 1024px) 0px, 384px"
                className="object-contain drop-shadow-2xl animate-float"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
