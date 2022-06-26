import {
  Badge,
  Box,
  Card,
  Center,
  createStyles,
  Group,
  Image,
  Text,
} from '@mantine/core';
import { Movie } from '../../api/models/Movie';

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

interface Props {
  movie: Movie;
}

export function TitleCard({ movie }: Props): JSX.Element {
  const { classes } = useStyles();

  return (
    <Box className={classes.cardContainer}>
      <Card className={classes.card}>
        <Card.Section>
          <Image
            width={235}
            height={135}
            radius="xs"
            alt={movie.title}
            src={'https://www.themoviedb.org/t/p/original' + movie.posterPath}
          />
        </Card.Section>
      </Card>
    </Box>
  );
}
