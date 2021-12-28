//-----------SELECTORS-------------//
const menuIcon = document.querySelector(".icon-container");
const closeMenuIcon = document.querySelector(".close-icon");
const menu = document.querySelector(".information-menu");
const newsContainer = document.querySelector(".news-container");
//-----------LISTENERS-----------//
document.addEventListener("DOMContentLoaded", () => {
  getData();
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
// ---------Fetch data and images from JSONPlaceholder----------//
function getData() {
  //APIS
  const POSTS = "https://jsonplaceholder.typicode.com/posts";
  const PHOTOS = "https://jsonplaceholder.typicode.com/photos";
  const USERS = "https://jsonplaceholder.typicode.com/users";
  // const DATE = "https://api.lrs.org/random-date-generator?num_dates=200";

  Promise.all([fetch(POSTS), fetch(PHOTOS), fetch(USERS)])
    .then((responses) => {
      return Promise.all(
        responses.map(function (response) {
          return response.json();
        })
      );
    })
    .then((data) => {
      printNewsOnDOM(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

//-----------Print data on DOM--------------//
function printNewsOnDOM(data) {
  data[0].map((item, index) => {
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

      img.src = data[1][index].url;
      h2.innerText = title;
      span.innerText = `Posted on January 7, 2008 by ${data[2][userId].name}`;
      p.innerText = body;
      button.innerText = "Continue reading";
      //Sending data to print the information
      button.onclick = () => {
        getPostInformation(id, data[2][userId].name, data[1][index].url);
      };

      article.appendChild(img);
      article.appendChild(h2);
      article.appendChild(span);
      article.appendChild(p);
      article.appendChild(button);
      newsContainer.appendChild(article);
    }
  });
}

function getPostInformation(id, user, img) {
  const POST = `https://jsonplaceholder.typicode.com/posts/${id}`;
  const COMMENTS = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;

  Promise.all([fetch(POST), fetch(COMMENTS)])
    .then((responses) => {
      return Promise.all(
        responses.map(function (response) {
          return response.json();
        })
      );
    })
    .then((data) => {
      localStorage.setItem("postData", JSON.stringify(data));
      localStorage.setItem("postUser", JSON.stringify(user));
      localStorage.setItem("imgUser", JSON.stringify(img));
      window.location.href = "/news.html";
    })
    .catch((error) => {
      console.error(error);
    });
}
