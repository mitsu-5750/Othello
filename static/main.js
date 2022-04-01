function init() {
	gameMaster = {
		'turn': 'black',
		'status': 'stop',
	};
	table = createTable();
	initStone(table);

	operationMaster(gameMaster, table);
}

function createTable() {
	let table_el = document.getElementById('table_el');
	let table = [];

	for (let i = 0; i < settings.ROW_SIZE; i++) {
		// 行の作成
		table.push([]);

		let row_el = document.createElement('div');
		row_el.classList.add('row');
		table_el.appendChild(row_el);

		for (let j = 0; j < settings.COL_SIZE; j++) {
			// 列の作成
			let stone = new Stone(i, j);

			table[i][j] = stone;
			row_el.appendChild(stone.el);
		}
	}
	return table;
}


function initStone(table) {
	table[3][3].viewStone('black');
	table[4][4].viewStone('black');
	table[3][4].viewStone('white');
	table[4][3].viewStone('white');
}

function operationMaster(gameMaster, table) {
	for (let i = 0; i < table.length; i++) {
		for (let j = 0; j < table[i].length; j++) {
			table[i][j].el.addEventListener('click', () => {
				if (table[i][j].onStone(table, gameMaster.turn)) {

					if (gameMaster.turn == 'white') {
						gameMaster.turn = 'black';
						return
					}

					if (gameMaster.turn == 'black') {
						gameMaster.turn = 'white';
						runCpu(table, 'white');
						setTimeout(() => gameMaster.turn = 'black', 1000);
						return
					}
				}
			})
		}
	}
}


function countBlack(table) {
	let count = 0;

	for (let i = 0; i < table.length; i++) {
		for (let j = 0; j < table[i].length; j++) {
			if (table[i][j].status == 'black') {
				count++;
			}
		}
	}
	return count;
}

function runCpu(table, color) {
	let positions = getOnPositon(table, color);

	console.log(table);
	setTimeout(() => console.log(positions), 10);

	setTimeout(() => setStoneCpu(table, color), 1000);
}

function getOnPositon(table, color) {
	let position = [];

	for (let i = 0; i < settings.ROW_SIZE; i++) {
		for (let j = 0; j < settings.COL_SIZE; j++) {
			let check_list = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1],]

			for (let k = 0; k < check_list.length; k++) {
				if(table[i][j].status != 'air')
					break;

				if (table[i][j].findLine(table, color, check_list[k][0], check_list[k][1])) {
					position.push([i, j]);
					break;
				}
			}
		}
	}

	return position;
}

function setStoneCpu(table, color) {
	let positions = getOnPositon(table, color);

	let r = Math.floor(Math.random() * positions.length);

	console.log(positions[r])
	table[positions[r][0]][positions[r][1]].onStone(table, color);
}

window.addEventListener('load', init);