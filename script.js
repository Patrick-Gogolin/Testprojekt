let menus = [
    {
      image: ['img/beliebt-sektion.jpg'],
      add: 'img/hinzufugen.png',
      category: "Beliebte Gerichte",
      meals: [
        "Pizza al Tartufo Nero",
        "Pizza Tonno",
        "Pizza Capricciosa",
      ],
      descriptions: [
        "32cm Pizza mit Schwarzen Trüffeln, weißer Soße, Mozarella und Trüffelöl",
        "32cm Pizza mit San Marzano Tomaten, Mozarella, Thunfisch, Kapern, Basilikum und Cherrytomaten",
        "32cm Pizza mit San Marzano Tomaten, Mozarella, Cotto-Schinken, Plizen, schwarzen Oliven und Artischocken",
      ],
      prices: [24.99, 18.99, 17.99],
    },
    {
      image: ['img/pizza-3007395_1280.jpg'],
      add: 'img/hinzufugen.png',
      category: "Pizzen",
      meals: [
        "Pizza Napoli",
        "Pizza Bomba",
        "Pizza Quattro Formaggi",
      ],
      descriptions: [
        "32cm Pizza mit San Marzano Tomaten, Mozarella, Anschovis und Kapern ",
        "32cm Pizza mit San Marzano Tomaten, Mozarella, Salami Piccante, Chilli und Jalapenos",
        "32cm Pizza mit Mozarella, Gorgozolla, Taleggio und Grana Padano",
      ],
      prices: [13.99, 14.99, 15.99],
    },
    {
      image: ['img/pasta-3547078_1280.jpg'],
      add: 'img/hinzufugen.png',
      category: "Pasta",
      meals: ["Aglio e Olio", "Carbonara", "Lasagna e Via"],
      descriptions: [
        "Spaghetti mit Knoblauch, Petersilie, Parmesan, Olivenöl und einer Chilischote  ",
        "Spaghetti mit einer delikaten Cremesoße mit Speck, abgerundet mit Petersilie und Parmesan",
        "San Marzano Tomaten, Rinderragu, Nudelblätter und Parmesan ",
      ],
      prices: [11.99, 12.99, 13.99],
    },
    {
      image: ['img/dessert-1786311_1280.jpg'],
      add: 'img/hinzufugen.png',
      category: "Desserts",
      meals: [
        "Hausgemachtes Tiramisu",
        "Vanille-Käsekuchen mit Creme",
        "Gebackene Banane",
      ],
      descriptions: [
        "In Espresso und Amaretto-Likör getränkter Biskuitkuchen, Mascarpone-Käsecreme und Milchschokolade",
        "Vanille-Käsekuchen auf Mürbeteigboden mit Nüssen, Ahornsirup und Bratapfelscheiben",
        "In Tempura gebackene Banane, gesalzene Karamellsauce, Vanilleeis, weiße Schokoladensauce",
      ],
      prices: [7.99, 8.99, 6.99],
    },
    {
        image: ['img/glass-1206584_1280.jpg'],
        add: 'img/hinzufugen.png',
        category: "Getränke",
        meals: [
          "Coca-Cola 0,25 ML",
          "Tiger Beer 0,33 L",
          "Bananenweizen 0,5 L",
        ],
        descriptions: [
          "Der Klassiker, eisgekühlt und in der Glasflasche",
          "Das perfekte Bier für die etwas schärferen Gerichte. Frisch aus Singapur und natürlich eiskalt",
          "Super leckeres eiskaltes Bananenhefeweizen",
        ],
        prices: [2.99, 3.99, 4.99],
      },
  ];

  let dishes = []; // Arrays für die Gerichte, die Preise und die Mengen
  let prices = [];
  let amounts = [];
  let singlePriceDishes = [];

  load();

  function render() { // rendert das Menu
    let content = document.getElementById('render-menu'); 
    content.innerHTML = '';

    for (let i = 0; i < menus.length; i++) { 
        let menu = menus[i];
        content.innerHTML += generateMenusHtml(i, menu);
        
    for (let j = 0; j < menu['meals'].length; j++) {
        let mealContent = document.getElementById(`dishes${i}`);
        mealContent.innerHTML += generateDishesHtml(j, menu, i);
    }
    }
}

  function addToBasket(i, j) { // Funktion zum Hinzufügen in den Basket
    let menu = menus[i];
    let dish = menu['meals'][j]; // menu['meals][j] ist das Gericht in menu an der Stelle i mit dem Schlüssel 'meals' -> also ein String 
    let dishIndex = dishes.indexOf(dish); // Ergibt am ende eine Nummmer
    if (dishIndex === -1 ) {
        ifStatementIfBasketEmpty(j, menu);
    }
    else if (amounts[dishIndex] === 10) {
        alert("Bitte kontaktieren Sie uns für größere Bestellungen telefonisch !");
    }
    else {
        elseStatementIfDishAlreadyInBasket(j, menu, dishIndex);
    }
    renderBasket();
    mobileBasketPriceCounter();
    save();
}

