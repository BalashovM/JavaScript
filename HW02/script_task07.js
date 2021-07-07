function Script_task07() {
    
    //Вывод результата на html-страницу
    document.getElementById("task07_text01").innerHTML = ("Результат сравнения null и 0 = " + (0==null) );
    document.getElementById("task07_text02").innerHTML = ("null - это ничто, а ничто не равно 0, поэтому результат сравнения - ложь ");
}