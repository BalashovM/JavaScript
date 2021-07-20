var lineQuantity = 20;//количество строк
var symbol = "X";

//Вариант с выводом в консоль
console.log("Задание №5");

var lineConsole = "";

for (i = 0; i < lineQuantity; i++){
    lineConsole += symbol;
    console.log(lineConsole);
}

//-----------------------------------------

//Вариант с выводом на html-страницу
var lineSingle = "";
var lineResult = "";

for (i = 0; i < lineQuantity; i++){
    lineSingle += symbol;
    lineResult += lineSingle + "<br>";
}

//Вывод результата на html-страницу
document.getElementById("task05_text01").innerHTML = lineResult;
