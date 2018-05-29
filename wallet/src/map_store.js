import store from './store';


export function mapToD3FlareDate()
{
    let d3_data = {children: []};
    let walletDB = store.getState().wallet;

    walletDB.category.map((c)=>{
        let children = {
            "name": c.name,
            "hex": c.color[7],
            children: [],
        }
        walletDB.item
            .filter((i) => {return i.category === c.name})
            .map((i,index) => {
                let val;
                if (Number.isInteger(i.price))
                    val = Math.round(i.price * i.quantity);
                else
                    val = Math.round(parseFloat(i.price) * i.quantity);
                let ch = {
                    "name" : i.name,
                    "value" : val,
                    "hex" : c.color[index + 3] 
                };
                children.children.push(ch);
                return true;
        });
        d3_data.children.push(children);
        return true;
    });
    
    return d3_data;
}

export function mapToGetCategoryColor()
{
    let c_col = [];
    let walletDB = store.getState().wallet;

    walletDB.category.map((c)=>{
        c_col.push(c.color[7]);
        return true;
    });
    return c_col;
}

export function mapToGetCategoryName()
{
    let c_col = [];
    let walletDB = store.getState().wallet;

    walletDB.category.map((c)=>{
        c_col.push(c.name);
        return true;
    });
    return c_col;
}