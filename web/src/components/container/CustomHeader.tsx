import {
  Avatar,
  Box,
  Burger,
  Button,
  Center,
  Container,
  createStyles,
  Divider,
  Group,
  Header,
  Menu,
  UnstyledButton,
} from '@mantine/core';
import { NotflixIcon } from '../icon/NotflixIcon';
import { Link } from 'react-router-dom';
import { useLoggedIn } from '../../hooks/useLoggedIn';
import { useBooleanToggle } from '@mantine/hooks';
import { ChevronDown, Help, Logout, User } from 'tabler-icons-react';
import { LanguagePicker } from '../i18n/LanguagePicker';
import avatarOne from '../../assets/images/avatars/Avatar_01.png';
import avatarTwo from '../../assets/images/avatars/Avatar_02.png';
import avatarThree from '../../assets/images/avatars/Avatar_03.png';
import avatarFour from '../../assets/images/avatars/Avatar_04.png';
import avatarFive from '../../assets/images/avatars/Avatar_05.png';
import { useLogout } from '../../api/requests/token';
import { useGetAccount } from '../../api/requests/account';
import { Profile } from '../../api/models/Profile';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  userMenu: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  outer: {
    height: HEADER_HEIGHT * 1.5,
    background: theme.fn.linearGradient(
      180,
      theme.colors.dark[8],
      theme.colors.dark[8],
      theme.colors.dark[8],
      theme.colors.dark[7],
    ),
  },

  header: {
    position: 'sticky',
    top: 0,
    borderBottom: 0,
    backgroundColor: 'transparent',
  },

  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

interface HeaderLink {
  link: string;
  label: string;
  links?: { link: string; label: string }[];
}

interface Props {
  links: HeaderLink[];
  user: { name: string; image: string };
}

export function CustomHeader({ links, user }: Props): JSX.Element {
  const { classes, cx } = useStyles();
  const loggedIn = useLoggedIn();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [userMenuOpened, setUserMenuOpened] = useBooleanToggle(false);
  const account = useGetAccount();

  const items = links.map((link: HeaderLink) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          delay={0}
          transitionDuration={0}
          placement="end"
          gutter={1}
          control={
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <ChevronDown size={12} />
              </Center>
            </a>
          }
        >
          {menuItems}
        </Menu>
      );
    }

    return (
      <UnstyledButton
        key={link.label}
        component={Link}
        to={link.link}
        className={classes.link}
      >
        {link.label}
      </UnstyledButton>
    );
  });

  return (
    <Box className={classes.outer}>
      <Header px={30} py={10} className={classes.header} height={HEADER_HEIGHT}>
        <Container className={classes.inner} fluid>
          {loggedIn ? (
            <>
              <Group>
                <Burger
                  opened={opened}
                  onClick={() => toggleOpened()}
                  className={classes.burger}
                  size="sm"
                />
                <NotflixIcon />
              </Group>
              <Group position="left" spacing={5} className={classes.links}>
                {items}
              </Group>
              <Group>
                <LanguagePicker />
                <Menu
                  size={260}
                  placement="end"
                  transition="pop-top-right"
                  className={classes.userMenu}
                  onClose={() => setUserMenuOpened(false)}
                  onOpen={() => setUserMenuOpened(true)}
                  control={
                    <UnstyledButton
                      className={cx(classes.user, {
                        [classes.userActive]: userMenuOpened,
                      })}
                    >
                      <Group spacing={7}>
                        <Avatar
                          src={avatarOne}
                          alt={user.name}
                          radius="xs"
                          size={20}
                        />
                        <ChevronDown size={12} />
                      </Group>
                    </UnstyledButton>
                  }
                >
                  {account?.profiles &&
                    account?.profiles.map((profile: Profile) => (
                      <Menu.Item icon={<Avatar size={24} src={avatarOne} />}>
                        {profile.name}
                      </Menu.Item>
                    ))}
                  <Divider />
                  <Menu.Item icon={<User size={24} />}>Account</Menu.Item>
                  <Menu.Item icon={<Help size={24} />}>Help centre</Menu.Item>
                  <Divider />
                  <Menu.Item
                    icon={<Logout size={24} />}
                    onClick={() => useLogout()}
                  >
                    Sign out of Notflix
                  </Menu.Item>
                </Menu>
              </Group>
            </>
          ) : (
            <>
              <NotflixIcon />
              <Button component={Link} to="/login">
                Sign In
              </Button>
            </>
          )}
        </Container>
      </Header>
    </Box>
  );
}
