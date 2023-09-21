import { db } from '@/assets/data';
import { MapPinIcon } from '@/assets/icons';
import { useState, useRef } from 'react';
import Image from '../common/Image';
import Input from '../common/Input';
import Modal from '../Modal';

interface IService {
    id?: number;
    name?: string;
    image?: string;
}

export default function SearchBarLoction() {
    const serviceRef = useRef<HTMLButtonElement>(null);
    const [loctionName, setNameLoction] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [serviceChoose, setServiceChoose] = useState<IService>({});

    return (
        <div className="w-[90%] flex items-center bg-white mx-auto h-16 rounded-2xl">
            <div className="flex p-2 items-center h-full w-3/5">
                <div className="p-3">
                    <MapPinIcon styles={{ color: '#000' }} />
                </div>
                <Input
                    value={loctionName || ''}
                    onChange={(e) => {
                        if (e.target.value !== ' ') setNameLoction(e.target.value);
                    }}
                    type="primary"
                    placeholder="Tìm kiếm theo địa điểm, quận, tên đường..."
                />
            </div>
            <div className="border-[1px] border-solid border-[#a9afbb] h-10"></div>
            <div className="flex items-center relative w-2/5 h-full">
                <button
                    ref={serviceRef}
                    onClick={() => {
                        setIsModalVisible(true);
                    }}
                    className={
                        'font-medium font-sans text-placeholder-gray hover:bg-[rgb(80,82,83)] w-2/5 h-12 flex items-center rounded-3xl pl-4 relative'
                    }
                >
                    {serviceChoose.name ? <p className="text-white">{serviceChoose.name}</p> : 'Dịch vụ bất kỳ'}
                    <Modal
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        animate={isModalVisible}
                        className="mt-3 py-4 absolute top-full -left-[10px]"
                    >
                        <h1 className="font-semibold text-sm ml-1 py-2 mb-5">Tìm kiếm các dịch vụ Tattoo</h1>
                        <div className="grid grid-cols-3 gap-x-2 gap-y-4">
                            {db.servicesTattoo.map((service) => {
                                return (
                                    <div key={service.id} className="flex flex-col">
                                        <Image
                                            onClick={() => {
                                                setServiceChoose(service);
                                                setIsModalVisible(false);
                                                serviceRef.current?.classList.add('!bg-[rgb(58,59,60)]');
                                                setTimeout(() => {
                                                    serviceRef.current?.classList.remove('!bg-[rgb(58,59,60)]');
                                                }, 350);
                                            }}
                                            // style={serviceChoose.id === service.id ? { borderColor: '#FF3B5C' } : {}}
                                            className="rounded-xl border-2 border-solid border-transparent hover:shadow-shadow-modal"
                                            src={service.img}
                                        />
                                        <div className="flex items-center flex-grow">
                                            <p className="text-sm mt-2 mx-px">{service.name}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Modal>
                </button>
            </div>
        </div>
    );
}
