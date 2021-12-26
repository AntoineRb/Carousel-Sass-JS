const nbOfImages         = 5;
let   actualImageId      = 1;

let carouselLeftPosition = 0;

let buttonClicked = false; // work on this

const typeOfImages       = 'wild';
const imagesAlt          = 'Wild life picture'
const imageSuffix        = 'jpeg';

const radioCheckedColor  = 'whiteSmoke';

const carousel            = document.querySelector('.carousel');
const carouselBackground  = carousel.querySelector('.carousel-background-image')
const imagesContainer     = carousel.querySelector('.images-container');
const radioBottomBar      = carousel.querySelector('.images-controls');
const btnControlContainer = radioBottomBar.querySelector('.bottom-button-control');
const buttonsContainer    = document.querySelector('.button-control-container');

//style property preset to prevent latency from Browser
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
        document.querySelector( `#image${actualImageId}` ).className = `image${actualImageId}`;
    } else {
        document.querySelector( `#image${actualImageId}` ).className += ' actual-btn-control';
    }
}

// Change the images positions when the client press radios controls or buttons
function changeLeftPositionOfImagesContainer( leftPosition, imageWidth ) {
    const newLeftPosition = Math.abs( leftPosition / imageWidth ) + 1;
    if ( !(newLeftPosition == 0) ) {
        actualImageId = newLeftPosition;
    }
}

function resetAnimationTime( btnClicked ) {
    if ( btnClicked ) return false;
    setTimeout(100);
    return true;
}

for ( let i = 0; i < nbOfImages; i++ ) {

    const newRadioInput     = document.createElement('button'); // Type of element
    newRadioInput.type      = `button`;
    newRadioInput.id        = `image${i + 1}`;
    newRadioInput.className = `image`;
    
    btnControlContainer.appendChild(newRadioInput);
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
        
        buttonClicked = false;
        updateRadioColor(true);

        if ( !( carouselLeftPosition == 0 ) ) {

            carouselLeftPosition += individualImageWidth;

        } else {

            carouselLeftPosition -= ( widthOfAllImages - individualImageWidth );

        }

        carouselBackground.style.left = `${carouselLeftPosition}px`;
        changeLeftPositionOfImagesContainer( carouselLeftPosition, individualImageWidth);      
        updateRadioColor();
        setTimeout(buttonClicked = true, 100);
    
    } else if ( elementName == 'button-next' ) {
        
        buttonClicked = false;
        updateRadioColor(true);
        displayNextImage( individualImageWidth, widthOfAllImages);
        updateRadioColor( );
        setTimeout(buttonClicked = true, 100);
    }
});


radioBottomBar.addEventListener('click', (e) => {

    if ( e.target.type == 'button' ) {
        buttonClicked = false;
        updateRadioColor(true);

        const widthOfAllImages     = imagesContainer.offsetWidth;
        const individualImageWidth = widthOfAllImages / nbOfImages;

        let buttonClickedId    = e.target.id;
        buttonClickedId        = Number( buttonClickedId.replace('image', '') ); //Remove image from id to keep the number
        actualImageId         = buttonClickedId;
        carouselLeftPosition  = -individualImageWidth * (buttonClickedId - 1); // Set a new position in X axis with the top left corner for origin

        carouselBackground.style.left = `${carouselLeftPosition}px`;
        
        updateRadioColor();
        setTimeout(buttonClicked = true, 100);
    }
});


// change image in every 3.5 seconds

setInterval( () => {

    if ( buttonClicked ) {
        buttonClicked = false; // Toggle boolean value
        return;
    }
    const widthOfAllImages     = imagesContainer.offsetWidth;
    const individualImageWidth = widthOfAllImages / nbOfImages;
    updateRadioColor(true);
    displayNextImage( individualImageWidth, widthOfAllImages);
    updateRadioColor( );
}, carouselTimeInterval);

