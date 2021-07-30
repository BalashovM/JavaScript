import { Cart, Catalog, Storage, Good, GoodType, Unit, Units, GoodTypes} from './classes.js';
window.addEventListener('load', Init);

//Создаем каталог и корзину
var stock = new Storage();//Здесь будут храниться типы товаров (имитация базы данных)
var catalog = new Catalog();//Каталог содержащий товарные позиции для продажи
var cart = new Cart();//Корзина пользователя
var units = new Units();
var goodTypes = new GoodTypes();


//======== INIT ========

//Инициализация после загрузки окна
function Init() {
    //Типы товаров
    goodTypes.add(new GoodType("food","Продукты питания"));
    goodTypes.add(new GoodType("clothes","Одежда"));
    goodTypes.add(new GoodType("footwear","Обувь"));

    //Единицы измерения
    units.add(new Unit("шт",1));
    units.add(new Unit("кг", 1));
    units.add(new Unit("пара", 1));
    
    //Товары
    var goods = new Array();
    goods.push(new Good("food"      ,"Ананас"    , 120.20 , "шт"  , "food-pineapple"    ,2));
    goods.push(new Good("food"      ,"Бананы"    , 70.60  , "кг"  , "food-bananas"      ,2));
    goods.push(new Good("food"      , "Виноград" , 95.80  , "кг"  , "food-grapes"       ,2));
    goods.push(new Good("food"      , "Яблоки"   , 95.50  , "кг"  , "food-apple"        ,2));
    goods.push(new Good("clothes"   , "Рубашка"  , 250.00 , "шт"  , "clothes-shirt"     ,3));
    goods.push(new Good("clothes"   , "Брюки"    , 375.00 , "шт"  , "clothes-pants"     ,2));
    goods.push(new Good("clothes"   , "Платье"   , 790.00 , "шт"  , "clothes-dress"     ,3));
    goods.push(new Good("footwear"  , "Ботинки"  , 590.00 , "пара", "footwear-boots"    ,3));
    goods.push(new Good("footwear"  , "Красовки" , 890.00 , "пара", "footwear-sneakers" ,3));
    goods.push(new Good("footwear"  , "Туфли"    , 1050.00, "пара", "footwear-shoes"    ,3));

    //Создаем каталог
    for (const item of goods) {
        stock.addItem(item, 1);
        var unitQuantity = units.find(item.getUnit()).getQuantity();
        var randomQuantity =  rnd(1, 8)
        var stockQuantity = unitQuantity * randomQuantity;
        catalog.addItem(item,  stockQuantity);
    }

    var goodTypesRender = document.getElementById("goodTypes");
    clearItem(goodTypesRender);
    goodTypesRender.appendChild(goodTypes.render());
    goodTypesRender.addEventListener('change', ChangeGoodType);

    renderAll("none");

    //Вешаем событие на кнопку закрытия в галерее
    let closeButton = document.getElementById("close_button");
    closeButton.addEventListener('click', CloseGallery);

    window.addEventListener('keydown', ChangePictureByKeys);
}


//======== Рендер каталога и корзины на странице ========

//Перерисовывает на странице структуру каталога и корзины
function renderAll(goodType) {
    
    var catalogRender = document.getElementById("catalog");//Куда будет рендерится каталог
    var cartRender = document.getElementById("cart");//Куда будет рендерится корзина
    var buttonCartPage = document.getElementById("prev-next");

    
    clearItem(catalogRender);
    clearItem(cartRender);

    //Создаем html-объекты
   

    catalogRender.appendChild(catalog.render(goodType));
    cartRender.appendChild(cart.render());
    

    //Навешиваем на все кнопки события по клику
    //Кнопки каталога
    var allButtons = catalogRender.getElementsByTagName('input');
    for (let item of allButtons) {
        item.addEventListener('click', AddToCart);
    }
    var allGalleryClicks = catalogRender.getElementsByClassName('galleryClick');
    for (let item of allGalleryClicks) {
        item.addEventListener('click', OpenGallery);
    }

    //Кнопки корзины
    var allButtons = cartRender.getElementsByTagName('input');
    for (let item of allButtons) {
        item.addEventListener('click', RemoveFromBasket);
    }
    var allGalleryClicks = cartRender.getElementsByClassName('galleryClick');
    for (let item of allGalleryClicks) {
        item.addEventListener('click', OpenGallery);
    }

    //Кнопки действия
    var allButtons = buttonCartPage.getElementsByTagName('input');
    for (let item of allButtons) {
        item.addEventListener('click', CartPageChange);
    }
} 

//======== События ========
function ChangeGoodType(eventObj){
    
    var catalogRender = document.getElementById("catalog");
    clearItem(catalogRender);

    var selectedGoodType = document.getElementById("good_types").options;
    catalogRender.appendChild(catalog.render(selectedGoodType[selectedGoodType.selectedIndex].value));    
    
    var allButtons = catalogRender.getElementsByTagName('input');
    for (let item of allButtons) {
        item.addEventListener('click', AddToCart);
    }

    var allGalleryClicks = catalogRender.getElementsByClassName('galleryClick');
    for (let item of allGalleryClicks) {
        item.addEventListener('click', OpenGallery);
    }

}

//Событие по клику на кнопку "добавить в корзину"
function AddToCart(eventObj ) {
    let goodPosition = catalog.find(eventObj.target.id);

    if (goodPosition !== null) {
        let quantity = catalog.invokeItem(goodPosition, 1)
        cart.addItem(goodPosition.getGood(), quantity);
    }

    renderAll(goodPosition.getGood().getType());
}

