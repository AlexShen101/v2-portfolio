import React from 'react';
import styled from 'styled-components';
import { Layout } from '@components';
import { videos } from '/content/videoPorfolio/videos';
const StyledVideosContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 0;
`;

const VideoItem = styled.div`
  margin-bottom: 2rem;
  
  iframe {
    max-width: 100%;
  }

  h3 {
    margin-top: 0.5rem;
  }
`;

const Section = styled.section`
  margin-bottom: 4rem;

  h2 {
    margin-bottom: 1.5rem;
  }
`;

const VideosPage = ({ location }) => {
  const latestDemoReel = videos
    .filter(video => video.type === 'demoReel')
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  const regularVideos = videos.filter(video => video.type === 'video');
  const shorts = videos.filter(video => video.type === 'short');

  return (
    <Layout location={location}>
      <StyledVideosContainer>
        <h1>My Videos</h1>
        
        <Section>
          <h2>Latest Demo Reel</h2>
          {latestDemoReel && (
            <VideoItem>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${latestDemoReel.id}`}
                title={latestDemoReel.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </VideoItem>
          )}
        </Section>

        <Section>
          <h2>Regular Videos</h2>
          {regularVideos.map((video) => (
            <VideoItem key={video.id}>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </VideoItem>
          ))}
          {regularVideos.length === 0 && <p>No regular videos currently!</p>}
        </Section>

        <Section>
          <h2>Shorts</h2>
          {shorts.map((video) => (
            <VideoItem key={video.id}>
              <iframe
                width="315"
                height="560"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </VideoItem>
          ))}
        </Section>
      </StyledVideosContainer>
    </Layout>
  );
};

export default VideosPage;
