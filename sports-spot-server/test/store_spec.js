import { List, fromJS } from 'immutable';
import { expect } from 'chai';

import makeStore from '../src/store';

describe('store', () => {
    it('is a Redux store configured with the correct reducer', () => {
        const store = makeStore();
        expect(store.getState()).to.equal(List());
        store.dispatch({
            type: "SET_CURRENT_ALL_NEWS",
            news: [JSON.parse('{ "sample1": "testValue1" }'), JSON.parse('{ "sample2": "testValue2" }')]
        });
        expect(store.getState()).to.equals(fromJS(
            [{ "sample1": "testValue1" }, { "sample2": "testValue2" }]
        ));
    });
});