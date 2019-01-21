let components = {}

export const track = (component, modules, index = 0) => {
  let id = modules.join('-')
  if (index) id += `-${index}`
  if (components[id]) {
    return track(component, modules, index + 1)
  }
  components[id] = component
  return id
}

export const get = id => components[id]
export const getAll = () => ({ ...components })
export const reset = () => {
  components = {}
}
