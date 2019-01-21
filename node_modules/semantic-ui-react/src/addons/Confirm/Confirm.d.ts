import * as React from 'react'

import { SemanticShorthandItem } from '../../generic'
import { ButtonProps } from '../../elements/Button'
import { StrictModalProps } from '../../modules/Modal'
import { ModalContentProps } from '../../modules/Modal/ModalContent'
import { ModalHeaderProps } from '../../modules/Modal/ModalHeader'

export interface ConfirmProps extends StrictConfirmProps {
  [key: string]: any
}

export interface StrictConfirmProps extends StrictModalProps {
  /** The cancel button text. */
  cancelButton?: SemanticShorthandItem<ButtonProps>

  /** The OK button text. */
  confirmButton?: SemanticShorthandItem<ButtonProps>

  /** The ModalContent text. */
  content?: SemanticShorthandItem<ModalContentProps>

  /** The ModalHeader text. */
  header?: SemanticShorthandItem<ModalHeaderProps>

  /**
   * Called when the Modal is closed without clicking confirm.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onCancel?: (event: React.MouseEvent<HTMLAnchorElement>, data: ConfirmProps) => void

  /**
   * Called when the OK button is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onConfirm?: (event: React.MouseEvent<HTMLAnchorElement>, data: ConfirmProps) => void

  /** Whether or not the modal is visible. */
  open?: boolean

  /** A confirm can vary in size. */
  size?: 'fullscreen' | 'large' | 'mini' | 'small' | 'tiny'
}

declare const Confirm: React.ComponentClass<ConfirmProps>

export default Confirm
