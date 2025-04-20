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


async function checkGithubUrlExists(baseDir, tmpDir, githubUrl) {
  const directories = [baseDir, tmpDir];
  
  for (const dir of directories) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const projectPath = path.join(dir, entry.name);
          const existingGithubUrl = await getGithubUrlFromIndexMd(projectPath);
          if (existingGithubUrl === githubUrl) {
            return true;
          }
        }
      }
    } catch (error) {
      console.error(`Error checking directory ${dir}:`, error.message);
    }
  }
  return false;
}

async function ensureUniqueDirectory(baseDir, name, githubUrl) {
  const tmpDir = path.join(__dirname, '_tmp');
  let dir = path.join(tmpDir, name);
  let counter = 1;
  console.log(`Checking for existing directory: ${dir}`);
 
  const exists = await checkGithubUrlExists(baseDir, tmpDir, githubUrl);
  if (exists) {
    console.log(`Directory ${dir} already exists with same GitHub URL`);
    return null;
  }

  // github url is unique, make unique dir name
  while (true) {
    try {
      await fs.access(dir);
      // Directory exists, try next number
      dir = path.join(tmpDir, `${name}-${counter}`);
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
      const projectsDir = path.join(__dirname);
      const tmpDir = path.join(__dirname, '_tmp');
      
      // Ensure dirs exist
      await fs.mkdir(projectsDir, { recursive: true });
      await fs.mkdir(tmpDir, { recursive: true });
      
      // check if project exists in _tmp folder
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