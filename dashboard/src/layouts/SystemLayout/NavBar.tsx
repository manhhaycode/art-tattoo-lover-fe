import { StudioIcon, UserIcon, BlogIcon, RoleIcon } from '@/assets/icons';
import { Button, Group, useMantineColorScheme } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { VscDashboard } from 'react-icons/vsc';
import { Logout } from '@/features/auth';
import { BiCategory } from 'react-icons/bi';
export default function SystemNav() {
    const location = useLocation();
    const navigate = useNavigate();
    const schema = useMantineColorScheme();
    return (
        <>
            <Group gap={16}>
                <Button
                    fullWidth
                    mih={40}
                    {...(!location.pathname.includes('dashboard')
                        ? {
                              ...{ ...(schema.colorScheme === 'light' && { classNames: { inner: '!text-black' } }) },
                              variant: 'subtle',
                          }
                        : { variant: 'gradient' })}
                    onClick={() => {
                        navigate('/system/dashboard');
                    }}
                    className="flex gap-x-3 justify-start active:transform-none text-base"
                    leftSection={<VscDashboard size="24px" />}
                >
                    Trang quản lý hệ thống
                </Button>
                <Button
                    fullWidth
                    mih={40}
                    {...(!location.pathname.includes('manage-studios')
                        ? {
                              ...{ ...(schema.colorScheme === 'light' && { classNames: { inner: '!text-black' } }) },
                              variant: 'subtle',
                          }
                        : { variant: 'gradient' })}
                    onClick={() => {
                        navigate('/system/manage-studios');
                    }}
                    className="flex gap-x-3 justify-start active:transform-none text-base"
                    leftSection={<StudioIcon styles={{ stroke: 'currentcolor' }} />}
                >
                    Quản lý thông tin studio
                </Button>
                <Button
                    fullWidth
                    mih={40}
                    {...(!location.pathname.includes('manage-users')
                        ? {
                              ...{ ...(schema.colorScheme === 'light' && { classNames: { inner: '!text-black' } }) },
                              variant: 'subtle',
                          }
                        : { variant: 'gradient' })}
                    onClick={() => {
                        navigate('/system/manage-users');
                    }}
                    className="flex gap-x-3 justify-start active:transform-none text-base"
                    leftSection={<UserIcon />}
                >
                    Quản lý người dùng
                </Button>
                <Button
                    fullWidth
                    mih={40}
                    {...(!location.pathname.includes('manage-category')
                        ? {
                              ...{ ...(schema.colorScheme === 'light' && { classNames: { inner: '!text-black' } }) },
                              variant: 'subtle',
                          }
                        : { variant: 'gradient' })}
                    onClick={() => {
                        navigate('/system/manage-category');
                    }}
                    className="flex gap-x-3 justify-start active:transform-none text-base"
                    leftSection={<BiCategory size="24px" />}
                >
                    Quản lý các loại dịch vụ
                </Button>
                <Button
                    fullWidth
                    mih={40}
                    {...(!location.pathname.includes('rolebase')
                        ? {
                              ...{ ...(schema.colorScheme === 'light' && { classNames: { inner: '!text-black' } }) },
                              variant: 'subtle',
                          }
                        : { variant: 'gradient' })}
                    onClick={() => {
                        navigate('/system/manage-rolebase');
                    }}
                    className="flex gap-x-3 justify-start active:transform-none text-base"
                    leftSection={<RoleIcon />}
                >
                    Quản lý vai trò và quyền
                </Button>
                <Button
                    fullWidth
                    mih={40}
                    {...(!location.pathname.includes('manage-blogs')
                        ? {
                              ...{ ...(schema.colorScheme === 'light' && { classNames: { inner: '!text-black' } }) },
                              variant: 'subtle',
                          }
                        : { variant: 'gradient' })}
                    onClick={() => {
                        navigate('/system/manage-blogs');
                    }}
                    className="flex gap-x-3 justify-start active:transform-none text-base"
                    leftSection={<BlogIcon styles={{ width: '24px', height: '24px', fill: 'currentcolor' }} />}
                >
                    Quản lý bài viết
                </Button>
            </Group>
            <Logout
                onSuccess={() => {
                    navigate('/login');
                }}
            />
        </>
    );
}
