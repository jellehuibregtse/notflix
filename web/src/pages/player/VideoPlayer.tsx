import { Center } from '@mantine/core';

export function VideoPlayer(): JSX.Element {
  return (
    <Center>
      <video id="videoPlayer" width="650" controls autoPlay>
        <source src="/api/video" type="video/mp4" />
      </video>
    </Center>
  );
}
