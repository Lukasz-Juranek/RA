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