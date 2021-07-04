//Возвращает случайное число в заданном диапазоне
function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Возвращает результат возведения в степень
function power(val, pow){
    if (pow>1){
        return val*power(val,--pow);
    } else {
        return val;
    }
}

function Script_task08() {
    //Заполняем перемнные
    var x = rnd(0, 20);
    var y = rnd(0, 5);
 
    //Вывод результата на html-страницу
    document.getElementById("task08_text01").innerHTML = ("Число 'x'= " + x + ", в степени 'y' = " + y );
    document.getElementById("task08_text02").innerHTML = ("Результат возведения в степень = " + power(x,y));

}