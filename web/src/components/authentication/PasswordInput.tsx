import React, { ChangeEventHandler, useState } from 'react';
import {
  Anchor,
  Box,
  Center,
  Group,
  PasswordInput as MantinePasswordInput,
  Progress,
  Text,
} from '@mantine/core';
import { Check, X } from 'tabler-icons-react';
import {
  includesLowerCase,
  includesNumber,
  includesSpecialSymbol,
  includesUpperCase,
  minLength,
} from '../../constants/PasswordValidation';

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text color={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        {meets ? <Check size={14} /> : <X size={14} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: includesNumber, label: 'Includes number' },
  { re: includesLowerCase, label: 'Includes lowercase letter' },
  { re: includesUpperCase, label: 'Includes uppercase letter' },
  { re: includesSpecialSymbol, label: 'Includes special symbol' },
];

function getStrength(password: string): number {
  let multiplier = password.length >= minLength ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

interface Props {
  withPasswordRequirements: boolean;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function PasswordInput({
  withPasswordRequirements = false,
  value,
  onChange,
}: Props): JSX.Element {
  const [passwordInputFocused, setPasswordInputFocused] =
    useState<boolean>(false);
  const strength = getStrength(value);
  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: '100ms' } }}
        value={
          value.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 4) * 100
            ? 100
            : 0
        }
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));

  return (
    <div>
      <Group position="apart" mb={5}>
        <Text component="label" htmlFor="your-password" size="sm" weight={500}>
          Password
        </Text>

        <Anchor<'a'>
          href="#"
          onClick={(event) => event.preventDefault()}
          sx={(theme) => ({
            paddingTop: 2,
            color:
              theme.colors[theme.primaryColor][
                theme.colorScheme === 'dark' ? 4 : 6
              ],
            fontWeight: 500,
            fontSize: theme.fontSizes.xs,
          })}
        >
          Forgot your password?
        </Anchor>
      </Group>

      <MantinePasswordInput
        id="your-password"
        value={value}
        onFocus={() => setPasswordInputFocused(true)}
        onBlur={() => setPasswordInputFocused(false)}
        onChange={onChange}
        placeholder="Your password"
        required
      />

      {passwordInputFocused && withPasswordRequirements && (
        <>
          <Group spacing={5} grow mt="xs" mb="md">
            {bars}
          </Group>

          <PasswordRequirement
            label="Has at least 8 characters"
            meets={value.length > 7}
          />
          {requirements.map((requirement, index) => (
            <PasswordRequirement
              key={index}
              label={requirement.label}
              meets={requirement.re.test(value)}
            />
          ))}
        </>
      )}
    </div>
  );
}
