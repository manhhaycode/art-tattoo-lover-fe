import GoogleMapReact from 'google-map-react';
import config from '@/config';
import { useSearchLocationStore } from '@/store/componentStore';
import { usePlaceDetail } from '@/features/misc/api/placeAPI';
import { useState, useEffect } from 'react';
interface MarkerProps {
    text: string;
    lat: number;
    lng: number;
}

const AnyReactComponent = ({ text }: MarkerProps) => <div>{text}</div>;

export default function GoogleMap() {
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

    useEffect(() => {
        if (data && data.geometry) {
            setPropsMap((propsMap) => {
                return {
                    ...propsMap,
                    center: {
                        lat: data.geometry!.location.lat,
                        lng: data.geometry!.location.lng,
                    },
                    bounds: {
                        northeast: {
                            lat: data.geometry!.viewport.northeast.lat,
                            lng: data.geometry!.viewport.southwest.lng,
                        },
                        southwest: {
                            lat: data.geometry!.viewport.southwest.lat,
                            lng: data.geometry!.viewport.southwest.lng,
                        },
                    },
                };
            });
        }
        setSessionToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <div id="google-map" className="sticky top-[163px] h-[calc(100vh-162px)] w-[37%]">
            <GoogleMapReact
                bootstrapURLKeys={{ key: config.API.API_KEY }}
                center={propsMap.center}
                defaultZoom={propsMap.zoom}
                options={{ mapId: '4efdfc21c30d0be0', gestureHandling: 'greedy' }}
            >
                <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
            </GoogleMapReact>
        </div>
    );
}
