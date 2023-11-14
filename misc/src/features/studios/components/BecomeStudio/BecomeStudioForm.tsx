import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { usePlaceDetailMutation } from '@/features/map/api';
import { AutocompleteAddress } from '@/features/map/components';
import { IBecomeStudioReq, useBecomeStudioMutation } from '@/features/studios';
import { useAuthStore } from '@/store/authStore';
import { useSearchLocationStore } from '@/store/componentStore';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function BecomeStudioForm() {
    const navigate = useNavigate();
    const { accountType } = useAuthStore();
    const becomestudioMutation = useBecomeStudioMutation({
        onSuccess: () => {
            toast.success('Đăng ký thành công, vui lòng chờ admin xác nhận');
            reset();
            resetLocation();
            navigate('/');
        },
        onError: (err) => {
            console.log(err);
            toast.error('Đăng ký thất bại, vui lòng thử lại sau');
        },
    });
    const placeDetailMutation = usePlaceDetailMutation({});
    const {
        register,
        reset,
        trigger,
        handleSubmit,
        formState: { errors, isValid, isDirty },
    } = useForm<IBecomeStudioReq>({ mode: 'onBlur' });

    const { placeChoose, sessionToken, setSessionToken, reset: resetLocation } = useSearchLocationStore();

    const onsubmit: SubmitHandler<IBecomeStudioReq> = async (data) => {
        if (accountType === null) {
            toast.error('Vui lòng đăng nhập để đăng ký studio');
            return;
        }
        if (placeChoose === null) {
            toast.error('Vui lòng chọn địa chỉ của studio');
            return;
        }
        const placeDetail = await placeDetailMutation.mutateAsync({
            placeId: placeChoose.place_id!,
            sessionToken,
        });

        if (placeDetail && placeDetail.geometry) {
            data.latitude = placeDetail.geometry.location.lat;
            data.longitude = placeDetail.geometry.location.lng;
            setSessionToken();
        } else {
            toast.error('Có lỗi xảy ra khi thay đổi địa chỉ, vui lòng thử lại sau');
            return;
        }

        becomestudioMutation.mutate({
            ...data,
            address: placeChoose.description!,
            latitude: placeDetail.geometry.location.lat,
            longitude: placeDetail.geometry.location.lng!,
            redirectUrl: `https://dashboard-art-tattoo-lover.vercel.app/system/manage-studios?status=waiting`,
        });
    };

    return (
        <div className="bg-gray-dark p-4 my-6 min-w-[90%] lg:min-w-[1024px] w-fit mx-auto">
            <form onSubmit={handleSubmit(onsubmit)}>
                <h1 className="text-xl font-semibold text-center mb-6">Đăng ký trở thành studio</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-sm">Nhập tên studio</label>
                        <Input
                            {...register('name', { required: 'Tên studio không được để trống' })}
                            placeholder="Nhập tên studio"
                            typeinput="header"
                            className="h-11 rounded-lg w-full"
                        ></Input>
                        {errors.name && (
                            <span className="font-semibold text-sm text-red-500">{errors.name.message}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-sm">Nhập email Studio</label>
                        <Input
                            {...register('email', {
                                pattern: {
                                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                    message: 'Sai định dạng email',
                                },
                                required: 'Email không được để trống',
                                onChange: () => {
                                    trigger('email');
                                },
                            })}
                            placeholder="Địa chỉ email studio"
                            typeinput="header"
                            className="h-11 rounded-lg w-full"
                        ></Input>
                        {errors.email && (
                            <label className="text-sm font-semibold text-red-500">{errors.email.message}</label>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-sm">Nhập số điện thoại studio</label>
                        <Input
                            {...register('phone', {
                                required: 'Số điện thoại của studio không được để trống',
                            })}
                            placeholder="Nhập tên studio"
                            typeinput="header"
                            className="h-11 rounded-lg w-full"
                        ></Input>
                        {errors.phone && (
                            <label className="font-semibold text-sm text-red-500">{errors.phone.message}</label>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-sm">Nhập tên liên hệ </label>
                        <Input
                            {...register('contactName', { required: 'Tên studio không được để trống' })}
                            placeholder="Tên liên lạc"
                            typeinput="header"
                            className="h-11 rounded-lg w-full"
                        ></Input>
                        {errors.contactName && (
                            <span className="font-semibold text-sm text-red-500">{errors.contactName.message}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-sm">Nhập email liên hệ</label>
                        <Input
                            {...register('contactEmail', {
                                pattern: {
                                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                    message: 'Sai định dạng email',
                                },
                                required: 'Email liên hệ không được để trống',
                                onChange: () => {
                                    trigger('contactEmail');
                                },
                            })}
                            placeholder="Địa chỉ email liên hệ"
                            typeinput="header"
                            className="h-11 rounded-lg w-full"
                        ></Input>
                        {errors.contactEmail && (
                            <label className="text-sm font-semibold text-red-500">{errors.contactEmail.message}</label>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-sm">Nhập số điện thoại liên hệ</label>
                        <Input
                            {...register('contactPhone', {
                                required: 'Số điện thoại liên hệ không được để trống',
                            })}
                            placeholder="Số điện thoại liên hệ"
                            typeinput="header"
                            className="h-11 rounded-lg w-full"
                        ></Input>
                        {errors.contactPhone && (
                            <label className="font-semibold text-sm text-red-500">{errors.contactPhone.message}</label>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <label className="font-semibold text-sm">Nhập địa chỉ của studio</label>
                    <AutocompleteAddress
                        classNameInput="h-11 rounded-lg w-full"
                        className="h-11 rounded-lg w-full !bg-search-gray-dark"
                        isVisible={true}
                    />
                </div>
                <Button
                    className="mt-4 mx-auto"
                    disabled={!isValid}
                    {...((!isValid || !isDirty) && { className: 'mt-4 mx-auto bg-disable text-placeholder-gray' })}
                >
                    Đăng ký studio
                </Button>
            </form>
        </div>
    );
}
