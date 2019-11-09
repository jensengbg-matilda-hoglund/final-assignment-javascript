//   MODULE getData from API
async function getData(api_key, userSearch, quantity, nextPage = 1, styling) {
  // RESET BOTH ARRAYS AFTER IMAGES ARE DISPLAYED IN GALLERY SECTION
  const URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&m
    edia=photos&tag_mode=all&api_key=${api_key}&sort=relevance&tags=${encodeURIComponent(
    userSearch.value
  )}&per_page=${encodeURIComponent(quantity.value)}&page=${encodeURIComponent(
    nextPage
  )}&styles=${styling}&format=json&nojsoncallback=1`;
  let response = await fetch(URL, { method: "GET" });
  let data = await response.json();
  let object = await data; // Whole JSON object, dont need that crap soo -->>
  let imgArray = object.photos.photo; // ... let's only take info about the image which is stored as an array.
  return imgArray;
}

export default getData;
