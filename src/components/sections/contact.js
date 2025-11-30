import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  padding: 20vh 120px var(--spacing-xxxl);
  margin-top: 0vh;
  text-align: center;

  @media (max-width: 1080px) {
    padding: 20vh 80px var(--spacing-xxxl);
  }
  @media (max-width: 768px) {
    padding: 20vh 40px var(--spacing-xxl);
  }
  @media (max-width: 480px) {
    padding: 20vh 24px var(--spacing-xxl);
  }

  > * {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }

  .overline {
    display: block;
    margin-bottom: var(--spacing-md);
    color: var(--medium-gray);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.1em;

    &:before {
      bottom: 0;
      font-size: var(--fz-xs);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 400;
    letter-spacing: -0.02em;
  }

  p {
    color: var(--light-gray);
    line-height: 1.8;
    margin: var(--spacing-lg) auto 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: var(--spacing-xxl);
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (revealContainer.current && sr) {
      sr.reveal(revealContainer.current, srConfig());
    }
  }, [prefersReducedMotion]);

  return (
    <StyledContactSection
      id="contact"
      ref={revealContainer}
      style={prefersReducedMotion ? { opacity: 1 } : {}}
    >
      <h2 className="numbered-heading overline">What’s Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <p>
        I'm always looking for new opportunities and people to meet, so let's link up! Whether you
        have a question or just want to say hi, feel free to reach out!
      </p>

      <a className="email-link" href={`mailto:${email}`}>
        Say Hello
      </a>
    </StyledContactSection>
  );
};

export default Contact;
