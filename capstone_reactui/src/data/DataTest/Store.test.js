// store.test.js
import { store } from '../store';
import { userReducer } from '../../features/SushStore';

describe('Redux Store', () => {
    test('should configure the store with persisted reducer', () => {
        const state = store.getState(); // get the initial state from the store
        expect(state.user).toBeDefined(); // the "user" key should be in the state
    });
});
