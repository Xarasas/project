
const totalAmount = document.getElementById('totalAmount');
const totalDiv = document.getElementById('total');

// gets the local storage and saves it as an array -> for shopping cart Number in Navbar and remove button
let getLocStorage = localStorage.getItem('itemNumber');
getLocStorage = getLocStorage.split(",");


function startCart(){
        createItem();
        setCartNum();
        console.log(getLocStorage)
    };

// removes the empty notice after item in shopping cart is created
function hideEmpty(){
    document.getElementById('emptyCart').style.display = 'none'; // display none so the element doesnt take up space
};

/*
what follows is a monstrosity of code. 
Initially I had stored each part (create IMG, text, btn, ..) stored in an own function and just channeled the functions.
The idea was to create a div element which then contains the IMG, text & btn. However, if I placed more than one item in the Cart, the content of the second div got
assigned to the first div (since they had the same ID). Now I had one div with contents from two items, overlapping over each other & one empty div.
It also made styling everything very difficult.

In the end, pasting every function into one big function kind of solved my problem.

I also had trouble finding a way to iterate both over the local storage and the item Objects (which I used to store the item information, such as ID, title, .. )
and if the itemID is a match it displays the corresponding information.
That's why everything is hard coded with the corresponding itemID and I used a simple if statement to display the item Info.
*/

function createItem() {
    getLocStorage.forEach(getLocStorage => {
        if (getLocStorage === items[0].itemID){
    // creates IMG
    var itemIMG = document.createElement('img');
    itemIMG.classList.add('prodIMG');
    itemIMG.setAttribute('src', items[0].itemIMG);
    document.getElementById('shopping_cart').appendChild(itemIMG);

    // creates item text
    var name = document.createElement('p');
    var manufacturer = document.createElement('p');
    var price = document.createElement('p');
    name.classList.add('productNameSC');
    manufacturer.classList.add('manufacturerSC');
    price.classList.add('priceSC');
    name.innerText = items[0].itemName;
    manufacturer.innerText = "von " + items[0].itemManufacturer;
    price.innerText = items[0].itemPrice + ' €';
    document.getElementById('shopping_cart').appendChild(name);
    document.getElementById('shopping_cart').appendChild(manufacturer);
    document.getElementById('shopping_cart').appendChild(price);

    // creates the remove button
    var removeBtn = document.createElement('button')
    removeBtn.classList.add('removeBtn')
    removeBtn.innerText = 'Remove'
    removeBtn.addEventListener('click', removeItem55001);
    document.getElementById('shopping_cart').appendChild(removeBtn);
    hideEmpty();
    createDiv();

    } else if (getLocStorage === items[1].itemID){
        // creates IMG
        var itemIMG = document.createElement('img')
        itemIMG.classList.add('prodIMG')
        itemIMG.setAttribute('src', items[1].itemIMG);
        document.getElementById('shopping_cart').appendChild(itemIMG);
        // creates item text
        var name = document.createElement('p');
        var manufacturer = document.createElement('p');
        var price = document.createElement('p');
        name.classList.add('productNameSC');
        manufacturer.classList.add('manufacturerSC');
        price.classList.add('priceSC');
        name.innerText = items[1].itemName;
        manufacturer.innerText = "von " + items[1].itemManufacturer;
        price.innerText = items[1].itemPrice + ' €';
        document.getElementById('shopping_cart').appendChild(name);
        document.getElementById('shopping_cart').appendChild(manufacturer);
        document.getElementById('shopping_cart').appendChild(price);
        var removeBtn = document.createElement('button')
        removeBtn.classList.add('removeBtn')
        removeBtn.innerText = 'Remove'
        removeBtn.addEventListener('click', removeItem55002);
        document.getElementById('shopping_cart').appendChild(removeBtn);
        hideEmpty();
        createDiv(); 
    }   else if (getLocStorage === ""){ //removes the empty string after no items are left in the cart
        localStorage.clear();
        location.reload();
    }
        
    });
};

// no function, only visual -> dividing items
function createDiv(){
     var diver = document.createElement('div');
    diver.id = 'trenner';
    document.getElementById("shopping_cart").appendChild(diver);
    };

// remove button for item 55001 (HDD)
function removeItem55001(){
    var removeFromLocStorage = getLocStorage.indexOf('55001');
    if (removeFromLocStorage > -1){
        getLocStorage.splice(removeFromLocStorage, 1);
        localStorage.setItem('itemNumber', getLocStorage.toString())
    }
    location.reload(); // reload page to load data using up2date localStorage info
}

// remove button for item 55002 (monitor)
function removeItem55002(){
    var removeFromLocStorage = getLocStorage.indexOf('55002');
    if (removeFromLocStorage > -1){
        getLocStorage.splice(removeFromLocStorage, 1);
        localStorage.setItem('itemNumber', getLocStorage.toString())
    }
    location.reload(); // reload page to load data using up2date localStorage info
}

// sets the cart number in navbar
function setCartNum(){
    let num = getLocStorage.length;
    document.getElementById('cartNum').innerText = num;
}

var items = [
    {
        itemID: '55001',
        itemName: 'WD Elements 1TB Festplatte',
        itemManufacturer: 'WD Elements',
        itemPrice: 52.99,
        itemIMG: 'https://files.rakuten-static.de/0a0a3078e4c67d6f6e4a09c17ff58456/images/09fb7f33d437560c79882ff663267da1.jpg',
    },
    {
        itemID: '55002',
        itemName: 'Dell Alienware AW2521HF, 24.5"',
        itemManufacturer: 'Dell',
        itemPrice: 422.21,
        itemIMG: 'https://files.rakuten-static.de/7f2075fbb03b25382cb65e5b900a7cb3/images/54d57a56cf5afb93f8124a6217b4a97a.jpg',
    },
];

let total = 0;

//round up correctly, avoiding more than 2 digits after , )
function roundUp(num, precision) {
    precision = Math.pow(10, precision)
    return Math.ceil(num * precision) / precision
  }

// update total
function getTotal(){
    getLocStorage.forEach(getLocStorage => {
    if (getLocStorage == items[0].itemID){
      total = total + items[0].itemPrice
    } else if (getLocStorage == items[1].itemID){
      total = total + items[1].itemPrice
    } 
})
totalAmount.innerText = 'Total Amount: ' + roundUp(total, 2) + ' €';
};


startCart();
roundUp();
getTotal();



