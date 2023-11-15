import { StarIcon } from '@/assets/icons';
import { IStudio } from '@/features/studios';
import { OverlayViewF } from '@react-google-maps/api';
import { HTMLMotionProps, m } from 'framer-motion';
import { ButtonHTMLAttributes, memo } from 'react';
import { twMerge } from 'tailwind-merge';

const StudioPin = ({
    studio,
    isSelect,
    propsButton,
    propsRoot,
}: {
    studio: IStudio;
    isSelect?: boolean;
    propsButton?: ButtonHTMLAttributes<HTMLButtonElement>;
    propsRoot?: HTMLMotionProps<'div'>;
}) => {
    return (
        <OverlayViewF
            position={{ lat: studio.latitude, lng: studio.longitude }}
            mapPaneName="overlayMouseTarget"
            getPixelPositionOffset={(width, height) => {
                return {
                    x: -(width / 2),
                    y: -(height / 2),
                };
            }}
        >
            <m.div
                {...propsRoot}
                className={twMerge('studio-pin-container origin-center', propsRoot?.className || '')}
                animate={isSelect ? { scale: 1.1 } : { scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 300 }}
            >
                <button
                    {...propsButton}
                    className={twMerge(
                        'bg-button-primary text-white text-sm font-bold rounded-lg px-2 py-1 border-2 border-solid border-black flex gap-x-1 ',
                        propsButton?.className || '',
                        isSelect ? 'bg-black' : '',
                    )}
                >
                    <StarIcon
                        styles={{
                            fill: 'white',
                        }}
                    />
                    {studio.rating.toFixed(2) || '0.00'}
                </button>
            </m.div>
        </OverlayViewF>
    );
};

const MemoizedComponent = memo(StudioPin, (prevProps, nextProps) => prevProps.isSelect === nextProps.isSelect);

export default MemoizedComponent;
