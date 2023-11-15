import Slider1 from '@/assets/img/sliderHome1.png';
export default function Discover() {
    return (
        <div id="content" className="pt-6 w-full h-[1200px]">
            <div className="mx-auto w-full mb-16 xl:w-[1372px]">
                <div className="h-[504px] relative" style={{ backgroundImage: `url(${Slider1})` }}>
                    <div className="absolute top-11 w-full font-serif-slide text-white text-center">
                        <h1 className="text-[64px] mb-2">Chào mừng đến với Tattus</h1>
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-10 px-4 md:px-0">
                <h2 className="text-4xl font-bold mb-5 text-center">Dịch vụ của chúng tôi</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="bg-transparent p-5 rounded shadow">
                        <div className="h-96 mb-12 transition-all duration-300 ease-in-out hover:scale-110">
                            <img src="https://d1kq2dqeox7x40.cloudfront.net/images/posts/postImage_iCaemJe7me.png?w=600" alt="" className="w-full h-full rounded-lg object-cover " />
                            <h3 className="text-xl font-bold text-center mt-6">Hình xăm cá nhân</h3>
                            <p className="mt-4 text-gray-500 text-center font-medium">Chúng tôi cung cấp dịch vụ hình xăm cá nhân với nhiều mẫu mã đa dạng.</p>
                        </div>
                    </div>
                    <div className="bg-transparent p-5 rounded shadow">
                        <div className="h-96 mb-12 transition-all duration-300 ease-in-out hover:scale-110">
                            <img src="https://d1kq2dqeox7x40.cloudfront.net/images/posts/20180925_lpFNYCbzXR77T1U.png?w=600" alt="" className="w-full h-full rounded-lg object-cover " />
                            <h3 className="text-xl font-bold text-center mt-6">Hình xăm theo yêu cầu</h3>
                            <p className="mt-4 text-gray-500 text-center font-medium">Bạn có thể yêu cầu hình xăm theo ý muốn của mình.</p>
                        </div>
                    </div>
                    <div className="bg-transparent p-5 rounded shadow">
                        <div className="h-96 mb-12 transition-all duration-300 ease-in-out hover:scale-110">
                            <img src="https://morgansinktattoo.com/wp-content/uploads/2023/03/tattoo2.jpg" alt="" className="w-full h-full rounded-lg object-cover " />
                            <h3 className="text-xl font-bold text-center mt-6">Tư vấn hình xăm</h3>
                            <p className="mt-4 text-gray-500 text-center font-medium">Chúng tôi cung cấp dịch vụ tư vấn hình xăm để bạn có thể lựa chọn được hình xăm phù hợp nhất.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}




