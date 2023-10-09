import { TattooIcon } from '@/assets/icons';

export interface ICategory {
    id: string;
    name: string;
    icon?: string;
}

export default function Category({
    category,
    styleSelect,
    ...props
}: {
    category: ICategory;
    styleSelect?: {
        icon: React.CSSProperties;
        text: React.CSSProperties;
    };
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button {...props} className="flex flex-col gap-y-3 items-center font-sans text-sm">
            <TattooIcon styles={styleSelect ? styleSelect.icon : { stroke: '#B0B3B8' }} />
            <span className="text-sm font-medium" style={styleSelect ? styleSelect.text : { color: 'white' }}>
                {category.name}
            </span>
        </button>
    );
}
