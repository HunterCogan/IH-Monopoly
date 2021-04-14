const $ = function (ele) {
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
let modalClose = $('#modalClose');
let p1Target = $('#p1Target');
let p2Target = $('#p2Target');
let p3Target = $('#p3Target');
let p4Target = $('#p4Target');
let devBtn = $('#devBtn');
let p1Input = $('#p1-name input');
let p2Input = $('#p2-name input');
let p3Input = $('#p3-name input');
let p4Input = $('#p4-name input');
let startOutput = [];

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
		pSelected = i;
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

//page load popup modal
//this is pretty sloppy so lmk if you need explaination
const handleStartModal = () => {
	let allGood = true;
	const checkP4 = () => {
		if (p4Input.value) {
			p4Target.innerHTML = p4Input.value;
		} else {
			allGood = false;
			p3Target.innerHTML = '';
			p4Input.style.border = 'red 2px solid';
		}
	};
	const checkP3 = () => {
		if (p3Input.value) {
			p3Target.innerHTML = p3Input.value;
		} else {
			allGood = false;
			p3Target.innerHTML = '';
			p3Input.style.border = 'red 2px solid';
		}
	};
	const checkP2 = () => {
		if (p2Input.value) {
			p2Target.innerHTML = p2Input.value;
		} else {
			allGood = false;
			p2Input.style.border = 'red 2px solid';
		}
	};
	const checkP1 = () => {
		if (p1Input.value) {
			p1Target.innerHTML = p1Input.value;
		} else {
			allGood = false;
			p1Input.style.border = 'red 2px solid';
		}
	};

	if (pSelected === 3) {
		checkP1();
		checkP2();
		checkP3();
		checkP4();
		startOutput.push(
			pSelected,
			p1Target.innerText,
			p2Target.innerText,
			p3Target.innerText,
			p4Target.innerText
		);
	} else if (pSelected === 2) {
		checkP1();
		checkP2();
		checkP3();
		if (allGood) {
			$('#p4-box').style.display = 'none';
			startOutput.push(
				pSelected,
				p1Target.innerText,
				p2Target.innerText,
				p3Target.innerText
			);
		}
	} else if (pSelected === 1) {
		checkP1();
		checkP2();
		if (allGood) {
			$('#p3-box').style.display = 'none';
			$('#p4-box').style.display = 'none';
			startOutput.push(pSelected, p1Target.innerText, p2Target.innerText);
		}
	} else if (pSelected === 0) {
		allGood = false;
		$('#lonely').style.display = 'flex';
	}

	if (allGood) {
		startModal.style.display = 'none';
		bodyWrap.style.display = 'flex';
		console.log('OUTPUT: ', startOutput);
	}
};

modalClose.onclick = () => {
	handleStartModal();
};

//remove this for product
devBtn.onclick = () => {
	p1Input.value = 'Juan';
	p2Input.value = 'Dicky';
	p3Input.value = 'Jonny';
	p4Input.value = 'Hunter';
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
	propModal.style.display = 'flex';
	propModalContent.style.backgroundImage = `url("./assets/Cards/${cardName}.jpg")`;

	//Close if click outside
	window.onclick = (e) => {
		if (e.target === propModal) {
			propModal.style.display = 'none';
		}
		if (e.target === close) {
			propModal.style.display = 'none';
		}
	};
};

//////////////////////End Property Popup Modal//////////////////////

//////////////////////Test movement //////////////////////

let p1Piece = $('#p1-token');
let testBtn = $('#testBtn');

const movePiece = (where, current) => {
	let j = current;
	let direction = 'right';

	let int = setInterval(() => {
		if (current === 12) {
			console.log('turn1');
			direction = 'bottom';
			j = 0;
		}

		if (current === 22) {
			console.log('turn2');
			direction = 'left';
			j = 0;
		}

		p1Piece.style[direction] = `${64 * j}px`;

		if (current > where) {
			clearInterval(int);
		}
		j++;
		where++;
		console.log(i);
		console.log(j);
	}, 1000);
};
//Testing uncomment line below after done
// testBtn.onclick = () => movePiece(4, 1);

window.movePiece = movePiece;

//////////////////////End Test Movement//////////////////////

//////////////////////Start Mortgage modal//////////////////////
let mortgageBtn = $('#mortgage-properties');
mortgageBtn.onclick = () => {};
//////////////////////End Mortgage modal//////////////////////

//////////////////////Page-load binding//////////////////////
//bind the property tiles
document.querySelectorAll('.grid').forEach((e, i) => {
	e.onclick = () => {
		showProperty(e.id);
	};
});
//////////////////////End page-load binding//////////////////////

export { $, showProperty, startOutput, movePiece };
