import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { socialMedia } from '@config';
import { Side } from '@components';
import { Icon } from '@components/icons';

const StyledSocialList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: var(--border-primary);
  }

  li {
    &:last-of-type {
      margin-bottom: var(--spacing-md);
    }

    a {
      padding: var(--spacing-sm);
      color: var(--cream);
      transition: var(--transition-fast);

      &:hover,
      &:focus {
        color: var(--cream);
        transform: translateY(-2px);
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const Social = ({ isHome, isVideoPage }) => (
  <Side isHome={isHome} orientation="left">
    <StyledSocialList>
      {socialMedia &&
        socialMedia.map(({ url, name }, i) => (
          <li key={i}>
            <a href={url} aria-label={name} target="_blank" rel="noreferrer">
              <Icon name={name} />
            </a>
          </li>
        ))}
    </StyledSocialList>
  </Side>
);

Social.propTypes = {
  isHome: PropTypes.bool,
  isVideoPage: PropTypes.bool,
};

export default Social;
