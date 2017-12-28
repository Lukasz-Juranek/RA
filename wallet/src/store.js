import {walletDB} from './walletDB'
import { combineReducers ,createStore } from 'redux';

const view_reducer = (state = 'CATEGORY_VIEW', action) => {
    switch (action.type) {
        case 'SET_VIEW':
          return action.payload;
        default:         
          return state;
    }
};

function copyItem(item){
  let new_item = item.map((i) => {
    return {...i};
  });
  return new_item;
}

const wallet_reducer = (state = walletDB, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      let category = copyItem(state.category);
      let item = copyItem(state.item)
      item.push(action.payload); 
      let new_state = 
      {
        ...state,
        category,
        item
      }
      return new_state;
    default:         
      return state;
  }
}

const open_window_reducter = (state = {visible : false,
                                       item_name: "",
                                       category_name: "",
                                       quantity: "",
                                       price: "",
                                      }, action) =>
{
  let new_state = state;

  switch (action.type) {
    case 'ITEM_ADD_WINDOW_VISIBILITY':
      new_state = action.payload;     
      return new_state;
    default:
      return state;
  }
}

const category_reducer = (state = 'Cash', action) => {
    switch (action.type) {
      case 'SET_CATEGORY':
        return action.payload;
      default:         
        return state;
  }
}


const reducers = combineReducers({
    active_view: view_reducer,
    active_category: category_reducer,
    wallet: wallet_reducer,
    add_item_window: open_window_reducter
});

export default createStore(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


