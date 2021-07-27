var productTypes = [
    { name: "food"     , caption: "Продукты питания"},
    { name: "clothes"  , caption: "Одежда"},
    { name: "footwear" , caption: "Обувь"}
];

/*Вывод списка типов продуктов */
var html = '<select id="goodTypes" name="good_types" onchange="getProductList();"><option value="none" hidden="">Выберите тип</option>';

productTypes.forEach(function(value){
    //var item =  + ' ' +String(value.price);
    html += '<option value="' + value.name + '">'
        + value.caption
        + '</option>'; 
});
html += '</select>';

document.getElementById("goodTypes").innerHTML = (html);

var productList =[
    {type: "food" , name:'pineapple'    , caption:'Ананас'   , price: 120.20, unitName: 'шт', unitQuatity: 1},
    {type: "food" , name:'bananas'      , caption:'Бананы'   , price: 70.60, unitName: 'кг', unitQuatity: 1},
    {type: "food" , name:'grapes'       , caption:'Виноград' , price: 95.80, unitName: 'кг', unitQuatity: 1},
    {type: "food" , name:'apple'        , caption:'Яблоки'   , price: 95.50, unitName: 'кг', unitQuatity: 1},
    {type: "clothes" , name:'shirt'     , caption:'Рубашка'  , price: 250.00, unitName: 'шт', unitQuatity: 1},
    {type: "clothes" , name:'pants'     , caption:'Брюки'    , price: 375.00, unitName: 'шт', unitQuatity: 1},
    {type: "clothes" , name:'dress'     , caption:'Платье'   , price: 790.00, unitName: 'шт', unitQuatity: 1},
    {type: "footwear" , name:'boots'    , caption:'Ботинки'  , price: 590.00, unitName: 'пара', unitQuatity: 1},
    {type: "footwear" , name:'sneakers' , caption:'Красовки' , price: 890.00, unitName: 'пара', unitQuatity: 1},
    {type: "footwear" , name:'shoes'    , caption:'Туфли'    , price: 1050.00, unitName: 'пара', unitQuatity: 1},
    
];

/*Вывод списка продуктов */
html = '<select id="goodList" name="good_list"><option value="none" hidden="">Выберите тип</option>';

productList.forEach(function(value){
    //var item =  + ' ' + value.price.toString();
    html += '<option value="' + value.name + '">'
        + value.caption + ' - ' + value.price.toString() 
        + ' за ' + value.unitQuatity.toString() + ' ' + value.unitName
        + '</option>'; 
});
html += '</select>';

document.getElementById("goods").innerHTML = (html);

function getProductList(){
    /*Вывод списка продуктов */

    var productTypesList = document.getElementById("goodTypes");
    var selectedIndex = productTypesList.lastChild.selectedIndex-1;
    var productTypeName = productTypes[selectedIndex].name;
  
    html = '<select id="goodList" name="good_list"><option value="none" hidden="">Выберите тип</option>';
    
    //var productsByType = productList.filter(product => {product.type === productTypeName});
    var productsByType = productList.filter(function (product) {
        return product.type == productTypeName;
      });

    productsByType.forEach(function(product){
        //var item =  + ' ' + value.price.toString();
        html += '<option value="' + product.name + '">'
            + product.caption + ' - ' + product.price.toString() 
            + ' за ' + product.unitQuatity.toString() + ' ' + product.unitName
            + '</option>'; 
    });
    html += '</select>';  

    document.getElementById("goods").innerHTML = (html);
}

//Поиск элемента в массиве объектов по свойству name
function getOfDictionaryByName(arr, value) {

    let result = arr.find(obj => {
        return obj.name === value
      })
  
    return result? result: null; // or undefined
  
}

