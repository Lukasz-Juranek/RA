import {walletDB} from './walletDB'
import { combineReducers ,createStore } from 'redux';
import { purple50 } from './color_array';

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

function find_existing_cat(category, name)
{
  let cat_find = false;
  for (let i = 0; i < category.length; i++)
  if (category[i].name == name)
    cat_find = category[i];
  return cat_find;
}

function find_existing_item(item, name)
{
  let item_find = false;
  for (let i = 0; i < item.length; i++)
  if (item[i].name == name)
    item_find = item[i];
  return item_find
}

const wallet_reducer = (state = walletDB, action) => {
  console.log("ADD_ITEM action");
  console.log(action);

  switch (action.type) {
    case 'ADD_ITEM':

      let category = copyItem(state.category);
      let item = copyItem(state.item);
      // add not existing category
      if (find_existing_cat(category,action.payload.category_name) === false)
      {
        category.push({color: purple50,
                       name: action.category_name});
      }
      // add not existing item
      let item_find = find_existing_item(item,action.payload.item_name);
      if (typeof item_find === false)
      {
        item.push({  name : action.item_name,
                     category: action.category_name,
                     quantity: action.quantity,
                     price: action.price
        });
      } else 
      {
        item_find.price = action.payload.price;
        item_find.quantity = item_find.quantity + action.payload.quantity;
      }
 
       
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


