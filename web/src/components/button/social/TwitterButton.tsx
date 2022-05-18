import { Button, ButtonProps } from '@mantine/core';
import { TwitterIcon } from '../../icon/TwitterIcon';

export function TwitterButton(props: ButtonProps<'a'>) {
  return (
    <Button
      component="a"
      leftIcon={<TwitterIcon />}
      variant="default"
      {...props}
    />
  );
}
