//Возвращает случайное число в заданном диапазоне
function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Возвращает результат суммы двух чисел
function summ(x,y){
    var result = Number(x)+Number(y);
    return result;
}
//Возвращает результат разницы двух чисел
function diff(x,y){
    var result = x-y;
    return result;
}
//Возвращает результат умножения двух чисел
function multi(x,y){
    var result = x*y;
    return result;
}
//Возвращает результат деления двух чисел
function div(x,y){
    var result = x/y;
    return result;
}

function Script_task05() {
    //Заполняем перемнные
    var x = rnd(0, 20);
    var y = rnd(0, 20);
 
    //Вывод результата на html-страницу
    document.getElementById("task05_text01").innerHTML = ("Переменная 'x'= " + x + " , перменная 'y' = " + y );
    document.getElementById("task05_text02").innerHTML = ("Результат выполнения функции сложения " + summ(x,y));
    document.getElementById("task05_text03").innerHTML = ("Результат выполнения функции вычитания " + diff(x,y));
    document.getElementById("task05_text04").innerHTML = ("Результат выполнения функции умножения " + multi(x,y));
    document.getElementById("task05_text05").innerHTML = ("Результат выполнения функции деления " + div(x,y));

}