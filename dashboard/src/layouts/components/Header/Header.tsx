import { LogoIcon } from '@/assets/icons';
import { Link } from 'react-router-dom';
import { Group } from '@mantine/core';

export default function Header() {
    return (
        <Group ml="md" gap={'xl'} h="100%">
            <Link to="/">
                <LogoIcon styles={{ fill: '#fff' }} />
            </Link>
            <div>Test menu</div>
        </Group>
    );
}
