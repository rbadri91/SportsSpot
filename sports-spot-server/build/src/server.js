'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = startServer;

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startServer(store) {
    var io = new _socket2.default().attach(8090);

    store.subscribe(function () {
        store.getState().then(function (data) {
            io.emit('curr_news', data.toJS());
        }).catch(function () {
            var list = new List();
            io.emit('curr_news', list.toJS());
        });
    });
    // store.subscribe(state => state.then(promisedData => io.emit('curr_news', promisedData)));

    io.on('connection', function (socket) {
        store.getState().then(function (data) {
            return socket.emit('curr_news', data.toJS());
        });
        socket.on('action', store.dispatch.bind(store));
    });
}