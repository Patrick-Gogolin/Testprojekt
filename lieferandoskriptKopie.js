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

  function render() {
    let content = document.getElementById('render-menu'); 
    content.innerHTML = '';

    for (let i = 0; i < menus.length; i++) { // Menus.length = 5 
        let menu = menus[i];
        content.innerHTML += /*html*/`
        <div class="category-headline-and-image" id="category-headline${i}"> <!-- Div Container wird erstellt mit Überschrift und Bild  -->
            <img src="${menu['image']}" alt="info"> <!-- Jeweils das Bild aus 'image' an der Stelle menus[i] -->
            <h3>${menu['category']}</h3> <!-- Jeweils die Überschrift aus 'image' an der Stelle menus[i] -->
        </div>
        <div class="dishes" id="dishes${i}">
        </div>`

    
    for (let j = 0; j < menu['meals'].length; j++) {
        let mealContent = document.getElementById(`dishes${i}`);
        mealContent.innerHTML += /*html*/`
        <div class="dish">
            <div class="dish-title-and-add-container">
                <h3>${menu['meals'][j]}</h3>
                <img onclick="addToBasket(${i}, ${j})" src="${menu['add']}" alt="Hinzufügen">
            </div>
            <div>
                <p>${menu['descriptions'][j]}</p>
                <p class="price">${menu['prices'][j].toFixed(2).replace('.',',')} €</p>
            </div>
        </div>`
        }
    }

    save();
}

  function addToBasket(i, j) {
    let menu = menus[i];
    let dish = menu['meals'][j]; // menu['meals][j] ist das Gericht in menu an der Stelle i mit dem Schlüssel 'meals' -> also ein String 
    let dishIndex = dishes.indexOf(dish); // Ergibt am ende eine Nummmer
    if (dishIndex === -1 ) {
        dishes.push(menu['meals'][j]);
        prices.push(menu['prices'][j]);
        singlePriceDishes.push(menu['prices'][j]);
        amounts.push(1);
    }
    else if(amounts[dishIndex] === 10) {
        alert("Bitte kontaktieren Sie uns für größere Bestellungen telefonisch !");
    }

    else {
        amounts[dishIndex]++;
        prices[dishIndex] += menu['prices'][j]; // += sorgt für die Addierung und Gleichzeitig für das Speichern, des Wertes. Nur + wäre hier nicht ausreichend
        prices[dishIndex] = parseFloat(prices[dishIndex].toFixed(2))  //speichert die Variable prices[dishIndex] als Zahl und rundet es auf zwei nachkommazahlen
    }

    renderBasket();
    mobileBasketPriceCounter();
    save();
}

  function renderBasket() {
    let mobileBasketContent = document.getElementById('mobile-basket-summary');
    let mobileBasket = document.getElementById('mobile-basket'); 
    let mobileTotalSumContainer = document.getElementById('mobile-total-sum-container');
    let content = document.getElementById('amount-dish-price-container');
    let sumToPay = document.getElementById('total-sum-container');
    let sumToPayMobile = document.getElementById('sum-to-pay-container');
    let totalSum = totalSumBasket();
    let totalSumWithDot = totalSum.replace(",", ".");
    let totalSumNumber = parseFloat(totalSumWithDot);
    let endSumTotal = totalSumNumber + 2.99;
    let endSumFinal = parseFloat(endSumTotal.toFixed(2)).toString().replace('.',',');
    content.innerHTML = '';

    mobileBasketContent.innerHTML = /*html*/`
    <h1>Warenkorb</h1>`
    if(dishes.length === 0) {
        sumToPayMobile.innerHTML = '';
        mobileBasketContent.innerHTML = /*html*/`
        <div class="empty-basket-container">
            <div class="empty-basket-content-container">
                <h3>Warenkorb</h3>
                <img src="img/icons8-shopping-bag-80.png" alt="Warenkorb">
                <div>
                    <p>Fügen Sie ein Gericht hinzu, <br> um eine Bestellung aufgeben zu können. <br>
                    <b>Unser Mindestbestellwert liegt exklusive Versandkosten bei 19,99€</b></p>
                </div>
            </div>
        </div>`
    }
    else {
        for (let i = 0; i < dishes.length; i++) {
            const dish = dishes[i];
            const price = prices[i];                                                                                    
            const amount = amounts[i];
            mobileBasketContent.innerHTML += /*html*/`
            <div class="amount-dish-price-flex-container">
                <div class="added-dish-container">
                    <b><p>${amount} x ${dish}:</b> <span><b>${price.toFixed(2).replace('.',',')} €</span>
                </div>
                <div class="add-remove-delete-container">
                    <div class="edit-sign">
                        <img onclick="addDish(${i})" src="img/icons8-addition-24.png" alt="info">
                    </div>
                    <div class="edit-sign">
                        <img onclick="reduceDish(${i})" src="img/icons8-minus-24.png" alt="info">
                    </div>
                    <div class="edit-sign">
                        <img onclick="deleteDishComplete(${i})" src="img/icons8-trash-24.png" alt="info">
                    </div>
                </div>
            </div>`     
        }
        sumToPayMobile.innerHTML = /*html*/`
        <div class="seperator">
        </div>
        <div class="sum-to-pay-container">
            <p>Zwischensumme =</p>
            <span>${totalSum} €</span>
        </div>
        <div class="sum-to-pay-container">
            <p>Lieferkosten =</p>
            <span>2,99 €</span>
        </div>
        <div class="sum-to-pay-container">
            <p>Endsumme =</p>
            <span>${endSumFinal} €</span>
        </div>
        <div class="order-button">
            <button onclick="sendOrder()">Jetzt Bestellen</button>
        </div>`
    }

    
    if(dishes.length === 0){
        mobileBasket.innerHTML = /*html*/`
        <button id="open-mobile-basket" onclick="openDialog()" class="mobile-basket">Warenkorb: <span id="mobile-basket-counter">0,00 €</span></button>`

    }
    else{
        mobileBasket.innerHTML = /*html*/`
        <button  id="open-mobile-basket" onclick="openDialog()" class="mobile-basket">Warenkorb: <span id="mobile-basket-counter">${endSumFinal} €</span></button>`
    }

    content.innerHTML += /*html*/`
    <h1>Warenkorb</h1>`

    if(dishes.length === 0) {
        sumToPay.innerHTML = '';
        content.innerHTML = /*html*/`
        <div class="empty-basket-container">
            <div class="empty-basket-content-container">
                <h3>Warenkorb</h3>
                <img src="img/icons8-shopping-bag-80.png" alt="Warenkorb">
                <div>
                    <p>Fügen Sie ein Gericht hinzu, <br> um eine Bestellung aufgeben zu können. <br>
                    <b>Unser Mindestbestellwert liegt exklusive Versandkosten bei 19,99€</b></p>
                </div>
            </div>
        </div>`
    }
    else {
    for (let i = 0; i < dishes.length; i++) {
        const dish = dishes[i];
        const price = prices[i];                                                                                    
        const amount = amounts[i];
        content.innerHTML += /*html*/`
        <div class="amount-dish-price-flex-container">
            <div class="added-dish-container">
                <b><p>${amount} x ${dish}:</b> <span><b>${price.toFixed(2).replace('.',',')} €</span>
            </div>
            <div class="add-remove-delete-container">
                <div class="edit-sign">
                    <img onclick="addDish(${i})" src="img/icons8-addition-24.png" alt="info">
                </div>
                <div class="edit-sign">
                    <img onclick="reduceDish(${i})" src="img/icons8-minus-24.png" alt="info">
                </div>
                <div class="edit-sign">
                    <img onclick="deleteDishComplete(${i})" src="img/icons8-trash-24.png" alt="info">
                </div>
            </div>
        </div>`     
    }

    sumToPay.innerHTML = /*html*/`
    <div class="seperator">
    </div>
    <div class="sum-to-pay-container">
        <p>Zwischensumme =</p>
        <span>${totalSum} €</span>
    </div>
    <div class="sum-to-pay-container">
        <p>Lieferkosten =</p>
        <span>2,99 €</span>
    </div>
    <div class="sum-to-pay-container">
        <p>Endsumme =</p>
        <span>${endSumFinal} €</span>
    </div>
    <div class="order-button">
        <button onclick="sendOrder()">Jetzt Bestellen</button>
    </div>`
}
save();
}

