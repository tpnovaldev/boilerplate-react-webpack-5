import React from 'react'

export const Button = ({ children, ...rest }) => {
  return (
    <>
      <button style={{ marginTop: '24rem' }} {...rest}>{children}</button>
    </>
  )
}
