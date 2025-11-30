import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledJobsSection = styled.section`
  max-width: 100%;
  padding: 10vh 120px var(--spacing-xl);
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, #fff0 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, #fff0 1px);
  background-size: 40px 40px;
  border: 1px solid rgb(51 51 51);
  border-right-width: 0px;
  border-left-width: 0px;
  animation: gridMove 4.5s linear infinite;

  @keyframes gridMove {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -40px -40px;
    }
  }

  @media (max-width: 1080px) {
    padding: 30vh 80px 0;
  }
  @media (max-width: 768px) {
    padding: 30vh 40px 0;
  }
  @media (max-width: 480px) {
    padding: 30vh 24px 0;
  }

  .inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 var(--spacing-md) 2px;
  border-left: 1px solid var(--border-secondary);
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--cream)' : 'var(--medium-gray)')};
  font-family: var(--font-sans);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;
  transition: var(--transition-fast);
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    padding: 0 var(--spacing-sm) 2px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 140px;
    padding: 0 var(--spacing-sm);
    border-left: 0;
    border-bottom: 1px solid var(--border-secondary);
    text-align: center;
  }

  &:hover,
  &:focus {
    background-color: var(--bg-tertiary);
    color: var(--cream);
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 1px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--cream);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.2s var(--easing);
  transition-delay: 0.05s;

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: 140px;
    height: 1px;
    margin-left: 50px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * 140px));
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: var(--spacing-xl);

  @media (max-width: 600px) {
    margin-left: 0;
  }

  strong {
    color: var(--cream);
    font-weight: 500;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: var(--spacing-sm) var(--spacing-xs);

  @keyframes neonBreathe {
    0%,
    100% {
      text-shadow: 0 0 10px rgba(0, 255, 148, 0.6), 0 0 20px rgba(0, 255, 148, 0.4),
        0 0 30px rgba(0, 255, 148, 0.2);
    }
    50% {
      text-shadow: 0 0 5px rgba(0, 255, 148, 0.4), 0 0 10px rgba(0, 255, 148, 0.2);
    }
  }

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  h3 {
    margin-bottom: var(--spacing-xs);
    font-size: var(--fz-xl);
    font-weight: 500;
    line-height: 1.4;

    .company {
      color: var(--decide-neon);
      font-weight: 400;
      text-shadow: 0 0 10px rgba(0, 255, 148, 0.6);
      animation: neonBreathe 3s ease-in-out infinite;
    }
  }

  .range {
    margin-bottom: var(--spacing-lg);
    color: var(--medium-gray);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-lg);
  }

  .tag {
    background-color: var(--bg-tertiary);
    color: var(--light-gray);
    padding: 6px 12px;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-primary);
    transition: var(--transition-fast);
    font-size: var(--fz-xxs);
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.05em;

    &:hover {
      background-color: var(--bg-elevated);
      border-color: var(--medium-gray);
      color: var(--cream);
    }
  }
`;

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
              tags
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;

  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
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

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus]);

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <StyledJobsSection
      id="jobs"
      ref={revealContainer}
      style={prefersReducedMotion ? { opacity: 1 } : {}}>
      <h2 className="numbered-heading">Where I’ve Worked</h2>

      <div className="inner">
        {/* Companies sidebar */}
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={e => onKeyDown(e)}>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { company } = node.frontmatter;
              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-selected={activeTabId === i ? true : false}
                  aria-controls={`panel-${i}`}>
                  <span>{company}</span>
                </StyledTabButton>
              );
            })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        {/* Job descriptions */}
        <StyledTabPanels>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { frontmatter, html } = node;
              const { title, url, company, range, tags } = frontmatter;

              return (
                <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fade">
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? '0' : '-1'}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}>
                    <h3>
                      <span>{title}</span>
                      <span className="company">
                        &nbsp;@&nbsp;
                        <a href={url} className="inline-link">
                          {company}
                        </a>
                      </span>
                    </h3>

                    <p className="range">{range}</p>

                    <div dangerouslySetInnerHTML={{ __html: html }} />

                    <div className="tags">
                      {tags.map((tag, index) => (
                        <span key={index} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </StyledTabPanel>
                </CSSTransition>
              );
            })}
        </StyledTabPanels>
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
