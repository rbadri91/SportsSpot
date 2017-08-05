'use strict';

var _immutable = require('immutable');

var _chai = require('chai');

var _store = require('../src/store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('store', function () {
    it('is a Redux store configured with the correct reducer', function () {
        var store = (0, _store2.default)();
        (0, _chai.expect)(store.getState()).to.equal((0, _immutable.List)());
        store.dispatch({
            type: "SET_CURRENT_ALL_NEWS",
            news: [JSON.parse('{ "sample1": "testValue1" }'), JSON.parse('{ "sample2": "testValue2" }')]
        });
        (0, _chai.expect)(store.getState()).to.equals((0, _immutable.fromJS)([{ "sample1": "testValue1" }, { "sample2": "testValue2" }]));
    });
});