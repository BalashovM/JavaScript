function Script01(blockName){
    var Tc = prompt("Введите значение температуры в градусах Цельсия: ", "0");
    if(!isNaN(Tc)){
        Tc = parseFloat(Tc);
        var Tf = (9/5) * Tc + 32;
        alert ("Значение температуры по Фаренгейту: " + Tf);

        //Вывод результата на html-страницу
        document.getElementById(blockName).style.display = 'block';
        document.getElementById("text_01_01").innerHTML = ("Значение температуры по Цельсию: " + Tc);
        document.getElementById("text_01_02").innerHTML = ("Значение температуры по Фаренгейту: " + Tf);
    }else{
        alert ("Введены неверные данные!")
    }

}