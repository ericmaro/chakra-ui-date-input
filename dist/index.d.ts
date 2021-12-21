import { InputProps as ChakraInputProps } from '@chakra-ui/react';
export interface IDatePickerProps extends Omit<ChakraInputProps, 'onChange'> {
    dateFormat?: string;
    onChange: (date: string) => void;
}
export declare const DatePicker: (props: IDatePickerProps) => JSX.Element;
