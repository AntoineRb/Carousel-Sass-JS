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


function changeImage( idOfImage ) {
    carousel.style.backgroundImage = `url(assets/img/${typeOfImages + idOfImage}.${imageSuffix})`;
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
    const widthOfAllImages = imagesContainer.offsetWidth;
    // To get the size of One image, we can devide widthOfAllImages with nbOfImages
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
        console.log(carouselLeftPosition);
    
    } else if ( elementName == 'button-next' ) {
        
        updateRadioColor(true);
        

        if ( !( Math.abs(carouselLeftPosition - individualImageWidth) == widthOfAllImages ) ) {
            carouselLeftPosition -= individualImageWidth;
            carouselBackground.style.left = `${carouselLeftPosition}px`;
        } else {
            carouselLeftPosition = 0;
            carouselBackground.style.left = `0px`;
        }
        changeLeftPositionOfImagesContainer( carouselLeftPosition, individualImageWidth);
        updateRadioColor();

        console.log(carouselLeftPosition);
    }
});


radioBottomBar.addEventListener('click', (e) => {
//  Si la target est a l'attribe type de type 'radio'
    if ( e.target.type == 'radio' ) {

        updateRadioColor(true);
        //  A opti
        // Result of addition all images width
        const widthOfAllImages = imagesContainer.offsetWidth;
        // To get the size of One image, we can devide widthOfAllImages with nbOfImages
        const individualImageWidth = widthOfAllImages / nbOfImages;

        let radioClickedId = e.target.id;
        radioClickedId     = Number( radioClickedId.replace('image', '') );
        actualImageId = radioClickedId;
        const newLeftPosition = individualImageWidth * (radioClickedId - 1) ;

        carouselBackground.style.left = `${-newLeftPosition}px`;

        console.log(newLeftPosition);
        
        updateRadioColor();
    
    }
});