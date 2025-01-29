document.getElementById('uidForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const uid = document.getElementById('uid').value;
  const profileContainer = document.getElementById('profile');

  // Clear previous data
  profileContainer.innerHTML = 'Loading...';

  try {
    // Fetch data from Enka Network API
    const response = await fetch(`https://enka.network/api/uid/${uid}`);
    if (!response.ok) throw new Error('Failed to fetch data');

    const data = await response.json();

    // Display profile information
    profileContainer.innerHTML = `
      <h2>Player Info</h2>
      <p><strong>Nickname:</strong> ${data.playerInfo.nickname}</p>
      <p><strong>Adventure Rank:</strong> ${data.playerInfo.level}</p>
      <p><strong>World Level:</strong> ${data.playerInfo.worldLevel}</p>
      <h3>Characters</h3>
      <div class="characters-list">
        ${data.avatarInfoList.map(character => `
          <div class="character">
            <img src="https://enka.network/ui/${character.avatarId}.png" alt="${character.avatarId}">
            <div class="character-info">
              <p><strong>Name:</strong> ${character.avatarId}</p>
              <p><strong>Level:</strong> ${character.level}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } catch (error) {
    profileContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
});