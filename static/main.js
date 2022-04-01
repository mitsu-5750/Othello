function init() {
	gameMaster = {
		'turn': 'black',
		'status': 'stop',
	}
	table = createTable();
	initStone(table)

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
					console.log(gameMaster.turn);

					if (gameMaster.turn == 'white') {
						gameMaster.turn = 'black';
						return
					}

					if (gameMaster.turn == 'black') {
						gameMaster.turn = 'white';
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

window.addEventListener('load', init);