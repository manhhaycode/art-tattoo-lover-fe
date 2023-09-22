import { db } from '@/assets/data';
import { MapPinIcon, SearchIcon } from '@/assets/icons';
import { useState, useRef, useEffect } from 'react';
import Image from '../common/Image';
import Input from '../common/Input';
import DropdownImage from '../Dropdown';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSearchLocationStore } from '@/store/componentStore';

interface IService {
    id?: number;
    name?: string;
    image?: string;
}

export default function SearchBarLoction() {
    const serviceRef = useRef<HTMLButtonElement>(null);
    const [loctionName, setNameLoction] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [serviceChoose, setServiceChoose] = useState<IService>({});
    const setLocation = useSearchLocationStore((state) => state.setLocation);
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLocation(loctionName);
        }, 400);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loctionName]);

    return (
        <div className="w-[90%] flex items-center bg-white shadow-[0_0_0_4px_#fff] mx-auto h-16 rounded-2xl">
            <div className="p-1 h-full w-3/5 ">
                <div className="input-search-location p-1 rounded-2xl h-full flex items-center">
                    <div className="p-3">
                        <MapPinIcon styles={{ color: '#000' }} />
                    </div>
                    <Input
                        value={loctionName || ''}
                        onChange={(e) => {
                            if (e.target.value !== ' ') setNameLoction(e.target.value);
                        }}
                        className="mr-1 input-container"
                        type="primary"
                        placeholder="Tìm kiếm theo địa điểm, quận, tên đường..."
                    />
                </div>
            </div>
            <div className="border-[1px] border-solid border-[#a9afbb] h-10 mx-2"></div>
            <div className="flex items-center relative w-2/5 h-full p-1">
                <div className="service-search-location p-1 rounded-2xl flex items-center w-full">
                    <button
                        ref={serviceRef}
                        onClick={() => {
                            if (!isDropdownVisible) setIsDropdownVisible(true);
                        }}
                        onBlur={() => {
                            console.log('blur');
                            setIsDropdownVisible(false);
                        }}
                        className={
                            'font-medium font-sans text-[#8e8e8e] w-full h-12 flex items-center rounded-3xl pl-4 relative cursor-pointer'
                        }
                    >
                        {serviceChoose.name ? <p className="text-black">{serviceChoose.name}</p> : 'Dịch vụ bất kỳ'}
                        <DropdownImage
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            animate={isDropdownVisible}
                            className="mt-4 py-4 absolute top-full -left-[18px] w-[500px]"
                        >
                            <h1 className="font-semibold text-sm ml-1 py-2 mb-5">Tìm kiếm các dịch vụ Tattoo</h1>
                            <div className="grid grid-cols-3 gap-x-3 gap-y-4">
                                {db.servicesTattoo.map((service) => {
                                    return (
                                        <div key={service.id} className="flex flex-col">
                                            <Image
                                                onClick={() => {
                                                    setServiceChoose(service);
                                                    setIsDropdownVisible(false);
                                                }}
                                                className={'rounded-xl border-2 border-solid border-transparent hover:shadow-shadow-dropdown '.concat(
                                                    service.id === serviceChoose.id ? '!border-button-primary' : '',
                                                )}
                                                src={service.img}
                                            />
                                            <div className="flex items-center flex-grow">
                                                <p className="text-sm mt-2 mx-px">{service.name}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </DropdownImage>
                    </button>
                </div>
                <motion.button
                    whileTap={{ scale: 0.8 }}
                    onTap={() => {
                        navigate('/search-location?locationName=' + loctionName + '&service=' + serviceChoose.name);
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="flex gap-x-2 py-[14px] px-6 items-center bg-button-primary rounded-2xl min-w-fit ml-3 cursor-pointer"
                >
                    <SearchIcon styles={{ stroke: '#fff', strokeWidth: '3', width: '20', height: '20' }} />
                    <p className="justify-self-center font-semibold text-base leading-none">Tìm Kiếm</p>
                </motion.button>
            </div>
        </div>
    );
}
