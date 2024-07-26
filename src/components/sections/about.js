import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';


// const StyledAboutSection = styled.section`
//   max-width: 900px;

//   .inner {
//     display: grid;
//     grid-template-columns: 3fr 2fr;
//     grid-gap: 50px;

//     @media (max-width: 768px) {
//       display: block;
//     }
//   }
// `;

const StyledAboutSection = styled.section`
  max-width: 700px;
  padding-top: 20vh; /* Adjust this value to match the height of your navbar */
  margin-top: -20vh; /* Negative margin to pull the content up */
  
  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    // @media (min-width: 700px) {
    //   min-height: 340px;
    // }
  }
`;

const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'JavaScript (ES6+)',
    'Python',
    'C++',
    'C',
    'Java',
    'React.js',
    'Node.js',
    'MongoDB',
    'AWS suite',
    'Bootstrap',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">Skills</h2>

      <div className="inner">
        <StyledText>
          <div>
            {/*
              <p>
                Insert "About Me" text here if needed
              </p>

            */}

            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

      </div>
    </StyledAboutSection>
  );
};

export default About;
