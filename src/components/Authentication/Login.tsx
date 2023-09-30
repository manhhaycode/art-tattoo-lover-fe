import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '../common/Input';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ILogin {
    user: string;
    password: string;
}

export default function Login() {
    const { handleSubmit } = useForm<ILogin>();
    const onsSubmit: SubmitHandler<ILogin> = (data) => console.log(data);

    return (
        <div className="px-4 mt-28">
            <h1 className="text-2xl font-semibold mb-12 text-center">Đăng nhập vào Tattus</h1>
            <form onSubmit={handleSubmit(onsSubmit)} className="flex flex-col px-14 gap-y-3">
                <Input typeInput="header" className="h-11 rounded-lg" placeholder="Tên đăng nhập"></Input>
                <Input type="password" typeInput="header" className="h-11 rounded-lg" placeholder="Mật khẩu"></Input>
                <p className="text-[13px] font-bold text-gray-400 mt-2">Quên mật khẩu?</p>
                <motion.button
                    whileTap={{ scale: 0.8 }}
                    onTap={() => {}}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="flex gap-x-2 p-[14px] items-center justify-center bg-button-primary rounded-lg min-w-fit w-full "
                >
                    <Link to={'/'} className="justify-self-center font-semibold text-base leading-none">
                        Đăng Nhập
                    </Link>
                </motion.button>
            </form>
        </div>
    );
}
