import avatarOne from '../../assets/images/avatars/Avatar_01.png';
import {
  Button,
  Center,
  Container,
  Group,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { Profile } from './Profile';
import { useToggle } from '@mantine/hooks';
import { useGetAccount } from '../../api/requests/account';

export function ChooseProfile(): JSX.Element {
  const [type, toggle] = useToggle('select', ['select', 'edit']);
  const account = useGetAccount();

  const chooseProfile = () => {
    localStorage.setItem('profile_chosen', String(true));
    window.location.assign('/browse');
  };

  return (
    <Center>
      <Stack>
        <Center>
          <Text style={{ fontSize: '3.5vw' }} weight={400}>
            {type === 'select' ? "Who's watching?" : 'Manage profiles:'}
          </Text>
        </Center>
        <Group position="center" spacing="xs">
          {account?.profiles.map((profile) => (
            <UnstyledButton onClick={chooseProfile}>
              <Profile imageSrc={avatarOne} name={profile.name} />
            </UnstyledButton>
          ))}
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
