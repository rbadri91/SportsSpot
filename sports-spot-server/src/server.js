import Server from 'socket.io';

export default function startServer(store) {
    const io = new Server().attach(8090);

    store.subscribe(
            () => {
                store.getState().then(data => {
                    console.log("data here:", data);
                    io.emit('curr_news', data.toJS())
                });
            }
        )
        // store.subscribe(state => state.then(promisedData => io.emit('curr_news', promisedData)));

    io.on('connection', (socket) => {
        store.getState().then(data => socket.emit('curr_news', data.toJS()));
        socket.on('action', store.dispatch.bind(store));
    });
}