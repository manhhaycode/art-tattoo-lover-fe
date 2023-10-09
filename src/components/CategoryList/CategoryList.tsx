import { db } from '@/assets/data';
import Category from './Category';
import { useState } from 'react';

export default function CategoryList() {
    const [isSelect, setIsSelect] = useState('');
    return (
        <div className="flex justify-between">
            {db.servicesTattoo.map((category) => (
                <Category
                    onClick={() => {
                        setIsSelect(category.id);
                    }}
                    key={category.id}
                    category={category}
                    {...(isSelect === category.id && {
                        styleSelect: {
                            icon: { stroke: '#FF3B5C' },
                            text: { color: '#FF3B5C' },
                        },
                    })}
                />
            ))}
        </div>
    );
}
