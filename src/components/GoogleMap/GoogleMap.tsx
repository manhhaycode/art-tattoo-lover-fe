import GoogleMapReact from 'google-map-react';
import config from '@/config';

interface MarkerProps {
    text: string;
    lat: number;
    lng: number;
}

const AnyReactComponent = ({ text }: MarkerProps) => <div>{text}</div>;

export default function GoogleMap() {
    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627,
        },
        zoom: 11,
    };
    return (
        <div id="google-map" className="sticky top-[163px] h-[calc(100vh-162px)] w-[37%]">
            <GoogleMapReact
                bootstrapURLKeys={{ key: config.API.API_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={{ mapId: '4efdfc21c30d0be0', gestureHandling: 'greedy' }}
            >
                <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
            </GoogleMapReact>
        </div>
    );
}
