import React from 'react';
import Header from '@/layouts/components/Header';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-dark-theme h-[3000px]">
            <Header />
            {children}
        </div>
    );
}
