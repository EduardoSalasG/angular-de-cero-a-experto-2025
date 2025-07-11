import { taxCalculation } from "./06-function-destructuring";
import type { Product } from "./06-function-destructuring";

const shoppingCart: Product[] = [
    {
        description: 'Nokia',
        price: 100
    },{
        description: 'iPad',
        price: 150
    }
];

// Tax = 0.15


const [total, taxTotal] = taxCalculation({
    tax: 0.15, 
    products:shoppingCart})

console.log('Total', total);
console.log('Tax', taxTotal);