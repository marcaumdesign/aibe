# Passo 2 - Campos de Paywall nos Posts - Implementação Concluída ✅

Este documento descreve o que foi implementado no **Passo 2** do plano de integração do Stripe.

## O que foi implementado

### 1. ✅ Campos de Paywall na Collection Posts

Foram adicionados três novos campos à collection `Posts` (`collections/Posts/index.ts`) em uma nova aba **"Paywall & Acesso"**:

#### Campo `accessLevel`

- **Tipo**: Select (obrigatório)
- **Valor padrão**: `free`
- **Opções**:
  - 🌍 **Free** - Todos podem acessar
  - ⭐ **Premium** - Apenas assinantes Premium e Founders
  - 👑 **Founders** - Apenas assinantes Founders
- **Localização**: Sidebar
- **Acesso**: Todos podem ler, apenas autenticados podem atualizar

```typescript
{
  name: 'accessLevel',
  type: 'select',
  defaultValue: 'free',
  required: true,
  options: ['free', 'premium', 'founders']
}
```

#### Campo `isPremium`

- **Tipo**: Checkbox (readonly)
- **Valor padrão**: `false`
- **Sincronização automática**: Atualizado via hook quando `accessLevel !== 'free'`
- **Localização**: Sidebar
- **Acesso**: Todos podem ler, ninguém pode atualizar manualmente (apenas via hook)
- **Propósito**: Flag rápida para queries e filtros

```typescript
{
  name: 'isPremium',
  type: 'checkbox',
  defaultValue: false,
  hooks: {
    beforeChange: [
      ({ siblingData }) => siblingData.accessLevel !== 'free'
    ]
  }
}
```

#### Campo `previewContent`

- **Tipo**: Rich Text (Lexical editor)
- **Features**: Headings (h2-h4), Blocks (Banner, Code, MediaBlock), Toolbar, HorizontalRule
- **Visibilidade condicional**: Só aparece quando `accessLevel !== 'free'`
- **Opcional**: Não é obrigatório
- **Acesso**: Todos podem ler, apenas autenticados podem atualizar
- **Propósito**: Teaser/preview do conteúdo para usuários sem acesso

```typescript
{
  name: 'previewContent',
  type: 'richText',
  admin: {
    condition: (data) => data.accessLevel !== 'free'
  }
}
```

### 2. ✅ Configuração do Admin

#### Colunas Padrão

Atualizada a visualização da lista de posts no admin para incluir `accessLevel`:

```typescript
admin: {
  defaultColumns: ['title', 'accessLevel', 'slug', 'updatedAt'];
}
```

Agora os editores podem ver rapidamente quais posts são pagos diretamente na listagem.

#### Interface Condicional

- O campo `previewContent` só aparece quando o post é marcado como Premium ou Founders
- Melhora a UX evitando confusão para posts gratuitos

### 3. ✅ Hook de Sincronização Automática

O campo `isPremium` é sincronizado automaticamente via `beforeChange` hook:

```typescript
hooks: {
  beforeChange: [
    ({ siblingData }) => {
      // Sincroniza automaticamente com accessLevel
      return siblingData.accessLevel !== 'free';
    },
  ];
}
```

**Vantagens:**

- Não requer ação manual do editor
- Mantém consistência de dados
- Facilita queries simples (`where: { isPremium: true }`)

### 4. ✅ Interface Temporária Removida

Removida a interface temporária `PostWithAccess` da página de posts:

**Antes:**

```typescript
interface PostWithAccess extends Post {
  accessLevel?: 'free' | 'premium' | 'founders';
  isPremium?: boolean;
  previewContent?: Post['content'];
}
```

**Depois:**

```typescript
// Usando diretamente o tipo Post do Payload (com os novos campos)
const post = await queryPostBySlug({ slug });
```

Os tipos agora são gerados automaticamente pelo Payload quando você roda `pnpm generate:types`.

## Como Usar

### Criando um Post Premium

1. **No Payload Admin**, crie ou edite um post
2. Vá para a aba **"Paywall & Acesso"**
3. Selecione o nível de acesso desejado:
   - **Premium**: Para conteúdo exclusivo de assinantes
   - **Founders**: Para conteúdo VIP
4. **(Opcional)** Adicione um preview/teaser no campo `previewContent`
5. O campo `isPremium` será marcado automaticamente ✅
6. Publique o post

