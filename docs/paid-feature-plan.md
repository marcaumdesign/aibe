# Plano de Implementação - Sistema de Pagamentos com Stripe

Este documento detalha o plano de implementação para adicionar um sistema de paywall com Stripe ao projeto. A stack utilizada é **Payload CMS + Next.js**, aproveitando o sistema de autenticação e banco de dados nativos do Payload.

## 1. Configuração da Autenticação (Payload Native)

- Validar que o sistema de autenticação do Payload está funcionando corretamente através da collection `Users` (`collections/Users/index.ts`)
- Confirmar que todas as variáveis de ambiente necessárias estão definidas (`PAYLOAD_SECRET`, configurações de email, etc.) e documentá-las em `.env.example`
- Adicionar guards server-side nas rotas protegidas usando a API do Payload (`req.user`) para redirecionar usuários não autenticados
- Criar testes (Vitest/Playwright) que cubram: login bem-sucedido, mensagens de credenciais inválidas, logout, e acesso a artigo pago como usuário anônimo
- Implementar tratamento de erros de autenticação com feedback visual (toast ou mensagens inline)

## 2. Modelo de Assinatura & Paywall

- Estender a collection `Users` (`collections/Users/index.ts`) com campos de assinatura:
  - `subscriptionPlan`: enum (`'free'`, `'premium'`, `'founders'`, etc.)
  - `stripeCustomerId`: string (ID do cliente no Stripe)
  - `stripeSubscriptionId`: string (ID da assinatura ativa)
  - `subscriptionStatus`: enum (`'active'`, `'canceled'`, `'past_due'`, `'trialing'`, etc.)
  - `subscriptionCurrentPeriodEnd`: date (data de renovação/expiração)
- Atualizar `collections/Posts/index.ts` para incluir:
  - `accessLevel`: enum (`'free'`, `'premium'`, `'founders'`, etc.) - define quem pode acessar
  - `previewContent`: richText (opcional) - teaser para posts pagos
  - `isPremium`: boolean - flag rápida para identificar posts pagos
- Criar utilitários server-side em `utilities/` ou `lib/`:
  - `getUserAccessLevel(user)`: retorna o nível de acesso do usuário
  - `canAccessPost(user, post)`: verifica se o usuário pode acessar o post
  - `getUserSubscriptionStatus(user)`: retorna status detalhado da assinatura
- Implementar lógica de paywall em `app/(aibe)/posts/[slug]/page.tsx`:
  - Verificar nível de acesso do usuário vs. nível requerido do post
  - Renderizar conteúdo completo ou componente de paywall com CTA

## 3. Integração com Stripe

- No Stripe Dashboard, criar Products/Prices para os planos de assinatura e capturar os IDs em variáveis de ambiente:
  - `STRIPE_SECRET_KEY`: chave secreta da API
  - `STRIPE_WEBHOOK_SECRET`: secret para validação de webhooks
  - `STRIPE_PRICE_PREMIUM`: ID do preço do plano premium
  - `STRIPE_PRICE_FOUNDERS`: ID do preço do plano founders (se houver)
- Criar endpoints no backend:
  - `app/api/stripe/create-checkout-session/route.ts`: cria sessão de checkout
    - Validar sessão do usuário via Payload (`req.user`)
    - Criar ou recuperar Stripe Customer usando `stripeCustomerId`
    - Redirecionar para Stripe Checkout com o preço selecionado
  - `app/api/stripe/create-portal-session/route.ts`: acesso ao Portal de Cobrança
    - Validar que o usuário tem `stripeCustomerId`
    - Redirecionar para Stripe Customer Portal
  - `app/api/stripe/webhook/route.ts`: receber eventos do Stripe
    - Implementar verificação de assinatura dos webhooks
    - Processar eventos principais:
      - `checkout.session.completed`: nova assinatura criada
      - `customer.subscription.updated`: mudança na assinatura
      - `customer.subscription.deleted`: cancelamento
      - `invoice.payment_failed`: falha no pagamento
    - Atualizar campos do usuário no Payload usando a Local API
- Criar script de sincronização manual em `endpoints/sync-stripe/` para re-sincronizar assinaturas em caso de webhooks perdidos

## 4. CMS & Operações de Conteúdo

- Atualizar a interface admin do Payload para exibir o campo `accessLevel` de forma clara para editores
- Adicionar validação para garantir que posts premium não sejam publicados sem o campo `accessLevel` definido
- Criar um campo customizado no admin que mostre visualmente se o post é pago ou gratuito
- Documentar guidelines para criadores de conteúdo:
  - Como escolher o nível de acesso apropriado
  - Como escrever um bom teaser/preview para posts pagos
  - Processo de revisão antes de publicar conteúdo premium
