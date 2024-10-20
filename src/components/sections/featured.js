import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledFeatureSection = styled.section`
  padding-top: 20vh; /* Adjust this value to match the height of your navbar */
  margin-top: -25vh; /* Negative margin to pull the content up */
`;

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 80px;
  margin-top: 50px;

  @media (max-width: 768px) {
    grid-gap: 40px;
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
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);

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
      opacity: 0.5;
      transition: opacity 0.3s ease, transform 0.3s ease;

      &:hover {
        opacity: 0.8;
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
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: var(--border-radius);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .project-details {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    background-color: rgba(255, 255, 255, 0.05);
    padding: 20px;
    border-radius: var(--border-radius);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .tech-stack-heading {
    font-size: var(--fz-md);
    font-weight: 600;
    color: var(--lightest-slate);
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      background-color: rgba(255, 255, 255, 0.05);
      padding: 10px;
      border-radius: 8px;
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      transition: all 0.3s ease;
      font-size: var(--fz-md);
      font-weight: 500;

      &:hover {
        background: linear-gradient(
          135deg, 
          rgba(100, 255, 218, 0.1) 0%, 
          rgba(10, 25, 47, 0.7) 100%
        );
        box-shadow: 0 8px 12px 0 rgba(100, 255, 218, 0.1);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid rgba(100, 255, 218, 0.3);
        transform: translateY(-2px);
      }
    }
  }

  .project-links {
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    a {
      padding: 10px;
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: 50%;
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      transition: all 0.3s ease;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
      }

      svg {
        width: 22px;
        height: 22px;
        transition: transform 0.2s ease;

        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }

  .project-description {
    margin-top: 10px;
  }

  .project-overline {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);

    a {
      text-decoration: none;
      color: inherit;
      
      &:hover,
      &:focus {
        color: var(--green);
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

  console.log(data)


  const featuredProjects = data.projects.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledFeatureSection id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Some Things I've Built
      </h2>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, tech, github, cover } = frontmatter;
            const image = getImage(cover);

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)} className={i % 2 === 1 ? 'right-image' : ''}>
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
                  <div
                    className="project-description"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
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
          })}
      </StyledProjectsGrid>
    </StyledFeatureSection>
  );
};

export default Featured;
