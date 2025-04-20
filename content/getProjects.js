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


async function getGithubUrlFromIndexMd(dirPath) {
  try {
    const indexPath = path.join(dirPath, 'index.md');
    const content = await fs.readFile(indexPath, 'utf8');
    const githubMatch = content.match(/github: '([^']+)'/);
    return githubMatch ? githubMatch[1] : null;
  } catch (error) {
    return null;
  }
}

async function ensureUniqueDirectory(baseDir, name, githubUrl) {
  let dir = path.join(baseDir, name);
  let counter = 1;
  console.log(`Checking for existing directory: ${dir}`);
  
  // First check if the base directory exists and has matching GitHub URL
  try {
    const existingGithubUrl = await getGithubUrlFromIndexMd(dir);
    console.log(existingGithubUrl)
    if (existingGithubUrl === null) {
      console.log(`Directory ${dir} does not exist, using it.`);
      return dir;
    }

    if (existingGithubUrl === githubUrl) {
      console.log(`Skipping ${name} - already exists with same GitHub URL`);
      return null;
    }
  } catch {
    // Directory doesn't exist, we can use this name
    return dir;
  }

  console.log(`Directory ${dir} already exists, checking for unique name...`);

  // If we reach here, we need to find a new unique name
  while (true) {
    dir = path.join(baseDir, `${name}-${counter}`);
    try {
      const existingGithubUrl = await getGithubUrlFromIndexMd(dir);
      if (existingGithubUrl === githubUrl) {
        console.log(`Skipping ${name}-${counter} - already exists with same GitHub URL`);
        return null;
      }
      counter++;
    } catch {
      // Directory doesn't exist, we can use this name
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
      
      // Get unique directory path or null if should skip
      const projectDir = await ensureUniqueDirectory(projectsDir, slugifiedName, repoData.github);
      
      // Skip if directory with same GitHub URL already exists
      if (!projectDir) {
        continue;
      }

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