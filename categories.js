const categoryURL = "https://kea-alt-del.dk/t7/api/categories/";
window.addEventListener("DOMContentLoaded", getCategory);
function getCategory() {
  fetch(categoryURL)
    .then((response) => response.json())
    .then(visCategories);
}

function visCategories(cats) {
  cats.forEach((cat) => {
    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);
    clone.querySelector("h3").textContent = cat.category; //textContent med a, sletter alle under a.
    clone.querySelector("a").setAttribute("href", `produktliste.html?category=${cat.category}`);
    clone.querySelector("img").src = "img/" + cat.category + ".webp";
    document.querySelector(".kategori_liste").appendChild(clone);
  });
}

//burgermenu//
document.getElementById("burgerIcon").addEventListener("click", function () {
  var navbar = document.getElementById("myNavbar");
  navbar.classList.toggle("show");
});
