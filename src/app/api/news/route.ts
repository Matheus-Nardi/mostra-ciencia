import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

interface NewsItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  url: string;
}

export async function GET() {
  try {
    const response = await fetch('https://www.unitins.br/nPortal/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      },
      // Revalida automaticamente após 30 minutos quando houver nova requisição
      next: { revalidate: 1800 }
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const htmlContent = await response.text();

    const $ = cheerio.load(htmlContent);

    const noticias: NewsItem[] = [];

    // Procura os cards de notícia na seção #noticias
    $('#noticias .card').each((index, element) => {
      if (index >= 6) return; // Limita a 6 notícias

      const card = $(element);
      
      // Extrai as informações
      const title = card.find('.card-title').text().trim();
      let imageUrl = card.find('img').attr('src') || '';
      const category = card.find('.badge').text().trim();
      let url = card.find('a.stretched-link').attr('href') || '';

      // Corrige URLs relativas para absolutas
      if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = `https://www.unitins.br${imageUrl}`;
      }

      if (url && !url.startsWith('http')) {
        url = `https://www.unitins.br${url}`;
      }

      // Adiciona apenas se tiver título
      if (title) {
        noticias.push({
          id: index.toString(),
          title,
          imageUrl,
          category,
          url
        });
      }
    });

    return NextResponse.json({ 
      news: noticias,
      timestamp: new Date().toISOString(),
      cached: true
    });

  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao buscar notícias da Unitins',
        news: [],
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
