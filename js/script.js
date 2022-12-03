//---------Dark and Light Mode------------//
let switchBtn = document.querySelector(".switch-btn");
let theme = window.localStorage.getItem("theme");

theme === "light" ? enableLightMode() : enableDarkMode();
// switchBtn.style = `transform: translateY(${0}rem)`;
switchBtn.addEventListener("click", () => {
  switchBtn.classList.add("switch-btn-annimation");

  theme = window.localStorage.getItem("theme");
  theme === "light" ? enableDarkMode() : enableLightMode();
});
function enableLightMode() {
  window.localStorage.setItem("theme", "light");
  switchBtn.firstElementChild.textContent = "dark";
  switchBtn.lastElementChild.src = "assets/svg/icon-moon.svg";
  document.body.classList.add("light-mode");
  document.body.style = "transition: background 0.3s;";
  window.setTimeout(() => {
    switchBtn.classList.remove("switch-btn-annimation");
  }, 300);
}
function enableDarkMode() {
  window.localStorage.setItem("theme", "dark");
  switchBtn.firstElementChild.textContent = "light";
  switchBtn.lastElementChild.src = "assets/svg/icon-sun.svg";
  document.body.classList.remove("light-mode");
  document.body.style = "transition: background 0.3s;";
  window.setTimeout(() => {
    switchBtn.classList.remove("switch-btn-annimation");
  }, 300);
}
//---------Search user------------//
let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputValue = document.querySelector("#username");
  if (inputValue.value === "") {
    console.log("show popup");
  } else {
    fetch(`https://api.github.com/users/${inputValue.value}`)
      .then((result) => result.json())
      .then((user) => {
        userPersonalInfo(user);
        resultBio(user);
        reposFollowersFollowing(user);
        socialMediaLinks(user);
        userImage(user);
      });
  }
});
function userPersonalInfo(user) {
  let fullName = document.querySelector(".user-name");
  let userNameLink = document.querySelector(".user-name-link");
  let joinDate = document.querySelector(".result-join-date");
  fullName.textContent = user.name;
  userNameLink.textContent = `@${user.login}`;
  userNameLink.href = `https://github.com/${user.login}`;
  let joinedDate = new Date(user.created_at);
  joinDate.textContent = `joined ${joinedDate.getDate()} ${joinedDate.toLocaleString(
    "en-US",
    { month: "short" }
  )} ${joinedDate.getFullYear()}`;
}

function resultBio(user) {
  let bio = document.querySelector(".result-bio");
  user.bio === null
    ? (bio.textContent = `This profile has no bio`)
    : (bio.textContent = user.bio);
}

function reposFollowersFollowing(user) {
  let repos = document.querySelector("[data-repos]");
  let followers = document.querySelector("[data-followers]");
  let following = document.querySelector("[data-following]");

  repos.textContent = `${user.public_repos}`;
  followers.textContent = `${user.followers}`;
  following.textContent = `${user.following}`;
}

function socialMediaLinks(user) {
  let location = document.querySelector("[data-location]");
  let twitter = document.querySelector("[data-twitter]");
  let website = document.querySelector("[data-website]");
  let office = document.querySelector("[data-office]");

  if (user.location === null) {
    location.parentElement.classList.remove("active");
    location.previousElementSibling.style =
      "filter: brightness(0) saturate(100%) invert(91%) sepia(3%) saturate(2868%) hue-rotate(172deg) brightness(77%) contrast(84%);";
    location.textContent = `Not Available`;
    location.href = `#`;
  } else {
    location.previousElementSibling.style =
      "filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(1%) hue-rotate(288deg) brightness(103%) contrast(102%);";
    location.textContent = `${user.location}`;
    location.parentElement.classList.add("active");
  }

  if (user.twitter_username === null) {
    twitter.parentElement.classList.remove("active");
    twitter.previousElementSibling.style =
      "filter: brightness(0) saturate(100%) invert(91%) sepia(3%) saturate(2868%) hue-rotate(172deg) brightness(77%) contrast(84%);";
    twitter.textContent = `Not Available`;
    twitter.href = `#`;
  } else {
    twitter.previousElementSibling.style =
      "filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(1%) hue-rotate(288deg) brightness(103%) contrast(102%);";
    twitter.parentElement.classList.add("active");
    twitter.href = `https://twitter.com/${user.twitter_username}`;
    twitter.textContent = `${user.twitter_username}`;
  }

  if (user.blog === "") {
    website.parentElement.classList.remove("active");
    website.previousElementSibling.style =
      "filter: brightness(0) saturate(100%) invert(91%) sepia(3%) saturate(2868%) hue-rotate(172deg) brightness(77%) contrast(84%);";
    website.textContent = `Not Available`;
    website.href = `#`;
  } else {
    website.previousElementSibling.style =
      "filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(1%) hue-rotate(288deg) brightness(103%) contrast(102%);";
    website.parentElement.classList.add("active");
    website.href = `${user.blog}`;
    website.textContent = `${user.blog}`;
  }
  console.log(office.previousElementSibling.src);
  if (user.company === null) {
    office.parentElement.classList.remove("active");
    office.previousElementSibling.style =
      "filter: brightness(0) saturate(100%) invert(91%) sepia(3%) saturate(2868%) hue-rotate(172deg) brightness(77%) contrast(84%);";
    office.textContent = `Not Available`;
    office.href = `#`;
  } else {
    office.previousElementSibling.style =
      "filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(1%) hue-rotate(288deg) brightness(103%) contrast(102%);";
    office.parentElement.classList.add("active");
    office.href = `${user.blog}`;
    office.textContent = `@${user.company}`;
  }
}

function userImage(user) {
  let userImage = document.querySelector(".user-image");
  userImage.src = `${user.avatar_url}`;
}
