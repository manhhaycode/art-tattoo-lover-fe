import { CalendarIcon, StudioIcon, UserIcon } from '@/assets/icons';
import { Button, Group, NavLink, ScrollArea, Text, useMantineColorScheme } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { VscDashboard } from 'react-icons/vsc';
import { EPermission, Logout } from '@/features/auth';
import { MdPayment, MdSchedule } from 'react-icons/md';
import { useAuthStore } from '@/store/authStore';
import { BiCategory } from 'react-icons/bi';
import { TbFileDollar } from 'react-icons/tb';
export default function StudioNav() {
    const location = useLocation();
    const navigate = useNavigate();
    const schema = useMantineColorScheme();
    const { accountType } = useAuthStore();
    const permissions = accountType?.permissions;

    return (
        permissions && (
            <>
                <ScrollArea>
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
                        {(permissions.includes(EPermission.MANAGE_STUDIO_INVOICE) ||
                            permissions.includes(EPermission.VIEW_STUDIO_INVOICE)) && (
                            <div className="w-full">
                                <NavLink
                                    {...(schema.colorScheme === 'light'
                                        ? {
                                              classNames: {
                                                  root: '!text-black',
                                                  children: '!text-black',
                                              },
                                          }
                                        : {
                                              classNames: {
                                                  root: '!text-white ',
                                                  children: '!text-white',
                                              },
                                          })}
                                    label={<Text className="text-base font-semibold">Quản lý thanh toán</Text>}
                                    className="hover:!bg-[var(--mantine-primary-color-light-hover)] rounded"
                                    leftSection={<MdPayment size={24} />}
                                    childrenOffset={12}
                                    {...(location.pathname.includes('manage-invoice') && {
                                        opened: true,
                                        active: true,
                                    })}
                                >
                                    <NavLink
                                        {...(location.pathname.includes('manage-invoice') &&
                                            !location.pathname.includes('create') && {
                                                style: {
                                                    background:
                                                        'linear-gradient(45deg, var(--mantine-color-blue-filled) 0%, var(--mantine-primary-color-filled) 100%)',
                                                },
                                            })}
                                        onClick={() => navigate('/studio/manage-invoice')}
                                        leftSection={<TbFileDollar size={24} />}
                                        className="mt-2 hover:!bg-[var(--mantine-primary-color-light-hover)] rounded"
                                        label={<Text className="text-base font-semibold">Quản lý hóa đơn</Text>}
                                    />
                                    {permissions.includes(EPermission.MANAGE_STUDIO_INVOICE) && (
                                        <NavLink
                                            {...(location.pathname.includes('manage-invoice/create') && {
                                                style: {
                                                    background:
                                                        'linear-gradient(45deg, var(--mantine-color-blue-filled) 0%, var(--mantine-primary-color-filled) 100%)',
                                                },
                                            })}
                                            onClick={() => navigate('/studio/manage-invoice/create')}
                                            leftSection={<TbFileDollar size={24} />}
                                            className="mt-2 hover:!bg-[var(--mantine-primary-color-light-hover)] rounded"
                                            label={<Text className="text-base font-semibold">Tạo hóa đơn mới</Text>}
                                        />
                                    )}
                                </NavLink>
                            </div>
                        )}
                    </Group>
                </ScrollArea>
                <Logout
                    onSuccess={() => {
                        navigate('/login');
                    }}
                />
            </>
        )
    );
}
