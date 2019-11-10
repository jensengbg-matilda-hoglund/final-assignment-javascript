import getData from "./API-getData.js";
import createURL from "./createURL.js";

// API-URL ( get data with flickr API )
const api_key = "19d3e6e0acfe9c438f368e2c2bab1c5d"; // my flickR API-key
const userSearch = document.getElementById("search-field"); // user input search
const quantity = document.getElementById("number-of-images"); // user images select
const imageSize = document.getElementById("size");

// Search-button
document
  .getElementById("submit-search")
  .addEventListener("click", async function(event) {
    let nextPage = event.srcElement.attributes[0].value;
    let imgArray = await getData(api_key, userSearch, quantity);
    let urlArray = createURL(imgArray); // Now lets pass this array into the next function createURL.
    createImage(urlArray);
    imgArray = [];
    urlArray = [];
  });

// Enter-KEY search
document
  .getElementById("search-field")
  .addEventListener("keydown", async function(event) {
    if (event.keyCode === 13) {
      let imgArray = await getData(api_key, userSearch, quantity);
      let urlArray = createURL(imgArray); // Now lets pass this array into the next function createURL.
      createImage(urlArray);
    }
  });

// DISPLAY GALLERY
const gallerySection = document.getElementById("flickr-gallery"); // GLOBAL varable

const createImage = urlArray => {
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
  }
};
const overlay = document.getElementById("lightbox-overlay");
const lightboxImage = document.getElementById("lightbox-image");

// LIGHTBOX
const lightbox = event => {
  lightboxImage.src = event.srcElement.attributes[0].value.replace(
    "_" + imageSize.value, // get url and change img-size
    "_b"
  );
  overlay.appendChild(lightboxImage);
  overlay.style.display = "flex";
  overlay.addEventListener("click", function() {
    this.style.display = "none";
  });
};

// SWITCH PAGE
const selectPage = () => {
  const pages = document.getElementsByClassName("page");
  for (let i = 0; i < pages.length; i++) {
    pages[i].addEventListener("click", async function(event) {
      let nextPage = event.srcElement.attributes[0].value;
      let imgArray = await getData(api_key, userSearch, quantity, nextPage);
      let urlArray = createURL(imgArray); // Now lets pass this array into the next function createURL.
      createImage(urlArray);
    });
  }
};
selectPage();

// X-button reset
document.getElementById("reset-search").addEventListener("click", function(e) {
  userSearch.value = "";
});
/*
// COLOR_STYLE
const switchStyle = () => {
  const imageStyle = document.getElementById("color-list");
  imageStyle.addEventListener("click", function(e) {
    if (e.target.className === "style-button") {
      e.target.classList.toggle("checked");
    }
    if (e.target == "checked") {
      let style = event.srcElement.attributes[3].value;
    }
  });
};
switchStyle(style);
*/

// ------------------ THE FUCKING END OF MY SUPER FUCKING AWESOME CODE ------------- //
