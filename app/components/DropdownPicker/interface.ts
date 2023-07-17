/**
 * interface.ts
 * @desc Interfaces for dropdown picker component.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import type {Dispatch} from 'react';
import { TextStyle } from 'react-native';

type SetStateCallback<S> = (prevState: S) => S;
type SetStateValue<S> = (prevState: S) => S;
type ValueType = string | number | boolean;
export type ItemType<T> = {
  label?: string;
  value?: T;
  name?: string;
  code?: string;
  dial_code?: number;
  flag?: string;
};

export interface SchemaInterface {
  label: string;
  value: string;
  icon: string;
  parent: string;
  selectable: string;
  disabled: string;
  testID: string;
  containerStyle: string;
  labelStyle: string;
}

/**
 * Props for dropdown picker component.
 * @param {string} header Title for picker. (Outside picker)
 * @param {string} title Title for picker.(Inside picker)
 * @param {boolean} open State variable that specifies whether the picker is open.
 * @param {ValueType} value State variable that specifies the value of the selected item. It's an array of values for multiple item pickers.
 * @param {ItemType} items State variable that holds the items.
 * @param {SetStateValue} setOpen State callback that is called when the user presses the picker.
 * @param {SetStateCallback} setValue State callback that is called when the value changes.
 * @param {void} onChangeValue Callback that returns the current value.
 * @param {SchemaInterface} schema Item Schema.
 * @param {string} placeholder When no item is selected, the placeholder is displayed and prompts the user to select an item.
 * @param {void} onSelectItem Callback that returns the selected item / items.
 * @param {void} onClose Callback that is called when the user closes the picker.
 * @param {string} searchPlaceholder Changes the placeholder text of the text input.
 */
export interface DropDownPickerBaseProps<T> {
  titleStyle?: TextStyle;
  label?: TextStyle;
  header?: string | any;
  title?: string | any;
  open: boolean;
  mulitple?: boolean;
  value: ValueType;
  items: ItemType<T>[];
  setOpen: Dispatch<SetStateValue<boolean>>;
  setValue: Dispatch<SetStateCallback<T | null | any>>;
  onChangeValue?: (value: T | null) => void;
  schema?: Partial<SchemaInterface>;
  placeholder?: string | any;
  onSelectItem?: (item: ItemType<T>) => void;
  onClose?: () => void;
  searchPlaceholder?: string;
  onChangeSearchText?: (value: string | null) => void;
}
