import React from 'react'

function MockLink({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
  return <a href={href} {...rest}>{children}</a>
}

MockLink.displayName = 'MockLink'

export default MockLink
