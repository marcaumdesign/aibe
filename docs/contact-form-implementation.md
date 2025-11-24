# Implementação do Formulário de Contato

## 📧 Visão Geral

O formulário de contato foi implementado com envio automático de emails para **aibe@aibe.website** sempre que um visitante preencher o formulário.

## 🔧 O que foi implementado

### 1. API Route (`app/api/contact/route.ts`)

Uma API route foi criada para processar o envio de emails:

- **Endpoint:** `POST /api/contact`
- **Validação:** Valida campos obrigatórios (firstName, lastName, email, message)
- **Email:** Envia email formatado em HTML para aibe@aibe.website
- **Resposta:** Retorna sucesso ou erro apropriado

### 2. Formulário de Contato Atualizado (`app/(aibe)/contact/page.tsx`)

O formulário foi atualizado com:

- **Validação no frontend:** Valida campos obrigatórios, formato de email e política de privacidade
- **Estado de loading:** Mostra "Sending..." enquanto envia
- **Notificações:** Usa o sistema de notificações do projeto para feedback visual
- **Reset automático:** Limpa o formulário após envio bem-sucedido

## 📋 Campos do Formulário

### Obrigatórios
- **First Name** (Nome)
- **Last Name** (Sobrenome)
- **Email**
- **Message** (Mensagem)
- **Privacy Policy** (Checkbox - deve ser marcado)

### Opcionais
- **Phone Number** (Telefone)

## 📨 Formato do Email

O email enviado para **aibe@aibe.website** contém:

### Assunto
```
New Contact Form Submission - [Nome] [Sobrenome]
```

### Conteúdo
- Nome completo do remetente
- Email (com link clicável)
- Telefone (se fornecido, com link clicável)
- Mensagem completa

O email é formatado em HTML com design profissional incluindo:
- Header com gradiente
- Informações organizadas em cards
- Mensagem destacada em caixa azul
- Footer com informações da AIBE

## ✅ Validações Implementadas

### Frontend (antes de enviar)
1. **Campos obrigatórios:** Verifica se firstName, lastName, email e message estão preenchidos
2. **Formato de email:** Valida se o email tem formato válido (regex)
3. **Política de privacidade:** Verifica se o checkbox foi marcado
4. **Feedback visual:** Mostra notificação de erro se algo estiver inválido

### Backend (na API)
1. **Campos obrigatórios:** Valida novamente no servidor
2. **Resposta apropriada:** Retorna status 400 se dados inválidos, 500 se erro no servidor

## 🔔 Notificações ao Usuário

O sistema mostra notificações para:

### Sucesso ✅
- **Título:** "Message Sent!"
- **Descrição:** "Thank you for contacting us. We will get back to you soon."
- **Ação:** Formulário é resetado

### Erros ❌
- Campos obrigatórios faltando
- Email inválido
- Política de privacidade não aceita
- Erro ao enviar (servidor)

## 🛠️ Configuração Necessária

### Variáveis de Ambiente (já configuradas)

O projeto já está configurado com Nodemailer via Payload CMS. As variáveis necessárias em `.env.local`:

```env
# Email Configuration - SecureMail.pro
SMTP_HOST=authsmtp.securemail.pro
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=aibe@aibe.website
SMTP_PASS=sua_senha_aqui
EMAIL_FROM_NAME=AIBE
EMAIL_FROM_ADDRESS=aibe@aibe.website
```

**⚠️ Importante:** Certifique-se de que a senha do email está corretamente configurada no `.env.local`

## 🧪 Como Testar

### 1. Verificar configuração de email
```bash
# As variáveis de ambiente devem estar configuradas
cat .env.local | grep SMTP
```

### 2. Testar o formulário

1. Acesse: `http://localhost:3000/contact`
2. Preencha todos os campos obrigatórios
3. Marque a checkbox de política de privacidade
4. Clique em "Send Message"
5. Aguarde a notificação de sucesso
6. Verifique a caixa de entrada de **aibe@aibe.website**

### 3. Testar validações

Tente enviar o formulário:
- Sem preencher campos obrigatórios
- Com email inválido (ex: "teste")
- Sem marcar a política de privacidade

Você deve ver notificações de erro apropriadas.

## 📊 Logs

O sistema registra logs no console:

### Sucesso
```
✅ Contact form email sent to aibe@aibe.website from: [Nome] [Sobrenome] ([email])
```

### Erro
```
❌ Failed to send contact form email: [error details]
```

## 🔍 Troubleshooting

### Email não está sendo enviado

1. **Verifique as variáveis de ambiente:**
   ```bash
   # Certifique-se de que todas as variáveis SMTP estão definidas
   echo $SMTP_HOST
   echo $SMTP_USER
   ```

2. **Verifique os logs do servidor:**
   - Olhe no terminal onde o Next.js está rodando
   - Procure por erros de SMTP ou autenticação

3. **Teste a configuração de email:**
   ```bash
   # Use o script de teste de email
   node scripts/send-test-email.mjs
   ```

4. **Verifique a senha do email:**
   - Acesse a Area Clienti do SecureMail.pro
   - Confirme que a senha está correta
   - Se necessário, redefina a senha

### Notificações não aparecem

1. Verifique se o `NotificationProvider` está configurado no layout
2. Abra o console do navegador e procure por erros
3. Verifique se os estilos estão carregando corretamente

### Formulário não reseta após envio

- Isso só acontece em caso de sucesso
- Verifique se o servidor retornou status 200
- Olhe os logs do navegador para erros

## 🎨 Customização

### Alterar destinatário do email

Edite `app/api/contact/route.ts`:

```typescript
await payload.sendEmail({
  to: 'seu-novo-email@dominio.com', // Altere aqui
  subject: `New Contact Form Submission - ${firstName} ${lastName}`,
  // ...
});
```

### Alterar layout do email

Edite o HTML dentro de `payload.sendEmail()` em `app/api/contact/route.ts`

### Adicionar novos campos ao formulário

1. Adicione o campo no estado `formData`
2. Adicione o input no JSX
3. Adicione o campo no corpo da requisição
4. Atualize a API route para processar o novo campo
5. Adicione o campo no HTML do email

## 📚 Referências

- [Documentação Nodemailer](https://nodemailer.com/)
- [Payload CMS Email Configuration](https://payloadcms.com/docs/email/overview)
- [Configuração de Email - SecureMail.pro](./email-configuration.md)
- [Variáveis de Ambiente](./env-securemail-config.md)

## ✨ Próximos Passos (Opcionais)

- [ ] Adicionar captcha para prevenir spam
- [ ] Salvar submissões no banco de dados
- [ ] Enviar email de confirmação para o usuário
- [ ] Adicionar rate limiting
- [ ] Implementar analytics de conversão
- [ ] Adicionar mais campos personalizados

