let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];//Список букв для подписей клеток

//Рисование шахматной доски
function DrawBoard() {
    let board = document.getElementById("chessBoard");
    clearItem(board);

    var table = document.createElement("table");
    table.className = "chess-board";

    //Создаём игровое поле
    var field = document.createElement("field");
    table.appendChild(field);
    for(var i = 0; i < 10; i++) {
        var tr = document.createElement('tr');
        
        for (var j = 0; j < 10; j++){
            
            switch (true) {
                case (i === 0 || j === 0 || i === 9 || j === 9)://Надписи 
                    var cell = document.createElement('th')
                    break;
                case (i > 0 && i < 9 && j > 0 && j < 9)://Игровые клетки
                    var cell = document.createElement('td')

                    //Четные - белые, нечетные - черные
                    if ((i + j) % 2 === 0) {
                        cell.className = "white";
                    } else {
                        cell.className = "black";
                    }

                    //Записываем "адрес" клетки
                    cell.id = (letters[j - 1] + (9 - i));
                    break;
            }

            //Номера
            if (i > 0 && i < 9) {
                cell.innerHTML = (j === 0 || j=== 9) ? (9 - i)    : ''
            }
            //Буквы
            if (j > 0 && j < 9) {
                cell.innerHTML = (i === 0 || i=== 9) ? letters[j - 1] : ''
            }

            tr.appendChild(cell);
        }
        field.appendChild(tr);
    }
    board.appendChild(table);
}

//Размещение фигур на доске как буквы
function PlaceFiguresAsLetters() {
    PlaceFigures(false);
}

//Размещение фигур на доске как картинки
function PlaceFiguresAsPictures() {
    PlaceFigures(true);
}

//Размещение фигур на доске
function PlaceFigures(asPicture) {
    DrawBoard();

    let cellLabel = "";
    let isWhite = true;

    //Пешки
    for (let i = 0; i < 8; i++){
        cellLabel = letters[i] + "2";
        PlaceFigure(cellLabel, "P", isWhite, asPicture);
        cellLabel = letters[i] + "7";
        PlaceFigure(cellLabel, "P", !isWhite, asPicture);
    }

    //Остальные фигуры
    let row = 1;
    do {
        cellLabel = "A" + row;
        PlaceFigure(cellLabel, "R", isWhite, asPicture);
        cellLabel = "B" + row;
        PlaceFigure(cellLabel, "N", isWhite, asPicture);
        cellLabel = "C" + row;
        PlaceFigure(cellLabel, "B", isWhite, asPicture);
        cellLabel = "D" + row;
        PlaceFigure(cellLabel, "Q", isWhite, asPicture);
        cellLabel = "E" + row;
        PlaceFigure(cellLabel, "K", isWhite, asPicture);
        cellLabel = "F" + row;
        PlaceFigure(cellLabel, "B", isWhite, asPicture);
        cellLabel = "G" + row;
        PlaceFigure(cellLabel, "N", isWhite, asPicture);
        cellLabel = "H" + row;
        PlaceFigure(cellLabel, "R", isWhite, asPicture);

        isWhite = !isWhite;
        row = 8;
    } while (!isWhite)

    if(!asPicture)
        document.getElementById("letterNote").style.display = 'block';
    else
        document.getElementById("letterNote").style.display = 'none';
}

//Размещаем фигуру на доске
function PlaceFigure(cellLabel, figure, isWhite, asPicture) {
    let cell = document.getElementById(cellLabel);
    if (asPicture) {
        let picture = document.createElement('img');
        let fileName = "./png/" + figure + (isWhite ? "White" : "Black") + ".png";
        picture.src = fileName;
        cell.appendChild(picture);    
    } 
    else {
        let text = document.createElement('span');
        text.innerHTML = figure;
        text.className = isWhite ? "white-figure" : "black-figure";
        cell.appendChild(text);    
    }
}

//Удаление всех дочерних элементов внутри указанного.
function clearItem(item) {
    while (item.firstChild) {
        item.firstChild.remove();
    }
}