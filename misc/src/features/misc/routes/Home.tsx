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
            <div className="pt-20">
                <h1 className="text-center text-white text-4xl font-semibold mb-5">Client stories</h1>
                <h2 className="text-center text-white mb-10 text-xl font-light ">See more reviews on Tattus</h2>
            </div>

            <div className="grid grid-cols-3 gap-x-8 max-w-7xl mx-auto">
                <div>
                    <div className="h-96 mb-5 transition-all duration-300 ease-in-out hover:scale-110">
                        <img
                            src="https://d1kq2dqeox7x40.cloudfront.net/images/testimonials/0576102b6673880a29f30.png?w=800"
                            alt=""
                            className="w-full h-full rounded-lg object-cover "
                        />
                    </div>
                    <h3 className="text-center font-medium text-lg mb-3">THỰC SỰ DỄ DÀNG SỬ DỤNG ! </h3>
                    <span className="block text-center text-white-200 text-sm mb-2">
                        {' '}
                        "Nó thực sự dễ sử dụng. Nó cho tôi thấy vô số ví dụ khác nhau về các nghệ sĩ, vì vậy nếu tôi không thích một phong cách, tôi có thể xem qua các lựa chọn khác.”
                    </span>
                    <h4 className="text-center font-medium text-lg mb-24"> Scarlett</h4>
                </div>

                <div>
                    <div className="h-96 mb-5 transition-all duration-300 ease-in-out hover:scale-110">
                        <img
                            src="https://d1kq2dqeox7x40.cloudfront.net/images/testimonials/e0ea195c88149cc9935c4.png?w=800"
                            alt=""
                            className="w-full h-full rounded-lg object-cover "
                        />
                    </div>
                    <h3 className="text-center font-medium text-lg mb-3">DỊCH VỤ TUYỆT VỜI</h3>
                    <span className="block text-center text-white-200 text-sm mb-7">
                        {' '}
                        “Tôi thích Tattus vì bạn có thể thấy nhiều nghệ sĩ và nhiều phong cách xăm khác nhau. Nó thực sự dễ sử dụng.”
                    </span>
                    <h4 className="text-center font-medium text-lg mb-24 "> Daniel</h4>
                </div>

                <div>
                    <div className="h-96 mb-5 transition-all duration-300 ease-in-out hover:scale-110">
                        <img
                            src="https://d1kq2dqeox7x40.cloudfront.net/images/testimonials/576102b6673880a29f30d.png?w=800"
                            alt=""
                            className="w-full h-full rounded-lg object-cover "
                        />
                    </div>
                    <h3 className="text-center font-medium text-lg mb-3"> TÔI YÊU TRẢI NGHIỆM NÀY !</h3>
                    <span className="block text-center text-white-200 text-sm mb-1">
                        {' '}“Tattus đã giúp tôi dễ dàng tìm được một nghệ sĩ có thể tạo ra một thiết kế có mức giá phù hợp cho tôi và một người nào đó mà tôi có thể hợp tác.”
                    </span>
                    <h4 className="text-center font-medium text-lg mb-24 ">Zaynab </h4>
                </div>
            </div>

            <div className="mx-auto w-full xl:w-[900px] pt-24 " >
                <div>
                    <div className="h-96 mb-12 transition-all duration-300 ease-in-out hover:scale-110">
                        <img
                            src="https://d1kq2dqeox7x40.cloudfront.net/web/front/inspire.png?w=800"
                            alt=""
                            className="w-full h-full rounded-lg object-cover "
                        />
                    </div>
                    <h3 className="text-center font-medium text-lg mb-8"> Lấy cảm hứng cho hình xăm tiếp theo của bạn.</h3>
                    <span className="block text-center text-gray-200 text-sm mb-1">
                        {' '}Chúng tôi đã tuyển chọn một bộ sưu tập các hình xăm đẹp để bạn phám phá.
                    </span>
                    <div className="flex justify-center">
                    <button className="inline-button justify-center py-3 px-10 m-5  text-white bg-[gray] hover:bg-gray-400 rounded-lg transition-colors">Tatto gallery</button>
              </div>
                </div>
            </div>
        </div>
    );
}
//<button className="inline-button py-3 px-10 m-5  text-white bg-[#6A5AF9] hover:bg-red-400 rounded-lg transition-colors">Tatto gallery</button>
  //  <input type="text" className="py-3 px-10 border border-[#ccc]"/>