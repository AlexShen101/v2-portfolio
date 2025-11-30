import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { css } from 'styled-components';
import { navLinks } from '@config';
import { loaderDelay } from '@utils';
import { useScrollDirection, usePrefersReducedMotion } from '@hooks';
import { Menu } from '@components';
import { IconLogo, IconHex } from '@components/icons';

const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0px 80px;
  width: 100%;
  height: var(--nav-height);
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-secondary);
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  backdrop-filter: blur(20px);
  transition: var(--transition);

  @media (max-width: 1080px) {
    padding: 0 60px;
  }
  @media (max-width: 768px) {
    padding: 0 32px;
  }

  ${props =>
    props.scrollDirection === 'up' &&
    !props.scrolledToTop &&
    css`
      height: var(--nav-scroll-height);
      transform: translateY(0px);
      background-color: var(--bg-primary);
      border-bottom: 1px solid var(--border-primary);
    `};

  ${props =>
    props.scrollDirection === 'down' &&
    !props.scrolledToTop &&
    css`
      height: var(--nav-scroll-height);
      transform: translateY(calc(var(--nav-scroll-height) * -1));
      border-bottom: 1px solid var(--border-primary);
    `};
`;

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: var(--light-gray);
  font-family: var(--font-sans);
  counter-reset: item 0;
  z-index: 12;

  .logo {
    ${({ theme }) => theme.mixins.flexCenter};
    color: var(--cream);
    width: 42px;
    height: 42px;
    position: relative;
    z-index: 1;
    transition: var(--transition-fast);

    .hex-container {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      @media (prefers-reduced-motion: no-preference) {
        transition: var(--transition-fast);
      }
    }

    .logo-container {
      position: relative;
      z-index: 1;
      svg {
        fill: none;
        user-select: none;
        @media (prefers-reduced-motion: no-preference) {
          transition: var(--transition-fast);
        }
        polygon {
          fill: var(--bg-primary);
        }
      }
    }

    &:hover,
    &:focus {
      outline: 0;
      opacity: 0.7;
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 var(--spacing-sm);
      position: relative;
      font-size: var(--fz-xs);

      a {
        padding: 8px 12px;
        color: var(--light-gray);
        transition: var(--transition-fast);
        text-transform: uppercase;
        letter-spacing: 0.05em;

        &:hover {
          color: var(--cream);
        }
      }
    }
  }

  .resume-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: var(--spacing-sm);
    font-size: var(--fz-xxs);
  }
`;

const BackToHomeText = styled.span`
  color: var(--light-gray);
  transition: var(--transition-fast);
  font-size: var(--fz-md);

  &:hover {
    color: var(--cream);
  }
`;

const Nav = ({ isHome, isVideoPage }) => {
  const [isMounted, setIsMounted] = useState(!isHome);
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const timeout = isHome ? loaderDelay : 0;
  const fadeClass = isHome ? 'fade' : '';
  const fadeDownClass = isHome ? 'fadedown' : '';

  const Logo = (
    <div className="logo" tabIndex="-1">
      <Link to="/" aria-label="home">
        <div className="hex-container">
          <IconHex />
        </div>
        <div className="logo-container">
          <IconLogo />
        </div>
      </Link>
    </div>
  );

  const ResumeLink = (
    <a className="resume-button" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
      Resume
    </a>
  );

  return (
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
      <StyledNav>
        {prefersReducedMotion ? (
          <>
            {Logo}

            <StyledLinks>
              <ol>
                {navLinks &&
                  navLinks.map(({ url, name }, i) => (
                    <li key={i}>
                      <Link to={url}>{name}</Link>
                    </li>
                  ))}
              </ol>
              {ResumeLink}
            </StyledLinks>
          </>
        ) : (
          <>
            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition classNames={fadeClass} timeout={timeout}>
                  <>{Logo}</>
                </CSSTransition>
              )}
            </TransitionGroup>

            <StyledLinks>
              <ol>
                <TransitionGroup component={null}>
                  {isMounted &&
                    navLinks &&
                    navLinks.map(({ url, name }, i) => (
                      <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>
                        <li key={i} style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                          <Link to={url}>{name}</Link>
                        </li>
                      </CSSTransition>
                    ))}
                </TransitionGroup>
              </ol>

              <TransitionGroup component={null}>
                {isMounted && (
                  <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                    <div style={{ transitionDelay: `${isHome ? navLinks.length * 100 : 0}ms` }}>
                      {ResumeLink}
                    </div>
                  </CSSTransition>
                )}
              </TransitionGroup>
            </StyledLinks>
          </>
        )}

        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames={fadeClass} timeout={timeout}>
              <Menu />
            </CSSTransition>
          )}
        </TransitionGroup>
      </StyledNav>
    </StyledHeader>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool,
};

export default Nav;
