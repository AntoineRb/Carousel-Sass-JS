const nbOfImages         = 5;
let   actualImageId      = 1;

let carouselLeftPosition = 0;

const typeOfImages       = 'wild';
const imagesAlt          = 'Wild life picture'
const imageSuffix        = 'jpeg';

const radioCheckedColor  = 'whiteSmoke';

const carousel           = document.querySelector('.carousel');
const carouselBackground = carousel.querySelector('.carousel-background-image')
const imagesContainer    = carousel.querySelector('.images-container');
const radioBottomBar     = carousel.querySelector('.radio-controls');
const form               = radioBottomBar.querySelector('form');
const buttonsContainer   = document.querySelector('.button-control-container');

//style property preset to prevent latence from Browser
carouselBackground.style.left = '0px';

function addImagesToCarousel() {
    for ( let i = 0; i < nbOfImages; i++ ) {

        const newFigure = document.createElement('figure');
        const newImage  = document.createElement('img');   

        newImage.src    = `assets/img/${typeOfImages + ( i + 1 )}.${imageSuffix}`;
        newImage.alt    = imagesAlt;

        newFigure.appendChild(newImage);
        imagesContainer.appendChild(newFigure);
    }
}
addImagesToCarousel();

function displayNextImage( ImageWidth, imagesContainerSize) {
    
    if ( !( Math.abs(carouselLeftPosition - ImageWidth) == imagesContainerSize ) ) {

        carouselLeftPosition -= ImageWidth;
        carouselBackground.style.left = `${carouselLeftPosition}px`;

    } else {

        carouselLeftPosition = 0;
        carouselBackground.style.left = `0px`;

    }

    changeLeftPositionOfImagesContainer( carouselLeftPosition, ImageWidth);
}

function updateRadioColor( reset ) {
    if ( reset ) {
        document.querySelector( `#image${actualImageId}` ).style.backgroundColor = '';
    } else {
        document.querySelector( `#image${actualImageId}` ).style.backgroundColor = radioCheckedColor;
    }
}

// Change the images positions when the client press radios controls or buttons
function changeLeftPositionOfImagesContainer( leftPosition, imageWidth ) {
    const newLeftPosition = Math.abs( leftPosition / imageWidth ) + 1;
    if ( !(newLeftPosition == 0) ) {
        actualImageId = newLeftPosition;
    }
}

for ( let i = 0; i < nbOfImages; i++ ) {

    const newRadioInput     = document.createElement('input');
    newRadioInput.type      = `radio`;
    newRadioInput.id        = `image${i + 1}`;
    newRadioInput.className = `image`;
    
    form.appendChild(newRadioInput);
}

updateRadioColor();

buttonsContainer.addEventListener('click', (e) => {

    let elementName = e.target.className;
    //recuperate the good name of class
    elementName     = elementName.replace('material-icons ', '');

    // Result of addition all images width
    const widthOfAllImages     = imagesContainer.offsetWidth;
    const individualImageWidth = widthOfAllImages / nbOfImages;

    if ( elementName == 'button-previous' ) {
        
        updateRadioColor(true);

        if ( !( carouselLeftPosition == 0 ) ) {

            carouselLeftPosition += individualImageWidth;

        } else {

            carouselLeftPosition -= ( widthOfAllImages - individualImageWidth );

        }

        carouselBackground.style.left = `${carouselLeftPosition}px`;

        changeLeftPositionOfImagesContainer( carouselLeftPosition, individualImageWidth);
       
        updateRadioColor();
    
    } else if ( elementName == 'button-next' ) {
        
        updateRadioColor(true);
        displayNextImage( individualImageWidth, widthOfAllImages);
        updateRadioColor( );
    }
});


radioBottomBar.addEventListener('click', (e) => {

    if ( e.target.type == 'radio' ) {

        updateRadioColor(true);

        const widthOfAllImages     = imagesContainer.offsetWidth;
        const individualImageWidth = widthOfAllImages / nbOfImages;

        let radioClickedId    = e.target.id;
        radioClickedId        = Number( radioClickedId.replace('image', '') ); //Remove image from id to keep the number
        actualImageId         = radioClickedId;
        carouselLeftPosition  = -individualImageWidth * (radioClickedId - 1); // Set a new position in X axis with the top left corner for origin

        carouselBackground.style.left = `${carouselLeftPosition}px`;
        
        updateRadioColor();
    }
});


// change image in every 3.5 seconds
setInterval( () => {
    const widthOfAllImages     = imagesContainer.offsetWidth;
    const individualImageWidth = widthOfAllImages / nbOfImages;
    updateRadioColor(true);
    displayNextImage( individualImageWidth, widthOfAllImages);
    updateRadioColor( );
}, 3500);