//   MODULE getData from API
async function getData(api_key, userSearch, quantity, nextPage = 1, styling) {
  const URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&m
    edia=photos&api_key=${api_key}&sort=relevance&text=${encodeURIComponent(
    userSearch.value
  )}&per_page=${encodeURIComponent(quantity.value)}&page=${encodeURIComponent(
    nextPage
  )}&styles=${styling}&format=json&nojsoncallback=1`;
  let response = await fetch(URL, { method: "GET" });
  let data = await response.json();
  let object = await data;
  let imgArray = object.photos.photo;
  return imgArray;
}

export default getData;
