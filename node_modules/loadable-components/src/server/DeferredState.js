/* eslint-disable react/no-danger */
import React from 'react'
import { LOADABLE_STATE } from '../constants'

class DeferredState {
  constructor(tree) {
    this.tree = tree
  }

  getScriptContent() {
    return `window.${LOADABLE_STATE} = ${JSON.stringify(this.tree)};`
  }

  getScriptTag() {
    return `<script>${this.getScriptContent()}</script>`
  }

  getScriptElement() {
    return (
      <script dangerouslySetInnerHTML={{ __html: this.getScriptContent() }} />
    )
  }
}

export default DeferredState
