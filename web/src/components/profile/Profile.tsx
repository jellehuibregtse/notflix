import { Container, Image } from '@mantine/core';

interface Props {
  imageSrc: string;
  name: string;
}

export function Profile({ imageSrc, name }: Props): JSX.Element {
  return (
    <Container size={165}>
      <Image
        radius="xs"
        src={imageSrc}
        alt={`${name}'s profile`}
        caption={name}
        sx={() => ({
          '&:hover': {
            cursor: 'pointer',
          },
        })}
        withPlaceholder
      />
    </Container>
  );
}
