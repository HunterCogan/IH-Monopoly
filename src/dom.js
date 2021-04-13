const $ = function(ele) {
    return document.querySelector(ele);
};

const showProperty = (ele) => {
    console.log(ele);
    let propModal = $('#property-modal');
    let propModalContent = $('#prop-modal-content');
    let cardName = ele.split('-')[1];

    propModal.style.display = "flex";
    propModalContent.style.backgroundImage = `url("./assets/Cards/${cardName}.jpg")`;

    //Close if click outside
    window.onclick = function(e) {
        if (e.target == propModal) {
            propModal.style.display = "none";
        }
    }
};

document.querySelectorAll('.grid').forEach((e, i) => {
    e.onclick = () => {
        showProperty(e.id);
    };
});

export {$, showProperty}