import { TattooIcon } from '@/assets/icons';
import { forwardRef } from 'react';

export interface ICategory {
    id: string;
    name: string;
    icon?: React.ReactNode;
    image?: string;
}

const Category = forwardRef(function (
    props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
        category: ICategory;
        styleSelect?: {
            icon: React.CSSProperties;
            text: React.CSSProperties;
        };
    },
    ref: React.ForwardedRef<HTMLButtonElement>,
) {
    const { category, styleSelect, ...rest } = props;

    return (
        <button ref={ref} {...rest} className="flex flex-col gap-y-3 items-center font-sans text-sm">
            <TattooIcon styles={styleSelect ? styleSelect.icon : { stroke: '#B0B3B8' }} />
            <span
                className="text-sm font-medium truncate max-w-[160px]"
                style={styleSelect ? styleSelect.text : { color: 'white' }}
            >
                {category.name}
            </span>
        </button>
    );
});

export default Category;
