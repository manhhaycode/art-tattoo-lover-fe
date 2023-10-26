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
import { LoginCredentials } from '@/features/auth';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/store/authStore';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function AuthenticationTitle() {
    const { setAccountType } = useAuthStore();
    const navigate = useNavigate();
    const at = Cookies.get('tattus-at');
    const roleId = Number(sessionStorage.getItem('tattus-role'));
    const loginMutation = useLoginMutation({
        onSuccess: (data) => {
            console.log(data);
            setAccountType({
                role: { id: data.session.roleId, name: 'Member' },
                permissions: data.session.permissions,
                studioId: data.session.studioId,
                user: { id: data.session.userId },
            });
            const roleId = data.session.roleId;
            if (roleId === 5 || roleId === 3 || roleId === 4) navigate('/studio/dashboard');
            if (roleId === 1 || roleId === 2) navigate('/system/dashboard');
        },
        onError: () => {
            toast('Sai tài khoản hoặc mật khẩu hoặc không có quyền đăng nhập', { type: 'error' });
        },
    });
    const { handleSubmit, register } = useForm<LoginCredentials>();

    const onSubmit: SubmitHandler<LoginCredentials> = async (data) => {
        loginMutation.mutate(data);
    };
    return (
        <>
            {!(at && at.length > 0) || !roleId ? (
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
                    to={roleId === 5 || roleId === 3 || roleId === 4 ? '/studio/dashboard' : '/system/dashboard'}
                />
            )}
        </>
    );
}
