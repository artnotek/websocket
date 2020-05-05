const WebSocket = require('ws');


// correction
const wsexample = new WebSocket.Server({ port: process.env.WS_PORT});
// wsexample.on('open', function open() {
//     wsexample.send('envoie a louverture');
// });

wsexample.on('connection', webSocket => {
    console.log('ton grand pere 2');

    // webSocket.onmessage = (messageEvent) => {
    //     const message = messageEvent.data;
    //     console.log('message received ', message);
    //     webSocket.send(message)
    // };

    // ou plus simple

    webSocket.on('message', (message) => {
        webSocket.send(message);
        wsexample.clients.forEach((client) => {
            // no comprende cette ligne
            if (client !== webSocket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });


    webSocket.send(JSON.stringify({
        user: 'server',
        message: 'Welcome!'
    }));

    webSocket.on('close', () => {
        console.log('connection closed by client');
    });
});

wsexample.on('error', (error) => {
    console.log('error occured ', error);
});
