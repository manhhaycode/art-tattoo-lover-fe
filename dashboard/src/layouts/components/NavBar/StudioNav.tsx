import { CalendarIcon, StudioIcon, UserIcon } from '@/assets/icons';
import { Button, Group, useMantineColorScheme } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { VscDashboard } from 'react-icons/vsc';
import { EPermission, Logout } from '@/features/auth';
import { MdPayment, MdSchedule } from 'react-icons/md';
import { useAuthStore } from '@/store/authStore';
import { BiCategory } from 'react-icons/bi';
export default function StudioNav() {
    const location = useLocation();
    const navigate = useNavigate();
    const schema = useMantineColorScheme();
    const { accountType } = useAuthStore();
    const permissions = accountType?.permissions;
    console.log(
        permissions?.includes(EPermission.MANAGE_STUDIO) || permissions?.includes(EPermission.MANAGE_OWNED_STUDIO),
    );
    return (
        permissions && (
            <>
                <Group gap={16}>
                    <Button
                        fullWidth
                        mih={40}
                        {...(!location.pathname.includes('dashboard')
                            ? {
                                  ...{
                                      ...(schema.colorScheme === 'light' && {
                                          classNames: { inner: '!text-black' },
                                      }),
                                  },
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
                    {(permissions.includes(EPermission.MANAGE_STUDIO) ||
                        permissions.includes(EPermission.MANAGE_OWNED_STUDIO) ||
                        permissions.includes(EPermission.VIEW_STUDIO_ARTISTS)) && (
                        <Button
                            fullWidth
                            mih={40}
                            {...(!location.pathname.includes('manage-studio')
                                ? {
                                      ...{
                                          ...(schema.colorScheme === 'light' && {
                                              classNames: { inner: '!text-black' },
                                          }),
                                      },
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
                    )}
                    {permissions.includes(EPermission.MANAGE_STUDIO) ||
                    permissions.includes(EPermission.MANAGE_OWNED_STUDIO) ||
                    permissions.includes(EPermission.VIEW_STUDIO_ARTISTS) ? (
                        <Button
                            fullWidth
                            mih={40}
                            {...(!location.pathname.includes('manage-user')
                                ? {
                                      ...{
                                          ...(schema.colorScheme === 'light' && {
                                              classNames: { inner: '!text-black' },
                                          }),
                                      },
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
                    ) : (
                        <></>
                    )}
                    {(permissions.includes(EPermission.MANAGE_STUDIO_ARTISTS_SCHEDULE) ||
                        permissions.includes(EPermission.VIEW_STUDIO_ARTISTS_SCHEDULE)) && (
                        <Button
                            fullWidth
                            mih={40}
                            {...(!location.pathname.includes('manage-scheduleworking')
                                ? {
                                      ...{
                                          ...(schema.colorScheme === 'light' && {
                                              classNames: { inner: '!text-black' },
                                          }),
                                      },
                                      variant: 'subtle',
                                  }
                                : { variant: 'gradient' })}
                            onClick={() => {
                                navigate('/studio/manage-scheduleworking');
                            }}
                            className="flex gap-x-3 justify-start active:transform-none text-base"
                            leftSection={<MdSchedule size={24} />}
                        >
                            Lịch làm việc của artist
                        </Button>
                    )}
                    {(permissions.includes(EPermission.MANAGE_STUDIO_BOOKING) ||
                        permissions.includes(EPermission.VIEW_STUDIO_BOOKING)) && (
                        <Button
                            fullWidth
                            mih={40}
                            {...(!location.pathname.includes('manage-appointment')
                                ? {
                                      ...{
                                          ...(schema.colorScheme === 'light' && {
                                              classNames: { inner: '!text-black' },
                                          }),
                                      },
                                      variant: 'subtle',
                                  }
                                : { variant: 'gradient' })}
                            onClick={() => {
                                navigate('/studio/manage-appointment');
                            }}
                            className="flex gap-x-3 justify-start active:transform-none text-base"
                            leftSection={
                                <CalendarIcon
                                    styles={{
                                        width: '24px',
                                        height: '24px',
                                        stroke: 'currentcolor',
                                    }}
                                />
                            }
                        >
                            Quản lý lịch hẹn xăm
                        </Button>
                    )}
                    {(permissions.includes(EPermission.MANAGE_STUDIO_SERVICES) ||
                        permissions.includes(EPermission.VIEW_STUDIO_SERVICES)) && (
                        <Button
                            fullWidth
                            mih={40}
                            {...(!location.pathname.includes('manage-service')
                                ? {
                                      ...{
                                          ...(schema.colorScheme === 'light' && {
                                              classNames: { inner: '!text-black' },
                                          }),
                                      },
                                      variant: 'subtle',
                                  }
                                : { variant: 'gradient' })}
                            onClick={() => {
                                navigate('/studio/manage-service');
                            }}
                            className="flex gap-x-3 justify-start active:transform-none text-base"
                            leftSection={<BiCategory size={24} />}
                        >
                            Quản lý các dịch vụ xăm
                        </Button>
                    )}
                    {(permissions.includes(EPermission.MANAGE_STUDIO_SERVICES) ||
                        permissions.includes(EPermission.VIEW_STUDIO_SERVICES)) && (
                        <Button
                            fullWidth
                            mih={40}
                            {...(!location.pathname.includes('manage-invoice')
                                ? {
                                      ...{
                                          ...(schema.colorScheme === 'light' && {
                                              classNames: { inner: '!text-black' },
                                          }),
                                      },
                                      variant: 'subtle',
                                  }
                                : { variant: 'gradient' })}
                            onClick={() => {
                                navigate('/studio/manage-invoice');
                            }}
                            className="flex gap-x-3 justify-start active:transform-none text-base"
                            leftSection={<MdPayment size={24} />}
                        >
                            Quản lý thanh toán hóa đơn
                        </Button>
                    )}
                </Group>
                <Logout
                    onSuccess={() => {
                        navigate('/login');
                    }}
                />
            </>
        )
    );
}
