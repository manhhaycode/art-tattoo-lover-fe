import { PlaceData } from '@googlemaps/google-maps-services-js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getBoundsZoomLevel = (bounds: google.maps.LatLngBounds, mapSize: { width: number; height: number }) => {
    const WORLD_DIM = { height: 256, width: 256 };
    const ZOOM_MAX = 21;

    const latRad = (lat: number) => {
        const sin = Math.sin((lat * Math.PI) / 180);
        const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
        return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    };

    function zoom(mapPx: number, worldPx: number, fraction: number) {
        return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    const latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

    const lngDiff = ne.lng() - sw.lng();
    const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360;

    const latZoom = zoom(mapSize.height, WORLD_DIM.height, latFraction);
    const lngZoom = zoom(mapSize.width, WORLD_DIM.width, lngFraction);

    return Math.min(latZoom, lngZoom, ZOOM_MAX);
};

export const setMapFitBounds = (
    map: google.maps.Map,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapRef: React.MutableRefObject<any>,
    data: PlaceData['geometry'],
) => {
    const boundBox = new google.maps.LatLngBounds();
    boundBox.extend(data.viewport.northeast);
    boundBox.extend(data.viewport.southwest);
    const zoom = getBoundsZoomLevel(boundBox, {
        width: mapRef.current.mapRef.clientHeight,
        height: mapRef.current.mapRef.clientWidth,
    });
    map.setCenter(data.location);
    map.setZoom(zoom);
};
