const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
const ProduktelisteURL = `https://kea-alt-del.dk/t7/api/products?category=${category}`;

//Produktliste//
window.addEventListener("DOMContentLoaded", init);
//fetche datalink
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
    console.log("produktListeClone", produktListeClone);
    produktListeClone.querySelector("a").href = `produkt.html?id=${produktlist.id}`;
    produktListeClone.querySelector(".read-more").href = `produkt.html?id=${produktlist.id}`;
    //Set image source and alt attributes
    produktListeClone.querySelector(".produktliste_image").src = `https://kea-alt-del.dk/t7/images/webp/640/${produktlist.id}.webp`; //jeg kunne ikke finde forskellige billede data
    produktListeClone.querySelector(".produktliste_image").alt = `Picture of a ${produktlist.productdisplayname}`;
    //Set product name and article type
    produktListeClone.querySelector(".produkt_name").textContent = produktlist.productdisplayname;
    produktListeClone.querySelector(".articletype").textContent = produktlist.articletype;
    //Set regular price and discount percentage
    produktListeClone.querySelector(".percent").textContent = `-${produktlist.discount}%`;
    produktListeClone.querySelector(".price").textContent = produktlist.price;

    if (produktlist.soldout) {
      produktListeClone.querySelector("article").classList.add("sold_out");
    }
    if (produktlist.discount !== null) {
      // Calculate and display current price
      let nowPrice = produktlist.price * (1 - produktlist.discount / 100);
      // Update discounted now price
      //console.log("produktListeClone", produktListeClone);
      produktListeClone.querySelector(".now").textContent = `${nowPrice.toFixed(2)} kr`;
      // Update original price, strikethrough style
      produktListeClone.querySelector(".price").innerHTML = `<del>${produktlist.price} kr</del>`;
    } else {
      // Handle the case when discount is null, e.g., set a hide the null element
      produktListeClone.querySelector(".discounted").textContent = "";
      produktListeClone.querySelector(".discounted").style.backgroundColor = "transparent";
    }

    produktlisteContainer.appendChild(produktListeClone);
  });
}

//burgermenu//
document.getElementById("burgerIcon").addEventListener("click", function () {
  var navbar = document.getElementById("myNavbar");
  navbar.classList.toggle("show");
});

/*{
id: 1163,
gender: "Men",
category: "Apparel",
subcategory: "Topwear",
articletype: "Tshirts",
season: "Summer",
productionyear: 2011,
usagetype: "Sports",
productdisplayname: "Sahara Team India Fanwear Round Neck Jersey",
price: 895,
discount: null,
brandname: "Nike",
soldout: 0
},
*/
