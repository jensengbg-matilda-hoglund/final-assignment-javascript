/*
-------------- ATT GÖRA -------------
* Söka på bilder med ESC-knapp
* Varje ny sökning ska nollställa resultatet från förra sökningen
*
*/

// API-URL (hämta all data från flickR)
const api_key = "19d3e6e0acfe9c438f368e2c2bab1c5d"; // flickr-key
const userSearch = document.getElementById("search-field"); // user input search (tags)

async function getData() {
  // RESET BOTH ARRAYS AFTER IMAGES ARE DISPLAYED IN GALLERY SECTION
  const URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&media=photos&per_page=50&sort=interestingness_desc&page=8&tag_mode=all&api_key=${api_key}&sort=relevance&tags=${encodeURIComponent(
    userSearch.value
  )}&format=json&nojsoncallback=1`;
  let response = await fetch(URL, { method: "GET" });
  let data = await response.json();
  let object = await data; // Whole JSON object, dont need that crap soo ->
  let imgArray = object.photos.photo; // ... I took the things I actually need, like the array with all photo's.
  console.log(imgArray); // In console we can se all the images as objects with their attributes.
  createURL(imgArray); // Now lets pass this array into the next function createURL.
}

// To show an image on the page I need an URL to use as SRC in <img> tag.
// I use .map() to loop through our imgArray and take out the necesary info put it in the URL-formula.
// With .map() this is autmatically done for each element in the array, and return's a new array with URL's.

// MAKING URL from API data
createURL = imgArray => {
  document.querySelectorAll(".img-container").forEach(n => n.remove());
  document.querySelectorAll(".gallery-img").forEach(n => n.remove());

  let urlArray = imgArray.map(index => {
    return `https://farm${index.farm}.staticflickr.com/${index.server}/${index.id}_${index.secret}.jpg`;
  });

  createImage(urlArray); // Sending this variable to the next function
  console.log(urlArray); // Look in the console to see if our URL's look's like we want them to.
};
// ----------------------------------------- //

// Search-button
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", getData);

//Tryck ENTER för att söka
const enterSearch = document.getElementById("search-field");
enterSearch.addEventListener("keydown", function(e) {
  if (e.keyCode === 13) {
    getData();
  }
});

// DISPLAY GALLERY
const gallerySection = document.getElementById("flickr-gallery"); // GLOBAL varable

createImage = urlArray => {
  for (let i = 0; i < urlArray.length; i++) {
    const newDiv = document.createElement("div"); // create new div element for each URL
    const newImage = document.createElement("img"); // -||- img element
    newDiv.className = "img-container"; // give div classname
    gallerySection.appendChild(newDiv); // append div to my gallery-section
    newImage.src = urlArray[i]; // give img an SRC from URL i created earlier

    newImage.className = "gallery-img"; // give img classname
    newDiv.appendChild(newImage); // append img to div.
    // --- REAPEAT for each element in my URL array --- //
  }
  imgArray = [];
  urlArray = [];
};

// RESET SEARCHFIELD WHIT X-button
resetSearch = () => {
  userSearch.value = "";
};

const clearInput = document.getElementById("reset-search");
clearInput.addEventListener("click", resetSearch);

// ------------------ THE END ------------- //
/*
------- USER choose mount of images to show -----
- input-field number, or checkboxes
- change the variable
*/

/* 
---------- LIGHTBOX ----------
- Onclick open lightbox,
- cross field toclose, linked to esc button.
*/

/* 
 --------- EXTRA ---------
 -  Show related tags
 -  Patricle JS background in header/hero section
 */

/* ------------ GALLERI TEST --------------- */

//let gallery = document.getElementsByClassName("gallery")[0];
