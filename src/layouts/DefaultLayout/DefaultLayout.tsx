import React from 'react';
import Header from '@/layouts/components/Header';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-dark-theme h-screen">
            <Header />
            {children}
        </div>
    );
}
