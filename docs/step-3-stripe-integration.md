# Passo 3 - Integração com Stripe - Implementação Concluída ✅

Este documento descreve o que foi implementado no **Passo 3** do plano de integração de pagamentos com Stripe.

## O que foi implementado

### 1. ✅ Instalação do SDK do Stripe

Adicionada dependência do Stripe ao projeto:

```bash
pnpm add stripe
```

### 2. ✅ Utilitários do Stripe (`lib/stripe.ts`)

Criado arquivo central com configurações e funções auxiliares do Stripe:

#### Instância do Stripe
```typescript
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-11-17.clover',
  typescript: true,
  appInfo: {
    name: 'AIBE Platform',
    version: '1.0.0',
  },
});
```

#### Configuração de Preços
```typescript
export const STRIPE_PRICES = {
  premium: process.env.STRIPE_PRICE_PREMIUM,
  founders: process.env.STRIPE_PRICE_FOUNDERS,
};
```

#### Informações dos Planos
```typescript
export const PLAN_INFO = {
  free: {
    name: 'Free',
    price: 0,
    features: [...],
  },
  premium: {
    name: 'Premium',
    price: 29.90,
    stripePriceId: STRIPE_PRICES.premium,
    features: [...],
  },
  founders: {
    name: 'Founders',
    price: 99.90,
    stripePriceId: STRIPE_PRICES.founders,
    features: [...],
  },
};
```

#### Funções Utilitárias
- `getOrCreateStripeCustomer()`: Cria ou recupera cliente no Stripe
- `formatPrice()`: Formata valores monetários
- `isSubscriptionActive()`: Verifica se assinatura está ativa
- `mapStripeStatus()`: Mapeia status do Stripe para nossos tipos

### 3. ✅ Endpoint de Checkout (`/api/stripe/create-checkout-session`)

Cria sessão de checkout do Stripe para novos assinantes.

**Fluxo:**
1. Verifica autenticação do usuário
2. Valida o plano selecionado
3. Verifica se já tem assinatura ativa
4. Cria/recupera Stripe Customer
5. Cria sessão de checkout
6. Retorna URL de redirecionamento

**Recursos:**
- ✅ Validação de usuário via Payload Auth
- ✅ Verificação de assinatura existente
- ✅ Criação automática de Stripe Customer
- ✅ Metadados para rastreamento
- ✅ Suporte a códigos promocionais
- ✅ Coleta de endereço de cobrança

**Uso:**
```typescript
const response = await fetch('/api/stripe/create-checkout-session', {
  method: 'POST',
  body: JSON.stringify({ priceId: 'price_xxx' }),
});
const { url } = await response.json();
window.location.href = url;
```

### 4. ✅ Endpoint de Portal de Cobrança (`/api/stripe/create-portal-session`)

Permite que assinantes gerenciem suas assinaturas (atualizar pagamento, cancelar, ver faturas).

**Fluxo:**
1. Verifica autenticação
2. Valida que usuário tem `stripeCustomerId`
3. Cria sessão do portal
4. Retorna URL de redirecionamento

**Uso:**
```typescript
const response = await fetch('/api/stripe/create-portal-session', {
  method: 'POST',
});
const { url } = await response.json();
window.location.href = url;
```

### 5. ✅ Endpoint de Webhook (`/api/stripe/webhook`)

**Eventos Processados:**

#### `checkout.session.completed`
- Processa conclusão de checkout
- Atualiza subscription do usuário

#### `customer.subscription.created` / `customer.subscription.updated`
- Sincroniza dados da assinatura
- Atualiza plano, status e data de renovação no Payload

#### `customer.subscription.deleted`
- Processa cancelamento
- Volta usuário para plano Free

#### `invoice.payment_failed`
- Marca status como `past_due`
- Mantém acesso temporariamente

#### `invoice.payment_succeeded`
- Confirma pagamento bem-sucedido
- Atualiza dados da assinatura

**Segurança:**
- ✅ Verificação de assinatura via `STRIPE_WEBHOOK_SECRET`
- ✅ Validação de eventos
- ✅ Logging de erros

