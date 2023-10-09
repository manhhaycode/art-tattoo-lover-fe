import Carousel, { CarouselProps } from 'react-multi-carousel';
import Image from '../common/Image';
import { ArrowRightIcon, ArrowLeftIcon } from '@/assets/icons';

const CustomDot = ({ onClick, active }: { onClick?: () => void; active?: boolean }) => {
    return (
        <div
            className={`h-[6px] w-[6px] mx-[3px] rounded-[50%] bg-white ${active ? '' : 'opacity-60'} cursor-pointer`}
            onClick={(e) => {
                if (onClick) onClick();
                e.preventDefault();
            }}
        ></div>
    );
};

const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => {
    return (
        <button
            onClick={(e) => {
                if (onClick) onClick();
                e.preventDefault();
            }}
            className="absolute right-3 p-[10px] rounded-[50%] bg-black hidden group-hover:!block"
        >
            <ArrowRightIcon />
        </button>
    );
};

const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => {
    return (
        <button
            onClick={(e) => {
                if (onClick) onClick();
                e.preventDefault();
            }}
            className="absolute left-3 p-[10px] rounded-[50%] bg-black hidden group-hover:!block"
        >
            <ArrowLeftIcon />
        </button>
    );
};

export default function ImageCarousel({ listSrc, ...props }: { listSrc: string[] } & Partial<CarouselProps>) {
    const responsive = {
        all: {
            breakpoint: { max: 4000, min: 0 },
            items: 1,
        },
    };

    return (
        <div className="w-full pt-[100%] relative">
            <div className="absolute top-0 left-0 bottom-0 right-0">
                <Carousel
                    dotListClass="mb-2"
                    // swipeable={true}
                    showDots={true}
                    customDot={<CustomDot />}
                    customRightArrow={<CustomRightArrow />}
                    customLeftArrow={<CustomLeftArrow />}
                    {...props}
                    responsive={props.responsive ? props.responsive : responsive}
                    className="group h-full rounded-lg"
                >
                    {listSrc.map((src, index) => (
                        <Image className="cursor-pointer" draggable={false} key={index} src={src} />
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
