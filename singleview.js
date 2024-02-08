const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const url = `https://kea-alt-del.dk/t7/api/products/${id}`;

window.addEventListener("DOMContentLoaded", getProduct);

function getProduct() {
  fetch(url) // 수정: 변수를 사용하여 URL을 전달
    .then((response) => response.json())
    .then(visProdukt);
}

function visProdukt(produkt) {
  console.log(produkt); // 수정: 변수 이름을 수정
  document.querySelector(".produkt_information h2").textContent = produkt.productdisplayname;
  document.querySelector(".productdisplayname").textContent = produkt.productdisplayname;
  document.querySelector(".brand").textContent = produkt.brandname;
  document.querySelector(".brandname").textContent = produkt.brandname;
  document.querySelector(".articletype").textContent = produkt.articletype;
  document.querySelector(".seasons").textContent = produkt.season;
  document.querySelector(".color").textContent = produkt.basecolour;
  document.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${id}.webp`;
  document.querySelector("img").src.alt = produkt.productdisplayname;
  document.querySelector(".year").textContent = produkt.productionyear;
  document.querySelector(".idnummer").textContent = produkt.id;
  document.querySelector(".produkt_price").textContent = `${produkt.price} kr`;
  document.querySelector(".produkt_discounted .discount_percent").textContent = `-${produkt.discount}%`;

  const soldoutElement = document.querySelector(".produkt_information .produkt_soldout");
  if (produkt.soldout) {
    soldoutElement.style.display = "block";
  } else {
    soldoutElement.style.display = "none";
  }

  if (produkt.discount !== null) {
    // Calculate and display current price
    let nowPrice = produkt.price * (1 - produkt.discount / 100);
    // Update discounted now price
    document.querySelector(".produkt_now").textContent = `${nowPrice.toFixed(2)} kr`;
    // Update original price, strikethrough style
    document.querySelector(".produkt_price").innerHTML = `<del>${produkt.price} kr</del>`;
  } else {
    // Handle the case when discount is null, e.g., set a hide the null element
    document.querySelector(".produkt_discounted").textContent = "";
    document.querySelector(".produkt_discounted").style.backgroundColor = "transparent";
  }
}

getProduct(); // 함수 호출을 추가하여 페이지 로딩 시 데이터를 가져오도록 함

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
}*/
