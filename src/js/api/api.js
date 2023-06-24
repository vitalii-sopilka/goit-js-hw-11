import axios from "axios";

export async function getPhotos(inputValue, page) {
  try {
    return await axios.get('https://pixabay.com/api/', {
      params: {
          key: '37775018-35716a84a46a948528041aaab',
          q: inputValue,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch : true,
          per_page: 40,
          page: page,
      }
    });
  } catch (error) {
    console.log(error);
  }
}
