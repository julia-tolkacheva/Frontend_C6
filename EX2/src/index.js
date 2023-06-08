document.getElementById("app").innerHTML = `
<h2>Покажи размер экрана</h2>
`;
const btn = document.querySelector(".btn");
const icon = document.querySelector("#btn_icon");
//const icon1 = document.getElementById("btn_icon").innerHTML;

const window_size = `Размер Вашего экрана: ${window.screen.width}x${window.screen.height}`;
btn.addEventListener("click", () => {
  icon.classList.toggle("icon1");
  icon.classList.toggle("icon2");
  alert(window_size);
});