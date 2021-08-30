document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("https://competitive-coding-api.herokuapp.com/api/codechef/OutdatedGuy");
  const data = await res.json();

  const rating = document.querySelector("#rating");
  rating.innerText += data.rating;
});