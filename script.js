document.getElementById('fetch-btn').addEventListener('click', function () {
    const repoUrl = document.getElementById('repo-url').value.trim();
    if (!repoUrl) {
      alert('Please enter a valid GitHub repo (e.g., user/repo)');
      return;
    }
    const repo = repoUrl.replace("https://github.com/", "");
    fetch(`https://api.github.com/repos/${repo}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Repo not found');
        }
        return response.json();
      })
      .then(data => {
        const repoInfo = `
          <p><strong>Repo Name:</strong> ${data.name}</p>
          <p><strong>Description:</strong> ${data.description || 'No description'}</p>
          <p><strong>Stars:</strong> ${data.stargazers_count}</p>
          <p><strong>Forks:</strong> ${data.forks_count}</p>
          <p><strong>Open Issues:</strong> ${data.open_issues_count}</p>
        `;
        document.getElementById('repo-info').innerHTML = repoInfo;
      })
      .catch(error => {
        document.getElementById('repo-info').innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
      });
  });
  