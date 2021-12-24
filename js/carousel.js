const nbOfImages     = 5;
let   actualImageId  = 1;

const imageSuffix    = 'jpeg'

const carousel       = document.querySelector('.carousel');
const radioBottomBar = carousel.querySelector('.radio-controls');
const form           = radioBottomBar.querySelector('form');

const buttonsContainer   = document.querySelector('.button-control-container');

function changeImage( idOfImage ) {
    carousel.style.backgroundImage = `url(assets/img/wild${idOfImage}.${imageSuffix})`;
}

function updateRadioColor( reset = false ) {
    if ( reset ) {
        document.querySelector( `#image${actualImageId}` ).style.backgroundColor = '';
    } else {
        document.querySelector( `#image${actualImageId}` ).style.backgroundColor = 'goldenrod';
    }
}

changeImage(actualImageId);


for ( let i = 0; i < nbOfImages; i++ ) {

    const newRadioInput     = document.createElement('input');
    newRadioInput.type      = `radio`;
    newRadioInput.id        = `image${i + 1}`;
    newRadioInput.className = `image`;
    
    form.appendChild(newRadioInput);
}

document.querySelector('#image1').style.backgroundColor = `goldenrod`;

buttonsContainer.addEventListener('click', (e) => {

    let elementName = e.target.className;
    //recuperate the good name of class
    elementName     = elementName.replace('material-icons ', '');

    if ( elementName == 'button-previous' ) {
        
        updateRadioColor(true);     
        if ( actualImageId == 1 ) {
            actualImageId = nbOfImages;
        } else {
            actualImageId--;
        }
        updateRadioColor();
    
    } else if ( elementName == 'button-next' ) {
        
        updateRadioColor(true);
        if ( actualImageId == nbOfImages ) {
            actualImageId = 1;
        } else {
            actualImageId++;
        }
        updateRadioColor();
    }
    changeImage(actualImageId);
});



radioBottomBar.addEventListener('click', (e) => {
//  Si la target est a l'attribe type de type 'radio'
    if ( e.target.type == 'radio' ) {

        let radioClickedId = e.target.id;
        radioClickedId     = radioClickedId.replace('image', '');

        updateRadioColor(true);
        actualImageId = Number( radioClickedId ); 
        updateRadioColor();
        changeImage(actualImageId);
    }
});