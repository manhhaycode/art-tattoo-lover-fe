import { LogoIcon } from '@/assets/icons';
import { Link } from 'react-router-dom';
import { Group, useMantineColorScheme, ActionIcon, useComputedColorScheme, useSafeMantineTheme } from '@mantine/core';
import { BiSun as IconSun, BiMoon as IconMoon } from 'react-icons/bi';
import { MdOutlineColorLens as IconColorLens } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useThemeStore } from '@/store/componentStore';
import { AvartarIcon, useGetUserMutation } from '@/features/users';
import { useAuthStore } from '@/store/authStore';
import { ErrorAuth } from '@/lib/error';
export default function Header() {
    const schema = useMantineColorScheme();
    const { setTheme, themeList } = useThemeStore();
    const { setColorScheme } = useMantineColorScheme();
    const theme = useSafeMantineTheme();
    const listColors = ['light-blue', 'deep-orange'];
    const [index, setIndex] = useState(listColors.indexOf(theme.primaryColor));
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
    const { accountType, setAccountType, reset } = useAuthStore();
    const getProfileMutation = useGetUserMutation({
        onSuccess: (data) => {
            setAccountType({ ...accountType, user: data });
        },
        onError: (error) => {
            if (error.message === ErrorAuth.RT_INVALID || error.message === ErrorAuth.AT_RT_INVALID) {
                reset();
            } else if (error.message === ErrorAuth.AT_INVALID) {
                getProfileMutation.mutate({});
            }
        },
    });
    useEffect(() => {
        setTheme(themeList[index]);
        localStorage.setItem('theme', index.toString());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    useEffect(() => {
        if (accountType && accountType.user?.id) {
            getProfileMutation.mutate({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountType?.user?.id]);

    return (
        <Group justify="space-between" h="100%">
            <Group ml="md" gap={'xl'} h="100%">
                <Link to="/">
                    <LogoIcon styles={schema.colorScheme === 'dark' ? { fill: '#fff' } : { fill: '#000' }} />
                </Link>
            </Group>
            <Group gap="xs" mr="md">
                {getProfileMutation.data && (
                    <div className="h-9 w-9">
                        {getProfileMutation.data.avatar ? (
                            <AvartarIcon
                                fullName={getProfileMutation.data.fullName}
                                logo={getProfileMutation.data.avatar}
                            />
                        ) : (
                            <AvartarIcon fullName={getProfileMutation.data.fullName} />
                        )}
                    </div>
                )}
                <ActionIcon
                    onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                    variant="default"
                    size="xl"
                    aria-label="Toggle color scheme"
                >
                    {computedColorScheme === 'dark' ? (
                        <IconSun size={'20'} stroke="1.5" />
                    ) : (
                        <IconMoon size={'20'} stroke="1.5" />
                    )}
                </ActionIcon>
                <ActionIcon
                    variant="gradient"
                    size="xl"
                    aria-label="Toggle color scheme"
                    onClick={(e) => {
                        e.preventDefault();
                        setIndex((index + 1) % listColors.length);
                    }}
                >
                    <IconColorLens size={'20'} stroke="1.5" />
                </ActionIcon>
            </Group>
        </Group>
    );
}
