const $ = function(ele) {
    return document.querySelector(ele);
};

const showProperty = (ele) => {
    let clickedEle = $(`#${ele}`)
    console.log(clickedEle);
};


showProperty('microsoft');
export {$, showProperty}