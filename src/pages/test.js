import React from 'react';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledVideosContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 0;
`;

const VideoWrapper = styled.div`
  margin-bottom: 30px;
`;

const VideoEmbed = styled.iframe`
  width: 100%;
  height: 315px;
  border: none;
`;

const videos = [
  { id: '9668EqHIyXw', title: 'Demo Reel' },
  { id: 'v0RNnPHx6XU', title: 'Text 1' },
  // Add more videos as needed
];

const VideosPage = ({ location }) => (
  <Layout location={location}>
    <StyledVideosContainer>
      <h1>My Videos</h1>
      {videos.map((video) => (
        <VideoWrapper key={video.id}>
          <VideoEmbed
            src={`https://www.youtube.com/embed/${video.id}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoWrapper>
      ))}
    </StyledVideosContainer>
  </Layout>
);

export default VideosPage;