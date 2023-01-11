import React from 'react'

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    loading?: boolean,
    disable?: boolean,
    text: string,
}

const Button: React.FC<ButtonProps> = ({loading, disable, text, ...rest}) => {
  return (
    <button {...rest} className={`btn btn-primary btn-block ${loading && `btn-disabled loading`}`}>
      {text}
    </button>
  )
}

export default Button