import { Button, ButtonProps } from '@mantine/core';
import { GoogleIcon } from '../../icon/GoogleIcon';

export function GoogleButton(props: ButtonProps<'button'>): JSX.Element {
  return (
    <Button
      leftIcon={<GoogleIcon />}
      variant="default"
      color="gray"
      {...props}
    />
  );
}
