import * as React from 'react'

import { LabelProps } from '../../elements/Label'
import DropdownDivider from './DropdownDivider'
import DropdownHeader from './DropdownHeader'
import { default as DropdownItem, DropdownItemProps } from './DropdownItem'
import DropdownMenu from './DropdownMenu'
import DropdownSearchInput from './DropdownSearchInput'

export interface DropdownProps extends StrictDropdownProps {
  [key: string]: any
}

export interface StrictDropdownProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Label prefixed to an option added by a user. */
  additionLabel?: number | string | React.ReactNode

  /** Position of the `Add: ...` option in the dropdown list ('top' or 'bottom'). */
  additionPosition?: 'top' | 'bottom'

  /**
   * Allow user additions to the list of options (boolean).
   * Requires the use of `selection`, `options` and `search`.
   */
  allowAdditions?: boolean

  /** A Dropdown can reduce its complexity. */
  basic?: boolean

  /** Format the Dropdown to appear as a button. */
  button?: boolean

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Using the clearable setting will let users remove their selection from a dropdown. */
  clearable?: boolean

  /** Whether or not the menu should close when the dropdown is blurred. */
  closeOnBlur?: boolean

  /**
   * Whether or not the menu should close when a value is selected from the dropdown.
   * By default, multiple selection dropdowns will remain open on change, while single
   * selection dropdowns will close on change.
   */
  closeOnChange?: boolean

  /** A compact dropdown has no minimum width. */
  compact?: boolean

  /** Whether or not the dropdown should strip diacritics in options and input search */
  deburr?: boolean

  /** Initial value of open. */
  defaultOpen?: boolean

  /** Initial value of searchQuery. */
  defaultSearchQuery?: string

  /** Currently selected label in multi-select. */
  defaultSelectedLabel?: number | string

  /** Initial value of upward. */
  defaultUpward?: boolean

  /** Initial value or value array if multiple. */
  defaultValue?: string | number | boolean | (number | string | boolean)[]

  /** A dropdown menu can open to the left or to the right. */
  direction?: 'left' | 'right'

  /** A disabled dropdown menu or item does not allow user interaction. */
  disabled?: boolean

  /** An errored dropdown can alert a user to a problem. */
  error?: boolean

  /** A dropdown menu can contain floated content. */
  floating?: boolean

  /** A dropdown can take the full width of its parent */
  fluid?: boolean

  /** A dropdown menu can contain a header. */
  header?: React.ReactNode

  /** Shorthand for Icon. */
  icon?: any

  /** A dropdown can be formatted to appear inline in other content. */
  inline?: boolean

  /** A dropdown can be formatted as a Menu item. */
  item?: boolean

  /** A dropdown can be labeled. */
  labeled?: boolean

  /** A dropdown can defer rendering its options until it is open. */
  lazyLoad?: boolean

  /** A dropdown can show that it is currently loading data. */
  loading?: boolean

  /** The minimum characters for a search to begin showing results. */
  minCharacters?: number

  /** A selection dropdown can allow multiple selections. */
  multiple?: boolean

  /** Message to display when there are no results. */
  noResultsMessage?: string

  /**
   * Called when a user adds a new item. Use this to update the options list.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and the new item's value.
   */
  onAddItem?: (event: React.KeyboardEvent<HTMLElement>, data: DropdownProps) => void

  /**
   * Called on blur.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBlur?: (event: React.KeyboardEvent<HTMLElement>, data: DropdownProps) => void

  /**
   * Called when the user attempts to change the value.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onChange?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.KeyboardEvent<HTMLElement>, data: DropdownProps) => void

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void

  /**
   * Called on focus.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void

  /**
   * Called when a multi-select label is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All label props.
   */
  onLabelClick?: (event: React.MouseEvent<HTMLElement>, data: LabelProps) => void

  /**
   * Called on mousedown.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMouseDown?: (event: React.MouseEvent<HTMLElement>, data: DropdownProps) => void

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void

  /**
   * Called on search input change.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props, includes current value of searchQuery.
   */
  onSearchChange?: (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownOnSearchChangeData,
  ) => void

  /** Controls whether or not the dropdown menu is displayed. */
  open?: boolean

  /** Whether or not the menu should open when the dropdown is focused. */
  openOnFocus?: boolean

  /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
  options?: DropdownItemProps[]

  /** Placeholder text. */
  placeholder?: string

  /** A dropdown can be formatted so that its menu is pointing. */
  pointing?:
    | boolean
    | 'left'
    | 'right'
    | 'top'
    | 'top left'
    | 'top right'
    | 'bottom'
    | 'bottom left'
    | 'bottom right'

  /**
   * Mapped over the active items and returns shorthand for the active item Labels.
   * Only applies to `multiple` Dropdowns.
   *
   * @param {object} item - A currently active dropdown item.
   * @param {number} index - The current index.
   * @param {object} defaultLabelProps - The default props for an active item Label.
   * @returns {*} Shorthand for a Label.
   */
  renderLabel?: (item: DropdownItemProps, index: number, defaultLabelProps: LabelProps) => any

  /** A dropdown can have its menu scroll. */
  scrolling?: boolean

  /**
   * A selection dropdown can allow a user to search through a large list of choices.
   * Pass a function here to replace the default search.
   */
  search?: boolean | ((options: DropdownItemProps[], value: string) => DropdownItemProps[])

  /** A shorthand for a search input. */
  searchInput?: any

  /** Current value of searchQuery. Creates a controlled component. */
  searchQuery?: string

  /** Define whether the highlighted item should be selected on blur. */
  selectOnBlur?: boolean

  /** Whether dropdown should select new option when using keyboard shortcuts. Setting to false will require enter or left click to confirm a choice. */
  selectOnNavigation?: boolean

  /** Currently selected label in multi-select. */
  selectedLabel?: number | string

  /** A dropdown can be used to select between choices in a form. */
  selection?: any

  /** A simple dropdown can open without Javascript. */
  simple?: boolean

  /** A dropdown can receive focus. */
  tabIndex?: number | string

  /** The text displayed in the dropdown, usually for the active item. */
  text?: string

  /** Custom element to trigger the menu to become visible. Takes place of 'text'. */
  trigger?: React.ReactNode

  /** Current value or value array if multiple. Creates a controlled component. */
  value?: boolean | number | string | (boolean | number | string)[]

  /** Controls whether the dropdown will open upward. */
  upward?: boolean

  /**
   * A dropdown will go to the last element when ArrowUp is pressed on the first,
   * or go to the first when ArrowDown is pressed on the last( aka infinite selection )
   */
  wrapSelection?: boolean
}

/* TODO: replace with DropdownProps when #1829 will be fixed:
 * https://github.com/Semantic-Org/Semantic-UI-React/issues/1829
 */
export interface DropdownOnSearchChangeData extends DropdownProps {
  searchQuery: string
}

interface DropdownComponent extends React.ComponentClass<DropdownProps> {
  Divider: typeof DropdownDivider
  Header: typeof DropdownHeader
  Item: typeof DropdownItem
  Menu: typeof DropdownMenu
  SearchInput: typeof DropdownSearchInput
}

declare const Dropdown: DropdownComponent

export default Dropdown
