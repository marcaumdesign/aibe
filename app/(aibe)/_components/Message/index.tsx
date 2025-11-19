import React from 'react'

// import classes from './index.module.scss'

export const Message: React.FC<{
  className?: string
  error?: React.ReactNode
  message?: React.ReactNode
  success?: React.ReactNode
  warning?: React.ReactNode
}> = ({ className, error, message, success, warning }) => {
  const messageToRender = message || error || success || warning

  if (messageToRender) {
    return (
      <div
        className={[
          // classes.message,
          className,
          error && 'error',
          success && 'success',
          warning && 'warning',
          !error && !success && !warning && 'default',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {messageToRender}
      </div>
    )
  }
  return null
}
