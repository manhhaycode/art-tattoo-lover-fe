import { useGeolocated } from 'react-geolocated';

const useGeoLocation = () => {
    const geolocation = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
        watchLocationPermissionChange: true,
    });

    return geolocation;
};

export default useGeoLocation;
