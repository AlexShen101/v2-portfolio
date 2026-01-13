import React, { useEffect, useRef, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion, useScrollAnimation } from '@hooks';

const StyledFeatureSection = styled.section`
  padding: 20vh 120px 0;
  margin-top: 0vh;

  @media (max-width: 1080px) {
    padding: 20vh 80px 0;
  }
  @media (max-width: 768px) {
    padding: 20vh 40px 0;
  }
  @media (max-width: 480px) {
    padding: 20vh 24px 0;
  }
`;

const StyledDesktopProjectsWrapper = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
`;

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--spacing-xxxl);
  margin-top: var(--spacing-xxl);

  @media (max-width: 768px) {
    grid-gap: var(--spacing-xxl);
  }
`;

const StyledProject = styled.li`
  display: grid;
  grid-template-columns: 3fr 2fr; // This creates a 60% / 40% split
  grid-template-rows: auto 1fr;
  grid-gap: 16px;

  .project-image {
    grid-column: 1 / 2;
    grid-row: 1 / -1; // Span all rows
    border-radius: var(--border-radius);
    overflow: hidden;
    border: 1px solid var(--border-primary);
    transition: var(--transition-fast);

    a {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.7;
      filter: grayscale(20%);
      transform: scale(1);
      transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
        filter 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
      border-color: var(--cream);

      .img {
        opacity: 1;
        filter: grayscale(0%);
        transform: scale(1.05);
      }
    }
  }

  .project-content {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: var(--spacing-lg);
    background-color: var(--bg-secondary);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-secondary);
    transition: var(--transition-fast);

    &:hover {
      background-color: var(--bg-tertiary);
      border-color: var(--border-primary);
    }
  }

  .project-details {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    background-color: var(--bg-secondary);
    padding: var(--spacing-lg);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-secondary);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: var(--transition-fast);

    &:hover {
      background-color: var(--bg-tertiary);
      border-color: var(--border-primary);
    }
  }

  .tech-stack-heading {
    font-size: var(--fz-xs);
    font-weight: 400;
    color: var(--medium-gray);
    margin-bottom: var(--spacing-md);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-family: var(--font-mono);
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
    padding: 0;
    margin: 0;
    list-style: none;

    li {
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

    margin-bottom: var(--spacing-md);
  }

  @keyframes breathe {
    0%,
    100% {
      filter: drop-shadow(0 0 1px var(--medium-gray));
      opacity: 0.8;
    }
    50% {
      filter: drop-shadow(0 0 2px var(--cream));
      opacity: 1;
    }
  }

  .project-links {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-md);

    a {
      color: var(--light-gray);
      transition: var(--transition-fast);
      animation: breathe 6s ease-in-out infinite;

      &:hover {
        color: var(--cream);
        filter: drop-shadow(0 0 6px var(--cream));
        animation-play-state: paused;
        opacity: 1;
      }

      svg {
        width: 20px;
        height: 20px;
        transition: var(--transition-fast);
      }
    }
  }

  .project-description {
    margin-top: var(--spacing-sm);
    color: var(--light-gray);
    line-height: 1.6;

    p {
      margin: 0;
    }
  }

  .project-overline {
    color: var(--medium-gray);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .project-title {
    color: var(--cream);
    font-size: clamp(20px, 4vw, 24px);
    font-weight: 500;
    margin-top: var(--spacing-xs);

    a {
      text-decoration: none;
      color: inherit;
      transition: var(--transition-fast);

      &:hover,
      &:focus {
        opacity: 0.7;
      }
    }
  }

  &:nth-of-type(even) {
    grid-template-columns: 2fr 3fr; // Reverse the 40% / 60% split for even items

    .project-image {
      grid-column: 2 / 3;
    }
    .project-content,
    .project-details {
      grid-column: 1 / 2;
    }
  }
`;

const StyledMobileFeedContainer = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: 0 auto;
    padding: var(--spacing-xl) 0;
    gap: var(--spacing-xxxl);
  }
`;

const StyledFeedCard = styled.div`
  background-color: var(--bg-primary);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-secondary);
  transition: var(--transition-fast);

  &:hover {
    border-color: var(--border-primary);
  }
`;

const StyledMediaContainer = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  cursor: pointer;

  .feed-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover .feed-image {
    transform: scale(1.05);
  }

  .gradient-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 50%, transparent 100%);
    pointer-events: none;
  }
`;

