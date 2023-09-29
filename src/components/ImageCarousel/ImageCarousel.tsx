import Carousel, { CarouselProps } from 'react-multi-carousel';
import Image from '../common/Image';

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
                    {...props}
                    responsive={props.responsive ? props.responsive : responsive}
                    className="h-full rounded-lg"
                >
                    {listSrc.map((src, index) => (
                        <Image key={index} src={src} />
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
