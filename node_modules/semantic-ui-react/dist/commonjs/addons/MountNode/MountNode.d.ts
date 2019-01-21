import * as React from 'react'

export interface MountNodeProps extends StrictMountNodeProps {
  [key: string]: any
}

export interface StrictMountNodeProps {
  /** Additional classes. */
  className?: string

  /** The DOM node where we will apply class names. Defaults to document.body. */
  node?: HTMLElement
}

declare class MountNode extends React.Component<MountNodeProps, {}> {}

export default MountNode
