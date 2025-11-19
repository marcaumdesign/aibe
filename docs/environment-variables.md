# Variáveis de Ambiente

Este documento lista todas as variáveis de ambiente necessárias para o projeto.

## Payload CMS

```bash
PAYLOAD_SECRET=your-payload-secret-here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## Banco de Dados (Vercel Postgres)

```bash
POSTGRES_URL=your-postgres-connection-string
```

## Armazenamento (Vercel Blob Storage)

```bash
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

## Configuração de Email (SMTP)

```bash
EMAIL_FROM_ADDRESS=noreply@yourdomain.com
EMAIL_FROM_NAME=Your Site Name
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
```

## Cookies

```bash
COOKIE_DOMAIN=localhost
```

## Stripe (Sistema de Pagamentos)

```bash
# Chaves da API do Stripe
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key

# Webhook Secret (obtido ao configurar webhook no Stripe Dashboard)
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# IDs dos Preços/Planos
STRIPE_PRICE_PREMIUM=price_your-premium-price-id
STRIPE_PRICE_FOUNDERS=price_your-founders-price-id
```

## Cron Jobs (Vercel)

```bash
CRON_SECRET=your-cron-secret
```

## Opcional

```bash
GRAPHQL_SCHEMA_OUTPUT_FILE=./schema.graphql
```

---

## Setup Local

1. Copie este template para um arquivo `.env` na raiz do projeto
2. Preencha os valores reais para cada variável
3. **Nunca** commite o arquivo `.env` para o git

## Setup em Produção (Vercel)

1. Acesse o dashboard do projeto no Vercel
2. Vá em Settings → Environment Variables
3. Adicione cada variável listada acima
4. Para variáveis de teste do Stripe, use as chaves de test mode (`sk_test_*`, `pk_test_*`)
5. Para produção, use as chaves de live mode (`sk_live_*`, `pk_live_*`)

