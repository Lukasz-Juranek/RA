import { combineReducers ,createStore } from 'redux';

const view_reducer = (state = 'MAIN_VIEW', action) => {
    switch (action.type) {
        case 'SET_VIEW':
          return action.payload;
        default:
          return state;
    }
};

const wallet_reducer = (state = [], action) => {
  return state;
}

const reducers = combineReducers({
    active_view: view_reducer,
    wallet: wallet_reducer
});

export default createStore(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


