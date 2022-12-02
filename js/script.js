//---------Dark and Light Mode------------//
let switchBtn = document.querySelector(".switch-btn");
let theme = window.localStorage.getItem("theme");

theme === "light" ? enableLightMode() : enableDarkMode();
// switchBtn.style = `transform: translateY(${0}rem)`;
switchBtn.addEventListener("click", () => {
  // switchBtn.style = `transform: translateY(${0}rem)`;
  theme = window.localStorage.getItem("theme");
  theme === "light" ? enableDarkMode() : enableLightMode();
});
function enableLightMode() {
  window.localStorage.setItem("theme", "light");
  switchBtn.firstElementChild.textContent = "dark";
  switchBtn.lastElementChild.src = "assets/svg/icon-moon.svg";
  document.body.classList.add("light-mode");
  document.body.style = "transition : background 0.3s; ";
}
function enableDarkMode() {
  window.localStorage.setItem("theme", "dark");
  switchBtn.firstElementChild.textContent = "light";
  switchBtn.lastElementChild.src = "assets/svg/icon-sun.svg";
  document.body.classList.remove("light-mode");
  document.body.style = "transition : background 0.3s;";
}
// console.log((switchBtn.lastElementChild.src = "assets/svg/icon-moon.svg"));
