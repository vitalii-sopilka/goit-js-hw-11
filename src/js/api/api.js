import axios from "axios";

export async function getPhotos(inputValue, page) {
    try {
      return await axios.get('https://pixabay.com/api/', {
        params: {
            key: '37265508-698720a89f242e7ec4ebdb49a',
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
