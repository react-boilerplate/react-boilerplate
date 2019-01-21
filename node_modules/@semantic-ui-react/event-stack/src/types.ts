export type EventListeners = CallableEventListener[]

export type CallableEventListener = EventListener & {
  called?: boolean
}

export type InputEventListener = EventListener | EventListener[]

export type InputTargetElement = boolean | string | TargetElement

export type TargetElement = Document | HTMLElement | Window

export type GenericMap<T> = Map<String, T>

export type Options = {
  pool?: string
  target?: InputTargetElement
}