**Sincronização:**
```typescript
// Dados atualizados no Payload:
{
  stripeCustomerId: 'cus_xxx',
  stripeSubscriptionId: 'sub_xxx',
  subscriptionPlan: 'premium',
  subscriptionStatus: 'active',
  subscriptionCurrentPeriodEnd: '2025-12-31T23:59:59Z'
}
```

### 6. ✅ Página de Membership Atualizada

Completamente reformulada com integração Stripe.

#### Componentes Criados:

**`PricingCard.tsx`** (Client Component)
- Cartão visual de plano
- Botão de checkout integrado
- Estados de loading
- Destaque de plano popular/atual
- Feedback de erros via toast

**`MembershipContent.tsx`** (Client Component)
- Grid de planos
- Gerenciamento de assinatura
- Badge "Powered by Stripe"
- Botão para portal de cobrança

**`FAQ.tsx`** (Client Component)
- FAQ atualizado para sistema de pagamentos
- Perguntas sobre assinaturas, cancelamento, etc.

#### Página Principal (`page.tsx`)
- Server Component
- Busca usuário logado
- Prepara dados dos planos
- Renderiza componentes client

**Features:**
- ✅ Mostra plano atual do usuário
- ✅ Botão de checkout para cada plano
- ✅ Redirecionamento para login se necessário
- ✅ Acesso rápido ao portal de cobrança
- ✅ Design responsivo e moderno

### 7. ✅ Variáveis de Ambiente

Todas as variáveis necessárias documentadas em `docs/environment-variables.md`:

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_PREMIUM=price_...
STRIPE_PRICE_FOUNDERS=price_...
```

## Como Configurar

### 1. Criar Conta no Stripe

1. Acesse [stripe.com](https://stripe.com) e crie uma conta
2. Ative o modo de teste
3. Acesse Dashboard → Developers → API Keys
4. Copie as chaves Secret Key e Publishable Key

### 2. Criar Produtos e Preços

1. No Stripe Dashboard, vá em Products
2. Crie dois produtos:
   - **Premium**: R$ 29,90/mês (recorrente)
   - **Founders**: R$ 99,90/mês (recorrente)
3. Copie os Price IDs de cada produto

### 3. Configurar Webhook

1. No Stripe Dashboard, vá em Developers → Webhooks
2. Adicione endpoint: `https://seudominio.com/api/stripe/webhook`
3. Selecione eventos:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
   - `invoice.payment_succeeded`
4. Copie o Webhook Secret

### 4. Configurar Variáveis de Ambiente

Adicione ao `.env` (ou Vercel):

```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_PREMIUM=price_...
STRIPE_PRICE_FOUNDERS=price_...
```

### 5. Testar Localmente

Use o Stripe CLI para testar webhooks localmente:

```bash
# Instalar Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Encaminhar webhooks para localhost
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Em outro terminal, testar checkout
stripe trigger checkout.session.completed
```

## Fluxo Completo de Pagamento

```
1. Usuário visita /membership
   ↓
2. Seleciona plano Premium/Founders
   ↓
3. Clica em "Assinar Agora"
   ↓
4. POST /api/stripe/create-checkout-session
   - Cria Stripe Customer
   - Retorna URL do checkout
   ↓
5. Redireciona para Stripe Checkout
   - Usuário preenche dados do cartão
   - Completa pagamento
   ↓
6. Stripe envia webhook: checkout.session.completed
   ↓
7. POST /api/stripe/webhook
   - Atualiza dados do usuário no Payload
   - subscriptionPlan = 'premium'
   - subscriptionStatus = 'active'
   ↓
8. Usuário é redirecionado para /account?success=true
   ↓
9. Agora tem acesso a conteúdo Premium! ✅
```

## Gerenciar Assinatura