const StyledFloatingTags = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-right: 48px;
  z-index: 2;

  .tag {
    padding: 4px 8px;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(12px);
    color: white;
    font-size: 9px;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const StyledProjectNumber = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  z-index: 2;
`;

const StyledBottomOverlay = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  color: white;
  z-index: 2;

  h3 {
    font-size: clamp(32px, 7vw, 42px);
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--cream);
    line-height: 1.2;
  }

  .info-hint {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 10px;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.1em;

    svg {
      color: var(--decide-neon);
    }
  }
`;

const StyledExpandableContent = styled.div`
  display: grid;
  grid-template-rows: ${({ isExpanded }) => (isExpanded ? '1fr' : '0fr')};
  opacity: ${({ isExpanded }) => (isExpanded ? '1' : '0')};
  transition: all 0.5s ease-in-out;
  overflow: hidden;
`;

const StyledExpandableInner = styled.div`
  overflow: hidden;
  padding: ${({ isExpanded }) => (isExpanded ? 'var(--spacing-lg) var(--spacing-lg) 0' : '0 var(--spacing-lg)')};

  .description {
    font-size: var(--fz-sm);
    color: var(--light-gray);
    line-height: 1.6;
    margin-bottom: var(--spacing-md);

    p {
      margin: 0;
    }
  }

  .all-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;

    .tag-hash {
      font-size: 10px;
      color: var(--medium-gray);
      font-family: var(--font-mono);
    }
  }
`;

const StyledActionBar = styled.div`
  padding: var(--spacing-lg);
  border-top: 1px solid var(--border-secondary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.01);

  .links {
    display: flex;
    gap: var(--spacing-lg);

    a {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--medium-gray);
      text-decoration: none;
      transition: var(--transition-fast);

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  .expand-button {
    padding: 8px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.05);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    color: ${({ isExpanded }) => (isExpanded ? 'var(--decide-neon)' : 'var(--medium-gray)')};
    transform: ${({ isExpanded }) => (isExpanded ? 'rotate(180deg)' : 'rotate(0deg)')};

    &:hover {
      background-color: rgba(255, 255, 255, 0.08);
    }

    svg {
      width: 18px;
      height: 18px;
      display: block;
    }
  }
`;

const StyledEndMarker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-xxxl) 0;
  opacity: 0.2;

  .line {
    width: 1px;
    height: 48px;
    background-color: var(--medium-gray);
    margin-bottom: var(--spacing-md);
  }

  .text {
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    text-transform: uppercase;
    letter-spacing: 0.3em;
    color: var(--medium-gray);
  }
