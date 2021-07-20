var ProductList = new Object();  
ProductList.names = {
    "pineapple": "Ананас",
    "bananas": "Бананы",
    "grapes": "Виноград",
};
ProductList.costs = {
    "pineapple": 120.20,
    "bananas": 70.60,
    "grapes": 95.80,
   };

function ShoppingCartAddItem(){
    var foodType= document.getElementById("food_type");
    var selectedIndex = foodType.selectedIndex;
    var productName = foodType.options[selectedIndex].value;
    var caption = ProductList.names[productName];
    var cost = ProductList.costs[productName];
    var cartList = document.getElementById("cart_list");
    var cartListLenght = cartList.length;
    var findString = caption + " " + cost.toString() + "р";

    var isExist = false;
    var cartAmount = 0;
    var lineAmount = 0;

    for(var i = 0; i < cartListLenght; i++){
        var cartLineText = cartList[i].text;
        var lineSumPosEnd = cartLineText.lastIndexOf("р");
        var lineSumPosBegin = cartLineText.lastIndexOf(" ",lineSumPosEnd);
        lineAmount = Number(cartLineText.slice(lineSumPosBegin, lineSumPosEnd));

        if(cartList[i].value == productName)
        {
            isExist = true;
            
            var posPiecesNameEnd = cartLineText.indexOf("шт");
            var posPiecesNameBegin = cartLineText.lastIndexOf(" ",posPiecesNameEnd);
            var valuePieces = Number(cartLineText.slice(posPiecesNameBegin, posPiecesNameEnd));

            valuePieces = valuePieces + 1;
            lineAmount = Number((cost * valuePieces).toFixed(2));
            caption = findString + " " + valuePieces.toString() + "шт = " + lineAmount.toString() + "р";
            
            var updateOption = new Option(caption,productName);
            cartList[i] = updateOption;

            cartAmount = cartAmount + lineAmount;
        }
        else if(cartList[i].value == "none"){
            cartList[i] = null;  
        }
        else{

            cartAmount = cartAmount + lineAmount;
        }
    }

    if(!isExist){
        lineAmount = cost;
        cartAmount = cartAmount + lineAmount;
        caption = findString + " 1шт = " + lineAmount.toString()+"р";
        var newOption = new Option(caption,productName);
        cartList[cartList.length] = newOption;
    }
    
    document.getElementById("cartAmount").value = (cartAmount.toString()+"р");

    document.getElementById("RemoveItem").style.display = 'inline';
    document.getElementById("removeType").style.display = 'inline';
    document.getElementById("clearCart").style.display = 'block';
 }

 function ShoppingCartRemoveItem(){

    var cartList = document.getElementById("cart_list");
    var selectedIndex = cartList.selectedIndex;
    var productName = "";
    var cartLineText = cartList[selectedIndex].text;
    var posPiecesNameEnd = cartLineText.indexOf(" ");
    if(!isNaN(cartLineText.slice(posPiecesNameEnd+1,posPiecesNameEnd+2)) 
        && isNaN(cartLineText.slice(posPiecesNameEnd-1,posPiecesNameEnd))){
       productCaption =  cartLineText.slice(0,posPiecesNameEnd);      
    

        for (listName in ProductList.names) {
            if (ProductList.names[listName] == productCaption) 
                productName = listName;
        }
    }
    else
        productName = cartList[selectedIndex].value;

    var caption = ProductList.names[productName];
    var cost = ProductList.costs[productName];
    var findString = caption + " " + cost.toString()+"р";
    var tail = cartList[selectedIndex].text.slice(findString.length); 
    var posPiecesName = tail.indexOf('шт');
    var valuePieces = Number(tail.slice(0, posPiecesName));
    if(valuePieces > 1){
        valuePieces = valuePieces - 1;
        caption = findString + " " + valuePieces.toString() + "шт = " + (cost * valuePieces).toFixed(2).toString() + "р";
        var updateOption = new Option(caption,productName);

        cartList[selectedIndex] = updateOption; 
    }
    else
        cartList[selectedIndex] = null;

    if(cartList.length == 0){
        document.getElementById("RemoveItem").style.display = 'none';
        document.getElementById("removeType").style.display = 'none';
        document.getElementById("clearCart").style.display = 'none'; 
    }
    
    var carAmount = calcCart();

    document.getElementById("cartAmount").value = (carAmount.toString() + "р"); 
 }

 function ShoppingCartRemoveType(){

    var cartList = document.getElementById("cart_list");
    var selectedIndex = cartList.selectedIndex;
    // удаляем элемент 
    cartList[selectedIndex] = null;

    if(cartList.length == 0){
        document.getElementById("RemoveItem").style.display = 'none';
        document.getElementById("removeType").style.display = 'none';
        document.getElementById("clearCart").style.display = 'none'; 
    }
    var carAmount = calcCart();

    document.getElementById("cartAmount").value = (carAmount.toString() + "р"); 
 }

 function ClearShoppingCart(){

    var cartList = document.getElementById("cart_list");
    var cartListLenght = cartList.length;
    for(var i=cartListLenght;i>=0;i--){
        cartList[i] = null;
    }
    
    document.getElementById("RemoveItem").style.display = 'none';
    document.getElementById("removeType").style.display = 'none';
    document.getElementById("clearCart").style.display = 'none'; 

    document.getElementById("cartAmount").value = "0.00р";
 }

 function calcCart(){
    var cartList = document.getElementById("cart_list");
    var cartListLenght = cartList.length;
    var cartAmount = 0;

    for(var i=0;i<cartListLenght;i++){
        var carLineText = cartList[i].text;
        var lineSumPosEnd = carLineText.lastIndexOf("р");
        var lineSumPosBegin = carLineText.lastIndexOf(" ",lineSumPosEnd);
        lineAmount = Number(carLineText.slice(lineSumPosBegin, lineSumPosEnd));
       
        cartAmount = cartAmount + lineAmount;
    }
    return cartAmount;
 }