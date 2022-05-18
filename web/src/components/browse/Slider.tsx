import { Box, Container, createStyles, Text } from '@mantine/core';
import { TitleCard } from './TitleCard';

const useStyles = createStyles(() => ({
  slider: {
    display: 'flex',
    height: '100%',
    overflowX: 'scroll',
  },
}));

export function Slider(): JSX.Element {
  const { classes } = useStyles();

  return (
    <Container fluid>
      <Text size="md" weight={600}>
        Trending now
      </Text>
      <Box className={classes.slider}>
        {[...new Array(10)].map(() => (
          <Box px={4}>
            <TitleCard />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
