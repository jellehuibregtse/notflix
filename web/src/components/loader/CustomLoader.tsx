import { Center, Container, Loader } from '@mantine/core';

export function CustomLoader(): JSX.Element {
  return (
    <Container fluid>
      <Center>
        <Loader />
      </Center>
    </Container>
  );
}
