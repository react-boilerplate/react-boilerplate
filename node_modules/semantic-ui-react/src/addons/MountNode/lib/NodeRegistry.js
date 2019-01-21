export default class NodeRegistry {
  constructor() {
    this.nodes = new Map()
  }

  add = (node, component) => {
    if (this.nodes.has(node)) {
      const set = this.nodes.get(node)

      set.add(component)
      return
    }

    this.nodes.set(node, new Set([component]))
  }

  del = (node, component) => {
    if (!this.nodes.has(node)) return

    const set = this.nodes.get(node)

    if (set.size === 1) {
      this.nodes.delete(node)
      return
    }

    set.delete(component)
  }

  emit = (node, callback) => {
    callback(node, this.nodes.get(node))
  }
}
