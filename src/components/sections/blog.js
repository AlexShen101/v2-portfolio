import React, { useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';

const FeaturedPostSection = styled.section`
  padding: 30vh 120px 0;
  margin-top: -20vh;

  @media (max-width: 1080px) {
    padding: 30vh 80px 0;
  }
  @media (max-width: 768px) {
    padding: 30vh 40px 0;
  }
  @media (max-width: 480px) {
    padding: 30vh 24px 0;
  }

  > * {
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
  }

  .link-container {
    margin-top: 4rem;
    text-align: end;
    a {
      font-size: var(--fz-md) !important;
    }

    @media (max-width: 768px) {
      margin-top: 1rem;
    }
  }

  .post_container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: inline-flex;
  align-items: baseline;
  flex-direction: column;
  padding: 1rem;
  gap: 2.5rem;
`;

const StyledPost = styled.li`
  transition: var(--transition);
  display: flex;

  ${({ theme }) => theme.mixins.flexBetween};
  gap: 3rem;
  align-items: flex-start;

  .more_link {
    margin-left: 2px;
  }

  .metadata {
    display: flex;
    min-width: 8rem;
    flex-direction: column;
    justify-content: flex-start;
    font-size: var(--fz-lg);
  }

  .date {
    color: var(--medium-gray);
    margin: 0.2rem 0;
  }

  .read_time {
    color: var(--light-gray);
  }

  .title {
    font-size: var(--fz-xxl);
    color: var(--black);
    margin-top: 2px;
  }

  .description {
    margin: 1rem 0;
    margin-top: 0.4rem;
    font-size: var(--fz-xl);
  }

  @media (max-width: 870px) {
    flex-direction: column;
    gap: 0.5rem;

    .description {
      margin-top: 0;
    }

    .date {
      display: none;
    }
  }

  @media (max-width: 600px) {
    .description {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
`;

const Blog = () => {
  const revealBlog = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const posts = [];

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (revealBlog.current && sr) {
      sr.reveal(revealBlog.current, srConfig());
    }
  }, [prefersReducedMotion]);

  return (
    <FeaturedPostSection
      id="featured-posts"
      ref={revealBlog}
      style={prefersReducedMotion ? { opacity: 1 } : {}}
    >
      <h2 className="numbered-heading">
        Featured Posts
      </h2>

      <div className="post_container">
        <StyledGrid>
        </StyledGrid>
      </div>

      <div className="link-container">
        <Link className="styled_link" to="/blog">
          see all posts &rarr;
        </Link>
      </div>
      
    </FeaturedPostSection>
  );
};

export default Blog;