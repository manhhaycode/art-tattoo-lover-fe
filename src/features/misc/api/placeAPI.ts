import * as mapPlaceRequest from '@/lib/axios-map';
import { PlaceDetailsResponseData } from '@googlemaps/google-maps-services-js';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const autoCompleteLocation = async (
    option: google.maps.places.AutocompletionRequest,
): Promise<google.maps.places.AutocompleteResponse> => {
    if (option.input !== '') {
        try {
            const response: google.maps.places.AutocompleteResponse = await mapPlaceRequest.get('/autocomplete/json', {
                params: {
                    ...option,
                    sessiontoken: option.sessionToken,
                },
            });
            return response;
        } catch (_error) {
            const error = _error as AxiosError;
            if (error.response) {
                console.log(error.response.data);
            } else console.log(_error.message);
        }
    }
    return { predictions: [] };
};

export const placeDetail = async (
    option: google.maps.places.PlaceDetailsRequest,
): Promise<PlaceDetailsResponseData['result']> => {
    if (option.placeId.length > 0) {
        try {
            const { placeId, ...rest } = option;
            const placeid = placeId;
            const response: PlaceDetailsResponseData = await mapPlaceRequest.get('/details/json', {
                params: {
                    ...rest,
                    placeid,
                    sessiontoken: option.sessionToken,
                },
            });
            return response.result;
        } catch (_error) {
            const error = _error as AxiosError;
            if (error.response) {
                console.log(error.response.data);
            } else console.log(_error.message);
        }
    }
    return {};
};

export const useAutoCompleteLocation = (option: google.maps.places.AutocompletionRequest) => {
    return useQuery({
        queryKey: ['autoCompleteLocation', option.input],
        queryFn: () => autoCompleteLocation(option),
        staleTime: Infinity,
        keepPreviousData: true,
    });
};

export const usePlaceDetail = (option: google.maps.places.PlaceDetailsRequest) => {
    return useQuery({
        queryKey: ['autoCompleteLocation', option.placeId],
        queryFn: () => placeDetail(option),
        staleTime: Infinity,
        keepPreviousData: true,
    });
};