function renderOrderConfirmation() {
    let content = document.getElementById('amount-dish-price-container');
    let mobileBasketContent = document.getElementById('mobile-basket-summary');
    content.innerHTML = /*html*/`
        <div class="empty-basket-container">
            <div class="empty-basket-content-container">
                <h3>Vielen Dank für ihre Bestellung !</h3>
                <img src="img/richtig.png" alt="Warenkorb">
                <div>
                    <p>Wir bereiten ihre Bestellung nun mit <b>Sorgfalt</b>,<br> <b>Liebe</b> und <b>frischen Zutaten</b> für Sie zu!</p>
                </div>
                <div class="order-again">
                    <button onclick="renderBasket()">Etwas vergessen? Einfach Nachbestellen! Die Lieferkosten erstatten wir Ihnen dann natürlich</button>
            </div>
        </div>`
     mobileBasketContent.innerHTML = /*html*/`
     <div class="empty-basket-container">
         <div class="empty-basket-content-container">
             <h3>Vielen Dank für ihre Bestellung !</h3>
             <img src="img/richtig.png" alt="Warenkorb">
             <div>
                 <p>Wir bereiten ihre Bestellung nun mit <b>Sorgfalt</b>,<br> <b>Liebe</b> und <b>frischen Zutaten</b> für Sie zu!</p>
             </div>
             <div class="order-again">
                 <button onclick="renderBasket()">Etwas vergessen? Einfach Nachbestellen! Die Lieferkosten erstatten wir Ihnen dann natürlich</button>
         </div>
     </div>`

}

