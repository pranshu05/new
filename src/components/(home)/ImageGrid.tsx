/* eslint-disable @next/next/no-img-element */
const images = ['/home-1.jpg', '/home-2.jpg', '/home-3.jpg', '/home-4.jpg', '/home-5.jpg', '/home-6.jpg', '/home-7.jpg'];

const HomeImageGrid: React.FC = () => (
    <div className="columns-2 md:columns-3 my-4 gap-2 md:gap-4">
        {images.map((src, index) => (
            <div key={index} className="mb-2 md:mb-4">
                <img data-aos="fade-up" className="w-full h-auto rounded-lg grayscale transition-all duration-500 ease-in-out transform" width={1000} height={1000} src={src} alt="" loading="lazy" />
            </div>
        ))}
    </div>
);

export default HomeImageGrid;