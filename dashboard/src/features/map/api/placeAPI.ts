import * as mapPlaceRequest from '@/lib/axios-map';
import { PlaceDetailsResponseData } from '@googlemaps/google-maps-services-js';
import { useMutation, useQuery } from '@tanstack/react-query';
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
                    components: 'country:vn',
                    language: 'vi',
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
                    fields: 'address_components,adr_address,business_status,formatted_address,geometry,name,place_id,plus_code,type,url,utc_offset,vicinity,wheelchair_accessible_entrance',
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
        queryKey: ['placeDetail', option.placeId],
        queryFn: () => placeDetail(option),
        staleTime: Infinity,
        keepPreviousData: true,
    });
};

export const usePlaceDetailMutation = (handleFn: {
    onError?: (error: unknown, variables: unknown, context: unknown) => void;
    onSuccess?: (data: PlaceDetailsResponseData['result'], variables: unknown, context: unknown) => void;
    onMutate?: (variables: google.maps.places.PlaceDetailsRequest) => Promise<PlaceDetailsResponseData['result']>;
}) => {
    return useMutation({
        mutationFn: (options: google.maps.places.PlaceDetailsRequest) => placeDetail(options),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};
