export class GoodType{
    #type;
    #name;

    constructor(type, name){
        this.#type = type;
        this.#name = name;
    }

    getType(){
        return this.#type;
    }
    getName(){
        return this.#name;
    }
}

export class GoodTypes{
    #goodTypes = new Array();
    
    find(goodType) {
        let found = null;
        for (const item of this.#goodTypes) {
            if (item.getType() === goodType) {
                found = good;
            }
        }
        return found;
    }

    //Добавление в список
    add(goodType) {
        let found = this.find(goodType.getType());
        if (found == null) {
            this.#goodTypes.push(goodType);
        }
    }

    //Удаление из списка
    remove(goodType) {
        for(var i = this.#goodTypes.length - 1; i >= 0; i--) {
            if(this.#goodTypes[i].getType() === goodType) {
               this.#goodTypes.splice(i, 1);
            }
        }
    }

    render(){

        let form = document.createElement("form");
        form.id = "formGoodTypesList";
        
        let select = document.createElement("select");
        select.id = "good_types";
        form.appendChild(select);

        let defaultElemet = document.createElement("option");
        defaultElemet.value = "none";
        defaultElemet.innerHTML = "Выберите тип товаров";
        select.append(defaultElemet);

        for (const good of this.#goodTypes) {
            let element = document.createElement("option"); 
            element.value = good.getType();
            element.innerHTML = good.getName();
            select.append(element);
        };

        return form;
    }
}

export class Unit{
    #name;
    #quantity;

    constructor(name, quantity){
        this.#name = name;
        this.#quantity = quantity;
    }

    getName(){
        return this.#name;
    }
    getQuantity(){
        return this.#quantity;
    }
}

export class Units{
    #units = new Array();

    find(unit) {
        let found = null;
        for (const item of this.#units) {
            if (item.getName() === unit) {
                found = item;
            }
        }
        return found;
    }

    //Добавление в список
    add(unit) {
        let found = this.find(unit.getName());
        if (found == null) {
            this.#units.push(unit);
        }
    }

    //Удаление из списка
    remove(unit) {
        for(var i = this.#units.length - 1; i >= 0; i--) {
            if(this.#units[i].getType() === unit) {
               this.#units.splice(i, 1);
            }
        }
    }

}

export class Good{
    #id;//ID товара
    #type;//Тип товара
    #name;//Наименование товара
    #price;//Цена за единицу товара
    #unit;//Единица измерения
    #picturePrefix//Префикс имени файлов с изображениями товара

    constructor(type, name, price, unit, picturePrefix) {
        this.#id = new Guid();
        this.#type = type;
        this.#name = name;
        this.#price = price;
        this.#unit = unit;
        this.#picturePrefix = picturePrefix;
    }

    getId() {
        return this.#id.getGuid();
    }

    getType() {
        return this.#type;
    }

    getName() {
        return this.#name;
    }

    getPrice() {
        return this.#price;
    }

    getUnit(){
        return this.#unit;
    }

    getPicturePrefix() {
        return this.#picturePrefix;
    }

}

export class GoodPosition{
    #good;
    quantity;

    constructor(good, quantity) {
        this.#good = good;
        this.quantity = quantity;
    }

    getGood() {
        return this.#good;
    }

    getTotalPrice() {
        return (this.#good.getPrice() * this.quantity);
    }

    getId() {
        return this.#good.getId();
    }
}

export class Storage{
    #goods= new Array();//Список товарных позиций

    #msgHeadingCapLegend = "Список товаров";//Заголовок таблицы
    #msgGoodsEmpty = "Пусто";//Сообщение о том что объект пуст
    #msgButton = "Убрать"//Сообщение на кнопке напротив товара
    #onlyType = false;

    constructor(msgHeadingCapLegend, msgGoodsEmpty, msgButton, onlyType) {
        this.#msgHeadingCapLegend = msgHeadingCapLegend;//Заголовок таблицы
        this.#msgGoodsEmpty = msgGoodsEmpty;//Сообщение о том что объект пуст
        this.#msgButton = msgButton//Сообщение на кнопке напротив товара
        this.#onlyType = onlyType;
    }
    
    //Подсчет стоимости товаров в списке
    countAmount() {
        let totalAmount = 0;//Сюда считается общая цена

        for (const item of this.#goods) {
            totalAmount += ( item.getTotalPrice() );
        }
        return totalAmount.toFixed(2);
    }

    //Поиск товара в списке по Id
    find(goodId) {
        let found = null;
        for (const item of this.#goods) {
            if (item.getId() === goodId) {
                found = item;
            }
        }
        return found;
    }

    //Добавление товара в список
    addItem(good, quantity) {
         let found = this.find(good.getId());
        if (found !== null && quantity > 0) {
            found.quantity += quantity;
        } else {
            this.#goods.push(new GoodPosition(good, quantity));
        }
    }

