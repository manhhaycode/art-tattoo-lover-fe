import { IStudio } from '@/features/studios';
import { StudioCardInfo } from '@/features/studios/components';
import { useStudioPinStore } from '@/store/componentStore';
import { OverlayViewF } from '@react-google-maps/api';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
const StudioCardOverlay = ({
    studio,
    onClickCloseIcon,
}: {
    studio: IStudio | null;
    onClickCloseIcon: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => void;
}) => {
    const { positionInfo } = useStudioPinStore();

    return (
        <OverlayViewF
            mapPaneName="floatPane"
            position={{ lat: studio?.latitude || 0, lng: studio?.longitude || 0 }}
            getPixelPositionOffset={(width, height) => {
                return {
                    x: -(width / 2),
                    y: -(height / 2),
                };
            }}
        >
            {studio && (
                <div
                    className={twMerge(
                        'studio-overlay-view absolute bottom-0 translate-x-[calc(0%+37.8631px)] translate-y-[calc(50%+0px)] font-sans ',
                        positionInfo,
                    )}
                >
                    <div className="w-80">
                        <StudioCardInfo onClickCloseIcon={onClickCloseIcon} isSlide={true} studio={studio} />
                    </div>
                </div>
            )}
        </OverlayViewF>
    );
};

const MemoizedComponent = memo(
    StudioCardOverlay,
    (prevProps, nextProps) => prevProps.studio?.id === nextProps.studio?.id,
);

export default MemoizedComponent;