let cart = {
    products: [],

    showTotalPrice: function(){
        let total = 0;

        for (let cartLine of this.products){
            var productOfDictionary = getOfDictionaryByName(productList, cartLine.product);
            //Берем цену из справочника и меру измерения, определяем сколько частей и умножаем на цену
            total += (productOfDictionary.price) * (cartLine.quantity/productOfDictionary.unitQuatity) ;
        }
        return total;
    },
    getCartLineInfoByProduct: function(productName){
        var cartLine = this.products.find(obj => {
            return obj.product === productName
          })
        var productOfDictionary = getOfDictionaryByName(productList, productName);
        //Берем цену из справочника и меру измерения, определяем сколько частей и умножаем на цену
        var LineAmount = (productOfDictionary.price) * (cartLine.quantity/productOfDictionary.unitQuatity) ;
       
        var info = productOfDictionary.caption 
            + ' ' + productOfDictionary.price.toString()  + 'р'
            + ' * '  +  cartLine.quantity.toString() + productOfDictionary.unitName 
            + ' = ' + LineAmount.toString() + 'р';
        
        return info;
    },
    findProductInCartByName: function(productName){
        
        var result = this.products.find(obj => {
            return obj.product === productName
          })
      
        return result? result : null; // or undefined 

    },
    addProductByName: function(productName){
        let cartList = document.getElementById("cart");

        //Ищем в перечне товаров
        let productOfDictionary = getOfDictionaryByName(productList, productName);

        //Убираем из списка пустой элемент
        if(productOfDictionary != null){
            if(cartList.length == 1 && cartList[cartList.length -1].value == "none"){
                cartList[cartList.length -1] = null ; 
            }
        }

        //Ищем в корзине
        let productInCart = this.findProductInCartByName(productName);

        if(productInCart != undefined || productInCart != null){

            var addIndex = this.products.findIndex(obj => {    
                return obj.product === productName
              });

            productInCart.quantity += productOfDictionary.unitQuatity ;
            
            var caption = this.getCartLineInfoByProduct(productName);
            var updateOption = new Option(caption,productName);
            cartList[addIndex] = updateOption;
        }
        else{
            this.products.push({product: productOfDictionary.name, quantity: productOfDictionary.unitQuatity});
          
            var caption = this.getCartLineInfoByProduct(productName);
            var newOption = new Option(caption,productName);
            cartList[cartList.length] = newOption;
        }
        
    },
    removeProductByName: function(productName, removeLine){
        let cartList = document.getElementById("cart");

        //Ищем в перечне товаров
        let productOfDictionary = getOfDictionaryByName(productList, productName);
        //Ищем в корзине
        let productInCart = this.findProductInCartByName(productName);
        
        if(productInCart != undefined || productInCart != null){

            var removeIndex = this.products.findIndex(obj => {    
                return obj.product === productName
              });

            if(productInCart.quantity/productOfDictionary.unitQuatity == 1 || removeLine){
                this.products.splice(removeIndex, 1)
                cartList[removeIndex] = null;
            }
            else{
                productInCart.quantity -= productOfDictionary.unitQuatity;
                var caption = this.getCartLineInfoByProduct(productName);
                var updateOption = new Option(caption,productName);
                cartList[removeIndex] = updateOption;
            }
        }
    }, 

}

function ShoppingCartAddItem(){
    var goodList= document.getElementById("goodList");
    var selectedIndex = goodList.selectedIndex;
    
    if(selectedIndex != -1){
        var productName = goodList.options[selectedIndex].value;
        if(productName != 'none'){
            cart.addProductByName(productName);
            
            document.getElementById("cartAmount").value = (cart.showTotalPrice().toString() +"р");

            document.getElementById("RemoveItem").style.display = 'inline';
            document.getElementById("removeType").style.display = 'inline';
            document.getElementById("clearCart").style.display = 'block';
        }
    }
    else{
        alert("Выберите товар из справочника");
    }
}


function ShoppingCartRemoveItem(){
    var cartList = document.getElementById("cart");
    var selectedIndex = cartList.selectedIndex;
    if(selectedIndex != -1){
        var currentProduct = cartList.options[selectedIndex].value; 
        
        cart.removeProductByName(currentProduct, false);
        document.getElementById("cartAmount").value = (cart.showTotalPrice().toString() +"р");

        if(cart.products.length == 0) 
        {
            var newOption = new Option("Пусто 0.00р * 0 шт = 0.00р","none");
            cartList[cartList.length] = newOption;
        
            document.getElementById("RemoveItem").style.display = 'none';
            document.getElementById("removeType").style.display = 'none';
            document.getElementById("clearCart").style.display = 'none'; 
        
            document.getElementById("cartAmount").value = "0.00р"; 
        }
    }
    else{
        alert("Выберите элемент в корзине");
    }
}

function ShoppingCartRemoveLine(){
    var cartList = document.getElementById("cart");
    var selectedIndex = cartList.selectedIndex;
    
    if(selectedIndex != -1){
        var currentProduct = cartList.options[selectedIndex].value; 
        
        cart.removeProductByName(currentProduct, true);
        document.getElementById("cartAmount").value = (cart.showTotalPrice().toString() +"р");

        if(cart.products.length == 0) 
        {
            var newOption = new Option("Пусто 0.00р * 0 шт = 0.00р","none");
            cartList[cartList.length] = newOption;
        
            document.getElementById("RemoveItem").style.display = 'none';
            document.getElementById("removeType").style.display = 'none';
            document.getElementById("clearCart").style.display = 'none'; 
        
            document.getElementById("cartAmount").value = "0.00р"; 
        }
    }
    else{
        alert("Выберите элемент в корзине");
    }
}

function ClearShoppingCart(){

    var cartList = document.getElementById("cart");
    var cartListLenght = cartList.length;
    for(var i=cartListLenght-1;i>=0;i--){
        var currentProduct = cartList.options[i].value; 
        cart.removeProductByName(currentProduct, true);
        cartList[i] = null;
    }
    
    var newOption = new Option("Пусто 0.00р * 0 шт = 0.00р","none");
    cartList[cartList.length] = newOption;

    document.getElementById("RemoveItem").style.display = 'none';
    document.getElementById("removeType").style.display = 'none';
    document.getElementById("clearCart").style.display = 'none'; 

    document.getElementById("cartAmount").value = "0.00р";
 }
