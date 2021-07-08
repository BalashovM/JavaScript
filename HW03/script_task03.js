var totalAmount = 0;
var lineBasket = "";

//Массив для корзины
var basket = new Array();

//Наполняем корзину
basket.push(["Яблоки", 75]);
basket.push(["Груши", 99]);

//Подсчитываем и выводим на экран
countBasketPrice();
resultOutput();

//Подсчет стоимости товаров в корзине
function countBasketPrice() {
    totalAmount = 0;

    var i = 0;
    while (i < basket.length) {
        totalAmount += basket[i][1];
        i++;
    }
}

//Добавление товара в корзину
function addGood(){
    var goodName = document.getElementById("goodName").value;
    var goodPrice = document.getElementById("goodPrice").valueAsNumber;
    basket.push([goodName, goodPrice]);
    countBasketPrice();
    resultOutput();
}

//Вывод результата на html-страницу
function resultOutput() {
    lineBasket = "";
    for (i = 0; i < basket.length; i++){
        lineBasket += "|" + basket[i][0] + " - " + basket[i][1] + " руб.<br>"
    }

    document.getElementById("task03_text01").innerHTML = (lineBasket);
    document.getElementById("task03_text02").innerHTML = (totalAmount);
}