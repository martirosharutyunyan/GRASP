class Product {
    constructor(name, price){
        this.name = name;
        this.productPrice = price
    }

    get price(){
        return this.productPrice;
    }
}


class Purchase {
    constructor(name, ...collection){
        this.name = name
        this.collection = collection
    }

    get price(){
        let price = 0
        for (const item of this.collection) {
            price += item.price
        }
        return price;
    }
}


const p1 = new Product('p1', 1000)
const p2 = new Product('p2', 2000)

const elec = new Purchase('elec', p1, p2)
const text = new Purchase('text', p1, p2)

const store = new Purchase('store', elec, text)

console.log(store.price)