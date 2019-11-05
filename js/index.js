/*
-------------- ATT GÖRA -------------
* LIGHTBOX
* FILTER (images/page) ---- / extra: color, size.
* STYLA bilderna så det blir space mellan eller inga rader.
*/

/*
IMG SIZES
- small = 
*/

// API-URL (hämta all data från flickR)
const api_key = "19d3e6e0acfe9c438f368e2c2bab1c5d"; // my flickR API-key
const userSearch = document.getElementById("search-field"); // user input search
const quantity = document.getElementById("number-of-images"); // user images select
const imageSize = document.getElementById("image-size");

async function getData() {
  // RESET BOTH ARRAYS AFTER IMAGES ARE DISPLAYED IN GALLERY SECTION
  const URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&m
  edia=photos&per_page=${encodeURIComponent(
    quantity.value
  )}&sort=relevance&page=1&tag_mode=all&api_key=${api_key}&sort=relevance&tags=${encodeURIComponent(
    userSearch.value
  )}&format=json&nojsoncallback=1`;
  let response = await fetch(URL, { method: "GET" });
  let data = await response.json();
  let object = await data; // Whole JSON object, dont need that crap soo -->>
  let imgArray = object.photos.photo; // ... let's only take info about the image which is stored as an array.
  createURL(imgArray); // Now lets pass this array into the next function createURL.
}

// MAKING URL from API data
createURL = imgArray => {
  document.querySelectorAll(".img-container").forEach(n => n.remove()); // Remove previous IMG & DIV elements
  document.querySelectorAll(".gallery-img").forEach(n => n.remove());

  let urlArray = imgArray.map(index => {
    return `https://farm${index.farm}.staticflickr.com/${index.server}/${index.id}_${index.secret}_${imageSize.value}.jpg`;
  });

  createImage(urlArray); // Sending this variable to the next function
  console.log(urlArray); // Look in the console to see if our URL's look's like we want them to.
};
// ---------------------------------------------------- //

// Search-button
document.getElementById("search-button").addEventListener("click", getData);
// Enter-KEY search
document
  .getElementById("search-field")
  .addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
      getData();
    }
  });

//-------------------------------------------------------//

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
    newDiv.appendChild(newImage);
    newImage.addEventListener("click", function(event) {
      lightbox(event);
    });

    //newImage.addEventListener("click", function(e) { console.log(e); });
    // --- REAPEAT for each element in my URL array --- //
  }
  imgArray = [];
  urlArray = [];
};

// X-button reset
document.getElementById("reset-search").addEventListener("click", function(e) {
  userSearch.value = "";
});

// ------------------ THE FUCKING END OF MY SUPER FUCKING AWESOME CODE ------------- //

/* 
---------- LIGHTBOX ----------
- Click on image                                                          %
- Start lightbox function                                                 %
- Function locate URL from the clicked IMG                                %
- Function "sends" URL to element in HTML                                 %
- Element in HTML changes from "none" to flex.                            %
- add buttons/icons in overlay to display in fron of img, z-index 2.      %
- style IMG in html-lightbox
- Make buttons in html element work ex: next, previous, close/esc
- close button make element display: none again
- next/previous WTFi dont know
*/

const overlay = document.getElementById("lightbox-overlay");
const lightboxImage = document.getElementById("lightbox-image");

lightbox = event => {
  lightboxImage.src = event.srcElement.attributes[0].value;
  overlay.appendChild(lightboxImage);
  overlay.style.display = "flex";
};

/*
        <section class="overlay">
          <img id="lightbox-image" src="" alt="" />
        </section>
        */

/* 
 --------- EXTRA ---------
 -  Show related tags
 -  Patricle JS background in header/hero section
 */

/* ------------ GALLERI TEST --------------- */

//let gallery = document.getElementsByClassName("gallery")[0];
