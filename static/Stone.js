class Stone {
	constructor(row, col) {
		this.row = row;
		this.col = col;
		this.status = 'air';

		this.el = document.createElement('div');
		this.el.classList.add('cell');
	}

	viewStone(color) {
		this.el.style.backgroundColor = color;
		this.status = color;
	}

	onStone(table, color) {
		let success = false;
		let check_list = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1],]

		if (this.status != 'air')
			return success

		for (let i = 0; i < check_list.length; i++) {
			let pos = this.findLine(table, color, check_list[i][0], check_list[i][1]);
			if (pos) {
				for (let j = 0; j < pos; j++) {
					table[this.row + (check_list[i][0] * j)][this.col + (check_list[i][1] * j)].viewStone(color);
				}

				success = true;
			}
		}

		return success;
	}

	findLine(table, color, row, col) {
		for (let i = 1; true; i++) {
			if ((this.row + (row * i) < 0) || (this.row + (row * i) > settings.ROW_SIZE - 1))
				return false;

			if ((this.col + (col * i) < 0) || (this.col + (col * i) > settings.COL_SIZE - 1))
				return false;

			if (table[this.row + row][this.col + col].status == color)
				return false;

			if (table[this.row + (row * i)][this.col + (col * i)].status == 'air')
				return false;

			if (table[this.row + (row * i)][this.col + (col * i)].status == color)
				return i;

			continue;
		}
	}
}