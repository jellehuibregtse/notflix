import avatarOne from '../../assets/images/avatars/Avatar_01.png';
import avatarTwo from '../../assets/images/avatars/Avatar_02.png';
import avatarThree from '../../assets/images/avatars/Avatar_03.png';
import avatarFour from '../../assets/images/avatars/Avatar_04.png';
import avatarFive from '../../assets/images/avatars/Avatar_05.png';
import { Button, Center, Container, Group, Stack, Text } from '@mantine/core';
import { Profile } from './Profile';
import { useToggle } from '@mantine/hooks';

export function ChooseProfile(): JSX.Element {
  const [type, toggle] = useToggle('select', ['select', 'edit']);

  return (
    <Center>
      <Stack>
        <Center>
          <Text style={{ fontSize: '3.5vw' }} weight={400}>
            {type === 'select' ? "Who's watching?" : 'Manage profiles:'}
          </Text>
        </Center>
        <Group position="center" spacing="xs">
          <Profile imageSrc={avatarOne} name={'John Doe'} />
          <Profile imageSrc={avatarTwo} name={'John Doe'} />
          <Profile imageSrc={avatarThree} name={'John Doe'} />
          <Profile imageSrc={avatarFour} name={'John Doe'} />
          <Profile imageSrc={avatarFive} name={'John Doe'} />
        </Group>
        <Container>
          {type === 'select' ? (
            <Button
              styles={{
                outline: { color: '#808080', border: '1px solid #808080' },
              }}
              variant="outline"
              onClick={() => toggle()}
            >
              Manage profiles
            </Button>
          ) : (
            <Button onClick={() => toggle()}>Done</Button>
          )}
        </Container>
      </Stack>
    </Center>
  );
}
