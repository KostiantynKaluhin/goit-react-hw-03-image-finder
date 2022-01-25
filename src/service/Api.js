const API_KEY = `24234149-5c66644c32ce64debb1a8789c`;
const BASE_URL = "https://pixabay.com/api/";

const fetchImages = async (searchItem, page) => {
  const rawResult = await fetch(
    `${BASE_URL}?q=${searchItem}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  if (!rawResult.ok) {
    throw rawResult;
  }

  const result = await rawResult.json();

  return result;
};

export default fetchImages;
