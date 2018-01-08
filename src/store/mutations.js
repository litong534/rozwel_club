import * as types from './mutation-types';

const mutations = {
    [types.ADD](state, data) {
        state.data = [...state.data,data];
    },
    [types.MINUS](state,data) {
        state.data.splice(data,1);
    },
    [types.SET_ARTICLE](state, data) {
        state.data = data;
    }
};

export default mutations;