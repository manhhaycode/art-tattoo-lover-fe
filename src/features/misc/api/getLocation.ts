import * as mapPlaceRequest from '@/lib/map-axios';
import { AxiosError } from 'axios';

export const autoCompleteLocation = async (option: google.maps.places.AutocompletionRequest) => {
    try {
        const response: google.maps.places.AutocompleteResponse | AxiosError = await mapPlaceRequest.getPlace(
            '/autocomplete/json',
            {
                params: {
                    ...option,
                },
            },
        );
        if ((response as AxiosError).isAxiosError) {
            throw new Error((response as AxiosError).message);
        }
    } catch (error) {
        throw new Error(error);
    }
};
