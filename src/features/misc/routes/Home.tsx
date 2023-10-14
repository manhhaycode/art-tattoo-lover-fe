import Slider1 from '@/assets/img/sliderHome1.png';
import SearchBarLocation from '@/features/map/components/SearchBarLocation';

export default function Home() {
    return (
        <div id="content" className="pt-6 w-full h-[3000px]">
            <div className="mx-auto w-full mb-9 xl:w-[1372px]">
                <div className="h-[504px] relative" style={{ backgroundImage: `url(${Slider1})` }}>
                    <div className="absolute top-11 w-full font-serif-slide text-white text-center">
                        <h1 className="text-[64px] mb-2">Tìm Tattoo Studio</h1>
                        <h1 className="text-5xl">Gần Nhất</h1>
                    </div>
                    <div className="absolute w-full -bottom-8 ">
                        <SearchBarLocation />
                    </div>
                </div>
            </div>
        </div>
    );
}
