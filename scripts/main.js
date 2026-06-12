class Game {
	marcadorElementos;
	vezElemento;
	_vez;

	constructor(marcadorElementos, vezElemento) {
		this.marcadorElementos = marcadorElementos;
		this.vezElemento = vezElemento;
		this._vez = X;
	}

	get vez() {
		return this._vez;
	}
	set vez(a) {
		this._vez = a;
		this.vezElemento.innerText = a === MARCADOR_X ? 'Vez: X' : 'Vez: O';
	}

	// marcar X ou O
	marcar(marcadorElemento) {
		marcadorElemento.innerText = this.vez;
		this.vez = this.vez === MARCADOR_X ? MARCADOR_O : MARCADOR_X;
	}

	// tentar marcar X ou O, não irá marcar se já estiver marcado
	tenteMarcar(marcadorElemento) {
		if(marcadorElemento.innerText) return;
		this.marcar(marcadorElemento);
	}

	obterMapa() {
		return this.marcadorElementos.map((e) => {
			if(e.innerText.length === 0) return;
			return e.innerText;
		})
	}
}

// inicializar jogo
const game = new Game(
	[...document.querySelectorAll('.marker')],
	document.querySelector('.turn')
);

const MARCADOR_X = 'X';
const MARCADOR_O = 'O';

// mapa de possibilidades de ganhar jogo
const MAPA_GANHADOR = [
	[
		1, 1, 1,
		0, 0, 0,
		0, 0, 0,
	],
	[
		0, 0, 0,
		1, 1, 1,
		0, 0, 0,
	],
	[
		0, 0, 0,
		0, 0, 0,
		1, 1, 1,
	],
	[
		1, 0, 0,
		0, 1, 0,
		0, 0, 1,
	],
	[
		0, 0, 1,
		0, 1, 0,
		1, 0, 0,
	],
	[
		1, 0, 0,
		1, 0, 0,
		1, 0, 0,
	],
	[
		0, 1, 0,
		0, 1, 0,
		0, 1, 0,
	],
	[
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
	],
];

for(const marcador of game.marcadorElementos) {
	marcador.addEventListener('click', () => {
		game.tenteMarcar(marcador);
	})
}