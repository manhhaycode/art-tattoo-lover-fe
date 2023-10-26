import { StudioIcon, UserIcon } from '@/assets/icons';
import { Button, Group, useMantineColorScheme } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { VscDashboard } from 'react-icons/vsc';
import { Logout } from '@/features/auth';
export default function StudioNav() {
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
                              ...{ ...(schema.colorScheme === 'light' && { className: '!text-white' }) },
                              variant: 'subtle',
                          }
                        : { variant: 'gradient' })}
                    onClick={() => {
                        navigate('/studio/dashboard');
                    }}
                    className="flex gap-x-3 justify-start active:transform-none text-base"
                    leftSection={<VscDashboard size="24px" />}
                >
                    Trang chủ studio
                </Button>
                <Button
                    fullWidth
                    mih={40}
                    {...(!location.pathname.includes('manage-studio')
                        ? {
                              ...{ ...(schema.colorScheme === 'light' && { className: '!text-white' }) },
                              variant: 'subtle',
                          }
                        : { variant: 'gradient' })}
                    onClick={() => {
                        navigate('/studio/manage-studio');
                    }}
                    className="flex gap-x-3 justify-start active:transform-none text-base"
                    leftSection={<StudioIcon styles={{ stroke: 'currentcolor' }} />}
                >
                    Quản lý thông tin studio
                </Button>
                <Button
                    fullWidth
                    mih={40}
                    {...(!location.pathname.includes('manage-user')
                        ? {
                              ...{ ...(schema.colorScheme === 'light' && { className: '!text-white' }) },
                              variant: 'subtle',
                          }
                        : { variant: 'gradient' })}
                    onClick={() => {
                        navigate('/studio/manage-user');
                    }}
                    className="flex gap-x-3 justify-start active:transform-none text-base"
                    leftSection={<UserIcon />}
                >
                    Quản lý nhân viên studio
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
