import GoogleMap from '@/components/GoogleMap';
// import { useLocation } from 'react-router-dom';

export default function SearchLocation() {
    // const { search } = useLocation();
    // const searchParams = new URLSearchParams(search);
    return (
        <>
            <div className="list-category h-20 w-full sticky top-20 bg-gray-dark"></div>
            <div id="content" className="content-wrapper h-full">
                <div className="flex relative h-full">
                    <div className="p-6 w-[63%]"></div>
                    <GoogleMap />
                </div>
            </div>
        </>
    );
}
