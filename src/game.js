import {testVariable} from "./dom.js";

const game = (str) => {
    testVariable.push(`${str}`);
    console.log(testVariable[0])

};

export {game};