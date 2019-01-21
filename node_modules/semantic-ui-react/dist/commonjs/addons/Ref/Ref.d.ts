import * as React from 'react'

export interface RefProps extends StrictRefProps {
  [key: string]: any
}

export interface StrictRefProps {
  /** Primary content. */
  children?: React.ReactNode

  /**
   * Called when componentDidMount.
   *
   * @param {HTMLElement} node - Referred node.
   */
  innerRef?: React.Ref<any>
}

declare class Ref extends React.Component<RefProps, {}> {}

export default Ref
