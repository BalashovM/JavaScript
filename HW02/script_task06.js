//Возвращает случайное число в заданном диапазоне
function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Возвращает результат математической операции двух чисел
function mathOperation(arg1, arg2, operation){
    var result;
    switch (operation){
        case 'summ':
            result = summ(arg1,arg2);
            break;
        case 'diff':
            result = diff(arg1,arg2);
            break;   
        case 'multi':
            result = multi(arg1,arg2);
            break;
        case 'div':
            result = div(arg1,arg2);
            break;   
    }
    return result;
}

function Script_task06() {
    //Заполняем перемнные
    var x = rnd(0, 20);
    var y = rnd(0, 20);
 
    //Вывод результата на html-страницу
    document.getElementById("task06_text01").innerHTML = ("Переменная 'x'= " + x + " , перменная 'y' = " + y );
    document.getElementById("task06_text02").innerHTML = ("Результат выполнения функции сложения " + mathOperation(x,y,"summ"));
    document.getElementById("task06_text03").innerHTML = ("Результат выполнения функции вычитания " + mathOperation(x,y,"diff"));
    document.getElementById("task06_text04").innerHTML = ("Результат выполнения функции умножения " + mathOperation(x,y,"multi"));
    document.getElementById("task06_text05").innerHTML = ("Результат выполнения функции деления " + mathOperation(x,y,"div"));

}