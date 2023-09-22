import { useLocation } from 'react-router-dom';

export default function SearchLocation() {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    return (
        <>
            <p>Name: {searchParams.get('locationName')}</p>
            <p>Service: {searchParams.get('service')}</p>
        </>
    );
}
