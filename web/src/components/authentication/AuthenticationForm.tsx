import { upperFirst, useForm, useToggle } from '@mantine/hooks';
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

export function AuthenticationForm(props: PaperProps<'div'>) {
  const [type, toggle] = useToggle('login', ['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) =>
        val.length >= minLength &&
        includesNumber.test(val) &&
        includesLowerCase.test(val) &&
        includesUpperCase.test(val) &&
        includesSpecialSymbol.test(val),
    },
  });

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="xl" p={30} mt={30} radius="md" {...props}>
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

        <form onSubmit={form.onSubmit((data) => console.log(data))}>
          <Group direction="column" grow>
            {type === 'register' && (
              <TextInput
                label={'Name'}
                placeholder={'Your name'}
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue('name', event.currentTarget.value)
                }
              />
            )}

            <TextInput
              required
              label={'Email'}
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email && 'Invalid email'}
            />

            <PasswordInput
              withPasswordRequirements={type === 'register'}
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
            />

            {type === 'register' && (
              <Checkbox
                label={'I accept the terms and conditions'}
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue('terms', event.currentTarget.checked)
                }
              />
            )}
          </Group>

          <Button mt="xl" type="submit" fullWidth>
            {upperFirst(type)}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
