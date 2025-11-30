import { css } from 'styled-components';

const button = css`
  color: var(--cream);
  background-color: transparent;
  border: 1px solid var(--border-primary);
  border-radius: var(--border-radius);
  font-size: var(--fz-xs);
  font-family: var(--font-sans);
  line-height: 1;
  text-decoration: none;
  padding: 14px 28px;
  transition: var(--transition-fast);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 400;

  &:hover,
  &:focus-visible {
    outline: none;
    background-color: var(--cream);
    color: var(--bg-primary);
    border-color: var(--cream);
  }
  &:after {
    display: none !important;
  }
`;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition-fast);

    &:hover,
    &:focus-visible {
      color: var(--cream);
      outline: 0;
    }
  `,

  inlineLink: css`
    display: inline-block;
    position: relative;
    color: var(--cream);
    transition: var(--transition-fast);

    &:hover,
    &:focus-visible {
      color: var(--cream);
      outline: 0;
      &:after {
        width: 100%;
      }
      & > * {
        color: var(--cream) !important;
        transition: var(--transition-fast);
      }
    }
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 1px;
      position: relative;
      bottom: 0.37em;
      background-color: var(--cream);
      opacity: 0.3;
      @media (prefers-reduced-motion: no-preference) {
        transition: var(--transition-fast);
      }
    }
  `,

  button,

  smallButton: css`
    color: var(--cream);
    background-color: transparent;
    border: 1px solid var(--border-primary);
    border-radius: var(--border-radius);
    padding: 10px 20px;
    font-size: var(--fz-xxs);
    font-family: var(--font-sans);
    line-height: 1;
    text-decoration: none;
    transition: var(--transition-fast);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 400;

    &:hover,
    &:focus-visible {
      outline: none;
      background-color: var(--cream);
      color: var(--bg-primary);
      border-color: var(--cream);
    }
    &:after {
      display: none !important;
    }
  `,

  bigButton: css`
    color: var(--cream);
    background-color: transparent;
    border: 1px solid var(--border-primary);
    border-radius: var(--border-radius);
    padding: 18px 36px;
    font-size: var(--fz-sm);
    font-family: var(--font-sans);
    line-height: 1;
    text-decoration: none;
    transition: var(--transition-fast);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 400;

    &:hover,
    &:focus-visible {
      outline: none;
      background-color: var(--cream);
      color: var(--bg-primary);
      border-color: var(--cream);
    }
    &:after {
      display: none !important;
    }
  `,

  boxShadow: css`
    box-shadow: 0 2px 8px var(--shadow);
    transition: var(--transition-fast);

    &:hover,
    &:focus-visible {
      box-shadow: 0 4px 16px var(--shadow);
    }
  `,

  fancyList: css`
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fz-md);
    li {
      position: relative;
      padding-left: var(--spacing-md);
      margin-bottom: var(--spacing-sm);
      &:before {
        content: '—';
        position: absolute;
        left: 0;
        color: var(--medium-gray);
      }
    }
  `,

  resetList: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
};

export default mixins;
