function generateMenusHtml(i, menu) {
    return /*html*/` 
    <div class="category-headline-and-image" id="category-headline${i}"> <!-- Div Container wird erstellt mit Überschrift und Bild  -->
        <img src="${menu['image']}" alt="info"> <!-- Jeweils das Bild aus 'image' an der Stelle menus[i] -->
        <h3>${menu['category']}</h3> <!-- Jeweils die Überschrift aus 'image' an der Stelle menus[i] -->
    </div>
    <div class="dishes" id="dishes${i}">
    </div>`
}

function generateDishesHtml(j, menu, i) {
    return /*html*/`  
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

function pleaseAddSomethingToBasket() {
    return /*html*/`
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

function generateBasketHtml(i, dish, price, amount) {
    return /*html*/`
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

function generateSumToPayBasket(totalSum, endSumFinal) {
    return /*html*/`
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

function generateOrderConfirmationHtml() {
    return /*html*/`
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

function showSearchResult(i, menu, j) {
    return /*html*/`
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