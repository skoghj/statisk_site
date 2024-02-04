//Produktliste//
window.addEventListener("DOMContentLoaded", init);
//fetche datalink
const ProduktelisteURL = "https://kea-alt-del.dk/t7/api/products?limit=50&start=10";
let produktelisteTemplate;
let produktlisteContainer;
//template
function init() {
  console.log("init");

  produktelisteTemplate = document.querySelector(".produktliste_template");
  console.log("produktelisteTemplate", produktelisteTemplate);

  produktlisteContainer = document.querySelector(".produktliste_container");
  console.log("produktlisteContainer", produktlisteContainer);

  fetch(ProduktelisteURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      showProduktListe(json);
    });
}

function showProduktListe(productlisteJSON) {
  let produktListeClone;
  //loop
  productlisteJSON.forEach((produktlist) => {
    console.log("produktlist", produktlist);
    produktListeClone = produktelisteTemplate.cloneNode(true).content;
    //Set image source and alt attributes
    produktListeClone.querySelector(".produktliste_image").src = "https://kea-alt-del.dk/t7/images/jpg/640/1552.jpg "; //jeg kunne ikke finde forskellige billede data
    produktListeClone.querySelector(".produktliste_image").alt = `Picture of a ${produktlist.productdisplayname}`;
    //Set product name and article type
    produktListeClone.querySelector(".produkt_name").textContent = produktlist.productdisplayname;
    produktListeClone.querySelector(".articletype").textContent = produktlist.articletype;
    //Set regular price and discount percentage
    produktListeClone.querySelector(".price").textContent = produktlist.price;
    produktListeClone.querySelector(".discounted").textContent = `-${produktlist.discount}%`;

    if (produktlist.discount !== null) {
      // Calculate and display current price
      let nowPrice = produktlist.price * (1 - produktlist.discount / 100);

      // Get reference to the discounted now price element
      let discountedPriceElement = produktListeClone.querySelector(".now");

      // Update discounted now price
      if (discountedPriceElement) {
        discountedPriceElement.textContent = `${nowPrice.toFixed(2)} kr`;
      }
      // Get reference to the original price element
      let originalPriceElement = produktListeClone.querySelector(".price");

      // Update original price, strikethrough style
      if (originalPriceElement) {
        originalPriceElement.innerHTML = `<del>${produktlist.price} kr</del>`;
      }
    } else {
      // Handle the case when discount is null, e.g., set a hide the null element
      produktListeClone.querySelector(".discounted").textContent = "";
      produktListeClone.querySelector(".discounted").style.backgroundColor = "transparent";

      if (produktlist.soldout) {
        produktListeClone.querySelector("article").classList.add("sold_out");
      }
    }
    produktlisteContainer.appendChild(produktListeClone);
  });
}

//burgermenu//
document.getElementById("burgerIcon").addEventListener("click", function () {
  var navbar = document.getElementById("myNavbar");
  navbar.classList.toggle("show");
});
