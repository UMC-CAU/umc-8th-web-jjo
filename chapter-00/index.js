
const btn = document.getElementById("btn");
const text = document.getElementById("text");

btn.addEventListener("click", () => {
    text.textContent = "안녕하세요";
    console.log("안녕하세요");
});