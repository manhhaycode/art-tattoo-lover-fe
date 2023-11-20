import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Container,
    Group,
    Button,
    BackgroundImage,
} from '@mantine/core';
import slider from '@/assets/img/sliderHome1.png';
import { useLoginMutation } from '../api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ERoleId, LoginCredentials } from '@/features/auth';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ErrorCode, errorMsg } from '@/common/types/error';
export default function AuthenticationTitle() {
    const { setAccountType, reset } = useAuthStore();
    const navigate = useNavigate();
    const at = Cookies.get('tattus-at');
    const roleId = Number(sessionStorage.getItem('tattus-role'));
    const loginMutation = useLoginMutation({
        onSuccess: (data) => {
            if (data.session.status !== 1) {
                reset();
                toast.error('Tài khoản của bạn đã bị khóa, hoặc chưa kích hoạt');
                return;
            }
            setAccountType({
                role: { id: data.session.roleId, name: 'Member' },
                permissions: data.session.permissions,
                studioId: data.session.studioId,
                user: { id: data.session.userId },
                status: data.session.status,
            });
            const roleId = data.session.roleId;
            if (
                roleId === ERoleId['ARTIST'] ||
                roleId === ERoleId['STUDIO_STAFF'] ||
                roleId === ERoleId['STUDIO_MANAGER']
            )
                navigate('/studio/dashboard');
            if (roleId === ERoleId['SYSTEM_STAFF'] || roleId === ERoleId['ADMIN']) navigate('/system/dashboard');
        },
        onError: (e) => {
            const error = errorMsg[e.message as ErrorCode];
            if (error) {
                toast.error(error);
            } else {
                toast.error('Có lỗi xảy ra, vui lòng thử lại sau!');
            }
        },
    });
    const { handleSubmit, register } = useForm<LoginCredentials>();

    const onSubmit: SubmitHandler<LoginCredentials> = async (data) => {
        loginMutation.mutate(data);
    };
    return (
        <>
            {!(at && at.length > 0) || !roleId || (roleId && roleId >= 6) ? (
                <BackgroundImage src={slider} className="h-screen">
                    <Container classNames={{ root: '!mt-0 pt-20' }} size={420} my={40}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                                <Title ta="center" className="mb-4">
                                    Welcome back!
                                </Title>
                                <TextInput
                                    {...register('email')}
                                    label="Địa chỉ email"
                                    placeholder="you@gmail.com"
                                    required
                                />
                                <PasswordInput
                                    {...register('password')}
                                    label="Password"
                                    placeholder="Your password"
                                    required
                                    mt="md"
                                />
                                <Group justify="space-between" mt="lg">
                                    <Checkbox label="Remember me" />
                                    <Anchor component="button" size="sm">
                                        Forgot password?
                                    </Anchor>
                                </Group>
                                <Button type="submit" fullWidth mt="xl" loading={loginMutation.isLoading}>
                                    Sign in
                                </Button>
                            </Paper>
                        </form>
                    </Container>
                </BackgroundImage>
            ) : (
                <Navigate
                    to={
                        roleId === ERoleId['ARTIST'] ||
                        roleId === ERoleId['STUDIO_STAFF'] ||
                        roleId === ERoleId['STUDIO_MANAGER']
                            ? '/studio/dashboard'
                            : '/system/dashboard'
                    }
                />
            )}
        </>
    );
}
