"use client";

import Image from "next/image";
import CTA from "@/components/cta";
import { Root as Button } from "@/components/ui/button";

export default function GiorgioMortara2Page() {

  return (
    <div className="min-h-screen bg-white">
      {/* Header Spacer */}
      <div className="h-20"></div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Prizes Section */}
        <section className="mb-16">
          {/* Small label */}
          <p className="text-text-soft-400 font-medium tracking-wider uppercase text-center mb-4 text-subheading-xs" >
            PRIZES - TEST PAGE
          </p>

          {/* Main Title */}
          <h1 className="text-text-strong-950 text-center mb-4 max-w-2xl mx-auto text-title-h2">
            2nd Giorgio Mortara Prize (Test)
          </h1>

          {/* Subtitle */}
          <p className="text-text-sub-600 text-center mb-5 max-w-3xl text-paragraph-lg">
            Esta é uma página de teste para o segundo prêmio Giorgio Mortara.
          </p>

          {/* Main Image */}
          <div className="mb-8">
            <Image
              src="/images/Reunionimage.png"
              alt="AIBE Workshop presentation"
              width={800}
              height={400}
              className="w-full h-auto"
            />
          </div>

          {/* Prize Description */}
          <div className="prose prose-lg max-w-none mb-2">
            <p className="text-text-sub-600 leading-relaxed mb-4 text-paragraph-md">
              Esta é uma página de teste para demonstração do segundo prêmio Giorgio Mortara. O conteúdo aqui é apenas para fins de teste e desenvolvimento.
            </p>
            <p className="text-text-sub-600 leading-relaxed mb-4 text-paragraph-md">
              A estrutura e o design seguem o mesmo padrão da página original do prêmio Giorgio Mortara.
            </p>
            <p className="text-text-sub-600 leading-relaxed mb-6 text-paragraph-md">
              Esta página pode ser usada como modelo para futuros prêmios ou para testes de funcionalidade.
            </p>
          </div>

          {/* To Apply Section */}
          <div className="mb-16">
            <h2 className="text-text-strong-950 mb-4 text-title-h5">
              Como participar (Teste)
            </h2>
            <p className="text-text-sub-600 leading-relaxed mb-4 text-paragraph-md">
              Este é um conteúdo de teste. Submeta uma cópia do seu manuscrito, juntamente com detalhes de contato, nomes e afiliações de todos os co-autores.
            </p>
            <p className="text-text-sub-600 leading-relaxed mb-6 text-paragraph-md">
              <strong>Esta é uma página de teste - não há prazo real de submissão</strong>
            </p>
          </div>

          {/* Eligibility and Rules */}
          <div className="mb-12">
            <h2 className="text-text-strong-950 mb-4 text-title-h5">
              Elegibilidade e Regras (Teste)
            </h2>
            <ul className="space-y-3 text-text-sub-600 leading-relaxed">
              <li className="flex items-start text-paragraph-md">
                <span className="text-black-600 mr-2">•</span>
                <span>Esta é uma página de teste para demonstração.</span>
              </li>
              <li className="flex items-start text-paragraph-md">
                <span className="text-black-600 mr-2">•</span>
                <span>As regras reais serão definidas quando o prêmio for oficialmente lançado.</span>
              </li>
              <li className="flex items-start text-paragraph-md">
                <span className="text-black-600 mr-2">•</span>
                <span>Esta página serve como modelo de design e estrutura.</span>
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button variant="primary" mode="filled" size="medium">
              Teste - Enviar Paper
            </Button>
          </div>
        </section>
      </main>

      {/* Who is Giorgio Mortara Section */}
      <section id="giorgio-mortara" className="mb-64 bg-blue-50 py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-text-strong-950 mb-6 text-title-h3">
            Quem é Giorgio Mortara? (Seção de Teste)
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Portrait */}
            <div className="flex-shrink-0">
              <Image
                src="/images/Giorgiomortara.png"
                alt="Giorgio Mortara portrait"
                width={384}
                height={384}
                className="w-96 h-96 object-cover"
              />
            </div>

            {/* Biography */}
            <div className="flex-1">
              <p className="text-text-sub-600 leading-relaxed mb-4 text-paragraph-md">
                Giorgio Mortara (Matua, 1885 - Rio de Janeiro, 1967) foi um economista e demógrafo ítalo-brasileiro. Durante 1924-38, lecionou na Universidade Bocconi em Milão. Em 1939, emigrou para o Rio de Janeiro para escapar das Leis Raciais fascistas.
              </p>
              <p className="text-text-sub-600 leading-relaxed text-paragraph-md">
                Esta é uma página de teste para demonstração do segundo prêmio Giorgio Mortara.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </div >
  );
}

