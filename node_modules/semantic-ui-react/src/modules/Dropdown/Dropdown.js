import cx from 'classnames'
import keyboardKey from 'keyboard-key'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Children, cloneElement } from 'react'
import shallowEqual from 'shallowequal'

import {
  AutoControlledComponent as Component,
  childrenUtils,
  customPropTypes,
  doesNodeContainClick,
  eventStack,
  getElementType,
  getUnhandledProps,
  makeDebugger,
  objectDiff,
  useKeyOnly,
  useKeyOrValueAndKey,
} from '../../lib'
import Icon from '../../elements/Icon'
import Label from '../../elements/Label'
import DropdownDivider from './DropdownDivider'
import DropdownItem from './DropdownItem'
import DropdownHeader from './DropdownHeader'
import DropdownMenu from './DropdownMenu'
import DropdownSearchInput from './DropdownSearchInput'

const debug = makeDebugger('dropdown')

const getKeyOrValue = (key, value) => (_.isNil(key) ? value : key)

/**
 * A dropdown allows a user to select a value from a series of options.
 * @see Form
 * @see Select
 * @see Menu
 */
export default class Dropdown extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Label prefixed to an option added by a user. */
    additionLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),

    /** Position of the `Add: ...` option in the dropdown list ('top' or 'bottom'). */
    additionPosition: PropTypes.oneOf(['top', 'bottom']),

    /**
     * Allow user additions to the list of options (boolean).
     * Requires the use of `selection`, `options` and `search`.
     */
    allowAdditions: customPropTypes.every([
      customPropTypes.demand(['options', 'selection', 'search']),
      PropTypes.bool,
    ]),

    /** A Dropdown can reduce its complexity. */
    basic: PropTypes.bool,

    /** Format the Dropdown to appear as a button. */
    button: PropTypes.bool,

    /** Primary content. */
    children: customPropTypes.every([
      customPropTypes.disallow(['options', 'selection']),
      customPropTypes.givenProps(
        { children: PropTypes.any.isRequired },
        PropTypes.element.isRequired,
      ),
    ]),

    /** Additional classes. */
    className: PropTypes.string,

    /** Using the clearable setting will let users remove their selection from a dropdown. */
    clearable: PropTypes.bool,

    /** Whether or not the menu should close when the dropdown is blurred. */
    closeOnBlur: PropTypes.bool,

    /**
     * Whether or not the menu should close when a value is selected from the dropdown.
     * By default, multiple selection dropdowns will remain open on change, while single
     * selection dropdowns will close on change.
     */
    closeOnChange: PropTypes.bool,

    /** A compact dropdown has no minimum width. */
    compact: PropTypes.bool,

    /** Whether or not the dropdown should strip diacritics in options and input search */
    deburr: PropTypes.bool,

    /** Initial value of open. */
    defaultOpen: PropTypes.bool,

    /** Initial value of searchQuery. */
    defaultSearchQuery: PropTypes.string,

    /** Currently selected label in multi-select. */
    defaultSelectedLabel: customPropTypes.every([
      customPropTypes.demand(['multiple']),
      PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ]),

    /** Initial value of upward. */
    defaultUpward: PropTypes.bool,

    /** Initial value or value array if multiple. */
    defaultValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])),
    ]),

    /** A dropdown menu can open to the left or to the right. */
    direction: PropTypes.oneOf(['left', 'right']),

    /** A disabled dropdown menu or item does not allow user interaction. */
    disabled: PropTypes.bool,

    /** An errored dropdown can alert a user to a problem. */
    error: PropTypes.bool,

    /** A dropdown menu can contain floated content. */
    floating: PropTypes.bool,

    /** A dropdown can take the full width of its parent */
    fluid: PropTypes.bool,

    /** A dropdown menu can contain a header. */
    header: PropTypes.node,

    /** Shorthand for Icon. */
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),

    /** A dropdown can be formatted to appear inline in other content. */
    inline: PropTypes.bool,

    /** A dropdown can be formatted as a Menu item. */
    item: PropTypes.bool,

    /** A dropdown can be labeled. */
    labeled: PropTypes.bool,

    /** A dropdown can defer rendering its options until it is open. */
    lazyLoad: PropTypes.bool,

    /** A dropdown can show that it is currently loading data. */
    loading: PropTypes.bool,

    /** The minimum characters for a search to begin showing results. */
    minCharacters: PropTypes.number,

    /** A selection dropdown can allow multiple selections. */
    multiple: PropTypes.bool,

    /** Message to display when there are no results. */
    noResultsMessage: PropTypes.node,

    /**
     * Called when a user adds a new item. Use this to update the options list.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and the new item's value.
     */
    onAddItem: PropTypes.func,

    /**
     * Called on blur.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onBlur: PropTypes.func,

    /**
     * Called when the user attempts to change the value.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onChange: PropTypes.func,

    /**
     * Called on click.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /**
     * Called when a close event happens.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClose: PropTypes.func,

    /**
     * Called on focus.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onFocus: PropTypes.func,

    /**
     * Called when a multi-select label is clicked.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All label props.
     */
    onLabelClick: PropTypes.func,

    /**
     * Called on mousedown.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onMouseDown: PropTypes.func,

    /**
     * Called when an open event happens.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onOpen: PropTypes.func,

    /**
     * Called on search input change.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props, includes current value of searchQuery.
     */
    onSearchChange: PropTypes.func,

    /** Controls whether or not the dropdown menu is displayed. */
    open: PropTypes.bool,

    /** Whether or not the menu should open when the dropdown is focused. */
    openOnFocus: PropTypes.bool,

    /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
    options: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.arrayOf(PropTypes.shape(DropdownItem.propTypes)),
    ]),

    /** Placeholder text. */
    placeholder: PropTypes.string,

    /** A dropdown can be formatted so that its menu is pointing. */
    pointing: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf([
        'left',
        'right',
        'top',
        'top left',
        'top right',
        'bottom',
        'bottom left',
        'bottom right',
      ]),
    ]),

    /**
     * Mapped over the active items and returns shorthand for the active item Labels.
     * Only applies to `multiple` Dropdowns.
     *
     * @param {object} item - A currently active dropdown item.
     * @param {number} index - The current index.
     * @param {object} defaultLabelProps - The default props for an active item Label.
     * @returns {*} Shorthand for a Label.
     */
    renderLabel: PropTypes.func,

    /** A dropdown can have its menu scroll. */
    scrolling: PropTypes.bool,

    /**
     * A selection dropdown can allow a user to search through a large list of choices.
     * Pass a function here to replace the default search.
     */
    search: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),

    /** A shorthand for a search input. */
    searchInput: PropTypes.oneOfType([PropTypes.array, PropTypes.node, PropTypes.object]),

    /** Current value of searchQuery. Creates a controlled component. */
    searchQuery: PropTypes.string,

    // TODO 'searchInMenu' or 'search='in menu' or ???  How to handle this markup and functionality?

    /** Define whether the highlighted item should be selected on blur. */
    selectOnBlur: PropTypes.bool,

    /**
     * Whether or not to change the value when navigating the menu using arrow keys.
     * Setting to false will require enter or left click to confirm a choice.
     */
    selectOnNavigation: PropTypes.bool,

    /** Currently selected label in multi-select. */
    selectedLabel: customPropTypes.every([
      customPropTypes.demand(['multiple']),
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ]),

    /** A dropdown can be used to select between choices in a form. */
    selection: customPropTypes.every([
      customPropTypes.disallow(['children']),
      customPropTypes.demand(['options']),
      PropTypes.bool,
    ]),

    /** A simple dropdown can open without Javascript. */
    simple: PropTypes.bool,

    /** A dropdown can receive focus. */
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** The text displayed in the dropdown, usually for the active item. */
    text: PropTypes.string,

    /** Custom element to trigger the menu to become visible. Takes place of 'text'. */
    trigger: customPropTypes.every([
      customPropTypes.disallow(['selection', 'text']),
      PropTypes.node,
    ]),

    /** Current value or value array if multiple. Creates a controlled component. */
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number])),
    ]),

    /** Controls whether the dropdown will open upward. */
    upward: PropTypes.bool,

    /**
     * A dropdown will go to the last element when ArrowUp is pressed on the first,
     * or go to the first when ArrowDown is pressed on the last( aka infinite selection )
     */
    wrapSelection: PropTypes.bool,
  }

  static defaultProps = {
    additionLabel: 'Add ',
    additionPosition: 'top',
    closeOnBlur: true,
    deburr: false,
    icon: 'dropdown',
    minCharacters: 1,
    noResultsMessage: 'No results found.',
    openOnFocus: true,
    renderLabel: ({ text }) => text,
    searchInput: 'text',
    selectOnBlur: true,
    selectOnNavigation: true,
    wrapSelection: true,
  }

  static autoControlledProps = ['open', 'searchQuery', 'selectedLabel', 'value', 'upward']

  static Divider = DropdownDivider
  static Header = DropdownHeader
  static Item = DropdownItem
  static Menu = DropdownMenu
  static SearchInput = DropdownSearchInput

  getInitialAutoControlledState() {
    return { searchQuery: '' }
  }

  componentWillMount() {
    debug('componentWillMount()')
    const { open, value } = this.state

    this.setValue(value)
    this.setSelectedIndex(value)

    if (open) {
      this.open()
      this.attachHandlersOnOpen()
    }
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps)
    debug('componentWillReceiveProps()')
    debug('to props:', objectDiff(this.props, nextProps))

    /* eslint-disable no-console */
    if (process.env.NODE_ENV !== 'production') {
      // in development, validate value type matches dropdown type
      const isNextValueArray = Array.isArray(nextProps.value)
      const hasValue = _.has(nextProps, 'value')

      if (hasValue && nextProps.multiple && !isNextValueArray) {
        console.error(
          'Dropdown `value` must be an array when `multiple` is set.' +
            ` Received type: \`${Object.prototype.toString.call(nextProps.value)}\`.`,
        )
      } else if (hasValue && !nextProps.multiple && isNextValueArray) {
        console.error(
          'Dropdown `value` must not be an array when `multiple` is not set.' +
            ' Either set `multiple={true}` or use a string or number value.',
        )
      }
    }
    /* eslint-enable no-console */

    if (!shallowEqual(nextProps.value, this.props.value)) {
      debug('value changed, setting', nextProps.value)
      this.setValue(nextProps.value)
      this.setSelectedIndex(nextProps.value)
    }

    // The selected index is only dependent on option keys/values.
    // We only check those properties to avoid recursive performance impacts.
    // https://github.com/Semantic-Org/Semantic-UI-React/issues/3000
    if (
      !_.isEqual(this.getKeyAndValues(nextProps.options), this.getKeyAndValues(this.props.options))
    ) {
      this.setSelectedIndex(undefined, nextProps.options)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state)
  }

  componentDidUpdate(prevProps, prevState) {
    // eslint-disable-line complexity
    debug('componentDidUpdate()')
    debug('to state:', objectDiff(prevState, this.state))

    // focused / blurred
    if (!prevState.focus && this.state.focus) {
      debug('dropdown focused')
      if (!this.isMouseDown) {
        const { minCharacters, openOnFocus, search } = this.props
        const openable = !search || (search && minCharacters === 1 && !this.state.open)

        debug('mouse is not down, opening')
        if (openOnFocus && openable) this.open()
      }
      if (!this.state.open) {
        eventStack.sub('keydown', [this.openOnArrow, this.openOnSpace])
      } else {
        eventStack.sub('keydown', [this.moveSelectionOnKeyDown, this.selectItemOnEnter])
      }
      eventStack.sub('keydown', this.removeItemOnBackspace)
    } else if (prevState.focus && !this.state.focus) {
      debug('dropdown blurred')
      const { closeOnBlur } = this.props
      if (!this.isMouseDown && closeOnBlur) {
        debug('mouse is not down and closeOnBlur=true, closing')
        this.close()
      }
      eventStack.unsub('keydown', [
        this.openOnArrow,
        this.openOnSpace,
        this.moveSelectionOnKeyDown,
        this.selectItemOnEnter,
        this.removeItemOnBackspace,
      ])
    }

    // opened / closed
    if (!prevState.open && this.state.open) {
      debug('dropdown opened')
      this.attachHandlersOnOpen()
      this.setOpenDirection()
      this.scrollSelectedItemIntoView()
    } else if (prevState.open && !this.state.open) {
      debug('dropdown closed')
      this.handleClose()
      eventStack.unsub('keydown', [
        this.closeOnEscape,
        this.moveSelectionOnKeyDown,
        this.selectItemOnEnter,
      ])
      eventStack.unsub('click', this.closeOnDocumentClick)
      if (!this.state.focus) {
        eventStack.unsub('keydown', this.removeItemOnBackspace)
      }
    }
  }

  componentWillUnmount() {
    debug('componentWillUnmount()')

    eventStack.unsub('keydown', [
      this.openOnArrow,
      this.openOnSpace,
      this.moveSelectionOnKeyDown,
      this.selectItemOnEnter,
      this.removeItemOnBackspace,
      this.closeOnEscape,
    ])
    eventStack.unsub('click', this.closeOnDocumentClick)
  }

  // ----------------------------------------
  // Document Event Handlers
  // ----------------------------------------

  // onChange needs to receive a value
  // can't rely on props.value if we are controlled
  handleChange = (e, value) => {
    debug('handleChange()', value)
    _.invoke(this.props, 'onChange', e, { ...this.props, value })
  }

  closeOnChange = (e) => {
    const { closeOnChange, multiple } = this.props
    const shouldClose = _.isUndefined(closeOnChange) ? !multiple : closeOnChange

    if (shouldClose) this.close(e)
  }

  closeOnEscape = (e) => {
    if (keyboardKey.getCode(e) !== keyboardKey.Escape) return
    e.preventDefault()
    this.close()
  }

  moveSelectionOnKeyDown = (e) => {
    debug('moveSelectionOnKeyDown()', keyboardKey.getKey(e))

    const { multiple, selectOnNavigation } = this.props
    const moves = {
      [keyboardKey.ArrowDown]: 1,
      [keyboardKey.ArrowUp]: -1,
    }
    const move = moves[keyboardKey.getCode(e)]

    if (move === undefined) return
    e.preventDefault()
    this.moveSelectionBy(move)
    if (!multiple && selectOnNavigation) this.makeSelectedItemActive(e)
  }

  openOnSpace = (e) => {
    debug('openOnSpace()')

    if (keyboardKey.getCode(e) !== keyboardKey.Spacebar) return
    if (this.state.open) return

    e.preventDefault()

    this.open(e)
  }

  openOnArrow = (e) => {
    debug('openOnArrow()')

    const code = keyboardKey.getCode(e)
    if (!_.includes([keyboardKey.ArrowDown, keyboardKey.ArrowUp], code)) return
    if (this.state.open) return

    e.preventDefault()

    this.open(e)
  }

  makeSelectedItemActive = (e) => {
    const { open } = this.state
    const { multiple } = this.props

    const item = this.getSelectedItem()
    const value = _.get(item, 'value')

    // prevent selecting null if there was no selected item value
    // prevent selecting duplicate items when the dropdown is closed
    if (_.isNil(value) || !open) return

    // state value may be undefined
    const newValue = multiple ? _.union(this.state.value, [value]) : value

    // notify the onChange prop that the user is trying to change value
    this.setValue(newValue)
    this.setSelectedIndex(newValue)
    this.handleChange(e, newValue)

    // Heads up! This event handler should be called after `onChange`
    // Notify the onAddItem prop if this is a new value
    if (item['data-additional']) _.invoke(this.props, 'onAddItem', e, { ...this.props, value })
  }

  selectItemOnEnter = (e) => {
    debug('selectItemOnEnter()', keyboardKey.getKey(e))
    const { search } = this.props

    if (keyboardKey.getCode(e) !== keyboardKey.Enter) return
    e.preventDefault()

    const optionSize = _.size(this.getMenuOptions())
    if (search && optionSize === 0) return

    this.makeSelectedItemActive(e)
    this.closeOnChange(e)
    this.clearSearchQuery()
    if (search && this.searchRef) this.searchRef.focus()
  }

  removeItemOnBackspace = (e) => {
    debug('removeItemOnBackspace()', keyboardKey.getKey(e))

    const { multiple, search } = this.props
    const { searchQuery, value } = this.state

    if (keyboardKey.getCode(e) !== keyboardKey.Backspace) return
    if (searchQuery || !search || !multiple || _.isEmpty(value)) return
    e.preventDefault()

    // remove most recent value
    const newValue = _.dropRight(value)

    this.setValue(newValue)
    this.setSelectedIndex(newValue)
    this.handleChange(e, newValue)
  }

  closeOnDocumentClick = (e) => {
    debug('closeOnDocumentClick()')
    debug(e)

    if (!this.props.closeOnBlur) return

    // If event happened in the dropdown, ignore it
    if (this.ref && doesNodeContainClick(this.ref, e)) return

    this.close()
  }

  attachHandlersOnOpen = () => {
    eventStack.sub('keydown', [
      this.closeOnEscape,
      this.moveSelectionOnKeyDown,
      this.selectItemOnEnter,
      this.removeItemOnBackspace,
    ])
    eventStack.sub('click', this.closeOnDocumentClick)
    eventStack.unsub('keydown', [this.openOnArrow, this.openOnSpace])
  }

  // ----------------------------------------
  // Component Event Handlers
  // ----------------------------------------

  handleMouseDown = (e) => {
    debug('handleMouseDown()')

    this.isMouseDown = true
    eventStack.sub('mouseup', this.handleDocumentMouseUp)
    _.invoke(this.props, 'onMouseDown', e, this.props)
  }

  handleDocumentMouseUp = () => {
    debug('handleDocumentMouseUp()')

    this.isMouseDown = false
    eventStack.unsub('mouseup', this.handleDocumentMouseUp)
  }

  handleClick = (e) => {
    debug('handleClick()', e)

    const { minCharacters, search } = this.props
    const { open, searchQuery } = this.state

    _.invoke(this.props, 'onClick', e, this.props)
    // prevent closeOnDocumentClick()
    e.stopPropagation()

    if (!search) return this.toggle(e)
    if (open) return
    if (searchQuery.length >= minCharacters || minCharacters === 1) {
      this.open(e)
      return
    }
    if (this.searchRef) this.searchRef.focus()
  }

  handleIconClick = (e) => {
    const { clearable } = this.props
    const hasValue = this.hasValue()
    debug('handleIconClick()', { e, clearable, hasValue })

    _.invoke(this.props, 'onClick', e, this.props)
    // prevent handleClick()
    e.stopPropagation()

    if (clearable && hasValue) {
      this.clearValue(e)
    } else {
      this.toggle(e)
    }
  }

  handleItemClick = (e, item) => {
    debug('handleItemClick()', item)

    const { multiple, search } = this.props
    const { value } = item

    // prevent toggle() in handleClick()
    e.stopPropagation()
    // prevent closeOnDocumentClick() if multiple or item is disabled
    if (multiple || item.disabled) e.nativeEvent.stopImmediatePropagation()
    if (item.disabled) return

    const isAdditionItem = item['data-additional']
    const newValue = multiple ? _.union(this.state.value, [value]) : value

    // notify the onChange prop that the user is trying to change value
    this.setValue(newValue)
    this.setSelectedIndex(value)

    this.clearSearchQuery()

    this.handleChange(e, newValue)
    this.closeOnChange(e)

    // Heads up! This event handler should be called after `onChange`
    // Notify the onAddItem prop if this is a new value
    if (isAdditionItem) _.invoke(this.props, 'onAddItem', e, { ...this.props, value })

    if (multiple && search && this.searchRef) this.searchRef.focus()
  }

  handleFocus = (e) => {
    debug('handleFocus()')
    const { focus } = this.state

    if (focus) return

    _.invoke(this.props, 'onFocus', e, this.props)
    this.setState({ focus: true })
  }

  handleBlur = (e) => {
    debug('handleBlur()')

    // Heads up! Don't remove this.
    // https://github.com/Semantic-Org/Semantic-UI-React/issues/1315
    const currentTarget = _.get(e, 'currentTarget')
    if (currentTarget && currentTarget.contains(document.activeElement)) return

    const { closeOnBlur, multiple, selectOnBlur } = this.props
    // do not "blur" when the mouse is down inside of the Dropdown
    if (this.isMouseDown) return

    _.invoke(this.props, 'onBlur', e, this.props)

    if (selectOnBlur && !multiple) {
      this.makeSelectedItemActive(e)
      if (closeOnBlur) this.close()
    }

    this.setState({ focus: false })
    this.clearSearchQuery()
  }

  handleSearchChange = (e, { value }) => {
    debug('handleSearchChange()')
    debug(value)

    // prevent propagating to this.props.onChange()
    e.stopPropagation()

    const { minCharacters } = this.props
    const { open } = this.state
    const newQuery = value

    _.invoke(this.props, 'onSearchChange', e, { ...this.props, searchQuery: newQuery })
    this.trySetState({ searchQuery: newQuery }, { selectedIndex: 0 })

    // open search dropdown on search query
    if (!open && newQuery.length >= minCharacters) {
      this.open()
      return
    }
    // close search dropdown if search query is too small
    if (open && minCharacters !== 1 && newQuery.length < minCharacters) this.close()
  }

  // ----------------------------------------
  // Getters
  // ----------------------------------------

  getKeyAndValues = options =>
    (options ? options.map(option => _.pick(option, ['key', 'value'])) : options)

  // There are times when we need to calculate the options based on a value
  // that hasn't yet been persisted to state.
  getMenuOptions = (value = this.state.value, options = this.props.options) => {
    const { additionLabel, additionPosition, allowAdditions, deburr, multiple, search } = this.props
    const { searchQuery } = this.state

    let filteredOptions = options

    // filter out active options
    if (multiple) {
      filteredOptions = _.filter(filteredOptions, opt => !_.includes(value, opt.value))
    }

    // filter by search query
    if (search && searchQuery) {
      if (_.isFunction(search)) {
        filteredOptions = search(filteredOptions, searchQuery)
      } else {
        // remove diacritics on search input and options, if deburr prop is set
        const strippedQuery = deburr ? _.deburr(searchQuery) : searchQuery

        const re = new RegExp(_.escapeRegExp(strippedQuery), 'i')

        filteredOptions = _.filter(filteredOptions, opt =>
          re.test(deburr ? _.deburr(opt.text) : opt.text),
        )
      }
    }

    // insert the "add" item
    if (
      allowAdditions &&
      search &&
      searchQuery &&
      !_.some(filteredOptions, { text: searchQuery })
    ) {
      const additionLabelElement = React.isValidElement(additionLabel)
        ? React.cloneElement(additionLabel, { key: 'addition-label' })
        : additionLabel || ''

      const addItem = {
        key: 'addition',
        // by using an array, we can pass multiple elements, but when doing so
        // we must specify a `key` for React to know which one is which
        text: [additionLabelElement, <b key='addition-query'>{searchQuery}</b>],
        value: searchQuery,
        className: 'addition',
        'data-additional': true,
      }
      if (additionPosition === 'top') filteredOptions.unshift(addItem)
      else filteredOptions.push(addItem)
    }

    return filteredOptions
  }

  getSelectedItem = () => {
    const { selectedIndex } = this.state
    const options = this.getMenuOptions()

    return _.get(options, `[${selectedIndex}]`)
  }

  getEnabledIndices = (givenOptions) => {
    const options = givenOptions || this.getMenuOptions()

    return _.reduce(
      options,
      (memo, item, index) => {
        if (!item.disabled) memo.push(index)
        return memo
      },
      [],
    )
  }

  getItemByValue = (value) => {
    const { options } = this.props

    return _.find(options, { value })
  }

  getMenuItemIndexByValue = (value, givenOptions) => {
    const options = givenOptions || this.getMenuOptions()

    return _.findIndex(options, ['value', value])
  }

  getDropdownAriaOptions = () => {
    const { loading, disabled, search, multiple } = this.props
    const { open } = this.state
    const ariaOptions = {
      role: search ? 'combobox' : 'listbox',
      'aria-busy': loading,
      'aria-disabled': disabled,
      'aria-expanded': !!open,
    }
    if (ariaOptions.role === 'listbox') {
      ariaOptions['aria-multiselectable'] = multiple
    }
    return ariaOptions
  }

  getDropdownMenuAriaOptions() {
    const { search, multiple } = this.props
    const ariaOptions = {}

    if (search) {
      ariaOptions['aria-multiselectable'] = multiple
      ariaOptions.role = 'listbox'
    }
    return ariaOptions
  }

  // ----------------------------------------
  // Setters
  // ----------------------------------------

  clearSearchQuery = () => {
    debug('clearSearchQuery()')
    this.trySetState({ searchQuery: '' })
  }

  setValue = (value) => {
    debug('setValue()', value)
    this.trySetState({ value })
  }

  setSelectedIndex = (value = this.state.value, optionsProps = this.props.options) => {
    const { multiple } = this.props
    const { selectedIndex } = this.state
    const options = this.getMenuOptions(value, optionsProps)
    const enabledIndicies = this.getEnabledIndices(options)

    let newSelectedIndex

    // update the selected index
    if (!selectedIndex || selectedIndex < 0) {
      const firstIndex = enabledIndicies[0]

      // Select the currently active item, if none, use the first item.
      // Multiple selects remove active items from the list,
      // their initial selected index should be 0.
      newSelectedIndex = multiple
        ? firstIndex
        : this.getMenuItemIndexByValue(value, options) || enabledIndicies[0]
    } else if (multiple) {
      // multiple selects remove options from the menu as they are made active
      // keep the selected index within range of the remaining items
      if (selectedIndex >= options.length - 1) {
        newSelectedIndex = enabledIndicies[enabledIndicies.length - 1]
      }
    } else {
      const activeIndex = this.getMenuItemIndexByValue(value, options)

      // regular selects can only have one active item
      // set the selected index to the currently active item
      newSelectedIndex = _.includes(enabledIndicies, activeIndex) ? activeIndex : undefined
    }

    if (!newSelectedIndex || newSelectedIndex < 0) {
      newSelectedIndex = enabledIndicies[0]
    }

    this.setState({ selectedIndex: newSelectedIndex })
  }

  handleLabelClick = (e, labelProps) => {
    debug('handleLabelClick()')
    // prevent focusing search input on click
    e.stopPropagation()

    this.setState({ selectedLabel: labelProps.value })
    _.invoke(this.props, 'onLabelClick', e, labelProps)
  }

  handleLabelRemove = (e, labelProps) => {
    debug('handleLabelRemove()')
    // prevent focusing search input on click
    e.stopPropagation()
    const { value } = this.state
    const newValue = _.without(value, labelProps.value)
    debug('label props:', labelProps)
    debug('current value:', value)
    debug('remove value:', labelProps.value)
    debug('new value:', newValue)

    this.setValue(newValue)
    this.setSelectedIndex(newValue)
    this.handleChange(e, newValue)
  }

  moveSelectionBy = (offset, startIndex = this.state.selectedIndex) => {
    debug('moveSelectionBy()')
    debug(`offset: ${offset}`)

    const options = this.getMenuOptions()

    // Prevent infinite loop
    // TODO: remove left part of condition after children API will be removed
    if (options === undefined || _.every(options, 'disabled')) return

    const lastIndex = options.length - 1
    const { wrapSelection } = this.props
    // next is after last, wrap to beginning
    // next is before first, wrap to end
    let nextIndex = startIndex + offset

    // if 'wrapSelection' is set to false and selection is after last or before first, it just does not change
    if (!wrapSelection && (nextIndex > lastIndex || nextIndex < 0)) {
      nextIndex = startIndex
    } else if (nextIndex > lastIndex) nextIndex = 0
    else if (nextIndex < 0) nextIndex = lastIndex

    if (options[nextIndex].disabled) {
      this.moveSelectionBy(offset, nextIndex)
      return
    }

    this.setState({ selectedIndex: nextIndex })
    this.scrollSelectedItemIntoView()
  }

  // ----------------------------------------
  // Overrides
  // ----------------------------------------

  handleIconOverrides = (predefinedProps) => {
    const { clearable } = this.props
    const classes = cx(clearable && this.hasValue() && 'clear', predefinedProps.className)

    return {
      className: classes,
      onClick: (e) => {
        _.invoke(predefinedProps, 'onClick', e, predefinedProps)
        this.handleIconClick(e)
      },
    }
  }

  // ----------------------------------------
  // Refs
  // ----------------------------------------

  handleSearchRef = c => (this.searchRef = c)

  handleSizerRef = c => (this.sizerRef = c)

  handleRef = c => (this.ref = c)

  // ----------------------------------------
  // Helpers
  // ----------------------------------------

  clearValue = (e) => {
    const { multiple } = this.props
    const newValue = multiple ? [] : ''

    this.setValue(newValue)
    this.setSelectedIndex(newValue)
    this.handleChange(e, newValue)
  }

  computeSearchInputTabIndex = () => {
    const { disabled, tabIndex } = this.props

    if (!_.isNil(tabIndex)) return tabIndex
    return disabled ? -1 : 0
  }

  computeSearchInputWidth = () => {
    const { searchQuery } = this.state

    if (this.sizerRef && searchQuery) {
      // resize the search input, temporarily show the sizer so we can measure it

      this.sizerRef.style.display = 'inline'
      this.sizerRef.textContent = searchQuery
      const searchWidth = Math.ceil(this.sizerRef.getBoundingClientRect().width)
      this.sizerRef.style.removeProperty('display')

      return searchWidth
    }
  }

  computeTabIndex = () => {
    const { disabled, search, tabIndex } = this.props

    // don't set a root node tabIndex as the search input has its own tabIndex
    if (search) return undefined
    if (disabled) return -1
    return _.isNil(tabIndex) ? 0 : tabIndex
  }

  handleSearchInputOverrides = predefinedProps => ({
    onChange: (e, inputProps) => {
      _.invoke(predefinedProps, 'onChange', e, inputProps)
      this.handleSearchChange(e, inputProps)
    },
  })

  hasValue = () => {
    const { multiple } = this.props
    const { value } = this.state

    return multiple ? !_.isEmpty(value) : !_.isNil(value) && value !== ''
  }

  // ----------------------------------------
  // Behavior
  // ----------------------------------------

  scrollSelectedItemIntoView = () => {
    debug('scrollSelectedItemIntoView()')
    if (!this.ref) return
    const menu = this.ref.querySelector('.menu.visible')
    if (!menu) return
    const item = menu.querySelector('.item.selected')
    if (!item) return
    debug(`menu: ${menu}`)
    debug(`item: ${item}`)
    const isOutOfUpperView = item.offsetTop < menu.scrollTop
    const isOutOfLowerView = item.offsetTop + item.clientHeight > menu.scrollTop + menu.clientHeight

    if (isOutOfUpperView) {
      menu.scrollTop = item.offsetTop
    } else if (isOutOfLowerView) {
      // eslint-disable-next-line no-mixed-operators
      menu.scrollTop = item.offsetTop + item.clientHeight - menu.clientHeight
    }
  }

  setOpenDirection = () => {
    if (!this.ref) return

    const menu = this.ref.querySelector('.menu.visible')

    if (!menu) return

    const dropdownRect = this.ref.getBoundingClientRect()
    const menuHeight = menu.clientHeight
    const spaceAtTheBottom =
      document.documentElement.clientHeight - dropdownRect.top - dropdownRect.height - menuHeight
    const spaceAtTheTop = dropdownRect.top - menuHeight

    const upward = spaceAtTheBottom < 0 && spaceAtTheTop > spaceAtTheBottom

    // set state only if there's a relevant difference
    if (!upward !== !this.state.upward) {
      this.trySetState({ upward })
    }
  }

  open = (e) => {
    const { disabled, open, search } = this.props
    debug('open()', { disabled, open, search })

    if (disabled) return
    if (search && this.searchRef) this.searchRef.focus()

    _.invoke(this.props, 'onOpen', e, this.props)

    this.trySetState({ open: true })
    this.scrollSelectedItemIntoView()
  }

  close = (e) => {
    const { open } = this.state
    debug('close()', { open })

    if (open) {
      _.invoke(this.props, 'onClose', e, this.props)
      this.trySetState({ open: false })
    }
  }

  handleClose = () => {
    debug('handleClose()')

    const hasSearchFocus = document.activeElement === this.searchRef
    const hasDropdownFocus = document.activeElement === this.ref
    const hasFocus = hasSearchFocus || hasDropdownFocus

    // https://github.com/Semantic-Org/Semantic-UI-React/issues/627
    // Blur the Dropdown on close so it is blurred after selecting an item.
    // This is to prevent it from re-opening when switching tabs after selecting an item.
    if (!hasSearchFocus) {
      this.ref.blur()
    }

    // We need to keep the virtual model in sync with the browser focus change
    // https://github.com/Semantic-Org/Semantic-UI-React/issues/692
    this.setState({ focus: hasFocus })
  }

  toggle = e => (this.state.open ? this.close(e) : this.open(e))

  // ----------------------------------------
  // Render
  // ----------------------------------------

  renderText = () => {
    const { multiple, placeholder, search, text } = this.props
    const { searchQuery, value, open } = this.state
    const hasValue = this.hasValue()

    const classes = cx(
      placeholder && !hasValue && 'default',
      'text',
      search && searchQuery && 'filtered',
    )
    let _text = placeholder
    if (searchQuery) {
      _text = null
    } else if (text) {
      _text = text
    } else if (open && !multiple) {
      _text = _.get(this.getSelectedItem(), 'text')
    } else if (hasValue) {
      _text = _.get(this.getItemByValue(value), 'text')
    }

    return (
      <div className={classes} role='alert' aria-live='polite'>
        {_text}
      </div>
    )
  }

  renderSearchInput = () => {
    const { search, searchInput } = this.props
    const { searchQuery } = this.state

    if (!search) return null
    return DropdownSearchInput.create(searchInput, {
      defaultProps: {
        inputRef: this.handleSearchRef,
        style: { width: this.computeSearchInputWidth() },
        tabIndex: this.computeSearchInputTabIndex(),
        value: searchQuery,
      },
      overrideProps: this.handleSearchInputOverrides,
    })
  }

  renderSearchSizer = () => {
    const { search, multiple } = this.props

    if (!(search && multiple)) return null
    return <span className='sizer' ref={this.handleSizerRef} />
  }

  renderLabels = () => {
    debug('renderLabels()')
    const { multiple, renderLabel } = this.props
    const { selectedLabel, value } = this.state
    if (!multiple || _.isEmpty(value)) {
      return
    }
    const selectedItems = _.map(value, this.getItemByValue)
    debug('selectedItems', selectedItems)

    // if no item could be found for a given state value the selected item will be undefined
    // compact the selectedItems so we only have actual objects left
    return _.map(_.compact(selectedItems), (item, index) => {
      const defaultProps = {
        active: item.value === selectedLabel,
        as: 'a',
        key: getKeyOrValue(item.key, item.value),
        onClick: this.handleLabelClick,
        onRemove: this.handleLabelRemove,
        value: item.value,
      }

      return Label.create(renderLabel(item, index, defaultProps), { defaultProps })
    })
  }

  renderOptions = () => {
    const { lazyLoad, multiple, search, noResultsMessage } = this.props
    const { open, selectedIndex, value } = this.state

    // lazy load, only render options when open
    if (lazyLoad && !open) return null

    const options = this.getMenuOptions()

    if (noResultsMessage !== null && search && _.isEmpty(options)) {
      return <div className='message'>{noResultsMessage}</div>
    }

    const isActive = multiple
      ? optValue => _.includes(value, optValue)
      : optValue => optValue === value

    return _.map(options, (opt, i) =>
      DropdownItem.create({
        active: isActive(opt.value),
        onClick: this.handleItemClick,
        selected: selectedIndex === i,
        ...opt,
        key: getKeyOrValue(opt.key, opt.value),
        // Needed for handling click events on disabled items
        style: { ...opt.style, pointerEvents: 'all' },
      }),
    )
  }

  renderMenu = () => {
    const { children, direction, header } = this.props
    const { open } = this.state
    const ariaOptions = this.getDropdownMenuAriaOptions()

    // single menu child
    if (!childrenUtils.isNil(children)) {
      const menuChild = Children.only(children)
      const className = cx(direction, useKeyOnly(open, 'visible'), menuChild.props.className)

      return cloneElement(menuChild, { className, ...ariaOptions })
    }

    return (
      <DropdownMenu {...ariaOptions} direction={direction} open={open}>
        {DropdownHeader.create(header, { autoGenerateKey: false })}
        {this.renderOptions()}
      </DropdownMenu>
    )
  }

  render() {
    debug('render()')
    debug('props', this.props)
    debug('state', this.state)

    const {
      basic,
      button,
      className,
      compact,
      disabled,
      error,
      fluid,
      floating,
      icon,
      inline,
      item,
      labeled,
      loading,
      multiple,
      pointing,
      search,
      selection,
      scrolling,
      simple,
      trigger,
    } = this.props
    const { open, upward } = this.state

    // Classes
    const classes = cx(
      'ui',
      useKeyOnly(open, 'active visible'),
      useKeyOnly(disabled, 'disabled'),
      useKeyOnly(error, 'error'),
      useKeyOnly(loading, 'loading'),

      useKeyOnly(basic, 'basic'),
      useKeyOnly(button, 'button'),
      useKeyOnly(compact, 'compact'),
      useKeyOnly(fluid, 'fluid'),
      useKeyOnly(floating, 'floating'),
      useKeyOnly(inline, 'inline'),
      // TODO: consider augmentation to render Dropdowns as Button/Menu, solves icon/link item issues
      // https://github.com/Semantic-Org/Semantic-UI-React/issues/401#issuecomment-240487229
      // TODO: the icon class is only required when a dropdown is a button
      // useKeyOnly(icon, 'icon'),
      useKeyOnly(labeled, 'labeled'),
      useKeyOnly(item, 'item'),
      useKeyOnly(multiple, 'multiple'),
      useKeyOnly(search, 'search'),
      useKeyOnly(selection, 'selection'),
      useKeyOnly(simple, 'simple'),
      useKeyOnly(scrolling, 'scrolling'),
      useKeyOnly(upward, 'upward'),

      useKeyOrValueAndKey(pointing, 'pointing'),
      'dropdown',
      className,
    )
    const rest = getUnhandledProps(Dropdown, this.props)
    const ElementType = getElementType(Dropdown, this.props)
    const ariaOptions = this.getDropdownAriaOptions(ElementType, this.props)

    return (
      <ElementType
        {...rest}
        {...ariaOptions}
        className={classes}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        onMouseDown={this.handleMouseDown}
        onFocus={this.handleFocus}
        onChange={this.handleChange}
        tabIndex={this.computeTabIndex()}
        ref={this.handleRef}
      >
        {this.renderLabels()}
        {this.renderSearchInput()}
        {this.renderSearchSizer()}
        {trigger || this.renderText()}
        {Icon.create(icon, {
          overrideProps: this.handleIconOverrides,
          autoGenerateKey: false,
        })}
        {this.renderMenu()}
      </ElementType>
    )
  }
}
