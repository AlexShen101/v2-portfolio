import React, { useEffect, useRef } from 'react';
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

  console.log(data);

  const featuredProjects = data.projects.edges.filter(({ node }) => node);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { elementRef: titleRef, scrollProgress: titleProgress } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -5% 0px',
  });

  const titleOpacity = prefersReducedMotion ? 1 : titleProgress;
  const titleTranslateY = prefersReducedMotion ? 0 : (1 - titleProgress) * 30;

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

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => (
            <FeaturedProjectItem key={i} node={node} index={i} />
          ))}
      </StyledProjectsGrid>
    </StyledFeatureSection>
  );
};

export default Featured;
