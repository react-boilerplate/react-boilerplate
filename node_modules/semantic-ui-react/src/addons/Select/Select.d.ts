import * as React from 'react'

import { StrictDropdownProps } from '../../modules/Dropdown'
import DropdownDivider from '../../modules/Dropdown/DropdownDivider'
import DropdownHeader from '../../modules/Dropdown/DropdownHeader'
import DropdownItem, { DropdownItemProps } from '../../modules/Dropdown/DropdownItem'
import DropdownMenu from '../../modules/Dropdown/DropdownMenu'

export interface SelectProps extends StrictSelectProps {
  [key: string]: any
}

export interface StrictSelectProps extends StrictDropdownProps {
  /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
  options: DropdownItemProps[]
}

interface SelectComponent extends React.StatelessComponent<SelectProps> {
  Divider: typeof DropdownDivider
  Header: typeof DropdownHeader
  Item: typeof DropdownItem
  Menu: typeof DropdownMenu
}

declare const Select: SelectComponent

export default Select
