// Service Worker básico para evitar erro 404
// Este é um service worker mínimo que não faz cache nem funcionalidades avançadas

const CACHE_NAME = 'aibe-v1';

// Instalação do service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
  self.skipWaiting();
});

// Ativação do service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker ativado');
  event.waitUntil(self.clients.claim());
});

// Interceptação de requisições (opcional - apenas para evitar erros)
self.addEventListener('fetch', (event) => {
  // Não fazemos cache, apenas deixamos as requisições passarem normalmente
  return;
});

