import { Container, Loader } from '@mantine/core';

export default function Load() {
    return (
        <Container className="top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 absolute flex justify-center">
            <Loader size={'xl'} />
        </Container>
    );
}
