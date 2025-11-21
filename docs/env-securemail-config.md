# Configuração de Variáveis de Ambiente - SecureMail.pro

## 📧 Configuração do Email (SecureMail.pro)

### Passo 1: Criar o arquivo `.env.local`

Na raiz do projeto `/Users/marcusdutra/Documents/GitHub/aibe/`, crie um arquivo chamado `.env.local` com o seguinte conteúdo:

```env
# ==========================================
# CONFIGURAÇÃO DE EMAIL - SECUREMAIL.PRO
# ==========================================

# POSTA IN USCITA (Servidor de envio SMTP)
SMTP_HOST=authsmtp.securemail.pro
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=aibe@aibe.website
SMTP_PASS=COLOQUE_SUA_SENHA_AQUI

# Informações do remetente
EMAIL_FROM_NAME=AIBE
EMAIL_FROM_ADDRESS=aibe@aibe.website

# ==========================================
# BANCO DE DADOS
# ==========================================
POSTGRES_URL=sua_url_do_postgres_aqui

# ==========================================
# ARMAZENAMENTO (Vercel Blob)
# ==========================================
BLOB_READ_WRITE_TOKEN=seu_token_aqui

# ==========================================
# PAYLOAD CMS
# ==========================================
PAYLOAD_SECRET=seu_secret_muito_seguro_aqui

# ==========================================
# APLICAÇÃO
# ==========================================
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# ==========================================
# STRIPE (Pagamentos)
# ==========================================
STRIPE_SECRET_KEY=sk_test_seu_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_seu_stripe_public_key
STRIPE_WEBHOOK_SECRET=whsec_seu_webhook_secret

# ==========================================
# CRON/JOBS
# ==========================================
CRON_SECRET=seu_cron_secret_aqui
```

### Passo 2: Preencher a senha

Substitua `COLOQUE_SUA_SENHA_AQUI` pela senha que você escolheu na **Area Clienti** do SecureMail.pro para a ativação do email `aibe@aibe.website`.

### Passo 3: Reiniciar o servidor

Após criar/atualizar o arquivo `.env.local`, reinicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
pnpm dev
```

## 📝 Detalhes Técnicos

### Configurações do SecureMail.pro

#### POSTA IN USCITA (Envio de emails - SMTP)

- **Servidor:** `authsmtp.securemail.pro`
- **Porta:** `465`
- **Segurança:** SSL/TLS (Secure: true)
- **Username:** `aibe@aibe.website`
- **Password:** A senha definida na Area Clienti

#### POSTA IN ENTRATA (Recebimento de emails - POP3)

- **Servidor:** `pop.securemail.pro`
- **Porta:** `993`
- **Username:** `aibe@aibe.website`
- **Password:** Mesma senha da Area Clienti

> **Nota:** Para o Payload CMS, só precisamos das configurações de SMTP (envio). As configurações POP3 são apenas para informação caso você queira configurar um cliente de email para receber mensagens.

## ✅ Como Testar

1. Certifique-se de que o arquivo `.env.local` está criado e a senha está correta
2. Reinicie o servidor (`pnpm dev`)
3. Acesse: `http://localhost:3000/recover-password`
4. Digite um email válido de teste
5. Clique em "Recover Password"
6. Verifique se o email foi enviado

## 🔒 Segurança

- **NUNCA** faça commit do arquivo `.env.local` no Git
- O arquivo `.env.local` já está no `.gitignore` por padrão
- Mantenha suas credenciais seguras
- Use senhas fortes para a conta de email

## ❓ Problemas Comuns

### "Email attempted without being configured"

- Verifique se todas as variáveis SMTP\_\* estão preenchidas
- Reinicie o servidor após criar/modificar o `.env.local`

### "Invalid login" ou "Authentication failed"

- Verifique se a senha está correta
- Certifique-se de que está usando a senha da Area Clienti do SecureMail.pro
- Tente fazer login manualmente no webmail para confirmar a senha

### Email não chega

- Verifique a pasta de spam
- Confirme que o email `aibe@aibe.website` está ativo e funcionando
- Teste enviando um email manualmente deste endereço

## 📞 Suporte

Se precisar de ajuda com as credenciais do SecureMail.pro:

- Acesse a Area Clienti onde você configurou o email
- Entre em contato com o suporte do seu provedor de email
