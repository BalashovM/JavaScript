//Вариант с выводом в консоль
console.log("Задание №4");

for (i = 0; i <= 9; console.log(i++)){
}
//-----------------------------------------

//Вариант с выводом на html-страницу
var lineResult = "";

for (i = 0; i <= 9; lineResult += i++){
}

//Вывод результата на html-страницу
document.getElementById("task04_text01").innerHTML = lineResult;