// content/getProjects.js
const axios = require('axios');
const fs = require('fs/promises');
const path = require('path');

const GITHUB_USERNAME = 'AlexShen101';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

async function getLatestCommitDate(repo) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}/commits`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );
    return response.data[0].commit.author.date.split('T')[0];
  } catch (error) {
    console.error(`Error fetching commit date for ${repo}:`, error.message);
    return new Date().toISOString().split('T')[0]; // Fallback to current date
  }
}

async function ensureUniqueDirectory(baseDir, name) {
  let dir = path.join(baseDir, name);
  let counter = 1;
  
  while (true) {
    try {
      await fs.access(dir);
      dir = path.join(baseDir, `${name}-${counter}`);
      counter++;
    } catch {
      return dir;
    }
  }
}

async function fetchGithubRepos() {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    for (const repo of response.data) {
      const latestCommitDate = await getLatestCommitDate(repo.name);
      
      const repoData = {
        date: latestCommitDate,
        title: repo.name,
        github: repo.html_url,
        external: '',
        ios: '',
        android: '',
        tech: [],
        showInProjects: false,
        featured: false,
        rating: 5,
        cover: './thumbnail.png'
      };

      const slugifiedName = slugify(repo.name);
      const projectsDir = path.join(__dirname, 'projects', 'tmp');
      
      // Ensure projects directory exists
      await fs.mkdir(projectsDir, { recursive: true });
      
      // Get unique directory path
      const projectDir = await ensureUniqueDirectory(projectsDir, slugifiedName);
      
      const projectContent = `---
date: '${repoData.date}'
title: '${repoData.title}'
github: '${repoData.github}'
external: '${repoData.external}'
ios: '${repoData.ios}'
android: '${repoData.android}'
tech:
${repoData.tech.map(t => `- ${t}`).join('\n')}
showInProjects: ${repoData.showInProjects}
featured: ${repoData.featured}
rating: ${repoData.rating}
cover: '${repoData.cover}'
---

${repo.description || ''}
`;

      await fs.mkdir(projectDir, { recursive: true });
      await fs.writeFile(path.join(projectDir, 'index.md'), projectContent);
      console.log(`Created file for ${repo.name} in ${projectDir}`);
    }

    console.log('Successfully created project files for all repositories!');
  } catch (error) {
    console.error('Error fetching repositories:', error.message);
  }
}

fetchGithubRepos();