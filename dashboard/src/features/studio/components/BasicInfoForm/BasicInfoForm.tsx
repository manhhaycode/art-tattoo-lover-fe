import { AspectRatio, Container, Group, Image, Text } from '@mantine/core';

export default function BasicInfoForm() {
    return (
        <Container
            fluid
            style={{
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
            }}
            className="rounded-xl border-2 border-solid p-6 flex m-0"
        >
            <Text className="text-xl font-semibold">Thông tin cơ bản của studio</Text>
            <Group>
                <AspectRatio ratio={16 / 9} className="w-96 h-96">
                    <Image />
                </AspectRatio>
            </Group>
        </Container>
    );
}
