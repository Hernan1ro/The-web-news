//-----------SELECTORS-------------//
const menuIcon = document.querySelector(".icon-container");
const closeMenuIcon = document.querySelector(".close-icon");
const menu = document.querySelector(".information-menu");
const newsContainer = document.querySelector(".news-container");
//-----------LISTENERS-----------//
document.addEventListener("DOMContentLoaded", () => {
  getPost();
});
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
// ---------Fetch data from localStorage----------//
function getPost() {
  const postData = JSON.parse(localStorage.getItem("postData"));
  const user = JSON.parse(localStorage.getItem("postUser"));
  const image = JSON.parse(localStorage.getItem("imgUser"));
  printPostOnDOM(postData, user, image);
}

//-----------Print post on DOM--------------//
function printPostOnDOM(data, user, image) {
  const { userId, title, id, body } = data[0];
  const article = document.createElement("article");
  article.classList.add("new");
  article.dataset.id = id;
  article.dataset.userId = userId;

  const img = document.createElement("img");
  const h2 = document.createElement("h2");
  const span = document.createElement("span");
  const p = document.createElement("p");
  const button = document.createElement("button");

  img.src = image;
  h2.innerText = title;
  span.innerText = `Posted on January 7, 2008 by ${user}`;
  p.innerText = body;
  button.innerText = "Continue reading";

  article.appendChild(img);
  article.appendChild(h2);
  article.appendChild(span);
  article.appendChild(p);
  article.appendChild(button);
  newsContainer.appendChild(article);
}
