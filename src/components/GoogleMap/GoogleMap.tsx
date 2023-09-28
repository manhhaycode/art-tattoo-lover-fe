import { GoogleMap as GoogleMapReact, useJsApiLoader } from '@react-google-maps/api';
import config from '@/config';
import { useGoogleMapStore, useSearchLocationStore } from '@/store/componentStore';
import { usePlaceDetail } from '@/features/misc/api/placeAPI';
import { useState, useEffect, useRef, useCallback } from 'react';
import { SkeletonLoader } from '../SkeletonLoader';
import { setMapFitBounds } from '@/lib/helper/googleMapHelper';
import AutocompleteAddress from '../AutocompleteAddress';
import { ArrowCloseIcon, ArrowOpenIcon } from '@/assets/icons';
import { useNavigate } from 'react-router-dom';
import { encodeStringtoURI } from '@/lib/helper';

export default function GoogleMap() {
    const { isLoaded } = useJsApiLoader({
        id: '4efdfc21c30d0be0',
        googleMapsApiKey: config.API.API_KEY,
    });
    const { sessionToken, placeId, setSessionToken } = useSearchLocationStore();
    const { data } = usePlaceDetail({ placeId, sessionToken });
    const [isIdle, setIsIdle] = useState({ isFirstIdle: false, state: false });
    const [isOpen, setIsOpen] = useState(false);
    const { map, setMap } = useGoogleMapStore();
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapRef = useRef<any>(null);

    const handleClickLoaction = useCallback(
        (location: string, placeId: string) => {
            navigate(`/search-location?location=${encodeStringtoURI(location)}&placeId=${placeId}`);
        },
        [navigate],
    );

    useEffect(() => {
        if (isLoaded && data && data.geometry && map) {
            setMapFitBounds(map, mapRef, data.geometry);
        }
        setSessionToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded, data?.place_id]);

    return (
        <div id="google-map" className="sticky top-[163px] h-[calc(100vh-162px)] w-[37%]">
            <div className="relative w-full h-full">
                {!isIdle.isFirstIdle && <SkeletonLoader className="absolute top-0 left-0 z-10" />}
                {isLoaded && (
                    <>
                        <div className="w-2/3 absolute top-3 left-3 z-[1]">
                            <div className="relative">
                                <AutocompleteAddress isVisible={isOpen} navigateOnClickOption={handleClickLoaction} />
                                {isOpen ? (
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="absolute z-[1] -top-1 left-full ml-3 p-[14px] rounded-lg bg-white text-black"
                                    >
                                        <ArrowOpenIcon />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setIsOpen(true)}
                                        className="absolute z-[1] -top-1 left-0 ml-3 p-[14px] rounded-lg bg-white text-black"
                                    >
                                        <ArrowCloseIcon />
                                    </button>
                                )}
                            </div>
                        </div>
                        <GoogleMapReact
                            ref={mapRef}
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            zoom={10}
                            onUnmount={() => setMap(null)}
                            onLoad={(map) => {
                                setMap(map);
                            }}
                            onIdle={() => {
                                if (!isIdle.isFirstIdle && map && data && data.geometry) {
                                    setMapFitBounds(map, mapRef, data.geometry);
                                    setIsIdle({ isFirstIdle: true, state: false });
                                }
                            }}
                            options={{
                                gestureHandling: 'greedy',
                                mapTypeControl: false,
                                streetViewControl: false,
                                mapId: '4efdfc21c30d0be0',
                            }}
                        ></GoogleMapReact>
                    </>
                )}
            </div>
        </div>
    );
}
