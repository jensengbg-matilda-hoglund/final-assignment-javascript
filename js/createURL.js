// create URL from imgArray

const createURL = imgArray => {
  const imageSize = document.getElementById("size");
  document.querySelectorAll(".img-container").forEach(n => n.remove()); // Remove previous IMG & DIV elements
  document.querySelectorAll(".gallery-img").forEach(n => n.remove());

  let urlArray = imgArray.map(index => {
    return `https://farm${index.farm}.staticflickr.com/${index.server}/${index.id}_${index.secret}_${imageSize.value}.jpg`;
  });
  return urlArray;
};

export default createURL;
