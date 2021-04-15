//DICKY's Import
import { currPlayer } from './game.js';
import { totalHouse, totalHotel, properties } from './objects/tiles.js';
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
	pSelect.forEach((e) => {
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
		if (
			p1Input.value.length > 0 &&
			p2Input.value.length > 0 &&
			p3Input.value.length > 0 &&
			p3Input.value.length > 0
		) {
			startOutput.push(
				pSelected,
				p1Target.innerText,
				p2Target.innerText,
				p3Target.innerText,
				p4Target.innerText
			);
		}
	} else if (pSelected === 2) {
		checkP1();
		checkP2();
		checkP3();
		if (allGood) {
			$('#p4-box').style.display = 'none';
			if (
				p1Input.value.length > 0 &&
				p2Input.value.length > 0 &&
				p3Input.value.length > 0
			) {
				startOutput.push(
					pSelected,
					p1Target.innerText,
					p2Target.innerText,
					p3Target.innerText
				);
			}
		}
	} else if (pSelected === 1) {
		checkP1();
		checkP2();
		if (allGood) {
			$('#p3-box').style.display = 'none';
			$('#p4-box').style.display = 'none';
			if (p1Input.value.length > 0 && p2Input.value.length > 0) {
				startOutput.push(pSelected, p1Target.innerText, p2Target.innerText);
			}
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

window.p1Piece = $('#p1-token')
window.p2Piece = $('#p2-token')
window.p3Piece = $('#p3-token')
window.p4Piece = $('#p4-token')
let testBtn = $('#testBtn');


const movePiece = (piece, start, end) => {
	let int = setInterval(() => {

		start++

		console.log(start, end);

		//bottomLeft translate(-680px,0px)
		//topLeft = translate(-680px,-680px)
		//topRight = translate(0px,-680px)
		//bottomRight = translate(0,0)


		if (start > 0 && start < 10) {
			piece.style.transform = `translate(${start * -68}px, ${0}px)`
		}
		if (start == 10) {
			piece.style.transform = `translate(${start * -71}px, ${24}px)`
		}
		if (start > 10 && start <= 20) {
			piece.style.transform = `translate(-680px, ${(start - 10) * -68}px)`
		}

		if (start > 20 && start <= 30) {
			piece.style.transform = `translate(${-680 + (start - 20) * 68}px, -680px)`
		}

		if (start > 30 && start <= 40) {
			piece.style.transform = `translate(0px, ${-680 + (start - 30) * 68}px)`
		}

		if (start % 10 === 0) {
			console.log('change direction');
		}

		if (start === end) {
			clearInterval(int);
		}
		if (start === 40) {
			start = 0;
			end = end - 40;
		}

		console.log('position is', end % 40)

	}, 300)
}


testBtn.onclick = () => movePiece(p1Piece, 0, 4);

window.movePiece = movePiece;

//////////////////////End Test Movement//////////////////////

//////////////////////Start Mortgage modal//////////////////////

//main manage modal
let manageBtn = $('#manage-property');
let manageModal = $('#manage-modal');

//server modal
let serverModal = $('#servers-modal');
let serverModalTitle = $('#servers-modal .modal-title span');
let currentServerModalId = 'none';

const handleServerBuy = (e) => {
	console.log(currPlayer);
	let id = e.id.split('-')[0];
	//================================================================//
	//Dicky's test: remove if buggy START
	let currProperty;
	let serverBuy = $('.server-buy');
	console.log(serverBuy);
	let serverSell = $('.server-sell');
	let clusterBuy = $('.cluster-buy');
	let clusterSell = $('.cluster-sell');
	serverBuy.classList.remove('no-click');
	serverSell.classList.remove('no-click');
	clusterBuy.classList.remove('no-click');
	clusterSell.classList.remove('no-click');
	// sets the current Property for this button
	for (let property of currPlayer.properties) {
		if (property.name === id) currProperty = property;
	}
	const updateServer = () => {
		const serverNum = $('#serverNum');
		serverNum.innerText = 0;
		const clusterNum = $('#clusterNum');
		clusterNum.innerText = 0;
		if (currProperty.server < 5) {
			serverNum.innerText = currProperty.server;
			clusterNum.innerText = 0;
		}
		if (currProperty.server === 5) {
			serverNum.innerText = 0;
			clusterNum.innerText = 1;
		}
	};
	updateServer();

	let { typeMax, serverCount } = currProperty.counter(properties);
	//if total house or hotel is maxed out grey out all buttons
	if (totalHouse === 0) serverBuy.classList.add('no-click');
	if (totalHotel === 0) clusterBuy.classList.add('no-click');
	// if player doesn't have all of the same property, can't buy or sell anything
	console.log(typeMax, serverCount);
	if (!typeMax) {
		serverBuy.classList.add('no-click');
		serverSell.classList.add('no-click');
		clusterBuy.classList.add('no-click');
		clusterSell.classList.add('no-click');
	} else {
		// if player has less than 4 houses, they can't touch cluster button
		if (currProperty.server < 4 && currProperty.server == Math.min(...serverCount)) {
			clusterBuy.classList.add('no-click');
			clusterSell.classList.add('no-click');
			// if player has no houses, can't see
			if (currProperty.server === 0) {
				serverSell.classList.add('no-click');
			}
		}
		if (currProperty.server === 4) {
			serverBuy.classList.add('no-click');
			clusterSell.classList.add('no-click');
		}
		if (currProperty.server === 5) {
			serverBuy.classList.add('no-click');
			serverSell.classList.add('no-click');

			clusterSell.classList.add('no-click');
		}

		const buildBtn = $('.server-buy');
		const buildBtn2 = $('.cluster-buy');
		buildBtn.addEventListener('click', () => {
			currProperty.build();

			updateServer();
		});
		buildBtn2.addEventListener('click', () => {
			currProperty.build;
			updateServer();
		});
		// document.querySelectorAll('.m-server').forEach((e) => {
		// 	e.onclick = () => {
		// 		handleServerBuy(e);
		// 		updateServer();
		// 	};
		// });
	}

	//Dicky's test: remove if buggy END
	//===================================================================//
	let close = $('#close-serv');
	serverModal.style.display = 'flex';

	serverModalTitle.innerHTML = id.charAt(0).toUpperCase() + id.slice(1);
	currentServerModalId = id;
	close.onclick = () => {
		serverModal.style.display = 'none';
	};
};

const handleManage = () => {
	manageModal.style.display = 'flex';
	$('#manage-content').style.display = 'flex';
	$('#jail-modal').style.display = 'none';
	let close = $('#close-mng');

	document.querySelectorAll('.m-server').forEach((e) => {
		e.onclick = () => {
			handleServerBuy(e);
		};
	});

	close.onclick = () => {
		manageModal.style.display = 'none';
		serverModal.style.display = 'none';
	};

	window.onclick = (e) => {
		if (e.target === manageModal) {
			manageModal.style.display = 'none';
			serverModal.style.display = 'none';
		}
	};
};

manageBtn.onclick = () => {
	handleManage();
};

//////////////////////End Mortgage modal//////////////////////

//////////////////////Start Mortgage modal//////////////////////
// let mortgageBtn = $('#mortgage-properties');
// mortgageBtn.onclick = () => {
//
// };
//////////////////////End Mortgage modal//////////////////////

//////////////////////Page-load binding//////////////////////
//bind the property tiles
document.querySelectorAll('.grid').forEach((e) => {
	e.onclick = () => {
		console.log('test');
		showProperty(e.id);
	};
});

//test function to bring up modals
$('#tempTest1').onclick = () => {
	manageModal.style.display = 'flex';
	$('#manage-content').style.display = 'none';
	//$('#landing-modal').style.display = 'flex';
	$('#jail-modal').style.display = 'flex';

	$('#dont-buy-prop').onclick = () => {
		manageModal.style.display = 'none';
		$('#manage-content').style.display = 'flex';
		$('#landing-modal').style.display = 'none';
	};

	$('#pay-rent').onclick = () => {
		manageModal.style.display = 'none';
		$('#manage-content').style.display = 'flex';
		$('#landing-modal').style.display = 'none';
	};

	window.onclick = (e) => {
		if (e.target === manageModal) {
			manageModal.style.display = 'none';
		}
	};
};

//////////////////////End page-load binding//////////////////////

export { $, showProperty, startOutput, handleManage, handleServerBuy };