function ifStatementIfBasketEmpty(j, menu) { // Hilfsfuntion wenn Basket Gericht noch nicht im Basket
    dishes.push(menu['meals'][j]);
    prices.push(menu['prices'][j]);
    singlePriceDishes.push(menu['prices'][j]);
    amounts.push(1);
}

function elseStatementIfDishAlreadyInBasket(j, menu, dishIndex) { // Hilfsfunktion, wenn Gericht schon im Basket
    amounts[dishIndex]++;
    prices[dishIndex] += menu['prices'][j]; // += sorgt für die Addierung und Gleichzeitig für das Speichern, des Wertes. Nur + wäre hier nicht ausreichend
    prices[dishIndex] = parseFloat(prices[dishIndex].toFixed(2))  //speichert die Variable prices[dishIndex] als Zahl und rundet es auf zwei nachkommazahlen

}

  function renderBasket() { // Darstellnung des Warenkorbs
    let content = document.getElementById('amount-dish-price-container');
    let sumToPay = document.getElementById('total-sum-container');
    let totalSum = totalSumBasket();
    let endSumFinal = endSumNumber();
    content.innerHTML = '';

    content.innerHTML += /*html*/`
    <h1>Warenkorb</h1>`

    if (dishes.length === 0) {
        sumToPay.innerHTML = '';
        content.innerHTML = pleaseAddSomethingToBasket();
    }
    else {
    for (let i = 0; i < dishes.length; i++) {
        const dish = dishes[i];
        const price = prices[i];                                                                                    
        const amount = amounts[i];
        content.innerHTML += generateBasketHtml(i, dish, price, amount);   
    }
    sumToPay.innerHTML = generateSumToPayBasket(totalSum, endSumFinal);
}
renderMobileBasket();
}

function renderMobileBasket() { // mobile Basket 
    let mobileBasketContent = document.getElementById('mobile-basket-summary');
    let mobileBasket = document.getElementById('mobile-basket'); 
    let mobileTotalSumContainer = document.getElementById('mobile-total-sum-container');
    let sumToPay = document.getElementById('total-sum-container');
    let sumToPayMobile = document.getElementById('sum-to-pay-container');
    let totalSum = totalSumBasket();
    let endSumFinal = endSumNumber();

    mobileBasketContent.innerHTML = /*html*/`
    <h1>Warenkorb</h1>`
    if (dishes.length === 0) {
        sumToPayMobile.innerHTML = '';
        mobileBasketContent.innerHTML = pleaseAddSomethingToBasket();
    }
    else {
        for (let i = 0; i < dishes.length; i++) {
            const dish = dishes[i];
            const price = prices[i];                                                                                    
            const amount = amounts[i];
            mobileBasketContent.innerHTML += generateBasketHtml(i, dish, price, amount);    
        }
        sumToPayMobile.innerHTML = generateSumToPayBasket(totalSum, endSumFinal);
    }
    
    if (dishes.length === 0){
        mobileBasket.innerHTML = /*html*/`
        <button id="open-mobile-basket" onclick="openDialog()" class="mobile-basket">Warenkorb: <span id="mobile-basket-counter">0,00 €</span></button>`
    }
    else {
        mobileBasket.innerHTML = /*html*/`
        <button  id="open-mobile-basket" onclick="openDialog()" class="mobile-basket">Warenkorb: <span id="mobile-basket-counter">${endSumFinal} €</span></button>`
    }

}

function endSumNumber() {
    let totalSum = totalSumBasket();
    let totalSumWithDot = totalSum.replace(",", ".");
    let totalSumNumber = parseFloat(totalSumWithDot);
    let endSumTotal = totalSumNumber + 2.99;
    let endSumFinal = parseFloat(endSumTotal.toFixed(2)).toString().replace('.',',');

    return endSumFinal;
}

function renderOrderConfirmation() {
    let content = document.getElementById('amount-dish-price-container');
    let mobileBasketContent = document.getElementById('mobile-basket-summary');
    
    content.innerHTML = generateOrderConfirmationHtml();
    mobileBasketContent.innerHTML = generateOrderConfirmationHtml();
}

