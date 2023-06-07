document.getElementById("app").innerHTML = `
<h1>Hello Arrow!</h1>
`;
const btn = document.querySelector(".btn");
const icon = document.querySelector("#btn_icon");
//const icon1 = document.getElementById("btn_icon").innerHTML;

btn.addEventListener("click", () => {
  icon.classList.toggle("icon1");
  icon.classList.toggle("icon2");
});
