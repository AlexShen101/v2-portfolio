import React from 'react';
import styled from 'styled-components';
import { Layout } from '@components';
import games from '../../content/games/games';
import { Icon } from '@components/icons';

const StyledGamesContainer = styled.div`
  @media (max-width: 768px) {
    margin: 50px -10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    tbody tr {
      &:hover,
      &:focus {
        background-color: var(--light-navy);
      }
    }

    th,
    td {
      padding: 10px;
      text-align: left;

      &:first-child {
        padding-left: 20px;

        @media (max-width: 768px) {
          padding-left: 10px;
        }
      }
      &:last-child {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
        }
      }
    }

    tr {
      cursor: default;

      td:first-child {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
      }
      td:last-child {
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
      }
    }

    td {
      &.title {
        padding-top: 15px;
        padding-right: 20px;
        color: var(--lightest-slate);
        font-size: var(--fz-xl);
        font-weight: 600;
        line-height: 1.25;
      }

      &.date {
        font-family: var(--font-mono);
        font-size: var(--fz-xs);
        line-height: 1.5;
      }
    }
  }
`;

const GamesPage = ({ location }) => {
  games = games.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Layout location={location}>
      <main>
        <StyledGamesContainer>
          <h1>My Games</h1>

          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game, index) => (
                <tr key={index}>
                  <td className="title">
                    {game.title}
                  </td>
                  <td className="link">
                    {game.url &&
                      <a href={game.url} aria-label="External Link">
                        <Icon name="External" />
                      </a>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </StyledGamesContainer>
      </main>
    </Layout>
  );
};

export default GamesPage;