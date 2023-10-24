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
            {/* An code từ đây */}
            <div className="pt-12">
                <h1 className="text-center text-white text-4xl font-semibold mb-5">Client stories</h1>
                <h2 className="text-center text-white mb-10 text-xl font-light ">See more reviews on Tattus</h2>
            </div>

            <div className="grid grid-cols-3 gap-x-8 max-w-7xl mx-auto">
                <div>
                    <div className="h-96 mb-5">
                        <img
                            src="https://d1kq2dqeox7x40.cloudfront.net/images/testimonials/0576102b6673880a29f30.png?w=800"
                            alt=""
                            className="w-full h-full rounded-lg object-cover"
                        />
                    </div>
                    <h3 className="text-center font-medium text-lg mb-3">REALLY EASY TO USE! </h3>
                    <span className="block text-center text-white-200 text-sm mb-3">
                        {' '}
                        "It was really easy to use. It showed me loads of different examples of artists, so if I didn’t
                        like one style, I could have a good look through for other options.”
                    </span>
                    <h4 className="text-center font-medium text-lg "> Scarlett</h4>
                </div>

                <div>
                    <div className="h-96 mb-5">
                        <img
                            src="https://d1kq2dqeox7x40.cloudfront.net/images/testimonials/e0ea195c88149cc9935c4.png?w=800"
                            alt=""
                            className="w-full h-full rounded-lg object-cover"
                        />
                    </div>
                    <h3 className="text-center font-medium text-lg mb-3"> GREAT SERVICE</h3>
                    <span className="block text-center text-white-200 text-sm mb-8">
                        {' '}
                        “I like Tattus because you can see many artists and many different tattoo styles. It’s really
                        easy to use.”
                    </span>
                    <h4 className="text-center font-medium text-lg "> Daniel</h4>
                </div>

                <div>
                    <div className="h-96 mb-5">
                        <img
                            src="https://d1kq2dqeox7x40.cloudfront.net/images/testimonials/576102b6673880a29f30d.png?w=800"
                            alt=""
                            className="w-full h-full rounded-lg object-cover"
                        />
                    </div>
                    <h3 className="text-center font-medium text-lg mb-3"> I LOVED THIS EXPERIENCE!</h3>
                    <span className="block text-center text-white-200 text-sm mb-3">
                        “Tattus made it so simple for me to find an artist that would create a responably priced design
                        for me and someone that I would get along with.”{' '}
                    </span>
                    <h4 className="text-center font-medium text-lg ">Zaynab </h4>
                </div>
            </div>
        </div>
    );
}
