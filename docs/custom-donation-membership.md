# Sistema de Doação Customizada para Membership

## Visão Geral

O sistema permite que os usuários definam seu próprio valor de doação (mínimo €2.00) ao se registrarem, que será usado como pagamento único para se tornarem membros da AIBE.

## Como Funciona

### 1. Registro do Usuário

Ao criar uma conta em `/create-account`, o usuário:
- Preenche os campos tradicionais (nome, email, etc.)
- Define o valor da doação (mínimo €2.00, sem máximo)
- O valor é salvo no campo `donationAmount` do usuário

### 2. Pagamento

Quando o usuário acessa `/membership` e clica para se tornar membro:
- O sistema cria uma sessão de checkout do Stripe
- Usa o valor de `donationAmount` do usuário como preço
- É um **pagamento único** (não recorrente)
- A membership é válida até **31 de dezembro do ano atual**

### 3. Confirmação do Pagamento

Após o pagamento bem-sucedido:
- O webhook do Stripe recebe o evento `checkout.session.completed`
- O sistema atualiza o usuário:
  - `subscriptionPlan: 'premium'`
  - `subscriptionStatus: 'active'`
  - `subscriptionCurrentPeriodEnd: '31/12/YYYY'`

### 4. Expiração Automática

Um job cron roda diariamente à meia-noite para:
- Verificar memberships com data de expiração passada
- Atualizar o status para `free` e `canceled`
- Processo automático via Vercel Cron

## Configuração Técnica

### Campos Adicionados

#### Collection `users`:
```typescript
{
  name: 'donationAmount',
  type: 'number',
  required: true,
  label: 'Membership Donation Amount (€)',
  min: 2,
}
```

### Endpoints Modificados

#### POST `/api/stripe/create-checkout-session`
- Não requer mais `priceId` no body
- Usa `user.donationAmount` para criar o checkout
- Modo: `payment` (one-time) ao invés de `subscription`
- Adiciona `membershipExpirationDate` nos metadados

#### POST `/api/stripe/webhook`
- Atualizado para processar pagamentos únicos
- Processa `checkout.session.completed` com modo `payment`
- Define data de expiração automática para 31/12 do ano atual

### Cron Job

#### GET `/api/jobs/expire-memberships`
- Executado diariamente via Vercel Cron
- Busca memberships expiradas
- Atualiza status para `free` e `canceled`
- Requer header `Authorization: Bearer ${CRON_SECRET}`

### Configuração do Vercel

#### `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/jobs/expire-memberships",
      "schedule": "0 0 * * *"
    }
  ]
}
```

#### Variáveis de Ambiente:
- `CRON_SECRET`: Secret para autenticar chamadas do cron job

## Fluxo de Renovação

Como a membership expira em 31 de dezembro:
1. O usuário é notificado próximo à data de expiração (implementar notificações)
2. O usuário pode atualizar seu `donationAmount` se desejar
3. O usuário volta para `/membership` e faz novo pagamento
4. Nova membership válida até 31/12 do novo ano

## Vantagens deste Modelo

1. **Flexibilidade**: Usuários escolhem quanto doar
2. **Simplicidade**: Pagamento único, não recorrente
3. **Transparência**: Data de expiração clara (31/12)
4. **Controle**: Usuários decidem se renovam anualmente

## Melhorias Futuras

1. [ ] Sistema de notificações por email próximo à expiração
2. [ ] Página de renovação dedicada
3. [ ] Histórico de doações na página de conta
4. [ ] Certificado de doação/membership para download
5. [ ] Opção de renovação automática (opcional)

## Testes

### Testar Localmente

1. Registrar novo usuário com valor de doação
2. Fazer checkout e pagar (usar Stripe test mode)
3. Verificar webhook recebido corretamente
4. Confirmar membership ativa até 31/12
5. Testar job de expiração manualmente:
   ```bash
   curl -H "Authorization: Bearer YOUR_CRON_SECRET" \
        http://localhost:3000/api/jobs/expire-memberships
   ```

### Testar em Produção

1. Configure o Stripe em modo live
2. Configure o webhook em produção
3. Configure o Vercel Cron
4. Teste com valor mínimo (€2.00)
5. Monitore logs do webhook e cron job

