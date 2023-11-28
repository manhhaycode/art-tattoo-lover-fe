import Slider1 from '@/assets/img/sliderHome1.png';

export default function Discover() {
  return (
    <div id="content" className="pt-6 w-full">
      <div className="mx-auto w-full mb-16 xl:max-w-[1372px]">
        <div className="h-[40vh] md:h-[50vh] lg:h-[60vh] relative" style={{ backgroundImage: `url(${Slider1})`, backgroundSize: 'cover' }}>
          <div className="absolute top-2/5 w-full font-serif-slide text-white text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl mb-2">Chào mừng đến với Tattus</h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-10 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-5 text-center">Dịch vụ của chúng tôi</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div key={index} className="bg-transparent p-5 rounded shadow">
              <div className="h-80 md:h-96 mb-12 transition-all duration-300 ease-in-out hover:scale-110">
                <img
                  src={service.image}
                  alt={`Service ${index + 1}`}
                  className="w-full h-full rounded-lg object-cover object-center"
                />
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-center mt-6">{service.title}</h3>
                <p className="mt-4 text-gray-500 text-center font-medium">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const services = [
  {
    title: 'Hình xăm cá nhân',
    description: 'Chúng tôi cung cấp dịch vụ hình xăm cá nhân với nhiều mẫu mã đa dạng.',
    image: 'https://truongthanhaudio.com/upload/original-image/nhung-hinh-xam-dep-nhat-hien-nay5.jpeg',
  },
  {
    title: 'Hình xăm theo yêu cầu',
    description: 'Bạn có thể yêu cầu hình xăm theo ý muốn của mình.',
    image: 'https://d1kq2dqeox7x40.cloudfront.net/images/posts/20180925_lpFNYCbzXR77T1U.png?w=600',
  },
  {
    title: 'Tư vấn hình xăm',
    description: 'Chúng tôi cung cấp dịch vụ tư vấn hình xăm để bạn có thể lựa chọn được hình xăm phù hợp nhất.',
    image: 'https://morgansinktattoo.com/wp-content/uploads/2023/03/tattoo2.jpg',
  },
];
