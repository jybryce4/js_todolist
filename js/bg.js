const bg = document.getElementById("header");

// background image URLs
imageURLs = ['img/bg1.jpg', 'img/bg2.jpg', 'img/bg3.jpg', 'img/bg4.jpg', 'img/bg5.jpg', 'img/bg6.jpg'];

// needed for saving the current image
let imgUrl, imgIndex;

// save image state
let currentImage = localStorage.getItem("BG-IMG");
let currentImageID = localStorage.getItem("BG-IMG-ID");

// check if image is there
if (currentImage) {
    imgUrl = currentImage;
    imgIndex = currentImageID;
    loadImage(imgUrl); // load image if it is saved
} else { 
    // set default image
    imgUrl = imageURLs[0];
    imgIndex = 0;
}

// load the current image into UI
function loadImage(img) {
    bg.style.backgroundImage = `url(${img})`;
}

// background image changer
bg.addEventListener("click", event => {
    // reset the index as needed
    if (imgIndex >= imageURLs.length) {
        imgIndex = 0;
    }

    // set the image
    bg.style.backgroundImage = `url(${imageURLs[imgIndex]})`;

    // add current image to localStorage
    localStorage.setItem("BG-IMG", imageURLs[imgIndex]);
    localStorage.setItem("BG-IMG-ID", imgIndex);

    // increment index
    imgIndex++;
    
});



/*
// randomly set a background image on click
bg.addEventListener("click", event => {
    let imgIndex = Math.floor(Math.random() * imageURLs.length);
    bg.style.backgroundImage = `url(${imageURLs[imgIndex]})`;
});
*/