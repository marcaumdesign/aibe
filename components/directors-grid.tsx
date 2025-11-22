'use client';

import { useState, useMemo, useEffect } from 'react';
import DirectorCard from '@/components/director-card';
import DirectorModal from '@/components/director-modal';
import type { Director } from '@/lib/strapi';

interface DirectorsGridProps {
  directors: Director[];
}

/**
 * Calcula o número ideal de colunas para o grid baseado no número de pessoas.
 * Regras:
 * - 9 pessoas: 3x3 (3 colunas)
 * - 8 pessoas: 4x2 (4 colunas)
 * - 10 pessoas: 5x2 (5 colunas)
 * - Máximo 6 pessoas por coluna (máximo 6 linhas)
 * - Mínimo 2 linhas
 */
function calculateGridColumns(count: number): number {
  // Casos específicos mencionados
  if (count === 9) return 3;
  if (count === 8) return 4;
  if (count === 10) return 5;

  // Para outros casos, encontra o número de colunas mais simétrico
  // que respeita: máximo 6 linhas, mínimo 2 linhas
  let bestCols = Math.ceil(Math.sqrt(count));
  let bestScore = Infinity;

  // Testa todas as configurações possíveis
  const minCols = Math.max(1, Math.ceil(count / 6)); // Mínimo necessário para ter <= 6 linhas
  const maxCols = Math.min(count, Math.floor(count / 2)); // Máximo para ter >= 2 linhas

  for (let cols = minCols; cols <= maxCols; cols++) {
    const rows = Math.ceil(count / cols);

    // Verifica restrições
    if (rows < 2 || rows > 6) continue;

    // Calcula score de simetria (quanto menor, mais simétrico)
    // Prioriza configurações onde a diferença entre cols e rows é mínima
    const diff = Math.abs(cols - rows);

    // Também considera o resto (espaços vazios) - menos espaços vazios é melhor
    const remainder = (cols * rows) - count;
    const score = diff * 10 + remainder; // Diferença tem peso maior

    if (score < bestScore) {
      bestScore = score;
      bestCols = cols;
    }
  }

  return Math.max(1, bestCols);
}

export default function DirectorsGrid({ directors }: DirectorsGridProps) {
  const [selectedDirector, setSelectedDirector] = useState<Director | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Calcula o número de colunas baseado no número de diretores
  const gridCols = useMemo(() => {
    return calculateGridColumns(directors.length);
  }, [directors.length]);

  // Detecta se é tela pequena (< 900px)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const openDirectorModal = (director: Director) => {
    setSelectedDirector(director);
  };

  const closeDirectorModal = () => {
    setSelectedDirector(null);
  };

  const navigateDirector = (direction: 'prev' | 'next') => {
    if (!selectedDirector || directors.length === 0) return;

    const currentIndex = directors.findIndex(d => d.id === selectedDirector.id);
    if (currentIndex === -1) return;

    let newIndex: number;
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? directors.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === directors.length - 1 ? 0 : currentIndex + 1;
    }

    setSelectedDirector(directors[newIndex]);
  };

  if (directors.length === 0) {
    return null;
  }

  return (
    <>
      <div className='mx-auto max-w-[1200px] w-full'>
        {isSmallScreen ? (
          // Lista vertical para telas < 900px
          <div className='flex flex-col gap-6'>
            {directors.map((director) => {
              const imageUrl = director.Avatar?.url || '';

              return (
                <DirectorCard
                  key={director.id}
                  id={director.id}
                  name={director.Name || 'Name not available'}
                  role={director.Role || 'Role not available'}
                  description={director.Description}
                  image={imageUrl}
                  imageAlt={director.Avatar?.alternativeText}
                  clickable={true}
                  onClick={() => openDirectorModal(director)}
                />
              );
            })}
          </div>
        ) : (
          // Grid para telas >= 900px
          <div
            className='grid gap-8'
            style={{
              gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
            }}
          >
            {directors.map((director) => {
              const imageUrl = director.Avatar?.url || '';

              return (
                <DirectorCard
                  key={director.id}
                  id={director.id}
                  name={director.Name || 'Name not available'}
                  role={director.Role || 'Role not available'}
                  description={director.Description}
                  image={imageUrl}
                  imageAlt={director.Avatar?.alternativeText}
                  clickable={true}
                  onClick={() => openDirectorModal(director)}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Director Modal */}
      <DirectorModal
        director={selectedDirector}
        onClose={closeDirectorModal}
        onNavigate={navigateDirector}
        showNavigation={true}
      />
    </>
  );
}

