import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container mx-auto px-4 pt-16 lg:pt-20 pb-24 min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] flex items-center">
      <div className="mx-auto max-w-2xl text-center">
        <span className="block text-7xl md:text-8xl font-extrabold tracking-tight text-primary/10 select-none">
          404
        </span>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold font-montserrat text-primary">
          Página não encontrada
        </h1>
        <p className="mt-3 text-muted-foreground font-poppins">
          O endereço que você tentou acessar não existe ou foi movido.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            Voltar para a página inicial
          </Link>
          <Link
            href="/#programacao"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-primary/20 text-primary hover:bg-primary/5 transition-colors"
          >
            Ver programação
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}