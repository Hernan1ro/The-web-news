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
  const deleteBtn = document.createElement("button");
  const createBtn = document.createElement("button");

  img.src = image;
  h2.innerText = title;
  span.innerText = `Posted on January 7, 2008 by ${user}`;
  //Ading aditonal information to the post to a complete lecture//
  p.innerText =
    body +
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus fuga sunt sed numquam, est maxime dolor sequi nulla id optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, perferendis voluptate inventore illo unde iste rerum ipsa explicabo delectus, pariatur eum magni aut. Aut nisi ipsum adipisci quas nesciunt porro. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed, enim culpa! Dolore, numquam consectetur! Nam nostrum laboriosam sequi quasi ipsum eos aut, a consectetur quidem ad adipisci veritatis autem, rerum harum cupiditate aperiam corrupti repellat eius porro iste ea? Ullam accusantium culpa ratione labore. Ipsum quas asperiores corrupti sapiente quisquam! lorem50";
  deleteBtn.innerText = "Delete";
  deleteBtn.onclick = () => {
    deletePost(id);
  };
  createBtn.innerText = "Create your own post";
  createBtn.style.backgroundColor = "#b14434";

  article.appendChild(img);
  article.appendChild(h2);
  article.appendChild(span);
  article.appendChild(p);
  article.appendChild(deleteBtn);
  article.appendChild(createBtn);
  newsContainer.appendChild(article);
}

// --------- Delete Post ------------ //

function deletePost(id) {
  console.log("Deleting post " + id);
  const URL = `https://jsonplaceholder.typicode.com/posts/${id}`;
  const POSTS = `https://jsonplaceholder.typicode.com/posts`;
  fetch(URL, {
    method: "DELETE",
  });
  fetch(POSTS)
    .then((response) => response.json())
    .then((response) => console.log(response));
}
