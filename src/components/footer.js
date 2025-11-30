import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 80px;
  padding: var(--spacing-lg);
  text-align: center;
  border-top: 1px solid var(--border-secondary);
`;

const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 300px;
    margin: 0 auto var(--spacing-sm);
    color: var(--medium-gray);
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: var(--spacing-sm);
      color: var(--medium-gray);
      transition: var(--transition-fast);

      &:hover {
        color: var(--cream);
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledCredit = styled.div`
  color: var(--medium-gray);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  a {
    padding: var(--spacing-sm);
    color: var(--medium-gray);
    transition: var(--transition-fast);

    &:hover {
      color: var(--cream);
    }
  }

  .github-stats {
    margin-top: var(--spacing-sm);

    & > span {
      display: inline-flex;
      align-items: center;
      margin: 0 var(--spacing-xs);
    }
    svg {
      display: inline-block;
      margin-right: var(--spacing-xs);
      width: 14px;
      height: 14px;
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <StyledSocialLinks>
        <ul>
          {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name}>
                  <Icon name={name} />
                </a>
              </li>
            ))}
        </ul>
      </StyledSocialLinks>

      <StyledCredit tabindex="-1">
        <a href="https://github.com/bchiang7/v4">
          <div>Design Forked from @bchiang7</div>
        </a>
      </StyledCredit>
    </StyledFooter>
  );
};

Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;
