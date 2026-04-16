import React from 'react'

function MockImage(props: Record<string, unknown>) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} />
}

MockImage.displayName = 'MockImage'

export default MockImage
