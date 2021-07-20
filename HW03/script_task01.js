function NumIsSimple(number){
    var isSimple = true;
    if(number<2)
        isSimple = false;
    else 
        for (let i = 2; i < number; i++) {
            if (number % i == 0) {
                isSimple = false;
                break; 
            }
        }
    
    return isSimple;
}

function Script_task01() {
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
}