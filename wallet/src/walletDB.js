import {red50,pink50,teal50,purple50,indigo50} from './color_array'

export let walletDB = 
{
    // categories
    category : [{
        name: "Stock",
        color: red50
    },
    {
        name: "Cash",
        color: teal50
    },
    {
        name: "Assets",
        color: indigo50
    }],
    // items
    item : [{
        name : "Dolar",
        category: "Cash",
        quantity: 1000,
        price: 3.58
    },
    {
        name : "Rubelki",
        category: "Cash",
        quantity: 6100,
        price: 0.58
    },
    {
        name : "Polski Złoty",
        category: "Cash",
        quantity: 300,
        price: 1
    },
    {
        name : "PLASTBOX",
        category: "Stock",
        quantity: 1500,
        price: 2.20
    },
    {
        name : "AZOTY",
        category: "Stock",
        quantity: 15,
        price: 150
    },
    {
        name : "Złoto",
        category: "Assets",
        quantity: 1,
        price: 5000
    }]
};

export function mapToD3FlareDate()
{
    let d3_data = {children: []};

    walletDB.category.map((c)=>{
        let children = {
            "name": c.name,
            "hex": c.color[7],
            children: [],
        }
        walletDB.item
            .filter((i) => {return i.category === c.name})
            .map((i,index) => {
                let ch = {
                    "name" : i.name,
                    "value" : Math.round(i.price * i.quantity),
                    "hex" : c.color[index + 3] 
                };
                children.children.push(ch);
        });
        d3_data.children.push(children);
    });
    
    return d3_data;
}

export function mapToGetCategoryColor()
{
    let c_col = [];

    walletDB.category.map((c)=>{
        c_col.push(c.color[7]);
    });
    return c_col;
}

export function mapToGetCategoryName()
{
    let c_col = [];

    walletDB.category.map((c)=>{
        c_col.push(c.name);
    });
    return c_col;
}