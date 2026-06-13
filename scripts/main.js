class Game {
	marcadores;
	vezesMarcado;
	vezElemento;
	partida;
	_vez;

	constructor(marcadores, vezElemento, partida) {
		this.marcadores = marcadores;
		this.vezesMarcado = 0;
		this.vezElemento = vezElemento;
		this.partida = partida;
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
		this.partida.mapaMarcadores[pos] = this.vez;
		this.vez = this.vez === MARCADOR_X ? MARCADOR_O : MARCADOR_X;
		this.vezesMarcado++;
	}

	// tentar marcar X ou O, não irá marcar se já estiver marcado
	tenteMarcar(pos) {
		if(!this.partida._estaIniciado) return;

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

					let marcadorSimbolo = this.partida.mapaMarcadores[i];
					if(marcadorSimbolo === simbolo) correspondencias++;
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
		}
		else if(simbolo === MARCADOR_O) {
			this.elemento.innerText = '️⭕️';
			this.elemento.classList.remove('marker_x');
			this.elemento.classList.add('marker_o');
		}
		else {
			this.elemento.innerText = '';
			this.elemento.classList.remove('marker_x');
			this.elemento.classList.remove('marker_o');
		}
	}
}

class Partida {
	_estaIniciado;
	game;
	mapaMarcadores;

	constructor(game) {
		this.game = game;
		this.mapaMarcadores = Array(9).fill(undefined);
	}

	get estaIniciado() {
		return this._estaIniciado;
	}

	iniciar() {
		if(this._estaIniciado) return;
		this._estaIniciado = true;
	}

	parar() {
		this._estaIniciado = false;
	}

	resetar() {
		this.parar();
		this.mapaMarcadores = this.mapaMarcadores.fill(undefined);

		for(const marcador of this.game.marcadores) {
			marcador.marcar(undefined);
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
	document.querySelector('.turn'),
	new Partida()
);

game.partida.game = game;
game.partida.iniciar();

for(let i in game.marcadores) {
	const marcador = game.marcadores[i];

	marcador.elemento.addEventListener('click', () => {
		if(!game.partida.estaIniciado) return;

		game.tenteMarcar(i);

		const ganhador = game.obterGanhador();
		if(!ganhador) return;
		
		game.partida.parar();

		setTimeout(() => {
			if(ganhador) alert("O ganhador dessa partida é o " + ganhador);
		}, 500)
	})
}