- Se necessário, adicionar CTAs de upgrade em globals (ex: `Header` ou `Footer`) através de campos configuráveis em `Header/config.ts`

## 5. Experiência do Frontend

- Criar página de preços dedicada em `app/(aibe)/membership/page.tsx` ou `app/(aibe)/pricing/page.tsx`:
  - Listar todos os planos com features e benefícios
  - Botões de checkout conectados às rotas da API
  - Comparação visual entre planos
- Implementar componentes reutilizáveis de paywall:
  - `components/PaywallDialog.tsx` ou `components/UpgradeBanner.tsx`
  - Deve lidar gracefully com:
    - Usuário não logado → CTA para criar conta + assinar
    - Usuário logado mas sem assinatura → CTA direto para checkout
    - Usuário com assinatura expirada → CTA para reativar
  - Incluir preview do conteúdo bloqueado quando disponível
- Criar página de sucesso pós-checkout:
  - `app/(aibe)/checkout/success/page.tsx` ou similar
  - Revalidar sessão do usuário
  - Mostrar mensagem de confirmação e próximos passos
  - Incluir fallback para pagamentos cancelados
- Atualizar página de conta do usuário (`app/(aibe)/account/page.tsx`):
  - Mostrar plano atual e status da assinatura
  - Data de renovação/expiração
  - Botão para acessar Stripe Customer Portal
  - Histórico de faturas (opcional)
- Implementar estados de loading e UI otimista:
  - Considerar delay entre conclusão do webhook e atualização da UI
  - Polling ou re-fetch da sessão após checkout se necessário

## 6. Testes & Garantia de Qualidade

- Criar testes unitários para utilitários de entitlement e componentes de paywall
  - Garantir que posts `premium` retornam erro quando acessados por usuários `free`
  - Testar lógica de verificação de acesso em diferentes cenários
- Criar testes end-to-end (Playwright/Cypress):
  - Usuário anônimo acessando artigo premium → vê paywall
  - Usuário assinante acessando artigo premium → vê conteúdo completo
  - Cancelamento de assinatura → perde acesso após processamento do webhook
  - Fluxo completo de checkout
- Adicionar testes de replay de webhooks usando Stripe CLI fixtures
- Testar expiração de sessão do Payload para garantir que páginas protegidas pedem re-autenticação

## 7. Deploy, Monitoramento e Operações

- Documentar todos os secrets necessários e garantir que estão configurados no ambiente de produção:
  - `PAYLOAD_SECRET`: secret do Payload CMS
  - `DATABASE_URL`: URL do banco de dados
  - `STRIPE_SECRET_KEY`: chave secreta do Stripe
  - `STRIPE_WEBHOOK_SECRET`: secret para validação de webhooks
  - `STRIPE_PRICE_PREMIUM`, `STRIPE_PRICE_FOUNDERS`: IDs dos preços
  - Configurações de email (SMTP)
- Configurar alertas no Stripe Dashboard ou CLI:
  - Webhooks falhados
  - Falhas de pagamento
  - Disputas de cobrança
  - Rotear para canal de incidentes da equipe
- Adicionar logging em fluxos críticos:
  - Falhas de autenticação
  - Negações de acesso (paywall)
  - Atualizações via webhook
  - Criar dashboards/métricas se possível
- Criar runbook de operações:
  - Como conceder acesso manualmente
  - Como processar reembolso
  - Como reprocessar webhooks perdidos
  - Como rotacionar chaves do Stripe
- Antes do launch, executar simulação completa em test mode:
  - Sign-up → Checkout → Ler post premium → Cancelar
  - Documentar os passos e resultados em notas de QA

## 8. Documentação & Transferência de Conhecimento

- Atualizar `README.md` ou criar documentos dedicados:
  - `/docs/auth.md`: como funciona a autenticação do Payload
  - `/docs/payments.md`: instruções para configurar Stripe localmente
  - `/docs/content-management.md`: gerenciamento de conteúdo premium
- Documentar setup local de webhooks do Stripe:
  - Como usar Stripe CLI para testing
  - Como testar diferentes eventos de webhook
- Registrar qualquer migração ou passo manual necessário:
  - Adicionar novos campos às collections
  - Scripts de seed/sincronização
  - Para que futuros membros da equipe possam reproduzir o setup
- Listar melhorias futuras potenciais:
  - Gift links (compartilhamento de artigos)
  - Metered paywall (X artigos grátis por mês)
  - Analytics de conversão
  - Mas manter este documento focado nos requisitos essenciais