//Событие по клику на кнопку "удалить из корзины"
function RemoveFromBasket(eventObj) {
    let goodPosition = cart.find(eventObj.target.id);

    if (goodPosition !== null) {
        let quantity = cart.invokeItem(goodPosition, goodPosition.quantity)
        catalog.addItem(goodPosition.getGood(), quantity);
    }
    var selectedGoodType = document.getElementById("good_types").options;

    renderAll(selectedGoodType[selectedGoodType.selectedIndex].value);
}

//Событие по клику на кнопки смены страницы корзины
function CartPageChange(eventObj){
    let buttonId = eventObj.target.id;
    //Опеределяем текущийю страницу корзины по видимости элементов
    let pageCartIsVisible = (document.getElementById("cart").style.display == "none"? false : true);
    let pageAddressIsVisible = (document.getElementById("address").style.display == "none"? false : true);
    let pageCommentsIsVisible = (document.getElementById("comments").style.display == "none"? false : true);

    if (buttonId == "next_button")
    {
        switch(true){
            case pageCartIsVisible:
                document.getElementById("prev_button").style.display = "block"; 
                document.getElementById("next_button").style.display = "block"; 
                
                document.getElementById("cart").style.display = "none";
                document.getElementById("address").style.display = "block";
                document.getElementById("comments").style.display = "none";
                break;  
            case pageAddressIsVisible:
                document.getElementById("prev_button").style.display = "block";
                document.getElementById("next_button").style.display = "none";

                document.getElementById("cart").style.display = "none";
                document.getElementById("address").style.display = "none";
                document.getElementById("comments").style.display = "block";
                break;
            //case pageCommentsIsVisible:{ }
        }
    }
    else{
        switch(true){
            //case pageCartIsVisible:{ }  
            case pageAddressIsVisible:
                document.getElementById("prev_button").style.display = "none"; 
                document.getElementById("next_button").style.display = "inline";

                document.getElementById("cart").style.display = "inline";
                document.getElementById("address").style.display = "none";
                document.getElementById("comments").style.display = "none";
                break;
            case pageCommentsIsVisible:
                document.getElementById("prev_button").style.display = "inline"; 
                document.getElementById("next_button").style.display = "inline"; 

                document.getElementById("cart").style.display = "none";
                document.getElementById("address").style.display = "inline";
                document.getElementById("comments").style.display = "none";
                break;
        }
    }
    console.log(buttonId);
}

//Открытие галереи

function OpenGallery(eventObj) {
    let goodPosition = stock.find(eventObj.target.id);
    let good = goodPosition.getGood();
    let pictureQuantity = good.getPictureQuantity();
    let pictureTag = good.getPicturePrefix();

    let modal = document.getElementById("modal");
    modal.className = "modal";

    let tumbnails = document.getElementById("tumbnails");
    tumbnails.innerHTML = "";
    for (let i = 1; i <= pictureQuantity; i++) {
        let td = document.createElement("td");
        let src = "img/gallery/small/" + pictureTag + "-" + i + ".jpg";
        let image = document.createElement("img");
        image.id = pictureTag + "-" + i;
        image.src = src;
        image.onclick = ChangeBigPictureEvent;
        td.appendChild(image);
        tumbnails.appendChild(td);
    }

    ChangeBigPicture(pictureTag + "-" + 1);

}

function ChangePictureByKeys(eventObj) {
    let keys = [37, 39];
    let modal = document.getElementById("modal");
    if (modal.className == "modal" && keys.indexOf(eventObj.keyCode !== -1)) {
        let bigPictureObj = document.getElementById("big_picture");
        let pictureTag =bigPictureObj.dataset.tag;
        let lastIndex = pictureTag.lastIndexOf("-") + 1;
        let tagNum = pictureTag.substr(lastIndex);
        let tagName = pictureTag.substr(0, lastIndex);
        let good = stock.getGoodByPicturePrefix(pictureTag.substr(0, lastIndex-1));
        let goodPictureQuantity = good.getPictureQuantity();

        switch (eventObj.keyCode) {
            case keys[0]:
                tagNum = Number.parseInt(tagNum) - 1;
                tagNum = (tagNum < 1) ? goodPictureQuantity : tagNum;
                break;
            case keys[1]:
                tagNum = Number.parseInt(tagNum) + 1;
                tagNum = (tagNum > goodPictureQuantity) ? 1 : tagNum;
                break;
            default:
                return;
        }

        pictureTag = tagName + tagNum;
        ChangeBigPicture(pictureTag);
    }
}
//Событие по клику на миниатюре в галерее
function ChangeBigPictureEvent(eventObj) {
    let pictureTag = eventObj.target.id;
    ChangeBigPicture(pictureTag);
}

//Фактическое изменение большой картинки в галерее
function ChangeBigPicture(pictureTag) {
    let bigPicture = document.getElementById("big_picture");
	bigPicture.innerHTML = "";	
    bigPicture.dataset.tag = pictureTag;
    let src = "img/gallery/big/" + pictureTag + ".jpg";
	let imageElement = document.createElement("img");
	imageElement.src = src;
	bigPicture.appendChild(imageElement);
}

//Закрытие галереи
function CloseGallery() {
    let modal = document.getElementById("modal");
    modal.className = "modal-closed";
}

//Очищает DOM элемент от всех его дочерних элементов.
function clearItem(item) {
    while (item.firstChild) {
        item.firstChild.remove();
    }
}

//Возвращает случайное число в заданном диапазоне
function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



