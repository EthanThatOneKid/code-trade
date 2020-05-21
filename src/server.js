import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import dotenv from 'dotenv';
import * as sapper from '@sapper/server';
import WebSocket from 'ws';
dotenv.config();

const { PORT, NODE_ENV, PROJECT_NAME } = process.env;
const dev = NODE_ENV === 'development';

const { server } = polka() // You can also use Express
	.use(
		PROJECT_NAME,
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

const wss = new WebSocket.Server({ server });

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
const uuidv4 = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
};

const broadcast = details => {
	const meta = { id: uuidv4(), ts: Date.now() };
	const raw = JSON.stringify({ details, meta });
	wss.clients.forEach(client => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(raw);
		}
	})
};

wss.on('connection', socket => {

	socket.on('close', () => {
		// TODO: Do something
	});

	socket.on('trade', json => {
		console.log("TRADE", { json });
	});

	socket.on('ping', json => {
		console.log("PONG");
	});

});