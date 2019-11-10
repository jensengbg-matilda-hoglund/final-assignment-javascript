const pickColor = document.querySelectorAll(".color_style");
pickColor.addEventlistener("click", function(event) {
  for (let i = 0; i < pickColor.length; i++) {
    pickColor[i].className = "checked";
    if (pickColor.className == "checked") {
      pickColor[i].addEventListener("click", async function(event) {
        if (styleFilter[i].className === "checked") {
          let styling = event.target.attributes[2].value;
          let imgArray = await getData(
            api_key,
            userSearch,
            quantity,
            1,
            styling
          );
          let urlArray = createURL(imgArray);
          createImage(urlArray);
          imgArray = [];
          urlArray = [];
        }
});
    }
  }
}


/*

const imgStyle = () => {
  const styleFilter = document.querySelectorAll(".color-style");
  for (let i = 0; i < styleFilter.length; i++) {
    styleFilter[i].addEventListener("click", 
    
    async function(event) {
      if (styleFilter[i].className === "checked") {
        let styling = event.target.attributes[2].value;
        let imgArray = await getData(api_key, userSearch, quantity, 1, styling);
        let urlArray = createURL(imgArray);
        createImage(urlArray);
        imgArray = [];
        urlArray = [];
      }
    });
  }
};
imgStyle();
*/