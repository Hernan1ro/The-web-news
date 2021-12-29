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
  const deletedPosts = JSON.parse(localStorage.getItem("deletedPosts")) || [];
  const userPosts = JSON.parse(localStorage.getItem("userPosts")) || [];

  //---------- Print user post from local storage------------//
  userPosts.forEach((post) => {
    const isPostDeleted = deletedPosts.some((item) => item === post.id);
    if (!isPostDeleted) {
      const { userId, title, id, body } = post;
      const article = document.createElement("article");
      article.classList.add("new");
      article.dataset.id = id;
      article.dataset.userId = userId;

      const img = document.createElement("img");
      const h2 = document.createElement("h2");
      const span = document.createElement("span");
      const p = document.createElement("p");
      const button = document.createElement("button");

      img.src = "";
      h2.innerText = title;
      span.innerText = `Posted on January 7, 2008 by user`;
      p.innerText = body;
      button.innerText = "Continue reading";
      //Sending data to print the information
      button.onclick = () => {
        getPostInformation(id, "user", "", post);
      };

      article.appendChild(img);
      article.appendChild(h2);
      article.appendChild(span);
      article.appendChild(p);
      article.appendChild(button);
      newsContainer.appendChild(article);
    }
  });

  // ------------ Print users from API ----------//

  data[0].map((item, index) => {
    // Check if it already exist deleted posts and only showing the first 20 posts//
    const isPostDeleted = deletedPosts.some((post) => post === item.id);
    if (index <= 19 && !isPostDeleted) {
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

//-----------Sending Post information to localStorage--------------//

function getPostInformation(id, user, img, post) {
  const POST = `https://jsonplaceholder.typicode.com/posts/${id}`;
  const COMMENTS = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;
  if (id < 1000) {
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
  } else {
    const postData = [post, []];
    localStorage.setItem("postData", JSON.stringify(postData));
    localStorage.setItem("postUser", JSON.stringify("user"));
    localStorage.setItem("imgUser", JSON.stringify(""));
    window.location.href = "/news.html";
  }
}
