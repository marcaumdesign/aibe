import React from 'react'

export function Badge({
  children,
  // variant and size are kept for API consistency but currently only one style is used
  variant: _variant = 'with-dot',
  size: _size = 'medium',
  color = 'gray',
}: {
  children: React.ReactNode
  variant?: 'with-dot'
  size?: 'medium'
  color?: 'gray' | 'white'
}) {
  const dotClasses = color === 'white' 
    ? 'h-1 w-1 rounded-full bg-white mr-2'
    : 'h-1 w-1 rounded-full bg-[#99a0ae] mr-2'
  
  const textClasses = color === 'white'
    ? 'text-text-white-0'
    : 'text-text-soft-400'

    return (
    <span className={`inline-flex items-center font-medium bg-transparent ${textClasses} text-subheading-xs uppercase px-0 py-0`}>
      <div className={dotClasses}></div>
      {children}
    </span>
  )
}
