import { GoogleMap as GoogleMapReact, useJsApiLoader } from '@react-google-maps/api';
import config from '@/config';
import { useSearchLocationStore } from '@/store/componentStore';
import { usePlaceDetail } from '@/features/misc/api/placeAPI';
import { useState, useEffect, useCallback } from 'react';
interface MarkerProps {
    text: string;
    lat: number;
    lng: number;
}

const AnyReactComponent = ({ text }: MarkerProps) => <div>{text}</div>;

export default function GoogleMap() {
    const { isLoaded } = useJsApiLoader({
        id: '4efdfc21c30d0be0',
        googleMapsApiKey: config.API.API_KEY,
    });
    const { sessionToken, placeId, setSessionToken } = useSearchLocationStore();
    const { data } = usePlaceDetail({ placeId, sessionToken });
    const defaultProps = {
        center: { lat: 10.8230989, lng: 106.6296638 },
        // Set the zoom level to 10.
        zoom: 10,
        // Set the bounds of the map to the viewport of Ho Chi Minh City.
        bounds: {
            northeast: { lat: 11.1602136037603, lng: 107.0265769179448 },
            southwest: { lat: 10.34937042531151, lng: 106.3638783822327 },
        },
    };
    const [propsMap, setPropsMap] = useState(defaultProps);
    const [map, setMap] = useState<google.maps.Map | null>(null);

    const handleUnmount = useCallback(() => {
        setMap(null);
    }, []);

    useEffect(() => {
        if (data && data.geometry) {
            setPropsMap((propsMap) => {
                return {
                    ...propsMap,
                    center: data.geometry!.location,
                    bounds: {
                        northeast: data.geometry!.viewport.northeast,
                        southwest: data.geometry!.viewport.southwest,
                    },
                };
            });
            const boundBox = new google.maps.LatLngBounds();
            boundBox.extend(data.geometry!.viewport.northeast);
            boundBox.extend(data.geometry!.viewport.southwest);
            if (map) map.fitBounds(boundBox, 0);
        }
        setSessionToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <div id="google-map" className="sticky top-[163px] h-[calc(100vh-162px)] w-[37%]">
            {isLoaded && (
                <GoogleMapReact
                    mapContainerStyle={{ width: 550, height: 550 }}
                    center={propsMap.center}
                    zoom={propsMap.zoom}
                    onUnmount={handleUnmount}
                    onLoad={(map) => {
                        setMap(map);
                    }}
                    options={{
                        gestureHandling: 'greedy',
                        mapTypeControl: false,
                        streetViewControl: false,
                        mapId: '4efdfc21c30d0be0',
                    }}
                ></GoogleMapReact>
            )}
        </div>
    );
}