    //Извлечение товара из списка
    invokeItem(good, quantity) {
        let found = this.find(good.getId());
        if (found !== null && quantity > 0) {
            found.quantity -= quantity;
            if (found.quantity <= 0) { //На тот случай если пытались извлечь больше чем есть
                quantity += found.quantity;
                this.removeItem(good.getId());
            }
        }
        return quantity;//Возвращается реальное количество товаров, которое было извлечено
    }

    //Удаление товара из списка
    removeItem(goodId) {
        for(var i = this.#goods.length - 1; i >= 0; i--) {
            if(this.#goods[i].getId() === goodId) {
               this.#goods.splice(i, 1);
            }
        }
    }

    //Создание html-структуры
    render(goodType) {
        let table = document.createElement("table");
        table.className = "goods-list";
        let tbody = document.createElement("tbody");
        table.appendChild(tbody);

        //Заголовок
        let headingRow = document.createElement('tr');
        let headingCap = document.createElement('th');
        headingCap.innerHTML = this.#msgHeadingCapLegend;
        headingCap.colSpan = "4";
        headingRow.appendChild(headingCap);
        tbody.appendChild(headingRow);

        let legendRow = document.createElement('tr');
        let legendName = document.createElement('td');
        legendName.innerHTML = "Наименование товара";
        let LegendPrice = document.createElement('td');
        LegendPrice.innerHTML = "Цена, руб.";
        let LegendQuantity = document.createElement('td');
        LegendQuantity.innerHTML = "Кол-во";
        let LegendUnit = document.createElement('td');
        LegendUnit.innerHTML = "Единица измерения";

        legendRow.appendChild(legendName);
        legendRow.appendChild(LegendPrice);
        legendRow.appendChild(LegendQuantity);
        legendRow.appendChild(LegendUnit);
        tbody.appendChild(legendRow);    


        if (this.#goods.length === 0) {//Если в списке пусто
            let tr = document.createElement('tr');
            let cell = document.createElement('td');
            cell.innerHTML = this.#msgGoodsEmpty;
            cell.colSpan = "4";
            tr.appendChild(cell);
            tbody.appendChild(tr);
        } else { //Если в списке есть товары
            if(this.#onlyType){
                var goods =  this.#goods.filter(function (good) {
                    return good.getGood().getType() == goodType;
                });
            }
            else{
                var goods =  this.#goods;
            }

            for (const item of goods) {
                let tr = document.createElement('tr');
                let name = document.createElement('td');
                name.innerHTML = item.getGood().getName();
                name.className = "galleryClick";
                name.id = item.getId();
                let price = document.createElement('td');
                price.innerHTML = item.getGood().getPrice();
                let quantity = document.createElement('td');
                quantity.innerHTML = item.quantity;
                let unit = document.createElement('td');
                unit.innerHTML = item.getGood().getUnit();
                let buttonCell = document.createElement('td');
                let button = document.createElement('input');
                button.type = "button";
                button.value = this.#msgButton;
                button.id = item.getId();
                buttonCell.appendChild(button);

                tr.appendChild(name);
                tr.appendChild(price);
                tr.appendChild(quantity);
                tr.appendChild(unit);
                tr.appendChild(buttonCell);
                tbody.appendChild(tr);    
            }

        }
        return table;
    }

}

//Класс корзины с товарами
export class Cart extends Storage{
    constructor() {
        super("Корзина", "Корзина пуста", "Убрать из корзины", false);
    }

    render() {
        let cartRender = super.render();

        if (this.countAmount() !== 0) {
            //Подсчет полной стоимости корзины
            let totalRow = document.createElement('tr');
            let totalLabel = document.createElement('td');
            totalLabel.innerHTML = "Итого:"
            let totalPrice = document.createElement('td');
            totalPrice.innerHTML = this.countAmount();
            
            totalRow.appendChild(totalLabel);
            totalRow.appendChild(totalPrice);
            cartRender.children[0].appendChild(totalRow);
        }
        
        return cartRender;
    }
}

//Класс каталога содержащео товары
export class Catalog extends Storage{
    constructor() {
        super("Каталог товаров", "Каталог пуст", "Добавить в корзину", true);
    }

}

export class Guid{
    #guid;

    constructor() {
        this.#guid = this.generateToken();
    }

    generateToken () {
        const hex = '0123456789ABCDEF';
        let buffer = new Uint8Array(16)

        crypto.getRandomValues(buffer)

        buffer[6] = 0x40 | (buffer[6] & 0xF)
        buffer[8] = 0x80 | (buffer[8] & 0xF)

        let segments = []

        for (let i = 0; i < 16; ++i) {
            segments.push(hex[(buffer[i] >> 4 & 0xF)])
            segments.push(hex[(buffer[i] >> 0 & 0xF)])

            if (i == 3 || i == 5 || i == 7 || i == 9) {
                segments.push('-')
            }
        }

        return segments.join('')
    }

    getGuid() {
        return this.#guid;
    }
}