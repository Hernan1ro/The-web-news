//-----------SELECTORS-------------//
const menuIcon = document.querySelector(".icon-container");
const closeMenuIcon = document.querySelector(".close-icon");
const menu = document.querySelector(".information-menu");
const newsContainer = document.querySelector(".news-container");
//-----------LISTENERS-----------//
window.onload = () => {
  getPosts();
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
function getPosts() {
  let posts;
  const POSTS = "https://jsonplaceholder.typicode.com/posts";
  const PHOTOS = "https://jsonplaceholder.typicode.com/photos";
  // Call the API
  fetch(POSTS)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      // Store the post data to a variable
      posts = data;
      // Fetch another API
      return fetch(PHOTOS);
    })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then((images) => printNewsOnDOM(posts, images))
    .catch(function (error) {
      console.warn(error);
    });
}

function printNewsOnDOM(posts, images) {
  console.log(posts, images);
  posts.map((item, index) => {
    if (index <= 19) {
      const { userId, title, id, body } = item;
      const article = document.createElement("article");
      article.classList.add("new");
      article.dataset.id = id;
      article.dataset.userId = userId;
      const img = document.createElement("img");
      const h2 = document.createElement("h2");
      const span = document.createElement("span");
      const p = document.createElement("p");
      const button = document.createElement("button");
      img.src = images[index].url;
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
    }
  });
}
