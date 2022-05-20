import { upperFirst, useToggle } from '@mantine/hooks';
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PaperProps,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import PasswordInput from './PasswordInput';
import {
  includesLowerCase,
  includesNumber,
  includesSpecialSymbol,
  includesUpperCase,
  minLength,
} from '../../constants/PasswordValidation';
import { useForm } from '@mantine/form';
import { useLogin, useRegister } from '../../api/requests/token';

export function AuthenticationForm(props: PaperProps<'div'>) {
  const [type, toggle] = useToggle('login', ['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length >= minLength &&
        includesNumber.test(value) &&
        includesLowerCase.test(value) &&
        includesUpperCase.test(value) &&
        includesSpecialSymbol.test(value)
          ? null
          : 'Invalid password',
    },
  });

  return (
    <Container size={420} my={40}>
      <Paper withBorder p={30} mt={30} radius="md" {...props}>
        <Title
          align="center"
          sx={() => ({
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          <Anchor
            component="button"
            type="button"
            color="gray"
            onClick={() => toggle()}
            size="xs"
          >
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
        </Text>

        <form
          onSubmit={form.onSubmit((values: typeof form.values) => {
            return type === 'login'
              ? useLogin(values.email, values.password)
              : useRegister(values.email, values.password);
          })}
          id={type}
        >
          <Group direction="column" grow>
            {type === 'register' && (
              <TextInput
                label={'Name'}
                placeholder={'Your name'}
                {...form.getInputProps('name')}
              />
            )}

            <TextInput
              required
              label={'Email'}
              placeholder="hello@mantine.dev"
              {...form.getInputProps('email')}
            />

            <PasswordInput
              withPasswordRequirements={type === 'register'}
              {...form.getInputProps('password')}
            />

            {type === 'register' && (
              <Checkbox
                label={'I accept the terms and conditions'}
                {...form.getInputProps('terms', { type: 'checkbox' })}
              />
            )}
          </Group>

          <Button mt="xl" type="submit" form={type} fullWidth>
            {upperFirst(type)}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
