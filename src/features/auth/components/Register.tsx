import { useModalStore } from '@/store/componentStore';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/common/Input';
import { Link } from 'react-router-dom';
import 'dayjs/locale/vi';
import { DatesProvider, DatePickerInput } from '@mantine/dates';
import { useState } from 'react';
import Button from '@/components/common/Button';
interface ILogin {
    user: string;
    password: string;
}
export default function Register() {
    const { setIsLoginModalVisible, setIsRegisterModalVisible } = useModalStore();
    const { handleSubmit } = useForm<ILogin>();
    const onsSubmit: SubmitHandler<ILogin> = (data) => console.log(data);
    const [birthday, setBirthday] = useState<Date | null>(null);
    return (
        <div className="flex flex-col justify-between overflow-auto h-full">
            <div className="px-4 mt-10 mb-24">
                <h1 className="text-2xl font-semibold mb-6 text-center">Đăng ký tài khoản Tattus</h1>
                <form onSubmit={handleSubmit(onsSubmit)} className="flex flex-col px-14 gap-y-3">
                    <label className="text-white font-medium text-sm">Nhập họ tên</label>
                    <Input typeinput="header" className="h-11 rounded-lg" placeholder="Tên của bạn"></Input>
                    <label className="text-white font-medium text-sm">Nhập địa chỉ Email</label>
                    <Input
                        type="password"
                        typeinput="header"
                        className="h-11 rounded-lg"
                        placeholder="Địa chỉ Email"
                    ></Input>
                    <label className="text-white font-medium text-sm">Nhập mật khẩu</label>
                    <Input
                        type="password"
                        typeinput="header"
                        className="h-11 rounded-lg"
                        placeholder="Mật khẩu"
                    ></Input>
                    <label className="text-white font-medium text-sm">Nhập lại mật khẩu</label>
                    <Input
                        type="password"
                        typeinput="header"
                        className="h-11 rounded-lg"
                        placeholder="Mật khẩu"
                    ></Input>
                    <label className="text-white font-medium text-sm">Nhập ngày sinh nhật</label>
                    <DatesProvider settings={{ locale: 'vi', firstDayOfWeek: 0, weekendDays: [0] }}>
                        <DatePickerInput
                            valueFormat="DD/MM/YYYY"
                            className="text-white pl-4 hover:bg-[rgb(80,82,83)] focus:bg-[rgb(80,82,83)] bg-search-gray-dark h-11 rounded-lg font-sans font-medium text-base"
                            variant="unstyled"
                            placeholder="Chọn ngày sinh"
                            value={birthday}
                            onChange={setBirthday}
                        />
                    </DatesProvider>
                    <Button isAnimate={true} whileTap={{ scale: 0.9 }} onTap={() => {}}>
                        <Link to={'/'} className="justify-self-center font-semibold text-base leading-none">
                            Đăng Ký
                        </Link>
                    </Button>
                </form>
            </div>
            <div className="border-t-2 border-solid border-stroke-gray flex justify-center items-center h-20 absolute bottom-0 bg-gray-dark w-full z-[400]">
                <p>Bạn đã có tài khoản?</p>
                <button
                    onClick={() => {
                        setIsRegisterModalVisible(false);
                        setIsLoginModalVisible(true);
                    }}
                    className="text-button-primary font-sans text-base font-medium hover:underline ml-2"
                >
                    Đăng nhập ngay
                </button>
            </div>
        </div>
    );
}
