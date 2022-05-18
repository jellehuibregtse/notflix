import {
  Container,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core';
import { ReactNode, Suspense } from 'react';
import { CustomHeader } from './CustomHeader';
import { CustomLoader } from '../loader/CustomLoader';

const theme: MantineThemeOverride = {
  fontSizes: {
    xs: 12,
    sm: 15,
    md: 20,
    lg: 30,
    xl: 40,
  },
  colorScheme: 'dark',
  primaryColor: 'red',
  colors: {
    dark: [
      '#ffffff',
      '#A6A7AB',
      '#909296',
      '#5C5F66',
      '#373A40',
      '#2C2E33',
      '#25262B',
      // Default background color.
      '#1A1B1E',
      '#141517',
      '#101113',
    ],
  },
};

const headerLinks = [
  {
    link: '/',
    label: 'Home',
  },
  {
    link: '/browse',
    label: 'Series',
  },
  {
    link: '/browse',
    label: 'Films',
  },
  {
    link: '/browse',
    label: 'New & Popular',
  },
  {
    link: '/browse',
    label: 'My List',
  },
];

interface Props {
  children: ReactNode;
}

export function ApplicationContainer({ children }: Props): JSX.Element {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Suspense
        fallback={
          <Container fluid>
            <CustomLoader />
          </Container>
        }
      >
        <CustomHeader links={headerLinks} user={{ name: 'Jelle', image: '' }} />
        {children}
      </Suspense>
    </MantineProvider>
  );
}
