const $ = function(ele) {
    return document.querySelector(ele);
};

let startModal = $('#start-modal');
let bodyWrap = $('#body-wrap');

//dev exit modal
let modalClose = $('#modalClose');
modalClose.onclick = e => {
    startModal.style.display = "none";
    bodyWrap.style.display = "flex";
};

//page load popup modal
const handleStartModal = () => {

};

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

//bind the property tiles
document.querySelectorAll('.grid').forEach((e, i) => {
    e.onclick = () => {
        showProperty(e.id);
    };
});

export {$, showProperty}