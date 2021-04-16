//DICKY's Import
import { currPlayer, players } from './game.js';
import { totalHouse, totalHotel, properties } from './objects/tiles.js';
const $ = function (ele) {
	return document.querySelector(ele);
};
const keyboard = new Audio('/assets/sounds/keyboard.mp3')
const monitor = new Audio('/assets/sounds/monitor.mp3')
const mouse = new Audio('/assets/sounds/mouse.mp3')
const speaker = new Audio('/assets/sounds/speaker.mp3')

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
		// console.log('OUTPUT: ', startOutput);
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

window.p1Piece = $('#p1-token');
window.p2Piece = $('#p2-token');
window.p3Piece = $('#p3-token');
window.p4Piece = $('#p4-token');
let testBtn = $('#testBtn');

const movePiece = (piece, start, end) => {
	console.log(piece, start, end);
	let int = setInterval(() => {
		start++;

		if (piece === p1Piece) {
			speaker.currentTime = 0;
			speaker.play();
		}
		if (piece === p2Piece) {
			mouse.currentTime = 0;
			mouse.play();
		}
		if (piece === p3Piece) {
			keyboard.currentTime = 0;
			keyboard.play();
		}
		if (piece === p4Piece) {
			monitor.currentTime = 0;
			monitor.play();
		}


		console.log(start, end);

		//bottomLeft translate(-680px,0px)
		//topLeft = translate(-680px,-680px)
		//topRight = translate(0px,-680px)
		//bottomRight = translate(0,0)
		if (start === 1) {
			piece.style.transform = `translate(${-100}px, ${0}px)`;
		}

		if (start > 1 && start < 10) {
			piece.style.transform = `translate(${(start * -65) - 29}px, ${0}px)`
		}

		// IF IN JAIL /////////////////////
		if (currPlayer.jail[0] === true && start == 10) {
			piece.style.transform = `translate(${(start * -65) - 35}px, ${-25}px)`
		}
		////////////////////////////////////////////////////////////////

		if (start == 10) {
			if (piece === p1Piece) {
				piece.style.transform = `translate(${-726}px, ${-20}px)`;
			}
			if (piece === p2Piece) {
				piece.style.transform = `translate(${-726}px, ${-20}px)`;
			}
			if (piece === p3Piece) {
				piece.style.transform = `translate(${-726}px, ${45}px)`
			}
			if (piece === p4Piece) {
				piece.style.transform = `translate(${-690}px, ${15}px)`;
			}
		}

		if (start > 10 && start < 20) {
			piece.style.transform = `translate(${-700}px, ${((start - 10) * -65) - 29}px)`
		}

		if (start === 20) {
			piece.style.transform = `translate(${-700}px, ${(start - 10) * -65 - 65}px)`;
		}

		if (start >= 21 && start <= 30) {
			piece.style.transform = `translate(${-700 + (start - 20) * 65 + 20}px, ${-715}px)`;
		}
		if (start === 30) {
			piece.style.transform = `translate(${-700 + (start - 20) * 65 + 45}px, ${-715}px)`;
		}

		if (start > 30 && start <= 40) {
			piece.style.transform = `translate(0px, ${-700 + ((start - 30) * 65) + 21}px)`
		}

		if (start === 40) {
			piece.style.transform = `translate(0px, ${-700 + (start - 30) * 65 + 50}px)`;
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

		console.log('position is', end % 40);
	}, 300);
};

// testBtn.onclick = () => (
// 	(p1Piece, 0, 45),
// 	movePiece(p2Piece, 0, 45),
// 	movePiece(p3Piece, 0, 45),
// 	movePiece(p3Piece, 0, 45)
// );

window.movePiece = movePiece;

//handle greying of dice
let diceBtn = $('#roll-dice');
let endTurn = $('#end-turn');

diceBtn.onclick = () => {
	diceBtn.style.backgroundColor = '#8d9491';
	diceBtn.classList.add('no-click');
};

endTurn.onclick = () => {
	diceBtn.style.backgroundColor = '#04a55c';
	diceBtn.classList.remove('no-click');
};

const makeMoveHappen = (type, s, e) => {
	let pos = '';
	let piece;

	players.forEach((e, i) => {
		if (e.name === currPlayer.name) {
			pos = i + 1;
		}
	});

	if (pos === 1) {
		piece = $('#p1-token');
	} else if (pos === 2) {
		piece = $('#p2-token');
	} else if (pos === 3) {
		piece = $('#p3-token');
	} else if (pos === 4) {
		piece = $('#p4-token');
	}

	//move directly, forced
	if (type === 'direct') {
		movePiece(piece, s, e);
	} else {
		let roll = currPlayer.rolledNumber;
		let start = currPlayer.position;
		let end = start + roll;


		movePiece(piece, start, end);
	}
};

//////////////////////End Test Movement//////////////////////

//////////////////////Start Mortgage modal//////////////////////
let manageBtn = $('#manage-property');
let manageModal = $('#manage-modal');

//server modal
let serverModal = $('#servers-modal');
let serverModalTitle = $('#servers-modal .modal-title span');
let currentServerModalId = 'none';
const handleServerBuy = (e) => {
	let id = e.id.split('-')[0];
	//================================================================//
	//Dicky's test: remove if buggy START
	let currProperty;
	let serverBuy = $('.server-buy');

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
	console.log(properties[1].server);
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
	function serverBtnHandler() {
		currProperty.build();
		updateServer();
	}

	let { typeMax, serverCount } = currProperty.counter(properties);
	//if total house or hotel is maxed out grey out all buttons
	if (totalHouse === 0) serverBuy.classList.add('no-click');
	if (totalHotel === 0) clusterBuy.classList.add('no-click');
	// if player doesn't have all of the same property, can't buy or sell anything

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

		buildBtn.addEventListener('click', serverBtnHandler);
		buildBtn2.addEventListener('click', serverBtnHandler);
		document.querySelectorAll('.m-server').forEach((e) => {
			e.onclick = () => {
				buildBtn.removeEventListener('click', serverBtnHandler);
				buildBtn2.removeEventListener('click', serverBtnHandler);
				handleServerBuy(e);
			};
		});
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
		// console.log('test');
		showProperty(e.id);
	};
});

//test function to bring up modals
// $('#tempTest1').onclick = () => {
// 	manageModal.style.display = 'flex';
// 	$('#manage-content').style.display = 'none';
// 	//$('#landing-modal').style.display = 'flex';
// 	$('#jail-modal').style.display = 'flex';
//
// 	$('#dont-buy-prop').onclick = () => {
// 		manageModal.style.display = 'none';
// 		$('#manage-content').style.display = 'flex';
// 		$('#landing-modal').style.display = 'none';
// 	};
//
// 	$('#pay-rent').onclick = () => {
// 		manageModal.style.display = 'none';
// 		$('#manage-content').style.display = 'flex';
// 		$('#landing-modal').style.display = 'none';
// 	};
//
// 	window.onclick = (e) => {
// 		if (e.target === manageModal) {
// 			manageModal.style.display = 'none';
// 		}
// 	};
// };

//////////////////////End page-load binding//////////////////////

export { $, showProperty, startOutput, handleManage, handleServerBuy, makeMoveHappen };
