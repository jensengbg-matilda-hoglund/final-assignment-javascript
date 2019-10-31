// ------- JSON data -> image display ------- //
let imgArray = [];

//https://www.flickr.com/photos/{user-id}/{photo-id} - individual photo

// ---------------------------------------------- //

// ---- SEARCH FUNCTION ---- //
/* GLOBAL */

const api_key = "&api_key=19d3e6e0acfe9c438f368e2c2bab1c5d"; // flickr-key
let quantity = "5"; // number of imges shown
const pages = "&page=1"; // Antal sidor som ska skapas,
const userSearch = document.getElementById("search-field");

async function getData() {
  const URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&per_page=${quantity}&tags=${encodeURIComponent(
    userSearch.value
  )}&format=json`;
  let response = await fetch(URL, { method: "GET" });
  let data = await response.json();
  return await data; // SOME SHITTY PROBLEM HERE?
}

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", getData);

// ---------------------------------------------------- //

// DISPLAY GALLERY
/*const gallery = document.getElementById("flickr-gallery");

async function display() {
  let output = await getData();

  gallery.innerHTML = output;
}

// To map <photo> elements to urls, please read the url documentation.
// https://www.flickr.com/services/api/misc.urls.html

/*
------- USER choose mount of images to show -----
*input-field number, or checkboxes
* ändra variabeln /
*/

/* 
---------- LIGHTBOX ----------
- Klicka på en bild: Öppna bildens länk i lightbox
- Stänga lightbox med kryssruta (och eventuellt esc)
*/

/*
------- SEARCH FUNCTION ------ 
- Starta function med searchbutton
- Ta sökord från inputfield
- Skicka sökord till API
- Hämta data från responsen
- Omvandla data till img-länkar https://www.flickr.com/services/api/misc.urls.html
- Visa på sida
 */

/*
 ---- ANTAL BILDER PER SIDA ----
 - Ange antal bilder som ska visas  (Jag vill visa 5 bilder till att börja med)
 - Ange antal sidor man ska kunna bläddra (Prioritet: LÅG)
 */

/* 
 --------- EXTRA ---------
 * Show related tags
 * Patricle JS background
 */
