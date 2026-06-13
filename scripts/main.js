class Game {
	marcadores;
	vezesMarcado;
	vezElemento;
	_vez;

	constructor(marcadores, vezElemento) {
		this.marcadores = marcadores;
		this.vezesMarcado = 0;
		this.vezElemento = vezElemento;
		this._vez = MARCADOR_X;
	}

	get vez() {
		return this._vez;
	}
	set vez(a) {
		this._vez = a;
		this.vezElemento.innerText = a === MARCADOR_X ? 'Vez: X' : 'Vez: O';
	}

	// marcar X ou O
	marcar(pos) {
		const marcador = this.marcadores[pos];
		if(!marcador) return;

		marcador.marcar(this.vez);
		this.vez = this.vez === MARCADOR_X ? MARCADOR_O : MARCADOR_X;
		this.vezesMarcado++;
	}

	// tentar marcar X ou O, não irá marcar se já estiver marcado
	tenteMarcar(pos) {
		const marcador = this.marcadores[pos];
		if(!marcador || marcador.simbolo) return;

		this.marcar(pos);
	}

	obterGanhador() {
		if(this.vezesMarcado < 5) return;

		for(let simbolo of [MARCADOR_X, MARCADOR_O]) {
			for(const mapa of MAPA_GANHADOR) {
				let correspondencias = 0;

				for(let i in mapa) {
					if(!mapa[i]) continue;

					const marcador = this.marcadores[i];
					if(marcador.simbolo === simbolo) correspondencias++;
				}

				if(correspondencias >= 3) return simbolo;
			}
		}
	}
}

class Marcador {
	elemento;
	_simbolo;

	constructor(elemento) {
		this.elemento = elemento;
	}

	get simbolo() {
		return this._simbolo;
	}

	marcar(simbolo) {
		this._simbolo = simbolo;
		

		if(simbolo === MARCADOR_X) {
			this.elemento.innerText = '✖️';
			this.elemento.classList.remove('marker_o');
			this.elemento.classList.add('marker_x');
		} else {
			this.elemento.innerText = '️⭕️';
			this.elemento.classList.remove('marker_x');
			this.elemento.classList.add('marker_o');
		}
	}
}

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

// inicializar jogo
const game = new Game(
	[...document.querySelectorAll('.marker')].map(m => new Marcador(m)),
	document.querySelector('.turn')
);

for(let i in game.marcadores) {
	const marcador = game.marcadores[i];

	marcador.elemento.addEventListener('click', () => {
		game.tenteMarcar(i);
	})
}