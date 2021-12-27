//-----------SELECTORS-------------//
const menuIcon = document.querySelector(".icon-container");
const closeMenuIcon = document.querySelector(".close-icon");
const menu = document.querySelector(".information-menu"); //;
//-----------LISTENERS-----------//
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

fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((json) => console.log(json));
