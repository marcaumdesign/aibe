import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
  type SerializedHeadingNode,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

// Heading inline styles to override any conflicting styles
const headingInlineStyles: Record<string, React.CSSProperties> = {
  h1: { fontSize: '56px', lineHeight: '64px', letterSpacing: '-3.92px', fontWeight: 600 },
  h2: { fontSize: '48px', lineHeight: '56px', letterSpacing: '-3.36px', fontWeight: 600 },
  h3: { fontSize: '2.5rem', lineHeight: '3rem', letterSpacing: '-2.36px', fontWeight: 600 },
  h4: { fontSize: '30px', lineHeight: '34px', letterSpacing: '-1.461px', fontWeight: 600 },
  h5: { fontSize: '24px', lineHeight: '32px', letterSpacing: '-0.96px', fontWeight: 600 },
  h6: { fontSize: '20px', lineHeight: '28px', letterSpacing: '-0.701px', fontWeight: 600 },
}

// Heading color classes
const headingColorClasses: Record<string, string> = {
  h1: 'text-text-strong-950',
  h2: 'text-primary-base',
  h3: 'text-primary-base',
  h4: 'text-primary-base',
  h5: 'text-primary-base',
  h6: 'text-primary-base',
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  // Custom heading converters with inline styles to guarantee override
  heading: ({ node, nodesToJSX }) => {
    const headingNode = node as SerializedHeadingNode
    const tag = headingNode.tag
    const Tag = tag as keyof JSX.IntrinsicElements
    const children = nodesToJSX({ nodes: headingNode.children })

    return (
      <Tag
        className={cn(headingColorClasses[tag] || '', 'mb-4')}
        style={headingInlineStyles[tag]}
      >
        {children}
      </Tag>
    )
  },
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext max-w-full',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
