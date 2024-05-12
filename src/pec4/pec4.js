
export class item {
    constructor(name, price, units) {
        this.name = name;
        this.price = parseInt(price);
        this.units = parseInt(units);
    }
}

// Exercise 1. (2p)
export function queryDOM(){
    const array = []

    array.push(document.getElementById('totalPrice'));
    array.push(document.querySelectorAll('h2'));
    array.push(document.querySelectorAll('.product'));
    array.push(document.querySelectorAll('p.price'));
    array.push(document.querySelector('.products .product[data-name="Peach"] button'));
    
    return array;
}

// Exercise 2. (2p)
export function createCartElement(item) {
    const cartElement = document.createElement('div');
    cartElement.className = 'panel';

    const itemName = document.createElement('h3');
    itemName.textContent = item.name;
    cartElement.appendChild(itemName);

    const itemData = document.createElement('span');
    itemData.className = 'label';
    itemData.textContent = item.units + ' pieces for ' + item.price + ' €';
    cartElement.appendChild(itemData);

    return cartElement;
}

// Exercise 3 (1p)
export function emptyCart() {
    const panel = document.querySelectorAll('#cartItems .panel');

    panel.forEach(panel => {
        panel.remove();
    });
}

// Exercise 4 (1p)
export function updateCartTotal() {
    const totalPrice = document.getElementById('totalPrice');
    const items = document.querySelectorAll('#cartItems .label');
    let total = 0;

    items.forEach(item =>{
        const itemNumbers = item.textContent.match(/\d+/g);
        const itemPrice = parseInt(itemNumbers[1]);
        total += itemPrice
    })
    
    return totalPrice.textContent = `${total} €`;
}

// Exercise 5. (2p)
export function addToCart(itemAdded) {
    const cart = document.getElementById('cartItems');
    const panels = document.querySelectorAll('#cartItems .panel');

    let itemInCart = false;
    
    panels.forEach((panel) => {
        const name = panel.querySelector('h3');
        const label = panel.querySelector('.label');

        if(itemAdded.name === name.textContent) {
            const unitsInLabel = parseInt(label.textContent.match(/\d+/g)[0]);
            const newUnits = unitsInLabel + itemAdded.units;
            label.innerHTML = `${newUnits} pieces for ${itemAdded.price * newUnits} €`;

            itemInCart = true;
        } 
    })

    if (!itemInCart) {
        cart.appendChild(createCartElement(itemAdded));
    }
}

// Exercise 6. (2p)
export function addListeners(){
    const clear = document.getElementById('clear');
    const update = document.getElementById('update');
    const buttons = document.querySelectorAll('.product button');

    clear.addEventListener('click', emptyCart);
    update.addEventListener('click', updateCartTotal);

    buttons.forEach(button => {
        const product = button.parentNode;
        const input = product.querySelector('input'); 

        button.addEventListener('click', event => {
            event.preventDefault();

            const newItem = {
                name: product.dataset.name,
                price: parseInt(product.dataset.price),
                units: parseInt(input.value)
            };

            newItem.price = newItem.price * newItem.units;

            addToCart(newItem)
        })
    })
}