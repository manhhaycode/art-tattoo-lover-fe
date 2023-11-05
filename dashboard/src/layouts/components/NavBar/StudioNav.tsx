import { StudioIcon, UserIcon } from '@/assets/icons';
import { Button, Group, useMantineColorScheme } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { VscDashboard } from 'react-icons/vsc';
import { EPermission, Logout } from '@/features/auth';
import { MdSchedule } from 'react-icons/md';
import { useAuthStore } from '@/store/authStore';
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
                    {permissions.includes(EPermission.MANAGE_STUDIO) ||
                    permissions.includes(EPermission.MANAGE_OWNED_STUDIO) ? (
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
                        permissions.includes(EPermission.VIEW_STUDIO_ARTISTS_SCHEDULE) ||
                        permissions.includes(EPermission.MANAGE_STUDIO)) && (
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
                            leftSection={<MdSchedule size={24} />}
                        >
                            Quản lý lịch hẹn xăm
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
