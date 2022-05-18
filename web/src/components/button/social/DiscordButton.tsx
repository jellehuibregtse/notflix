import { Button, ButtonProps } from '@mantine/core';
import { DiscordIcon } from '../../icon/DiscordIcon';

export function DiscordButton(props: ButtonProps<'button'>): JSX.Element {
  return (
    <Button
      leftIcon={<DiscordIcon />}
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? '#5865F2' : '#7289da',
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.fn.lighten('#5865F2', 0.05)
              : theme.fn.darken('#7289da', 0.05),
        },
      })}
      {...props}
    />
  );
}
