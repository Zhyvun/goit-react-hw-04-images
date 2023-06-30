import React from 'react';
import PropTypes from 'prop-types';
import { BtnBox, BtnLoadMore } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <BtnBox>
      <BtnLoadMore type="button" onClick={onClick}>
        Load more
      </BtnLoadMore>
    </BtnBox>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
