import { Blocks } from 'react-loader-spinner'; //https://mhnpd.github.io/react-loader-spinner/docs/components/blocks
import { LoaderBox } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderBox>
      <Blocks />
    </LoaderBox>
  );
};
