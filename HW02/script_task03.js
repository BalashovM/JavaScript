//Возвращает случайное число в заданном диапазоне
function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Script_task03() {
    
    //Заполняем перемнные
    var a = rnd(-15, 15);
    var b = rnd(-15, 15);

    var result;

    switch ((a >= 0) + (b >= 0)) {
        case 2:
            lineCompare = "Переменные положительные, вычисляем разность.";
            result = Math.abs(a - b);
            break;
        case 1:
            lineCompare = "Переменные разных знаков, вычисляем сумму.";
            result = a + b;
            break;
        case 0:
            lineCompare = "Переменные отрицательные, вычисляем произведение.";
            result = a * b;
            break;

    }

    //Вывод результата на html-страницу
    document.getElementById("task03_text01").innerHTML = ("Значение переменной a = " + a);
    document.getElementById("task03_text02").innerHTML = ("Значение переменной b = " + b);
    document.getElementById("task03_text03").innerHTML = (lineCompare);
    document.getElementById("task03_text04").innerHTML = ("Результат " + result);

}