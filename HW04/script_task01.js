//Объект содержащий разложение числа на цифры
class numberRankObject{

    constructor(num) {
        if (num > 999) {
            throw new Error("Число должно быть меньше лиюо равно 999");
        } else if (num < 0) {
            throw new Error("Число должно быть больше 0");
        } else if (!Number.isInteger(num)) {
            throw new Error("Число должно быть целым");
        }
        else{
            let numString = (String(num)).split('').reverse().join('');

            //Разбор по разрядам на цифры, с заменой отсутствующих на 0
            this.units = (typeof numString[0] === 'undefined' ) ? 0 : numString[0];
            this.tens= (typeof numString[1] === 'undefined' ) ? 0 : numString[1];
            this.hundreds = (typeof numString[2] === 'undefined' ) ? 0 : numString[2];
        };
    }

    //Переопределение метода toString
    toString() {
        return ("{\' единицы \': " + this.units + ", \' десятки \': " + this.tens + ", \' сотни \': " + this.hundreds + "}");
    }

}

function Script_task01(){
    let num = document.getElementById("inputNumber").valueAsNumber;//Разбираемое число
    let objFromNum; //Здесь будет содержаться итоговый объект
    let lineResult; //Результат в текстовом виде
    
    try {
        objFromNum = new numberRankObject(num); 
        lineResult = objFromNum.toString();
    } catch (error) {
        lineResult = error.message;
    }
     
    document.getElementById("task01_text01").innerHTML = (lineResult);
    console.log(lineResult);
}