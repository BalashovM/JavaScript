function Script02(blockName){
var admin;
var name = prompt("Введите имя: ");

admin = name;

//Вывод результата на html-страницу
document.getElementById(blockName).style.display = 'block';
document.getElementById("text_02_01").innerHTML = (name);
document.getElementById("text_02_02").innerHTML = (admin);

}
