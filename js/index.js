/* SEARCH FOR IMAGE IN INPUTFIELD AND DISPLY ON WEBSITE */

// -------------- Making API URL ------------ //

const api_key = "19d3e6e0acfe9c438f368e2c2bab1c5d"; // flickr-key
let quantity = document.getElementById("desired-quantity"); // number of imges shown depending on user (DO LATER)
const userSearch = document.getElementById("search-field"); // user input search

// https:// flickr rest api method - search - photo only - one or more tags -
async function getData() {
  urlArray = [];
  const URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&media=photos&per_page=${encodeURIComponent(
    quantity.value
  )}&tag_mode=all&api_key=${api_key}&sort=relevance&tags=${encodeURIComponent(
    userSearch.value
  )}&format=json&nojsoncallback=1`;
  let response = await fetch(URL, { method: "GET" });
  let data = await response.json();
  let object = await data; // Whole JSON object, dont need that crap soo ->
  let imgArray = object.photos.photo; // ... I took the things I actually need, like the array with all photo's.
  console.log(imgArray); // In console we can se all the images as objects with their attributes.
  createURL(imgArray); // Now lets pass this array into the next function createURL.
}

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", getData);

// ---------------------------------------- //

// -------------- MAKING URL'S----------- //

// To show an image on the page I need an URL to use as SRC in <img> tag.
// I use .map() to loop through our imgArray and take out the necesary info put it in the URL-formula.
// With .map() this is autmatically done for each element in the array, and return's a new array with URL's.

createURL = imgArray => {
  let urlArray = imgArray.map(index => {
    return `https://farm${index.farm}.staticflickr.com/${index.server}/${index.id}_${index.secret}.jpg`;
  });

  createImage(urlArray); // Sending this variable to the next function
  console.log(urlArray); // Look in the console to see if our URL's look's like we want them to.
};
// ----------------------------------------- //

// ----------- DISPLAY GALLERY ------------ //
const gallerySection = document.getElementById("flickr-gallery"); // GLOBAL varable

createImage = urlArray => {
  for (let i = 0; i < urlArray.length; i++) {
    const newImage = document.createElement("img"); // create new img element for each element int the array
    newImage.src = urlArray[i]; // give the element the src of [i]
    newImage.width = "150px";
    newImage.className = "image"; // classname for styling it in css
    gallerySection.appendChild(newImage); // add it inside of "gallerySection"
  }
};

// ------------------ THE END ------------- //
/*
------- USER choose mount of images to show -----
- input-field number, or checkboxes
- change the variable
*/

/* 
---------- LIGHTBOX ----------
- Onclikc open lightbox,
- cross field toclose, and maybe with esc button aswell.
*/

/* 
 --------- EXTRA ---------
 -  Show related tags
 -  Patricle JS background in header/hero section
 */
