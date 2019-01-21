/* eslint-disable react/sort-comp */
import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { LOADABLE } from './constants'
import resolveModuleDefault from './utils/resolveModuleDefault'
import * as componentTracker from './componentTracker'

const EmptyComponent = () => null

function loadable(
  getComponent,
  {
    ErrorComponent = EmptyComponent,
    LoadingComponent = EmptyComponent,
    render,
    modules,
    asyncMode,
  } = {},
) {
  class LoadableComponent extends React.Component {
    static Component = null

    static loadingPromise = null

    static load() {
      if (!LoadableComponent.loadingPromise) {
        LoadableComponent.loadingPromise = getComponent()
          .then(module => {
            const Component = resolveModuleDefault(module)
            LoadableComponent.Component = Component
            hoistNonReactStatics(LoadableComponent, Component, {
              Component: true,
              loadingPromise: true,
              load: true,
              [LOADABLE]: true,
              componentId: true,
            })
            return Component
          })
          .catch(error => {
            LoadableComponent.loadingPromise = null
            throw error
          })
      }

      return LoadableComponent.loadingPromise
    }

    constructor(props) {
      super(props)
      this.state = {
        Component: LoadableComponent.Component,
        error: null,
        loading: !LoadableComponent.Component,
      }
      this.mounted = false
      this.loadingPromise = null

      if (
        typeof window !== 'undefined' &&
        this.state.Component === null &&
        this.loadingPromise === null
      ) {
        this.loadingPromise = LoadableComponent.load()
          .then(Component => {
            this.safeSetState({ Component, loading: false })
          })
          .catch(error => {
            this.safeSetState({ error, loading: false })
          })
      }
    }

    componentDidMount() {
      this.mounted = true
    }

    componentWillUnmount() {
      this.mounted = false
    }

    safeSetState(state) {
      if (!this.mounted) return
      this.setState(state)
    }

    render() {
      const { Component, error } = this.state

      if (typeof render === 'function') {
        return render({
          ...this.state,
          ownProps: this.props,
        })
      }

      if (Component !== null) {
        return <Component {...this.props} />
      }

      if (error !== null) {
        return <ErrorComponent error={error} ownProps={this.props} />
      }

      if (asyncMode) {
        throw this.loadingPromise
      }

      return <LoadingComponent {...this.props} />
    }
  }

  LoadableComponent[LOADABLE] = () => LoadableComponent

  if (modules) {
    const id = componentTracker.track(LoadableComponent, modules)
    LoadableComponent.componentId = id
  }

  return LoadableComponent
}

export default loadable
