import {walletDB} from './walletDB'
import { combineReducers ,createStore } from 'redux';
import { purple50 } from './color_array';

const view_reducer = (state = 'MAIN_VIEW', action) => {
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
  {
    if (category[i].name.trim() === name.trim())
      {
        cat_find = category[i];
      }
  }
  return cat_find;
}

function find_existing_item(item, name)
{
  let item_find = false;
  for (let i = 0; i < item.length; i++)
  {
    if (item[i].name.trim() === name.trim())
    {
      item_find = item[i];
      return item_find;
    }
  }
  return item_find;
}

const wallet_reducer = (state = walletDB, action) => {
  console.log("ADD_ITEM action");
  console.log(action);


  let category = copyItem(state.category);
  let item = copyItem(state.item);

  switch (action.type) {
    case 'ADD_ITEM':

      // add not existing category
      if (find_existing_cat(category,action.payload.category_name) === false)
      {
        category.push({color: purple50,
                       name: action.payload.category_name});
      }
      // add not existing item
      let item_find = find_existing_item(item,action.payload.item_name);
      if (item_find === false)
      {
        item.push({  name : action.payload.item_name,
                     category: action.payload.category_name,
                     quantity: action.payload.quantity,
                     price: action.payload.price
        });
      } else 
      {
        item_find.price = action.payload.price;
        if (Number.isInteger(item_find.quantity))
          item_find.quantity = (item_find.quantity) + parseInt(action.payload.quantity,10);
        else
          item_find.quantity = parseInt(item_find.quantity,10) + parseInt(action.payload.quantity,10);
      }
 
       
      let new_state = 
      {
        ...state,
        category,
        item
      }
      return new_state;
    
    case 'SELL_ITEM':
      if (find_existing_cat(category,action.payload.category_name) !== false)
      {
        let item_find_r = find_existing_item(item,action.payload.item_name);
        if (item_find_r !== false)
        {
          item_find_r.price = action.payload.price;
          if (Number.isInteger(item_find_r.quantity))
            item_find_r.quantity = (item_find_r.quantity) - parseInt(action.payload.quantity,10);
          else
            item_find_r.quantity = parseInt(item_find_r.quantity,10) - parseInt(action.payload.quantity,10);
 
                    if (item_find_r.quantity <= 0)
          {
            let index = item.indexOf(item_find_r);
            item.splice(index,1);
          }
        }
      }

      let new_state_r = 
      {
        ...state,
        category,
        item
      }

    return new_state_r;
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

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}

let store = createStore(reducers,persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


export function category_names_array ()
{
  let d = store.getState().wallet.category.map((i)=>
  {
    return i.name;
  });
  return d;
}

export function items_names_array ()
{
  let d = store.getState().wallet.item.map((i)=>
  {
    return i.name;
  });
  return d;
}

export default store;

