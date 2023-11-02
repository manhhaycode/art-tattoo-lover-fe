import { Select, SelectProps } from '@mantine/core';

const CusSelect = (props: SelectProps) => {
    return (
        <Select
            classNames={{
                input: 'h-full !bg-[rgb(58,59,60)] !border-none !px-0 !pl-5 w-full !text-base !text-white font-sans !font-medium hover:bg-[rgb(80,82,83)] focus:!bg-[rgb(80,82,83)] disabled:!opacity-100 hover:!bg-[rgb(80,82,83)] focus:!border-none',
                wrapper: 'h-11 border-none focus:!border-none',
                rightSection: 'hidden',
            }}
            {...props}
        />
    );
};

export default CusSelect;
