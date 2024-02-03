//Produktliste//
window.addEventListener("DOMContentLoaded", init);
//fetche
const ProduktelisteURL = "https://kea-alt-del.dk/t7/api/products?limit=50&start=10";
let produktelisteTemplate;
let produktlisteContainer;
//fetche & template
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

  productlisteJSON.forEach((produktlist) => {
    console.log("produktlist", produktlist);
    produktListeClone = produktelisteTemplate.cloneNode(true).content;
    produktListeClone.querySelector(".produktliste_image").src = produktlist.image_url;
    produktListeClone.querySelector(".produktliste_image").alt = `Picture of a ${produktlist.productdisplayname}`;
    produktListeClone.querySelector(".produkt_name").textContent = produktlist.productdisplayname;
    produktListeClone.querySelector(".articletype").textContent = produktlist.articletype;
    produktListeClone.querySelector(".price").textContent = produktlist.price;
    produktListeClone.querySelector(".discounted").textContent = `-${produktlist.discount}%`;

    if (produktlist.soldout) {
      produktListeClone.querySelector("article").classList.add("sold_out");
    }

    if (produktlist.sale) {
      let salePrice = produktlist.price - produktlist.price * (produktlist.discount / 100);
      // Set now price
      produktListeClone.querySelector(".discounted .now").textContent = `${salePrice.toFixed(2)} kr`;

      // Set prev price
      produktListeClone.querySelector(".discounted .prev").textContent = produktlist.price;
    }

    if (produktlist.discounted) {
      produktListeClone.querySelector("article").classList.add(".discounted");
    }

    produktlisteContainer.appendChild(produktListeClone);
  });
}

//burgermenu//
document.getElementById("burgerIcon").addEventListener("click", function () {
  var navbar = document.getElementById("myNavbar");
  navbar.classList.toggle("show");
});
