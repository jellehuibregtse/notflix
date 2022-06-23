import {
  Box,
  Container,
  Grid,
  Group,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { TitleCard } from './TitleCard';
import { useGetMovies } from '../../api/requests/movie';
import { Movie } from '../../api/models/Movie';

export function Slider(): JSX.Element {
  const { data } = useGetMovies();

  return (
    <Container fluid>
      <Text size="md" weight={600}>
        Trending now
      </Text>
      <Group>
        {data?.map((movie: Movie) => (
          <UnstyledButton
            onClick={() => window.location.assign('/play')}
            key={movie.id}
          >
            <TitleCard movie={movie} />
          </UnstyledButton>
        ))}
      </Group>
    </Container>
  );
}
