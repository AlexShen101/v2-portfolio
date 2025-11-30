import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/icons';

const StyledHeroSection = styled.section`
  width: 100%;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-primary);
  padding: 20vh 120px var(--spacing-lg);
  margin-top: 0vh;

  @media (max-width: 1080px) {
    padding: 20vh 80px var(--spacing-lg);
  }
  @media (max-width: 768px) {
    padding: 20vh 40px var(--spacing-md);
  }
  @media (max-width: 480px) {
    padding: 20vh 24px var(--spacing-md);
  }
`;

const TerminalContainer = styled.div`
  width: 100%;
  max-width: 896px;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: var(--font-mono);

  :root[data-theme='light'] & {
    background-color: #ffffff;
    border-color: #e5e5e5;
  }
`;

const TerminalHeader = styled.div`
  background-color: var(--bg-tertiary);
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  :root[data-theme='light'] & {
    background-color: #f5f5f5;
    border-bottom-color: #e5e5e5;
  }
`;

const TerminalDots = styled.div`
  display: flex;
  gap: 8px;
`;

const TerminalDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  opacity: 0.5;

  &:nth-child(1) {
    background-color: #ef4444;
  }
  &:nth-child(2) {
    background-color: #eab308;
  }
  &:nth-child(3) {
    background-color: #22c55e;
  }
`;

const TerminalTitle = styled.div`
  font-size: var(--fz-xs);
  color: var(--medium-gray);
`;

const TerminalBody = styled.div`
  padding: 48px;
  font-size: var(--fz-md);
  line-height: 1.6;
  color: var(--light-gray);

  @media (max-width: 768px) {
    padding: 32px;
    font-size: var(--fz-sm);
  }
`;

const TerminalLine = styled.div`
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
`;

const PromptSymbol = styled.span`
  color: #22c55e;
  margin-right: var(--spacing-sm);

  :root[data-theme='light'] & {
    color: #16a34a;
  }
`;

const PromptPath = styled.span`
  color: #3b82f6;
  margin-right: var(--spacing-sm);

  :root[data-theme='light'] & {
    color: #2563eb;
  }
`;

const PromptCommand = styled.span`
  color: var(--cream);
`;

const OutputSection = styled.div`
  margin-bottom: var(--spacing-xl);
  padding-left: var(--spacing-md);
  border-left: 2px solid rgba(255, 255, 255, 0.1);

  :root[data-theme='light'] & {
    border-left-color: #e5e5e5;
  }
`;

const OutputTitle = styled.h1`
  font-size: clamp(28px, 5vw, 48px);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  color: var(--cream);
`;

const OutputSubtitle = styled.p`
  margin-bottom: var(--spacing-md);
  color: var(--decide-neon);
  font-style: italic;

  :root[data-theme='light'] & {
    color: var(--adaline-accent);
  }
`;

const OutputText = styled.p`
  max-width: 672px;
  color: var(--medium-gray);

  span {
    color: var(--cream);
    border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
  }

  :root[data-theme='light'] & span {
    border-bottom-color: #d4d4d4;
  }
`;

const HobbiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const HobbyCard = styled.div`
  padding: 8px 12px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: var(--transition);
  cursor: default;

  &:hover {
    border-color: var(--decide-neon);
  }

  :root[data-theme='light'] & {
    background-color: #fafafa;
    border-color: #e5e5e5;

    &:hover {
      border-color: var(--adaline-accent);
    }
  }
`;

const HobbyPermissions = styled.div`
  font-size: var(--fz-xs);
  color: var(--medium-gray);
  margin-bottom: 2px;
`;

const HobbyContent = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const Cursor = styled.span`
  display: inline-block;
  width: 10px;
  height: 20px;
  background-color: var(--medium-gray);
  animation: blink 1s infinite;
  vertical-align: middle;

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }
`;

const Hero = () => {
  return (
    <StyledHeroSection>
      <TerminalContainer>
        <TerminalHeader>
          <TerminalDots>
            <TerminalDot />
            <TerminalDot />
            <TerminalDot />
          </TerminalDots>
          <TerminalTitle>bash — 80x24</TerminalTitle>
        </TerminalHeader>

        <TerminalBody>
          <TerminalLine>
            <PromptSymbol>➜</PromptSymbol>
            <PromptPath>~</PromptPath>
            <PromptCommand>whoami</PromptCommand>
          </TerminalLine>

          <OutputSection>
            <OutputTitle>Hi, I'm Alexander Shen.</OutputTitle>
            <OutputSubtitle>Lifelong learner && Pioneer</OutputSubtitle>
            <OutputText>
              I'm always trying to pick up and master new skills. Currently getting a Bachelor's in
              Computer Science at the University of Waterloo. When I'm not coding, you can find me
              video editing, listening to new music, or playing video games.
            </OutputText>
          </OutputSection>

          <TerminalLine>
            <PromptSymbol>➜</PromptSymbol>
            <PromptPath>~</PromptPath>
            <PromptCommand>ls -la ./hobbies</PromptCommand>
          </TerminalLine>

          <HobbiesGrid>
            <HobbyCard>
              <HobbyPermissions>-rw-r--r--</HobbyPermissions>
              <HobbyContent>
                <Icon name="Video" size={16} color="#a855f7" />
                <span>video_editing.exe</span>
              </HobbyContent>
            </HobbyCard>

            <HobbyCard>
              <HobbyPermissions>-rw-r--r--</HobbyPermissions>
              <HobbyContent>
                <Icon name="Music" size={16} color="#ec4899" />
                <span>music_discovery.mp3</span>
              </HobbyContent>
            </HobbyCard>

            <HobbyCard>
              <HobbyPermissions>-rw-r--r--</HobbyPermissions>
              <HobbyContent>
                <Icon name="Gamepad" size={16} color="#f97316" />
                <span>gaming_config.json</span>
              </HobbyContent>
            </HobbyCard>
          </HobbiesGrid>

          <TerminalLine>
            <PromptSymbol>➜</PromptSymbol>
            <PromptPath>~</PromptPath>
            <Cursor />
          </TerminalLine>
        </TerminalBody>
      </TerminalContainer>
    </StyledHeroSection>
  );
};

export default Hero;
