import socketIO from 'socket.io';

export default function startServer(store, server) {
    const io = socketIO(server);

    store.subscribe(
        () => {
            store.getState().then(data => {
                io.emit('curr_news', data.toJS());
            }).catch(() => {
                var list = new List();
                io.emit('curr_news', list.toJS());
            });
        });
    // store.subscribe(state => state.then(promisedData => io.emit('curr_news', promisedData)));

    io.on('connection', (socket) => {
        store.getState().then(data => socket.emit('curr_news', data.toJS()));
        socket.on('action', store.dispatch.bind(store));
        socket.on('disconnect', () => console.log('Client disconnected'));
    });
}