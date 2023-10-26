import { StudioIcon, UserIcon } from '@/assets/icons';
// import Button from '@/components/common/Button';
import { Button, Group } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { VscDashboard } from 'react-icons/vsc';
import { useColorScheme } from '@mantine/hooks';
export default function StudioNav() {
    const location = useLocation();
    const navigate = useNavigate();
    const colorScheme = useColorScheme();
    return (
        <Group gap={16}>
            <Button
                fullWidth
                mih={40}
                {...(!location.pathname.includes('dashboard')
                    ? { ...{ ...(colorScheme === 'light' && { className: '!text-white' }) }, variant: 'subtle' }
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
                    ? { ...{ ...(colorScheme === 'light' && { className: '!text-white' }) }, variant: 'subtle' }
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
                    ? { ...{ ...(colorScheme === 'light' && { className: '!text-white' }) }, variant: 'subtle' }
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
    );
}
