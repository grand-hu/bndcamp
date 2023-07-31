export const calculateReliability = (wishList, genres) => {
  const uniqueGenreIDs = new Set(genres.map((genre) => genre.genre_id));
  const itemsWithMatchingGenre = wishList.filter((item) => uniqueGenreIDs.has(item.genre_id));
  const reliability = (itemsWithMatchingGenre.length / wishList.length) * 100;
  return +reliability.toFixed(2);
};
