import { useUserProfileManageState } from '@/features/users/hooks';
import BasicInfoForm from './BasicInfoForm';
import ChangePasswordForm from './ChangePasswordForm';
import Loading from '@/components/Loading';
import ManageCertificateArtist from './ManageCertificateArtist';

export default function UserProfile() {
    const { isLoading, accountType, onMount } = useUserProfileManageState();
    if (isLoading || !accountType) return <Loading />;
    return (
        <>
            {accountType && onMount && (
                <div className="flex flex-col gap-y-8 py-4 px-6 flex-1">
                    <div className="flex flex-col gap-y-8">
                        <h1 className="font-semibold text-2xl">Thông tin cá nhân</h1>
                        <div className="basic-info-conainter p-6 bg-gray-dark rounded-lg flex flex-col gap-y-4">
                            <h1 className="font-semibold text-xl">Thông tin cơ bản</h1>
                            <BasicInfoForm />
                        </div>
                        <div className="basic-info-conainter p-6 bg-gray-dark rounded-lg flex flex-col gap-y-4">
                            <h1 className="font-semibold text-xl">Đổi mật khẩu</h1>
                            <ChangePasswordForm />
                        </div>
                        {accountType.role?.id === 5 && (
                            <div className="basic-info-conainter p-6 bg-gray-dark rounded-lg flex flex-col gap-y-4">
                                <h1 className="font-semibold text-xl">Quản lý chứng chỉ xăm</h1>
                                <ManageCertificateArtist listMedia={accountType.user.listMedia} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
