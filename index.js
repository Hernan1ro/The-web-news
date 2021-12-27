//-----------SELECTORS-------------//
const menuIcon = document.querySelector(".icon-container");
const closeMenuIcon = document.querySelector(".close-icon");
const menu = document.querySelector(".information-menu");
const newsContainer = document.querySelector(".news-container");
//-----------LISTENERS-----------//
window.onload = () => {
  getData();
  console.log("Obteniendo datos...");
};
menuIcon.addEventListener("click", () => {
  handleMenu(true);
});
closeMenuIcon.addEventListener("click", () => {
  handleMenu(false);
});

//-----------FUNCTIONS-----------//
function handleMenu(boolean) {
  if (boolean) {
    menu.classList.add("menu-active");
  } else {
    menu.classList.remove("menu-active");
  }
}
function getData() {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  fetch(URL)
    .then((response) => response.json())
    .then((response) => printNewsOnDOM(response));
}
function printNewsOnDOM(data) {
  data.map((item) => {
    const { userId, title, id, body } = item;
    const article = document.createElement("article");
    article.classList.add("new");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const span = document.createElement("span");
    const p = document.createElement("p");
    const button = document.createElement("button");
    h2.innerText = title;
    span.innerText = "Posted on January 7, 2008 by admin";
    p.innerText = body;
    button.innerText = "Continue reading";

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(span);
    article.appendChild(p);
    article.appendChild(button);
    newsContainer.appendChild(article);
  });
}
