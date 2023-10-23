import { EPositionOverlayView } from '@/features/map/types';
import { PlaceData, PlaceType2 } from '@googlemaps/google-maps-services-js';

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
    let zoom = getBoundsZoomLevel(boundBox, {
        width: mapRef.current.mapRef.clientHeight,
        height: mapRef.current.mapRef.clientWidth,
    });

    if (zoom > 14) zoom = 14;

    map.setCenter(data.location);
    map.setZoom(zoom);
};

export const convertAdressComponents = (addressComponent: PlaceData['address_components']) => {
    let result: string = '';
    let length = 0;
    addressComponent.forEach((item) => {
        const types = item.types;

        if (length === 2) return;

        if (
            types.includes(PlaceType2.sublocality) ||
            types.includes(PlaceType2.sublocality_level_1) ||
            types.includes(PlaceType2.sublocality_level_2) ||
            types.includes(PlaceType2.sublocality_level_3) ||
            types.includes(PlaceType2.sublocality_level_4) ||
            types.includes(PlaceType2.sublocality_level_5)
        ) {
            result = result.concat(item.long_name + ', ');
            length++;
        }
        if (types.includes(PlaceType2.locality)) {
            result = result.concat(item.long_name + ', ');
            length++;
        }
        if (
            types.includes(PlaceType2.administrative_area_level_1) ||
            types.includes(PlaceType2.administrative_area_level_2) ||
            types.includes(PlaceType2.administrative_area_level_3) ||
            types.includes(PlaceType2.administrative_area_level_4)
        ) {
            result = result.concat(item.long_name + ', ');
            length++;
        }
    });
    return result.slice(0, -2);
};

export const adjustPosition = (location: { lat: number; lng: number }, map: google.maps.Map): EPositionOverlayView => {
    const overlay = new google.maps.OverlayView();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    overlay.draw = function () {}; // empty function required
    overlay.setMap(map);
    const position: EPositionOverlayView[] = [];
    const projection = overlay.getProjection();
    if (!projection) return EPositionOverlayView.CENTER; // make sure projection exists

    const point = projection.fromLatLngToContainerPixel(new google.maps.LatLng(location.lat, location.lng));
    const mapHeight = map.getDiv().offsetHeight;
    const mapWidth = map.getDiv().offsetWidth;
    if (!point) return EPositionOverlayView.CENTER;

    const widthContainer = 320;
    const heightContainer = 280;
    const marginY = 20;
    const marginX = 30;

    if (
        point.x + widthContainer + marginX < mapWidth &&
        point.y + heightContainer / 2 < mapHeight &&
        point.y - heightContainer / 2 > 0
    ) {
        position.push(EPositionOverlayView.RIGHT);
    }

    if (
        point.x - (widthContainer + marginX) > 0 &&
        point.y + heightContainer / 2 < mapHeight &&
        point.y - heightContainer / 2 > 0
    ) {
        position.push(EPositionOverlayView.LEFT);
    }

    if (
        point.x - widthContainer / 2 > 0 &&
        point.x + widthContainer / 2 < mapWidth &&
        point.y - (heightContainer + marginY) > 0
    ) {
        position.push(EPositionOverlayView.TOP);
    }

    if (
        point.x - widthContainer / 2 > 0 &&
        point.x + widthContainer / 2 < mapWidth &&
        point.y + heightContainer + marginY < mapHeight
    ) {
        position.push(EPositionOverlayView.BOTTOM);
    }

    if (position.length > 0) return position[0];
    else return EPositionOverlayView.CENTER;
};
