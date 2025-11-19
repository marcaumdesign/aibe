# Configuração de Email com Payload CMS e Nodemailer

## 1. Instalação

Execute o seguinte comando para instalar as dependências necessárias:

```bash
pnpm add @payloadcms/email-nodemailer nodemailer
pnpm add -D @types/nodemailer
```

## 2. Variáveis de Ambiente

### Para Register.it (Recomendado para seu provedor)

Adicione as seguintes variáveis ao seu arquivo `.env.local`:

```env
# Email Configuration - Register.it
SMTP_HOST=smtp.register.it
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contato@seudominio.com
SMTP_PASS=sua-senha-do-email

# Informações do remetente
EMAIL_FROM_NAME=AIBE
EMAIL_FROM_ADDRESS=contato@seudominio.com
```

**⚠️ Importante para Register.it:**

- Use a porta **465** com `SMTP_SECURE=true`
- O `SMTP_USER` deve ser seu email completo
- O `EMAIL_FROM_ADDRESS` deve ser o mesmo email usado no `SMTP_USER`

### Para outros provedores (exemplo: Gmail)

```env
# Email Configuration (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-ou-app-password

# Informações do remetente
EMAIL_FROM_NAME=AIBE
EMAIL_FROM_ADDRESS=noreply@aibe.com
```

## 3. Provedores de Email Comuns

### Gmail

- **Host:** `smtp.gmail.com`
- **Porta:** `587` (TLS) ou `465` (SSL)
- **Secure:** `false` para porta 587, `true` para porta 465
- **Observação:** Você precisará gerar uma "Senha de App" no Google:
  1. Acesse https://myaccount.google.com/security
  2. Ative a verificação em duas etapas
  3. Vá em "Senhas de app"
  4. Gere uma senha específica para o aplicativo

### Outlook/Hotmail

- **Host:** `smtp-mail.outlook.com`
- **Porta:** `587`
- **Secure:** `false`

### SendGrid

- **Host:** `smtp.sendgrid.net`
- **Porta:** `587`
- **Secure:** `false`
- **User:** `apikey`
- **Pass:** Sua API Key do SendGrid

### Mailgun

- **Host:** `smtp.mailgun.org`
- **Porta:** `587`
- **Secure:** `false`

### Register.it

- **Host:** `smtp.register.it`
- **Porta:** `465`
- **Secure:** `true`
- **User:** Seu email completo (ex: contato@seudominio.com)
- **Pass:** Sua senha do email
- **Website:** https://www.register.it

#### 📍 Como encontrar os dados no Register.it:

1. **Acesse o Painel de Controle:**

   - Faça login em: https://www.register.it
   - Vá para o painel de controle (Manager/Area Clienti)

2. **Encontre a seção de Email:**

   - No menu lateral, procure por "Email" ou "Caselle Email"
   - Clique na sua conta de email configurada

3. **Informações necessárias:**

   - **SMTP_HOST:** `smtp.register.it` (sempre este valor)
   - **SMTP_PORT:** `465` (sempre este valor)
   - **SMTP_SECURE:** `true` (sempre este valor)
   - **SMTP_USER:** Seu endereço de email completo (ex: contato@seudominio.com)
   - **SMTP_PASS:** A senha que você usa para acessar este email

4. **Se não souber a senha do email:**

   - No painel: "Email" → "Caselle Email"
   - Selecione o email
   - Procure "Modifica Password" ou "Reset Password"
   - Defina uma nova senha

5. **Ajuda adicional:**
   - Documentação: https://www.register.it/assistenza/
   - Suporte técnico: suporte@register.it

### Mailtrap (Para desenvolvimento/testes)

- **Host:** `smtp.mailtrap.io`
- **Porta:** `587`
- **Secure:** `false`
- **User:** Seu username do Mailtrap
- **Pass:** Sua senha do Mailtrap
- **Website:** https://mailtrap.io

## 4. Configuração Atual

A configuração já foi adicionada ao `payload.config.ts`:

```typescript
email: nodemailerAdapter({
  defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'noreply@aibe.com',
  defaultFromName: process.env.EMAIL_FROM_NAME || 'AIBE',
  transportOptions: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
}),
```

## 5. Testando a Configuração

Depois de configurar as variáveis de ambiente:

1. Reinicie o servidor de desenvolvimento
2. Acesse a página de recuperação de senha: `http://localhost:3000/recover-password`
3. Digite seu email e clique em "Recover Password"
4. Verifique sua caixa de entrada

## 6. Solução de Problemas

### Erro: "Email attempted without being configured"

- Certifique-se de que todas as variáveis de ambiente estão configuradas
- Verifique se o servidor foi reiniciado após adicionar as variáveis

### Erro: "Invalid login"

- Para Gmail, use uma "Senha de App" em vez da senha normal
- Verifique se o usuário e senha estão corretos

### Erro: "Connection timeout"

- Verifique se o host e a porta estão corretos
- Certifique-se de que seu firewall permite conexões SMTP
- Alguns provedores de internet bloqueiam a porta 25

### Email não chega

- Verifique a pasta de spam
- Verifique se o endereço `EMAIL_FROM_ADDRESS` é válido
- Para produção, use um domínio verificado

## 7. Recomendações de Produção

Para produção, recomendamos usar serviços especializados em envio de emails transacionais:

- **SendGrid** (gratuito até 100 emails/dia)
- **Mailgun** (gratuito até 5.000 emails/mês)
- **Amazon SES** (muito barato, mas requer configuração AWS)
- **Postmark** (focado em emails transacionais)
- **Resend** (moderno e fácil de usar)

Esses serviços garantem melhor entregabilidade e fornecem estatísticas de envio.
