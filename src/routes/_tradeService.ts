import { writable } from 'svelte/store';

interface TradeServiceValue {
  tradePartnerFriendCode: string | null,
  isTrading: boolean
}

const defaultTradeServiceValue: TradeServiceValue = {
  tradePartnerFriendCode: null,
  isTrading: false
};

const store = writable(defaultTradeServiceValue);

export const initializeTradeServive = () => {

  const host = window.location.host || "localhost:3000";
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  const socket = new WebSocket(`${protocol}://${host}`);
  console.log({ socket });

  socket.addEventListener("open", event => {
    console.log("SOCKET CONNECTED");
  });

  socket.addEventListener("message", ({ data: serializedMessage }) => {
    const { type, details: { tradePartnerFriendCode } } = JSON.parse(serializedMessage);
    switch (type) {
      case "trade_partner_found":
        store.set({
          tradePartnerFriendCode: `Trade partner found!\r\n${tradePartnerFriendCode}`,
          isTrading: false
        });
        break;
      default:
        console.log(`No message type ${type} accounted for.`);
    }
  });

  const requestTradePartner = (clientFriendCode: any) => {
    if (socket.readyState <= 1) {
      const serializedMessage = JSON.stringify({
        type: "request_trade_partner",
        details: { clientFriendCode }
      });
      store.set({
        tradePartnerFriendCode: "Waiting for trade partner...",
        isTrading: true
      });
      socket.send(serializedMessage);

    }
  };

  return {
    subscribe: store.subscribe,
    requestTradePartner
  };

};