### Verificando Acesso no Frontend

O código já está implementado em `app/(aibe)/posts/[slug]/page.tsx`:

```typescript
// Verificar acesso
const accessCheck = await checkPostAccess({
  accessLevel: post.accessLevel,
  isPremium: post.isPremium,
})

// Renderizar conteúdo ou paywall
{accessCheck.hasAccess ? (
  <RichText data={post.content} />
) : (
  <>
    {post.previewContent && <RichText data={post.previewContent} />}
    <PaywallBanner
      requiredLevel={accessCheck.requiredLevel}
      isLoggedIn={accessCheck.isLoggedIn}
    />
  </>
)}
```

### Queries no Payload

```typescript
// Buscar apenas posts gratuitos
const freePosts = await payload.find({
  collection: 'posts',
  where: {
    accessLevel: { equals: 'free' },
  },
});

// Buscar posts pagos (usando isPremium)
const premiumPosts = await payload.find({
  collection: 'posts',
  where: {
    isPremium: { equals: true },
  },
});

// Buscar posts de um nível específico
const foundersPosts = await payload.find({
  collection: 'posts',
  where: {
    accessLevel: { equals: 'founders' },
  },
});
```

## Validações Implementadas

1. ✅ **Campo obrigatório**: `accessLevel` é sempre necessário (padrão: `free`)
2. ✅ **Sincronização automática**: `isPremium` é atualizado automaticamente
3. ✅ **Visibilidade condicional**: `previewContent` só aparece para posts pagos
4. ✅ **Acesso controlado**: Apenas usuários autenticados podem editar campos de paywall

## Interface do Admin

### Aba "Paywall & Acesso"

A nova aba aparece junto com Content, Meta e SEO, contendo:

1. **Dropdown de Access Level** (sidebar)

   - Visual com emojis para fácil identificação
   - Descrição clara do que cada nível significa

2. **Checkbox isPremium** (sidebar, readonly)

   - Atualizado automaticamente
   - Útil para visualização rápida

3. **Editor de Preview Content** (condicional)
   - Aparece apenas para posts pagos
   - Mesmo editor rico do conteúdo principal
   - Permite criar um teaser atraente

## Próximos Passos

Com o **Passo 2** concluído, estamos prontos para o **Passo 3: Integração com Stripe**.

Isso incluirá:

1. Instalar SDK do Stripe
2. Criar endpoints de API para checkout
3. Implementar webhooks do Stripe
4. Sincronizar assinaturas com usuários
5. Criar página de pricing/membership

## Comando Importante

Após estas mudanças, **você deve rodar**:

```bash
pnpm generate:types
```

Isso irá:

- ✅ Atualizar `payload-types.ts` com os novos campos
- ✅ Habilitar autocomplete no TypeScript
- ✅ Eliminar qualquer erro de tipo restante

## Arquivos Modificados

### Modificados:

- `collections/Posts/index.ts` - Adicionados campos de paywall
- `app/(aibe)/posts/[slug]/page.tsx` - Removida interface temporária

### Nenhum arquivo criado neste passo

(Apenas modificações em arquivos existentes)

## Estrutura de Dados

### Exemplo de Post no Banco de Dados

```json
{
  "id": "123",
  "title": "Como Investir em Startups Brasileiras",
  "slug": "como-investir-em-startups-brasileiras",
  "content": { "root": { ... } },
  "accessLevel": "premium",
  "isPremium": true,
  "previewContent": {
    "root": {
      "children": [
        {
          "type": "paragraph",
          "children": [
            { "text": "Neste artigo exclusivo para assinantes..." }
          ]
        }
      ]
    }
  },
  "publishedAt": "2025-01-15T10:00:00Z",
  "_status": "published"
}
```

## Observações Importantes

1. **Backward Compatibility**: Posts existentes terão `accessLevel: 'free'` por padrão
2. **Preview Opcional**: Não é obrigatório adicionar preview para posts pagos
3. **Hierarquia Mantida**: `free` < `premium` < `founders` (founders acessa tudo)
4. **Admin UX**: Interface clara e intuitiva para editores de conteúdo

---

**Status**: ✅ Passo 2 Concluído  
**Próximo**: 🔄 Passo 3 - Integração com Stripe