function totalSumBasket() {
    let sum = 0;

    for (let i = 0; i < prices.length; i++) {
      sum += prices[i];
        
    }
     sum = parseFloat(sum.toFixed(2)).toString().replace('.',','); // um den Punkt durch ein Komma zu ersetzen muss die Zahl (parseFloat) wieder in einen String (toString) umgewandelt werden

    return sum;
}

function addDish(i) {
    if( amounts[i] === 10) {
        alert("Bitte kontaktieren Sie uns für größere Bestellungen telefonisch !")
    }
    else {
        amounts[i]++;
        prices[i] += singlePriceDishes[i];

    } // Hier weiter machen: Wie erhöhen wir dasselbe Gericht jetzt nochmal bzw. den Preisen, noch ein Array?s

    renderBasket();
    save();

}

function reduceDish(i) {
    if(amounts[i] === 1) {
        prices.splice(i,1);
        amounts.splice(i,1);
        dishes.splice(i,1);
        singlePriceDishes.splice(i,1);
    }
    else {
        amounts[i]--;
        prices[i] -= singlePriceDishes[i];
    } // Hier weiter machen: Wie erhöhen wir dasselbe Gericht jetzt nochmal

    renderBasket();

}

function deleteDishComplete(i) {
        prices.splice(i,1);
        amounts.splice(i,1);
        dishes.splice(i,1);
        singlePriceDishes.splice(i,1);
        renderBasket();
        save();
    }


  function getMenuIndex() {
    let menu = menu[i];
    let dish = menu['meals'][j]; 
    let result = dishes.indexOf(dish); // Hilfsfunktion, die die index Stelle eines Strings(menu) aus dem Array menus in die Variable result speichert
    if (result >= 0) { // wenn der Indexwert größer oder gleich 0 ist, also im Array enthalten ist, soll er den Wert returnen z.B. 1 oder 2
      return result
    }
    else { // falls der Wert nicht im Array ist, soll er -1 returnen
      return -1;
    }

}

function sendOrder() { // If Abfrage starten, ob Bestellwert über 19,99 € liegt 
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
    console.log(search);

    for (let i = 0; i < menus.length; i++) {
        let menu = menus[i];
        

    for (let j = 0; j < menu['meals'].length; j++) {
        let nameOfMeal = menu['meals'][j].toLowerCase();

        if(nameOfMeal.includes(search)) {
            content.innerHTML += /*html*/`
             <div class="dish">
            <div class="dish-title-and-add-container">
                <h3>${menu['meals'][j]}</h3>
                <img onclick="addToBasket(${i}, ${j})" src="${menu['add']}" alt="Hinzufügen">
            </div>
            <div>
                <p>${menu['descriptions'][j]}</p>
                <p class="price">${menu['prices'][j].toFixed(2).replace('.',',')} €</p>
            </div>
        </div>`
            }
        }
     }
}

 function renderMenuIfNoInput() {
    let search = document.getElementById('search').value.toLowerCase().trim();
  
    if(search === '') {
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

    counter.innerHTML = /*html*/` ${totalSum } €`
    
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
    let dishesAsText = JSON.stringify(dishes); // verändert das Array names in einen Text, um es in den local Storage speichern zu können
    localStorage.setItem('dishes', dishesAsText); //speichert etwas in den local Storage
    let pricesAsText = JSON.stringify(prices);
    localStorage.setItem('prices', pricesAsText); //'names' ist der Schlüssel, um das nachher wieder laden zu können
    let singlePriceDishesAsText = JSON.stringify(singlePriceDishes);
    localStorage.setItem('singlePriceDishes', singlePriceDishesAsText); //'names' ist der Schlüssel, um das nachher wieder laden zu können
    let amountsAsText = JSON.stringify(amounts);
    localStorage.setItem('amounts', amountsAsText); //'names' ist der Schlüssel, um das nachher wieder laden zu können

}

function load() {
    let dishesAsText = localStorage.getItem('dishes');
    let pricesAsText = localStorage.getItem('prices');
    let amountsAsText = localStorage.getItem('amounts');
    let singlePriceDishesAsText = localStorage.getItem('singlePriceDishes');
  
    if ( dishesAsText) {
    dishes = JSON.parse(dishesAsText);
    prices = JSON.parse(pricesAsText);
    amounts = JSON.parse(amountsAsText);
    singlePriceDishes= JSON.parse(singlePriceDishesAsText);
    }
  }
