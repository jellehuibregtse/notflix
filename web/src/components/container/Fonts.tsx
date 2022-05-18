import { Global } from '@mantine/core';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import regular from '../../assets/fonts/NetflixSans.woff';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import medium from '../../assets/fonts/NetflixSansMedium.woff';

export function Fonts() {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Netflix Sans',
            src: `url('${regular}') format('woff')`,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Netflix Sans',
            src: `url('${medium}') format('woff')`,
            fontStyle: 'normal',
          },
        },
      ]}
    />
  );
}
