function Script03(blockName){
    var myNumber = 1000;
    var myString = "108";
    var result = myNumber + myString;

    //Вывод результата на html-страницу
    document.getElementById(blockName).style.display = 'block';
    document.getElementById("text_03_01").innerHTML = (result);
    document.getElementById("text_03_02").innerHTML = (typeof(result));
}
