import React, { useState } from 'react';
import {
  createStyles,
  UnstyledButton,
  Menu,
  Image,
  Group,
} from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';
import dutch from '../../assets/images/flags/dutch.png';
import english from '../../assets/images/flags/english.png';

const data = [
  { label: 'English', image: english },
  { label: 'Dutch', image: dutch },
];

const SIZE = 150;

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
  control: {
    width: SIZE,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    transition: 'background-color 150ms ease',
  },

  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
  },

  icon: {
    transition: 'transform 150ms ease',
    transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
  },
}));

export function LanguagePicker() {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });
  const [selected, setSelected] = useState(data[0]);
  const items = data.map((item) => (
    <Menu.Item
      icon={<Image src={item.image} width={18} height={18} />}
      onClick={() => setSelected(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      transition="pop"
      transitionDuration={150}
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="xs"
      size={SIZE}
      control={
        <UnstyledButton className={classes.control}>
          <Group spacing="xs">
            <Image src={selected.image} width={18} height={18} />
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <ChevronDown size={16} className={classes.icon} />
        </UnstyledButton>
      }
    >
      {items}
    </Menu>
  );
}
