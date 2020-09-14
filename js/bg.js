const bg = document.getElementById("header");

// background image URLs
imageURLs = ['img/bg1.jpg', 'img/bg2.jpg', 'img/bg3.jpg', 'img/bg4.jpg', 'img/bg5.jpg'];

// background image changer
let imgIndex = 0;
function background() {
    // reset the index as needed
    if (imgIndex >= imageURLs.length) {
        imgIndex = 0;
    }

    // set the image
    bg.style.backgroundImage = `url(${imageURLs[imgIndex++]})`;

    // time the changes
    setTimeout(background, 60000);
}

// run it
background();


/*
// randomly set a background image on click
bg.addEventListener("click", event => {
    let imgIndex = Math.floor(Math.random() * imageURLs.length);
    bg.style.backgroundImage = `url(${imageURLs[imgIndex]})`;
});
*/