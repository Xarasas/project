/*
If an item is selected from the categories page, it safes viewItem: viewID (same as itemID) into localStorage.
A function then checks which viewItem is safed and shows corresponding info. localStorage gets cleared after page load.
Problem: refreshing page deletes item info and shows blank template page because of empty localStorage.

Add to Cart function calls the localStorage which is saved as an Array in getLocalStorage on page load and pushes itemID to the Array.
Afterwards the new Array will be saved to localStorage again to communicate with Shopping Cart.
*/

// get elements for Item Page

const productName = document.getElementById('productName');
const manufacturer = document.getElementById('manufacturer');
const itemPrice = document.getElementById('price');
const prodIMG = document.getElementById('product_image')
const addToCartBtn = document.getElementById('addToCartBtn')
const viewID = localStorage.viewItem

var getLocStorage = localStorage.getItem('itemNumber')
    getLocStorage = getLocStorage ? getLocStorage.split(',') : [];



// initiate item Information, same problem with iterating over localStorage and item Objects to display relevant info when ID matches. Therefore hard-coded
function initiateItemInformation(){
   if (viewID === '55001') {
       showItemInformation('55001');   
   } else if (viewID === '55002'){
        showItemInformation('55002')
   };
   setCartNum()
};


// updates text to actual item info & adding if statements to avoid errors when the script runs on another page withoud the IDs
function showItemInformation(itemIndex) {
    const info = items.find(info => info.itemID === itemIndex);
    if (productName) productName.innerText = info.itemName;
    if (manufacturer) manufacturer.innerText = info.itemManufacturer;
    if (itemPrice) itemPrice.innerText = info.itemPrice + ' €';
    if (prodIMG) prodIMG.src = info.itemIMG;
}; 

// Updating shopping cart
if (addToCartBtn) addToCartBtn.addEventListener('click', updateCart);

function updateCart(){
    getLocStorage.push(viewID);
    localStorage.setItem('itemNumber', getLocStorage.toString());
    document.getElementById('addedToCart').innerText = 'added to cart!'
    setCartNum()
};

// updates the item number in navbar, hide number if 0
function setCartNum(){
    let num = getLocStorage.length;
    if (num > 0)
    document.getElementById('cartNum').innerText = num;
}

// store items as Objects
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


initiateItemInformation();
localStorage.removeItem('viewItem');