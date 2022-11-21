import React from 'react'

export const Typography = ({ children, ...rest }) => {
  return (
    <h1 {...rest}>{children}</h1>
  )
}