`;

// Map external links to custom link text
const externalLinkTextMap = {
  'https://coe5-army-optimizer-demo-site.vercel.app/': 'Learn More',
};

const FeaturedProjectItem = ({ node, index }) => {
  const { frontmatter, html } = node;
  const { external, title, tech, github, cover } = frontmatter;
  const image = getImage(cover);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { elementRef, scrollProgress } = useScrollAnimation({
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px',
  });

  // Calculate animation values based on scroll progress
  const opacity = prefersReducedMotion ? 1 : scrollProgress;
  const translateY = prefersReducedMotion ? 0 : (1 - scrollProgress) * 40;
  const scale = prefersReducedMotion ? 1 : 0.95 + scrollProgress * 0.05;

  return (
    <StyledProject
      ref={elementRef}
      className={index % 2 === 1 ? 'right-image' : ''}
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        transition: prefersReducedMotion
          ? 'none'
          : 'transform 0.1s ease-out, opacity 0.1s ease-out',
      }}>
      <div className="project-image">
        <a href={external || github || '#'}>
          {cover ? (
            <GatsbyImage image={image} alt={title} className="img" />
          ) : (
            <StaticImage src="./thumbnail.png" alt={title} className="img" />
          )}
        </a>
      </div>

      <div className="project-content">
        <p className="project-overline">Featured Project</p>
        <h3 className="project-title">
          <a href={external}>{title}</a>
        </h3>
        <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      <div className="project-details">
        {tech.length && (
          <>
            <h4 className="tech-stack-heading">Built With</h4>
            <ul className="project-tech-list">
              {tech.map((tech, i) => (
                <li key={i}>{tech}</li>
              ))}
            </ul>
          </>
        )}

        <div className="project-links">
          {github && (
            <a href={github} aria-label="GitHub Link">
              <Icon name="GitHub" />
            </a>
          )}
          {external && (
            <a href={external} aria-label="External Link" className="external">
              <Icon name="External" />
            </a>
          )}
        </div>
      </div>
    </StyledProject>
  );
};

const MobileFeedCard = ({ node, index, isExpanded, onToggle }) => {
  const { frontmatter, html } = node;
  const { external, title, tech, github, cover } = frontmatter;
  const image = getImage(cover);

  return (
    <StyledFeedCard>
      <StyledMediaContainer onClick={onToggle}>
        {cover ? (
          <GatsbyImage image={image} alt={title} className="feed-image" />
        ) : (
          <StaticImage src="./thumbnail.png" alt={title} className="feed-image" />
        )}

        <div className="gradient-overlay" />

        <StyledFloatingTags>
          {tech.slice(0, 3).map((tag, i) => (
            <span key={i} className="tag">
              {tag}
            </span>
          ))}
        </StyledFloatingTags>

        <StyledProjectNumber>{index + 1}</StyledProjectNumber>

        <StyledBottomOverlay>
          <h3>{title}</h3>
          <div className="info-hint">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>TAP FOR DETAILS</span>
          </div>
        </StyledBottomOverlay>
      </StyledMediaContainer>

      <StyledExpandableContent isExpanded={isExpanded}>
        <StyledExpandableInner isExpanded={isExpanded}>
          <div className="description" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="all-tags">
            {tech.map((tag, i) => (
              <span key={i} className="tag-hash">
                #{tag}
              </span>
            ))}
          </div>
        </StyledExpandableInner>
      </StyledExpandableContent>

      <StyledActionBar isExpanded={isExpanded}>
        <div className="links">
          {github && (
            <a href={github} aria-label="GitHub Link">
              <Icon name="GitHub" />
              <span>View Code</span>
            </a>
          )}
          {external && (
            <a href={external} aria-label="External Link">
              <Icon name="External" />
              <span>{externalLinkTextMap[external] || 'Live Demo'}</span>
            </a>
          )}
        </div>
        <button className="expand-button" onClick={onToggle} aria-label="Toggle details">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </StyledActionBar>
    </StyledFeedCard>
  );
};

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/projects/.*/index\\.md/" },
          frontmatter: { featured: { eq: true } }
          }
        sort: { fields: [frontmatter___rating], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              cover {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
              tech
              github
              external
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.projects.edges.filter(({ node }) => node);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [expandedMobileIndex, setExpandedMobileIndex] = useState(0);

  const { elementRef: titleRef, scrollProgress: titleProgress } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -5% 0px',
  });

  const titleOpacity = prefersReducedMotion ? 1 : titleProgress;
  const titleTranslateY = prefersReducedMotion ? 0 : (1 - titleProgress) * 30;

  const toggleMobileExpand = index => {
    setExpandedMobileIndex(expandedMobileIndex === index ? null : index);
  };

  return (
    <StyledFeatureSection id="projects">
      <h2
        className="numbered-heading"
        ref={titleRef}
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleTranslateY}px)`,
          transition: prefersReducedMotion
            ? 'none'
            : 'transform 0.1s ease-out, opacity 0.1s ease-out',
        }}>
        Some Things I've Built
      </h2>

      {/* Desktop Layout */}
      <StyledDesktopProjectsWrapper>
        <StyledProjectsGrid>
          {featuredProjects &&
            featuredProjects.map(({ node }, i) => (
              <FeaturedProjectItem key={i} node={node} index={i} />
            ))}
        </StyledProjectsGrid>
      </StyledDesktopProjectsWrapper>

      {/* Mobile Feed Layout */}
      <StyledMobileFeedContainer>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => (
            <MobileFeedCard
              key={i}
              node={node}
              index={i}
              isExpanded={expandedMobileIndex === i}
              onToggle={() => toggleMobileExpand(i)}
            />
          ))}
        <StyledEndMarker>
          <div className="line" />
          <div className="text">End of Index</div>
        </StyledEndMarker>
      </StyledMobileFeedContainer>
    </StyledFeatureSection>
  );
};

export default Featured;
