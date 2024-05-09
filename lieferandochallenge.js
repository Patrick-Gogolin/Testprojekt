// Bitte hier Code eingeben
let menus = ["Pizza Salami","Pizza Hawaii","Pizza Hünchen"];
let prices = [19.99,20.99,21.99];
let amounts = [1,2,3];

function getValueFromInput(id) { // Hilfsfunktion für das auslesen beliebiger Inputfelder
  let input = document.getElementById(id).value;
  return input; // Funktion returnt den Wert aus dem Inputfeld mit der jeweiligen ID 
}

function getMenuFromInput() { // Nutzt die Hilfsfunktion getValueFromInput um den Wert aus dem Inputfeld mit der iD "menu" auszulesen
   let idMenu = getValueFromInput('menu');
   return idMenu.trim(); // returnt die den Wert aus dem Inputfeld mit der Id "menu" und entfernt Leerzeichen vor und hinter der Eingabe mithilfe von trim()
 }
 
 function getPriceFromInput() { // Nutzt die Hilfsfunktion getValueFrom Input um den Wert aus dem Inputfeld mit der id "price" auszulesen
   let idPrice = getValueFromInput('price');
   let price = parseFloat(idPrice); // wandelt die Eingabe in eine Kommazahl um
   return price; // returnt die Kommazahl
 }

 function getMenuIndex(menu) {
  let result = menus.indexOf(menu); // Hilfsfunktion, die die index Stelle eines Strings(menu) aus dem Array menus in die Variable result speichert
  if (result >= 0) { // wenn der Indexwert größer oder gleich 0 ist, also im Array enthalten ist, soll er den Wert returnen z.B. 1 oder 2
    return result
  }
  else { // falls der Wert nicht im Array ist, soll er -1 returnen
    return -1;
  }
  
}
 
 function onAddMenu() {
  let banane = document.getElementById("content");
  banane.innerHTML = "";
  let menu = getMenuFromInput('menu'); // Wert des Inputfeldes mit der ID "menu"
  let price = getPriceFromInput('price'); // Wert des Inptfeldes mit der ID = "price"
  let menuIndex = getMenuIndex(menu); // index wert aus: menus.indexOf("Wert aus dem Inputfeld mit der ID 'menu' ");
                                      // menu ist hier ausgeschrieben ohne Anführungszeichen, da der Wert des Inputfeldes bereits in der Variable = menu gespeichert ist

  if (menuIndex === -1) { // Wenn der menuIndex Wert -1 ist, der Wert also nicht im Array ist, soll er und der Preis Wert in das Array gepusht werden sowie 1 in amounts
    menus.push(menu);
    prices.push(price);
    amounts.push(1);
  } else {
    amounts[menuIndex]++; // ist der Wert größer gleich 0, soll in ammounts an der Stelle menuIndex, der Wert um 1 erhöht werden, in die beiden anderen Arrays wird dann nichts gepusht
  }

 for (let i = 0; i < menus.length; i++) {
  const element = menus[i];
  const price = prices[i];
  const amount = amounts[i];
  banane.innerHTML += /*html*/`

  <div>
    <p>${element}
    <p>${price}
    <p>${amount}
  <div>`;
  }
}