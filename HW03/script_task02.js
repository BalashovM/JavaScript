var PList = new Object();  
PList.names = {
    "pineapple": "Ананас",
    "bananas": "Бананы",
    "grapes": "Виноград",
};
PList.costs = {
    "pineapple": 120.20,
    "bananas": 70.60,
    "grapes": 95.80,
   };

function ShoppingCartAddItem(){

    //debugger
    var foodType= document.getElementById("food_type");
    var selectedIndex = foodType.selectedIndex;
    var name = foodType.options[selectedIndex].value;
    var caption = PList.names[name];
    var cost = PList.costs[name];
    var cartList = document.getElementById("cart_list");
    var cartListLenght = cartList.length;
    var findString = caption + " " + cost.toString() + "р";

    var isExist = false;
    var cartAmount = 0;
    var lineAmount = 0;

    for(var i = 0; i < cartListLenght; i++){
        
        var lineSumPosEnd = cartList[i].text.lastIndexOf("р");
        var lineSumPosBegin = cartList[i].text.lastIndexOf(" ",lineSumPosEnd);
        lineAmount = Number(cartList[i].text.slice(lineSumPosBegin, lineSumPosEnd));

        if(cartList[i].value == name)
        {
            isExist = true;

            var carLineText = cartList[i].text;
            var posPiecesNameEnd = carLineText.indexOf("шт");
            var posPiecesNameBegin = carLineText.lastIndexOf(" ",posPiecesNameEnd);
            var valuePieces = Number(carLineText.slice(posPiecesNameBegin, posPiecesNameEnd));

            valuePieces = valuePieces + 1;
            lineAmount = Number((cost * valuePieces).toFixed(2));
            caption = findString + " " + valuePieces.toString() + " шт = " + lineAmount.toString() + "р";
            
            var updateOption = new Option(caption,name);
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
        var newOption = new Option(caption,name);
        cartList[cartList.length] = newOption;
    }

    document.getElementById("cartAmount").placeholder = (cartAmount.toString()+"р");

    document.getElementById("RemoveItem").style.display = 'inline';
    document.getElementById("removeType").style.display = 'inline';
    document.getElementById("clearCart").style.display = 'block';
 }

 function ShoppingCartRemoveItem(){

    var cartList = document.getElementById("cart_list");
    var selectedIndex = cartList.selectedIndex;
    var name = cartList[selectedIndex].value;
    var caption = PList.names[name];
    var cost = PList.costs[name];
    var findString = caption + " " + cost.toString()+"р";
    //cartList[selectedIndex] 
    var tail = cartList[selectedIndex].text.slice(findString.length); 
    var posPiecesName = tail.indexOf('шт');
    var valuePieces = Number(tail.slice(0, posPiecesName));
    if(valuePieces > 1){
        valuePieces = valuePieces - 1;
        caption = findString + " " + valuePieces.toString() + " шт = " + (cost * valuePieces).toFixed(2).toString() + "р";
        var updateOption = new Option(caption,name);

        cartList[selectedIndex] = updateOption; 
    }
    else
        cartList[selectedIndex] = null;

    if(cartList.length == 0){
        document.getElementById("RemoveItem").style.display = 'none';
        document.getElementById("removeType").style.display = 'none';
        document.getElementById("clearCart").style.display = 'none'; 
    }
    document.getElementById("cartAmount").text = (calcCart() + "р"); 
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
    document.getElementById("cartAmount").text = (calcCart() + "р"); 
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

    document.getElementById("cartAmount").text = "0.00р";
 }

 function calcCart(){
    var cartList = document.getElementById("cart_list");
    var cartListLenght = cartList.length;
    var cartAmount = 0;

    for(var i=0;i<cartListLenght;i++){
        var name = cartList[i].value;
        var caption = PList.names[name];
        var cost = PList.costs[name];
        var findString = caption + " " + cost.toString()+"р";
        var tail = cartList[i].text.slice(findString.length); 
        var posPiecesName = tail.indexOf('шт');
        var valuePieces = Number(tail.slice(0, posPiecesName));
        var lineAmount = (cost * valuePieces).toFixed(2);
        
        cartAmount = cartAmount + lineAmount;
    }
    return cartAmount;
 }
/*
function Script_task02() {
    //Инициализируем переменные
    var result = "";
    var i=0;

    while(i<=100){

        if(NumIsSimple(i))
            result += i.toString() + " ";
        i++;
    }

    //Вывод результата на html-страницу
    document.getElementById("task01_text01").innerHTML = ("Простые числа от 0 до 100 :<br><br>" + result);
}*/