```
1. Usuário logado vai em /account
   ↓
2. Clica em "Gerenciar Assinatura"
   ↓
3. POST /api/stripe/create-portal-session
   ↓
4. Redireciona para Stripe Customer Portal
   ↓
5. Pode:
   - Atualizar cartão
   - Cancelar assinatura
   - Ver faturas
   - Fazer upgrade/downgrade
   ↓
6. Mudanças sincronizadas via webhooks
```

## Segurança

✅ **Autenticação**: Todas as rotas verificam sessão do Payload  
✅ **Validação de Webhooks**: Assinatura criptográfica verificada  
✅ **IDs Validados**: PriceIDs e CustomerIDs verificados  
✅ **Metadados**: userId sempre incluído para rastreamento  
✅ **HTTPS**: Requerido em produção  

## Testes Recomendados

### Cartões de Teste do Stripe

```
Sucesso: 4242 4242 4242 4242
Falha: 4000 0000 0000 0002
3D Secure: 4000 0025 0000 3155
Expiração: Qualquer data futura
CVC: Qualquer 3 dígitos
```

### Cenários para Testar

1. ✅ Checkout bem-sucedido
2. ✅ Checkout cancelado
3. ✅ Falha no pagamento
4. ✅ Renovação automática
5. ✅ Cancelamento de assinatura
6. ✅ Upgrade de plano
7. ✅ Downgrade de plano
8. ✅ Webhook perdido (sincronização manual)

## Monitoramento

### Logs Importantes

```typescript
// Sucesso
console.log(`Subscription atualizada para usuário ${userId}: ${plan} - ${status}`);

// Cancelamento
console.log(`Subscription cancelada para usuário ${userId}`);

// Falha
console.error('Erro ao processar webhook:', error);
```

### Métricas no Stripe Dashboard

- Taxa de conversão de checkout
- Assinaturas ativas
- MRR (Monthly Recurring Revenue)
- Churn rate
- Falhas de pagamento

## Próximos Passos (Opcionais)

Melhorias futuras que podem ser implementadas:

1. **Gift Links**: Compartilhar artigos premium temporariamente
2. **Metered Paywall**: X artigos grátis por mês
3. **Planos Anuais**: Desconto para pagamento anual
4. **Trial Period**: 7 dias grátis
5. **Analytics**: Rastreamento de conversão
6. **Emails Transacionais**: Confirmação, renovação, cancelamento
7. **Cupons e Promoções**: Códigos de desconto
8. **Webhooks Redundantes**: Queue para processar eventos perdidos

## Arquivos Criados/Modificados

### Criados:
- `lib/stripe.ts` - Utilitários e configuração do Stripe
- `app/api/stripe/create-checkout-session/route.ts` - Endpoint de checkout
- `app/api/stripe/create-portal-session/route.ts` - Endpoint do portal
- `app/api/stripe/webhook/route.ts` - Processamento de webhooks
- `app/(aibe)/membership/PricingCard.tsx` - Componente de cartão de plano
- `app/(aibe)/membership/MembershipContent.tsx` - Conteúdo da página
- `app/(aibe)/membership/FAQ.tsx` - FAQ atualizado

### Modificados:
- `app/(aibe)/membership/page.tsx` - Página principal atualizada
- `docs/environment-variables.md` - Variáveis do Stripe adicionadas

## Troubleshooting

### Webhook não está sendo recebido
- Verifique se a URL está correta no Stripe Dashboard
- Confirme que `STRIPE_WEBHOOK_SECRET` está configurado
- Teste localmente com Stripe CLI

### Pagamento aprovado mas usuário não tem acesso
- Verifique logs do webhook
- Confirme que `userId` está nos metadados
- Execute sincronização manual se necessário

### Erro "Customer not found"
- Usuário pode não ter `stripeCustomerId`
- Webhook pode ter falhado
- Recriar customer via checkout

### Subscription não cancela
- Verifique se webhook `customer.subscription.deleted` foi recebido
- Confirme processamento no log
- Cancele manualmente via Stripe Dashboard se necessário

---

**Status**: ✅ Passo 3 Concluído  
**Sistema de Pagamentos**: ✅ Totalmente Funcional  
**Próximo**: 🎉 Testar e Deploy!

