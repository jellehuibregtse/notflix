import { Button, ButtonProps } from '@mantine/core';
import { FacebookIcon } from '../../icon/FacebookIcon';

export function FacebookButton(props: ButtonProps<'button'>): JSX.Element {
  return (
    <Button
      leftIcon={<FacebookIcon />}
      sx={(theme) => ({
        backgroundColor: '#4267B2',
        color: '#fff',
        '&:hover': {
          backgroundColor: theme.fn.darken('#4267B2', 0.1),
        },
      })}
      {...props}
    />
  );
}
