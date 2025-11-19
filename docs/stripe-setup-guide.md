# Guia Completo de Configuração do Stripe

Este guia te levará passo a passo pela configuração do Stripe Dashboard e testes locais.

## Parte 1: Configuração no Stripe Dashboard

### Passo 1: Criar Conta no Stripe

1. Acesse [stripe.com](https://stripe.com)
2. Clique em "Sign up"
3. Preencha seus dados e crie a conta
4. **IMPORTANTE**: Ative o **Test Mode** (toggle no canto superior direito)

### Passo 2: Configurar Nome do Negócio (OBRIGATÓRIO)

**IMPORTANTE**: O Stripe requer que você configure um nome de negócio antes de usar o Checkout.

1. No Dashboard, clique em **Settings** (ícone de engrenagem no canto superior direito)
2. Vá em **Account details** ou **Public details**
3. Preencha os campos obrigatórios:
   ```
   Business name: AIBE (ou o nome da sua organização)
   Support email: seu-email@example.com
   ```
4. Opcionalmente, adicione:
   ```
   Website: https://seusite.com
   Phone number: +55 (11) 99999-9999
   Description: Breve descrição do seu negócio
   ```
5. Clique em **Save**

**Sem esta configuração, você receberá o erro:**

```
Error: In order to use Checkout, you must set an account or business name
```

### Passo 3: Obter API Keys

1. No Dashboard, vá em **Developers** → **API keys**
2. Você verá duas chaves no Test Mode:
   - **Publishable key**: começa com `pk_test_...`
   - **Secret key**: começa com `sk_test_...` (clique em "Reveal test key")
3. Copie ambas as chaves e guarde em um lugar seguro

### Passo 4: Criar Produtos e Preços

#### Criar Produto Premium:

1. No Dashboard, vá em **Product catalog** → **Products**
2. Clique em **+ Add Product**
3. Preencha:
   ```
   Nome: Premium Membership
   Descrição: Acesso a conteúdo exclusivo e comunidade
   ```
4. Em **Pricing**:
   ```
   Tipo: Recurring (Recorrente)
   Preço: R$ 29,90
   Cobrança: Monthly (Mensal)
   ```
5. Clique em **Add product**
6. **IMPORTANTE**: Na lista de produtos, clique no produto criado
7. Na seção **Pricing**, você verá o Price ID (começa com `price_...`)
8. Copie este ID: `price_xxxxxxxxxxxxx`

#### Criar Produto Founders:

Repita o processo acima com:

```
Nome: Founders Membership
Descrição: Experiência VIP completa
Preço: R$ 99,90
Cobrança: Monthly
```

Copie também este Price ID.

### Passo 5: Configurar Webhook

1. No Dashboard, vá em **Developers** → **Webhooks**
2. Clique em **+ Add endpoint**
3. Em **Endpoint URL**, **POR ENQUANTO** coloque uma URL placeholder:
   ```
   https://exemplo.com/webhook
   ```
   (Vamos atualizar isso depois para localhost)
4. Em **Events to send**, clique em **+ Select events**
5. Selecione os seguintes eventos:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
   - `invoice.payment_succeeded`
6. Clique em **Add events**
7. Clique em **Add endpoint**
8. **IMPORTANTE**: Clique no endpoint criado e copie o **Signing secret** (começa com `whsec_...`)

### Passo 6: Configurar Customer Portal (Billing Portal)

1. No Dashboard, vá em **Settings** → **Billing**
2. Em **Customer portal**, clique em **Configure**
3. Configure:
   ```
   ✅ Customers can update payment methods
   ✅ Customers can update billing information
   ✅ Customers can view invoices
   ✅ Customers can cancel subscriptions
   ```
4. Em **Cancellation**:
   ```
   ✅ Allow customers to cancel immediately
   Proration: Do not prorate
   ```
5. Clique em **Save**

---

## Parte 2: Configurar Variáveis de Ambiente

Agora que você tem todas as chaves, vamos configurar o projeto.

### Passo 1: Criar arquivo `.env.local`

Na raiz do projeto, crie um arquivo `.env.local`:

```bash
# Payload CMS (já deve estar configurado)
PAYLOAD_SECRET=seu-payload-secret
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Database
POSTGRES_URL=sua-database-url

# Blob Storage
BLOB_READ_WRITE_TOKEN=seu-blob-token

# Email (já deve estar configurado)
EMAIL_FROM_ADDRESS=seu-email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-smtp-user
SMTP_PASS=seu-smtp-pass

# Cookie
COOKIE_DOMAIN=localhost

# ============================================
# STRIPE - ADICIONE ESTAS VARIÁVEIS
# ============================================

# Chaves da API (Test Mode)
STRIPE_SECRET_KEY=sk_test_SEU_SECRET_KEY_AQUI
STRIPE_PUBLISHABLE_KEY=pk_test_SEU_PUBLISHABLE_KEY_AQUI

# Webhook Secret (temporário, vamos atualizar com Stripe CLI)
STRIPE_WEBHOOK_SECRET=whsec_SEU_WEBHOOK_SECRET_AQUI

# Price IDs dos seus produtos
STRIPE_PRICE_PREMIUM=price_SEU_PRICE_ID_PREMIUM_AQUI
STRIPE_PRICE_FOUNDERS=price_SEU_PRICE_ID_FOUNDERS_AQUI
```

### Passo 2: Substituir os valores

Substitua cada placeholder pelos valores reais que você copiou:

- `sk_test_...` com sua Secret Key
- `pk_test_...` com sua Publishable Key
- `whsec_...` com seu Webhook Secret (temporário)
- `price_...` para Premium
- `price_...` para Founders

---

## Parte 3: Testar Localmente com Stripe CLI

### Passo 1: Instalar Stripe CLI

**No macOS:**

```bash
brew install stripe/stripe-cli/stripe
```

**No Linux:**

```bash
curl -s https://packages.stripe.dev/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg
echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.dev/stripe-cli-debian-local stable main" | sudo tee -a /etc/apt/sources.list.d/stripe.list
sudo apt update
sudo apt install stripe
```

**No Windows:**

```powershell
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe
```

### Passo 2: Fazer Login no Stripe CLI

```bash
stripe login
```

Isso abrirá seu navegador para autorizar o CLI. Clique em "Allow access".

### Passo 3: Encaminhar Webhooks para Localhost

Em um terminal separado, rode:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Você verá uma saída assim:

```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxxx (^C to quit)
```

**IMPORTANTE**: Copie este novo webhook secret e atualize no seu `.env.local`:

```bash
STRIPE_WEBHOOK_SECRET=whsec_O_NOVO_SECRET_AQUI
```

### Passo 4: Iniciar o Servidor de Desenvolvimento

Em outro terminal:

```bash
cd /Users/benitoxavier/Documents/work/mainnet/aibe
pnpm dev
```

---

## Parte 4: Testar o Fluxo Completo

### Passo 1: Criar uma Conta de Teste

1. Acesse `http://localhost:3000/create-account`
2. Crie uma conta de teste:
   ```
   Email: teste@example.com
   Senha: 123456789
   ```

### Passo 2: Ir para a Página de Membership

1. Acesse `http://localhost:3000/membership`
2. Você deve ver 3 planos: Free, Premium, Founders

### Passo 3: Tentar Assinar o Plano Premium

1. Clique em **"Assinar Agora"** no card Premium
2. Você será redirecionado para o Stripe Checkout
3. Use um cartão de teste:
   ```
   Número do cartão: 4242 4242 4242 4242
   Data de validade: 12/34 (qualquer data futura)
   CVC: 123
   CEP: 12345-678
   ```
4. Preencha o restante dos dados e clique em **"Subscribe"**

### Passo 4: Verificar no Terminal do Stripe CLI

No terminal onde o `stripe listen` está rodando, você deve ver:

```
2025-11-19 10:30:15   --> checkout.session.completed [evt_xxxxx]
2025-11-19 10:30:16   <-- [200] POST http://localhost:3000/api/stripe/webhook [evt_xxxxx]
```

Isso significa que o webhook foi recebido e processado com sucesso!

### Passo 5: Verificar o Acesso

1. Você será redirecionado para `/account?success=true`
2. Acesse o Payload Admin: `http://localhost:3000/admin`
3. Vá em **Collections** → **Users**
4. Encontre o usuário de teste
5. Verifique que os campos foram atualizados:
   ```
   subscriptionPlan: premium
   subscriptionStatus: active
   stripeCustomerId: cus_xxxxx
   stripeSubscriptionId: sub_xxxxx
   subscriptionCurrentPeriodEnd: [data futura]
   ```

### Passo 6: Testar Acesso a Post Premium

1. Crie um post de teste no admin
2. Configure `accessLevel: premium`
3. Tente acessar o post:
   - **Logado com assinatura**: Vê o conteúdo completo ✅
   - **Não logado ou sem assinatura**: Vê o paywall ✅

### Passo 7: Testar Portal de Cobrança

1. Vá para `/account`
2. Clique em **"Gerenciar Assinatura"**
3. Você será redirecionado para o Stripe Customer Portal
4. Teste:
   - Ver faturas
   - Atualizar cartão
   - Cancelar assinatura

---

## Cartões de Teste do Stripe

### Sucesso:

```
4242 4242 4242 4242 - Aprovado sempre
```

### Falha:

```
4000 0000 0000 0002 - Cartão recusado
4000 0000 0000 9995 - Fundos insuficientes
```

### 3D Secure (Autenticação):

```
4000 0025 0000 3155 - Requer autenticação
```

### Testes Específicos:

```
4000 0000 0000 0077 - Cartão expirado
4000 0000 0000 0127 - CVC incorreto
4000 0000 0000 0119 - Falha de processamento
```

---

## Comandos Úteis do Stripe CLI

### Visualizar Eventos em Tempo Real:

```bash
stripe listen
```

### Visualizar Logs:

```bash
stripe logs tail
```

### Disparar Evento Manualmente:

```bash
stripe trigger checkout.session.completed
stripe trigger invoice.payment_failed
```

### Ver Lista de Clientes:

```bash
stripe customers list
```

### Ver Lista de Assinaturas:

```bash
stripe subscriptions list
```

### Cancelar Assinatura:

```bash
stripe subscriptions cancel sub_xxxxx
```

---

## Eventos Não Tratados (Normal)

Você pode ver logs como:

```
Evento não tratado: customer.created
```

Isso é **normal e esperado**. Nosso webhook processa apenas os eventos essenciais:

- `checkout.session.completed`
- `customer.subscription.created/updated/deleted`
- `invoice.payment_failed/succeeded`

Outros eventos do Stripe são ignorados porque não precisamos processá-los para o funcionamento do sistema de assinaturas.

## Checklist Final

Antes de testar, certifique-se de que:

- ✅ Conta no Stripe criada (Test Mode ativado)
- ✅ **Nome do negócio configurado** (Settings → Account details)
- ✅ API Keys copiadas e configuradas no `.env.local`
- ✅ Produtos Premium e Founders criados
- ✅ Price IDs copiados e configurados
- ✅ Webhook configurado no Dashboard
- ✅ Stripe CLI instalado e logado
- ✅ `stripe listen` rodando em um terminal
- ✅ Webhook Secret do CLI copiado para `.env.local`
- ✅ `pnpm dev` rodando em outro terminal
- ✅ Conta de teste criada no app

---

## Troubleshooting

### Erro: "In order to use Checkout, you must set an account or business name"

**Causa**: Você não configurou o nome do negócio no Stripe.

**Solução**:

1. Vá em Settings → Account details no Stripe Dashboard
2. Preencha "Business name" e "Support email"
3. Clique em Save
4. Tente criar o checkout novamente

### Erro: "Webhook signature verification failed"

**Solução**: Verifique se o `STRIPE_WEBHOOK_SECRET` no `.env.local` está correto (deve ser o do `stripe listen`).

### Erro: "Invalid price ID"

**Solução**: Confirme que os Price IDs no `.env.local` estão corretos e começam com `price_`.

### Webhook não está sendo recebido:

**Solução**:

- Certifique-se de que `stripe listen` está rodando
- Verifique se a porta 3000 está correta
- Reinicie o `stripe listen`

### Pagamento aprovado mas usuário não foi atualizado:

**Solução**:

- Verifique os logs do terminal onde o Next.js está rodando
- Verifique os logs do `stripe listen`
- Confirme que o webhook foi processado (status 200)

### Erro ao acessar Customer Portal:

**Solução**:

- Verifique se configurou o Customer Portal no Dashboard
- Confirme que o usuário tem `stripeCustomerId`

---

## Próximo Passo: Deploy em Produção

Quando estiver pronto para produção:

1. **Desative Test Mode** no Stripe Dashboard
2. Copie as novas chaves **Live** (começam com `sk_live_` e `pk_live_`)
3. Crie os produtos novamente no **Live Mode**
4. Configure o webhook apontando para sua URL de produção:
   ```
   https://seudominio.com/api/stripe/webhook
   ```
5. Copie o novo Webhook Secret do **Live Mode**
6. Atualize as variáveis de ambiente no Vercel/seu host
7. Teste novamente com cartões reais

---

**Tudo pronto!** 🎉 Agora você tem um sistema de pagamentos completo funcionando localmente.
