import objectAssign from 'object-assign';

export default socket => store => next => action => {
    console.log("action here:", action);
    if (action.meta && action.meta.remote) {
        // const clientId = store.getState().get('clientId');
        socket.emit('action', action);
    }
    return next(action);
}