import React from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchStudio() {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    return (
        <>
            <p>Name: {searchParams.get('studioName')}</p>
            <p>Service: {searchParams.get('service')}</p>
        </>
    );
}
