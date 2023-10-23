import { PasswordInputStylesNames } from '@mantine/core';
import Input from './Input';

export default Input;

export const stylePasswordInput: Partial<Record<PasswordInputStylesNames, string>> = {
    innerInput:
        'h-full w-[calc(100%-40px)] !bg-[rgb(58,59,60)] !px-4 placeholder:!font-sans placeholder:!font-medium placeholder:!text-placeholder-gray placeholder:!text-base !text-base !text-white font-[sans-serif] hover:bg-[rgb(80,82,83)] focus:!bg-[rgb(80,82,83)] disabled:!opacity-100 hover:!bg-[rgb(80,82,83)] ',
    input: 'h-full rounded-lg !bg-[rgb(58,59,60)] disabled:!opacity-100 data-[disabled]:!opacity-100 !text-white',
    wrapper: 'h-11',
    rightSection: '!w-10',
    visibilityToggle: 'hover:!bg-transparent',
};
