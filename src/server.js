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
// const uuidv4 = () => {
// 	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
// 		const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
// 		return v.toString(16);
// 	});
// };

let online = 0;
let tradePartner = null;

const requestTradePartner = (socket, { clientFriendCode }) => {
	if (tradePartner === null) {
		tradePartner = { socket, friendCode: clientFriendCode };
	} else {
		socket.send(JSON.stringify({
			type: "trade_partner_found",
			details: { tradePartnerFriendCode: tradePartner.friendCode }
		}));
		tradePartner.socket.send(JSON.stringify({
			type: "trade_partner_found",
			details: { tradePartnerFriendCode: clientFriendCode }
		}));
		tradePartner = null;
	}
};

wss.on('connection', socket => {
	online++;

	socket.on('close', () => {
		online--;
	});

	socket.on('message', serializedMessage => {
		const { type, details } = JSON.parse(serializedMessage);
		switch (type) {
			case "request_trade_partner":
				requestTradePartner(socket, details);
				break;
			default:
				console.log(`No message type ${type} accounted for.`);
		}
	});

});