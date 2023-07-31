import fs from 'fs';

export const saveData = (username, reliability, wishlist, artists, genres) => {
  const data = {
    username,
    reliability,
    wishlist,
    followedArtists: artists,
    followedGenres: genres,
  }

  const directory = './results';
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  
  const filePath = `./results/${username}.json`;
  try {
    fs.writeFileSync(filePath, JSON.stringify(data));
    console.log(`Result saved successfully to path: ${filePath}`);
  } catch (err) {
    console.error('Error saving the file:', err);
  }
}
