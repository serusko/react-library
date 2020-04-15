import { SyntheticEvent } from 'react';

export * from './Form';
export { default } from './Form';

export type FieldVariant =
  | OutlinedTe xtFieldProps['variant']
  | FilledTextFieldProps['variant']
  | StandardTextFieldProps['variant'];

export type FieldInterface<V = unknown> = {
  /**
   * handle onBlur event
   */
  onBlur?: () => void;
  /**
   * handle onChange event
   */
  onChange: (value: null | V) => void; // TODO e: any - with V not working FA
  /**
   * outline / text color
   */
  color?: 'primary' | 'secondary';
  /**
   * Explanation text under field (red if field has error = replace helper text with error message)
   */
  helperText?: React.ReactNode;
  /**
   * start adornment
   */
  startAdornment?: React.ReactNode;
  /**
   * end adornment
   */
  endAdornment?: React.ReactNode;
  /**
   * tooltip content
   */
  tooltipContent?: string | React.ReactNode;
  /**
   * value unit shown in tooltip
   */
  tooltipValueUnit?: string;
  /**
   * Field spacing options
   */
  margin?: PropTypes.Margin;
  /**
   * Field size
   */
  size?: 'small' | 'medium';
  /**
   * Field short description
   */
  label?: string;
  /**
   * Design variant
   */
  variant?: FieldVariant;
  /**
   * Should field fill parent container ?
   */
  fullWidth?: boolean;
  /**
   * Should be field auto-focused on load ?
   */
  autoFocus?: boolean;
  /**
   * Is field required ? => display asterisk in label
   */
  required?: boolean;
  /**
   *
   */
  showClearButton?: boolean;
  /**
   *
   */
  textAlign?: string;
  /**
   *
   */
  disabled?: boolean;
  /**
   * Has field error?
   */
  error?: boolean;
  /**
   * Field value could be null or Generic
   */
  value: null | V;
  /**
   * Field name
   */
  name: string;
  /**
   * DOM id (unique per page!)
   */
  id?: string;

  // TBD
  onClick?: (e: SyntheticEvent) => void;
  onFocus?: (e: any) => void;
  onKeyDown?: (e: SyntheticEvent) => void;
  validate?: (valFn: any) => void;
};

// TODO: remove once will be solved
// https://github.com/mui-org/material-ui/issues/15697
export function fieldVariant(variant: FieldVariant) {
  switch (variant) {
    case 'outlined':
      return { variant: 'outlined' as 'outlined' };
    case 'filled':
      return { variant: 'filled' as 'filled' };
    case 'standard':
      return { variant: 'standard' as 'standard' };
    default:
      return {};
  }
}
