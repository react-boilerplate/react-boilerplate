## Dropdown TODO 
Animations are not yet supported

Ideally we'd reuse CSS animations baked into Semantic UI.
This requires dynamic classNames on the dropdown and the menu as well as a dynamic style for the menu transition duration.
This state based implementation should be generalized using ReactTransitionGroup hooks (or similar) and used for all components.

```jsx
state = {
  dropdownAnimationClasses: '',
  menuAnimationClasses: 'hidden',
}

open = () => {
  if (this.state.isOpen) return
  // animation prep
  this.setState({
    isOpen: true,
    menuStyle: {
      animationDuration: '200ms',
      display: 'block !important',
    },
  })
  // animation start
  setTimeout(() => this.setState({
    dropdownAnimationClasses: 'active',
    menuAnimationClasses: 'visible animating slide down in',
  }), 0)
  // animation end
  setTimeout(() => this.setState({
    dropdownAnimationClasses: 'active visible',
    menuAnimationClasses: 'visible',
    menuStyle: {
      animationDuration: null,
    },
  }), 200)
}

close = () => {
  if (!this.state.isOpen) return
  // animation prep
  this.setState({
    isOpen: false,
    menuStyle: {
      animationDuration: '200ms',
    },
  })
  // animation start
  setTimeout(() => this.setState({
    dropdownAnimationClasses: 'visible',
    menuAnimationClasses: 'visible animating slide down out',
  }), 0)
  // animation end
  setTimeout(() => this.setState({
    dropdownAnimationClasses: '',
    menuAnimationClasses: 'hidden',
    menuStyle: {
      display: null,
      animationDuration: null,
    },
  }), 200)
```
