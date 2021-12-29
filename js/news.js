//-----------SELECTORS-------------//
const menuIcon = document.querySelector(".icon-container");
const closeMenuIcon = document.querySelector(".close-icon");
const menu = document.querySelector(".information-menu");
const newsContainer = document.querySelector(".news-container");
const createPostContainer = document.querySelector(".create-post-container");
const cancelBtn = document.querySelector(".cancel-create-post");
const form = document.querySelector("#form");

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
cancelBtn.addEventListener("click", () => {
  cancelCreatePost();
});
form.addEventListener("submit", checkData);

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
  console.log(user);
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
  //adding delete function//
  deleteBtn.onclick = () => {
    deletePost(id);
  };
  createBtn.innerText = "Create your own post";
  createBtn.style.backgroundColor = "#b14434";
  createBtn.onclick = () => {
    createNewPost();
  };
  article.appendChild(img);
  article.appendChild(h2);
  article.appendChild(span);
  article.appendChild(p);
  article.appendChild(deleteBtn);
  article.appendChild(createBtn);
  newsContainer.appendChild(article);
  //Getting the comments//

  getComments(id);
}
// --------- Get post's comments ------------ //
function getComments(id) {
  const COMMENTS = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;
  fetch(COMMENTS)
    .then((response) => response.json())
    .then((response) => printComments(response));
}

// --------- Print comments on DOM ------------ //
function printComments(data) {
  const commentsContainer = document.createElement("div");
  commentsContainer.classList.add("comments");
  newsContainer.appendChild(commentsContainer);
  const container = document.querySelector(".comments");

  const commetsHeader = document.createElement("h2");
  commetsHeader.textContent = "Comments";
  container.appendChild(commetsHeader);

  data.forEach((comment) => {
    const { name, body } = comment;
    container.innerHTML += `
            <div class="comment">
              <div class="user-info">
                <img src="/assets/images/user-profile.png" alt="user-photo" />
                <span>${name}</span>
              </div>
              <p>
                ${body}
              </p>
            </div>
    `;
  });
}
// --------- Delete Post ------------ //

function deletePost(id) {
  console.log("Deleting post " + id);
  const URL = `https://jsonplaceholder.typicode.com/posts/${id}`;
  fetch(URL, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.status === 200) {
        alert("This post has been deleted");
        setLocalStorageDeletedPost(id);
        window.location.href = "/index.html";
      }
    })
    .catch((err) => console.log(err));
}

//Sending the deleted post to local storage//
function setLocalStorageDeletedPost(id) {
  let deletedPosts = JSON.parse(localStorage.getItem("deletedPosts"));
  if (deletedPosts === null) {
    localStorage.setItem("deletedPosts", JSON.stringify([id]));
  } else {
    const deletedPostsUpdate = [...deletedPosts, id];
    localStorage.setItem("deletedPosts", JSON.stringify(deletedPostsUpdate));
  }
}

//-------------- Create new Post ----------------- //

function createNewPost() {
  const news = document.querySelector(".new");
  const commets = document.querySelector(".comments");
  newsContainer.classList.add("creative-mode");

  createPostContainer.classList.remove("hide");
  news.classList.add("hide");
  commets.classList.add("hide");
}

//-------------- Cancel create new Post ----------------- //

function cancelCreatePost() {
  const news = document.querySelector(".new");
  const commets = document.querySelector(".comments");
  newsContainer.classList.remove("creative-mode");

  createPostContainer.classList.add("hide");
  news.classList.remove("hide");
  commets.classList.remove("hide");
}
//--------------Check data fields -------------//

function checkData(e) {
  e.preventDefault();
  // obtener datos del formulario
  const title = document.querySelector(".input-container input").value;
  const content = document.querySelector(".input-container textarea").value;

  if (content === "" || title === "") {
    alert("Todos los campos son obligatorios");
  }
  const post = {
    userId: Date.now(),
    id: Date.now(),
    title: title,
    body: content,
  };

  setLocalStorageUserPost(post);
}

//---Send user post to local storage---//

function setLocalStorageUserPost(post) {
  let userPosts = JSON.parse(localStorage.getItem("userPosts"));
  if (userPosts === null) {
    localStorage.setItem("userPosts", JSON.stringify([post]));
  } else {
    const userPostsUpdate = [...userPosts, post];
    localStorage.setItem("userPosts", JSON.stringify(userPostsUpdate));
  }
  alert("Tu publicación se ha guardado correctamente");
  window.location.href = "/index.html";
}
