import { createGlobalStyle } from 'styled-components';
import fonts from './fonts';
import variables from './variables';
import TransitionStyles from './TransitionStyles';
import PrismStyles from './PrismStyles';

const GlobalStyle = createGlobalStyle`
  ${fonts};
  ${variables};

  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  ::selection {
    background-color: var(--cream);
    color: var(--bg-primary);
  }

  /* Provide basic, default focus styles.*/
  :focus {
    outline: 1px solid var(--border-primary);
    outline-offset: 2px;
  }

  /*
    Remove default focus styles for mouse users ONLY if
    :focus-visible is supported on this platform.
  */
  :focus:not(:focus-visible) {
    outline: none;
    outline-offset: 0px;
  }

  /*
    Optionally: If :focus-visible is supported on this
    platform, provide enhanced focus styles for keyboard
    focus.
  */
  :focus-visible {
    outline: 1px solid var(--cream);
    outline-offset: 2px;
  }

  /* Scrollbar Styles - Minimal */
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--border-primary) var(--bg-primary);
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: var(--bg-primary);
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--border-primary);
    border: 2px solid var(--bg-primary);
    border-radius: 0;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: var(--bg-primary);
    color: var(--light-gray);
    font-family: var(--font-sans);
    font-size: var(--fz-md);
    line-height: 1.6;

    @media (max-width: 480px) {
      font-size: var(--fz-sm);
    }

    &.hidden {
      overflow: hidden;
    }

    &.blur {
      overflow: hidden;

      header {
        background-color: transparent;
      }

      #content > * {
        filter: blur(3px);
        transition: var(--transition);
        pointer-events: none;
        user-select: none;
      }
    }
  }

  #root {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
  }

  main {
    margin: 0 auto;
    width: 100%;
    max-width: var(--max-width);
    min-height: 100vh;
    padding: 0;

    &.fillHeight {
      padding: 0;
    }
  }

  section {
    margin: 0;
    padding: 0;
    max-width: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 var(--spacing-sm) 0;
    font-weight: 500;
    color: var(--cream);
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .big-heading {
    margin: 0;
    font-size: clamp(48px, 8vw, 96px);
    font-weight: 400;
    letter-spacing: -0.03em;
  }

  .medium-heading {
    margin: 0;
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 400;
    letter-spacing: -0.02em;
  }

  .numbered-heading {
    display: flex;
    align-items: center;
    position: relative;
    margin: 0 0 var(--spacing-xxl) 0;
    width: 100%;
    font-size: clamp(28px, 5vw, 40px);
    white-space: nowrap;
    font-weight: 400;

    &:before {
      position: relative;
      counter-increment: section;
      content: '0' counter(section);
      margin-right: var(--spacing-md);
      color: var(--medium-gray);
      font-family: var(--font-mono);
      font-size: clamp(var(--fz-sm), 2vw, var(--fz-md));
      font-weight: 400;

      @media (max-width: 480px) {
        margin-right: var(--spacing-sm);
      }
    }

    &:after {
      content: '';
      display: none; /* Removed line for cleaner minimal look */
    }
  }

  img[alt=""],
  img:not([alt]) {
    filter: blur(5px);
  }

  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition-fast);

  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;
  }

  input, textarea {
    border-radius: 0;
    outline: 0;

    &:focus {
      outline: 0;
    }
    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }

  p {
    margin: 0 0 15px 0;

    &:last-child,
    &:last-of-type {
      margin: 0;
    }

    & > a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    & > code {
      background-color: var(--bg-tertiary);
      color: var(--cream);
      font-size: var(--fz-sm);
      border-radius: var(--border-radius);
      padding: 0.25em 0.5em;
    }
  }

  ul {
    &.fancy-list {
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
    }
  }

  blockquote {
    border-left-color: var(--border-primary);
    border-left-style: solid;
    border-left-width: 1px;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: var(--spacing-md);

    p {
      font-style: italic;
      font-size: var(--fz-lg);
    }
  }

  hr {
    background-color: var(--border-primary);
    height: 1px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    margin: var(--spacing-xl) 0;
  }

  code {
    font-family: var(--font-mono);
    font-size: var(--fz-md);
  }

  .skip-to-content {
    ${({ theme }) => theme.mixins.button};
    position: absolute;
    top: auto;
    left: -999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    z-index: -99;

    &:hover,
    &:focus {
      background-color: var(--cream);
      color: var(--bg-primary);
      top: 0;
      left: 0;
      width: auto;
      height: auto;
      overflow: auto;
      z-index: 99;
      box-shadow: none;
      transform: none;
    }
  }

  #logo {
    color: var(--cream);
  }

  .overline {
    color: var(--medium-gray);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .subtitle {
    color: var(--medium-gray);
    margin: 0 0 var(--spacing-md) 0;
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    font-weight: 400;
    line-height: 1.6;
    text-transform: uppercase;
    letter-spacing: 0.05em;

    @media (max-width: 1080px) {
      font-size: var(--fz-xs);
    }
    @media (max-width: 768px) {
      font-size: var(--fz-xxs);
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      line-height: 1.6;
    }
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-xl);
    color: var(--medium-gray);

    .arrow {
      display: block;
      margin-right: var(--spacing-sm);
      padding-top: 4px;
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      font-weight: 400;
      line-height: 1.5;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  }

  .gatsby-image-outer-wrapper {
    height: 100%;
  }

  ${TransitionStyles};

  ${PrismStyles};
`;

export default GlobalStyle;