function totalSumBasket() {
    let sum = 0;

    for (let i = 0; i < prices.length; i++) {
      sum += prices[i];
    }
    
    sum = parseFloat(sum.toFixed(2)).toString().replace('.',','); // um den Punkt durch ein Komma zu ersetzen muss die Zahl (parseFloat) wieder in einen String (toString) umgewandelt werden
     
    return sum;
}

function endSumTotal() {
    let totalSum = totalSumBasket();
    let totalSumWithDot = totalSum.replace(",", ".");
    let totalSumNumber = parseFloat(totalSumWithDot);
    let endSumTotal = totalSumNumber + 2.99;
    let endSumFinal = parseFloat(endSumTotal.toFixed(2)).toString().replace('.',',');

    return endSumFinal;
}

function addDish(i) {
    if ( amounts[i] === 10) {
        alert("Bitte kontaktieren Sie uns für größere Bestellungen telefonisch !")
    }
    else {
        amounts[i]++;
        prices[i] += singlePriceDishes[i];
    } 

    renderBasket();
    save();
}

function reduceDish(i) {
    if (amounts[i] === 1) {
        prices.splice(i,1);
        amounts.splice(i,1);
        dishes.splice(i,1);
        singlePriceDishes.splice(i,1);
    }
    else {
        amounts[i]--;
        prices[i] -= singlePriceDishes[i];
    }

    renderBasket();
    save();
}

function deleteDishComplete(i) {
        prices.splice(i,1);
        amounts.splice(i,1);
        dishes.splice(i,1);
        singlePriceDishes.splice(i,1);
        renderBasket();
        save();
}

function sendOrder() {
    let totalSum = totalSumBasket();
    let totalSumWithDot = totalSum.replace(",", ".");
    let totalSumNumber = parseFloat(totalSumWithDot);
    let totalSumContainer =  document.getElementById('total-sum-container');
    let mobileBasketContent = document.getElementById('sum-to-pay-container');
    if (totalSumNumber < 19.99) {
        alert("Sie liegen leider noch unter dem Mindestbestellwert");
    }
    else {
    totalSumContainer.innerHTML = '';
    mobileBasketContent.innerHTML = '';
    renderOrderConfirmation();
    amounts.length = 0;
    dishes.length = 0;
    prices.length = 0;
    singlePriceDishes.length = 0;
    }
    save();
}

function filterNames() {
    let search = document.getElementById('search').value.toLowerCase().trim();

    let content = document.getElementById('render-menu'); 
    content.innerHTML = '';

    for (let i = 0; i < menus.length; i++) {
        let menu = menus[i];
    for (let j = 0; j < menu['meals'].length; j++) {
        let nameOfMeal = menu['meals'][j].toLowerCase();

        if (nameOfMeal.includes(search)) {
            content.innerHTML += showSearchResult(i, menu, j);
        }
    }
    }
}

 function renderMenuIfNoInput() {
    let search = document.getElementById('search').value.toLowerCase().trim();
  
    if (search === '') {
        render();
    }
}

function mobileBasketPriceCounter() {
    let counter = document.getElementById("mobile-basket-counter");
    let sum = 0;

    for (let i = 0; i < prices.length; i++) {
        sum += parseFloat(prices[i]);
    }
    
    let totalSum = sum + 2.99;

    counter.innerHTML = /*html*/` ${totalSum} €`
    
    renderBasket();
}

  function openDialog() {
    document.getElementById('dialog').classList.remove('d-none');
    document.getElementById('mobile-basket').classList.add('d-none');
}

  function closeDialog() {
    document.getElementById('dialog').classList.add('d-none');
    document.getElementById('mobile-basket').classList.remove('d-none');
}

function save() {
    let dishesAsText = JSON.stringify(dishes);
    localStorage.setItem('dishes', dishesAsText); 
    let pricesAsText = JSON.stringify(prices);
    localStorage.setItem('prices', pricesAsText); 
    let singlePriceDishesAsText = JSON.stringify(singlePriceDishes);
    localStorage.setItem('singlePriceDishes', singlePriceDishesAsText);
    let amountsAsText = JSON.stringify(amounts);
    localStorage.setItem('amounts', amountsAsText);

}

function load() {
    let dishesAsText = localStorage.getItem('dishes');
    let pricesAsText = localStorage.getItem('prices');
    let amountsAsText = localStorage.getItem('amounts');
    let singlePriceDishesAsText = localStorage.getItem('singlePriceDishes');
  
    if (dishesAsText) {
    dishes = JSON.parse(dishesAsText);
    prices = JSON.parse(pricesAsText);
    amounts = JSON.parse(amountsAsText);
    singlePriceDishes= JSON.parse(singlePriceDishesAsText);
    }
}
