import { Box, Card, createStyles, Image } from '@mantine/core';

const useStyles = createStyles(() => ({
  card: {
    transition: '0.3s',

    '&:hover': {
      transform: 'scale(1.1)',
      cursor: 'pointer',
    },
  },

  cardContainer: {
    minWidth: 235,
    maxWidth: 135,
  },
}));

export function TitleCard(): JSX.Element {
  const { classes } = useStyles();

  return (
    <Box className={classes.cardContainer}>
      <Card className={classes.card}>
        <Card.Section>
          <Image
            width={235}
            height={135}
            radius="xs"
            src={
              'https://www.themoviedb.org/t/p/original/hPea3Qy5Gd6z4kJLUruBbwAH8Rm.jpg'
            }
          />
        </Card.Section>
      </Card>
    </Box>
  );
}
