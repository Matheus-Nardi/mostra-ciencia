export default function Head() {
  const siteUrl = "https://unitinscti.com.br"

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: siteUrl,
    name: 'III Semana de Ciência, Tecnologia e Inovação - UNITINS',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Universidade Estadual do Tocantins (UNITINS)',
    url: siteUrl,
    logo: `${siteUrl}/logos/logo-unitins.png`,
  }

  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'III Semana de Ciência, Tecnologia e Inovação - UNITINS',
    description:
      'A Universidade Estadual do Tocantins (Unitins) realizará, de 20 a 24 de outubro de 2025, a III Semana de Ciência, Tecnologia e Inovação - SCTI, com o tema “Planeta Água: a cultura oceânica para enfrentar as mudanças climáticas no meu território”. Integrando a Semana Nacional de Ciência e Tecnologia, o evento reunirá estudantes, professores, pesquisadores e comunidade em torno de palestras, oficinas, exposições e apresentações científicas.',
    startDate: '2025-10-20',
    endDate: '2025-10-24',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: siteUrl,
    image: [`${siteUrl}/logos/logo-snct.png`],
    isAccessibleForFree: true,
    offers: [
      {
        '@type': 'Offer',
        url: 'https://www.unitins.br/Eventos/E007Evento/Abertos',
        price: '0',
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock',
      },
    ],
    location: {
      '@type': 'Place',
      name: 'UNITINS - Campus Graciosa',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Quadra 109 Norte, Avenida NS 15, Lote 09',
        addressLocality: 'Palmas',
        addressRegion: 'TO',
        postalCode: '77001-090',
        addressCountry: 'BR',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Universidade Estadual do Tocantins (UNITINS)',
      url: siteUrl,
      logo: `${siteUrl}/logos/logo-unitins.png`,
    },
  }

  return (
    <>
      {/* Preconnect para domínios de imagens externas (melhora tempo de carregamento) */}
      <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
      <link rel="preconnect" href="https://plus.unsplash.com" crossOrigin="" />
      <link rel="preconnect" href="https://images.pexels.com" crossOrigin="" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
    </>
  )
}