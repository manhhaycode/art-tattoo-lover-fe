import { IStudio } from '@/features/studios';
import StudioPin from './StudioPin';
import StudioCardOverlay from './StudioCardOverlay';
import { useGoogleMapStore, useStudioPinStore } from '@/store/componentStore';
import { useEffect } from 'react';
import { adjustPosition } from '@/lib/helper/googleMapHelper';
export default function StudioListPin({ studios }: { studios: IStudio[] }) {
    const { studioPin, setStudioPin, setPositionInfo } = useStudioPinStore();
    const { map } = useGoogleMapStore();
    const studioList =
        studioPin && !studios.find((studio) => studio.id === studioPin.id) ? [...studios, studioPin] : studios;

    useEffect(() => {
        return () => setStudioPin(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {studioList.map((studio) => {
                return (
                    <StudioPin
                        isSelect={studio.id === studioPin?.id}
                        key={studio.id}
                        studio={studio}
                        propsRoot={{
                            onClick: (e) => {
                                setStudioPin(studio);
                                e.stopPropagation();
                                if (map)
                                    setPositionInfo(
                                        adjustPosition({ lat: studio.latitude, lng: studio.longitude }, map),
                                    );
                            },
                        }}
                    />
                );
            })}
            <StudioCardOverlay onClickCloseIcon={() => setStudioPin(null)} studio={studioPin} />
        </>
    );
}
