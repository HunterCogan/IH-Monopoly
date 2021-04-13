const $ = function(ele) {
    return document.querySelector(ele);
};


//////////////////////Start Page-load Modal//////////////////////
let startModal = $('#start-modal');
let bodyWrap = $('#body-wrap');
let pSelect = document.querySelectorAll('.p-select-btn');
let pSelected = 3;
let p2 = $('#p2-name');
let p3 = $('#p3-name');
let p4 = $('#p4-name');

const removeBorders = () => {
    pSelect.forEach((e, i) => {
        if (e.classList.contains('pSelected')) {
            e.classList.remove('pSelected');
        }
    });
};

pSelect.forEach((e, i) => {
    //handle clicking on a player select box
    e.onclick = () => {
        removeBorders();
        e.classList.toggle('pSelected');
        pSelected = (i);
        if (pSelected === 0) {
            p2.style.display = 'none';
            p3.style.display = 'none';
            p4.style.display = 'none';
        } else if (pSelected === 1) {
            p2.style.display = 'flex';

            p3.style.display = 'none';
            p4.style.display = 'none';
        } else if (pSelected === 2) {
            p2.style.display = 'flex';
            p3.style.display = 'flex';

            p4.style.display = 'none';
        } else if (pSelected === 3) {
            p2.style.display = 'flex';
            p3.style.display = 'flex';
            p4.style.display = 'flex';
        }

    };
});

//dev exit modal
let modalClose = $('#modalClose');
modalClose.onclick = e => {
    startModal.style.display = "none";
    bodyWrap.style.display = "flex";
};


//page load popup modal
const handleStartModal = () => {

};


$('#p-num-default').classList.add('pSelected');

//////////////////////End Page-load Modal//////////////////////

//////////////////////Start Property Popup Modal//////////////////////

//property popup modal
const showProperty = (ele) => {
    let propModal = $('#property-modal');
    let propModalContent = $('#prop-modal-content');
    let cardName = ele.split('-')[1];
    let close = $('#close-prop');

    //show modal
    propModal.style.display = "flex";
    propModalContent.style.backgroundImage = `url("./assets/Cards/${cardName}.jpg")`;

    //Close if click outside
    window.onclick = e => {
        if (e.target === propModal) {
            propModal.style.display = "none";
        }
        if (e.target === close) {
            propModal.style.display = "none";
        }
    };
};

//////////////////////End Property Popup Modal//////////////////////

//bind the property tiles
document.querySelectorAll('.grid').forEach((e, i) => {
    e.onclick = () => {
        showProperty(e.id);
    };
});

export {$, showProperty}