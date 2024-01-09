const app = document.getElementById("app");
function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateNewColorPalate() {
  let i = 0;
  function addElement() {
    i++;
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = generateRandomColor();
    p.classList.add("color-code");
    li.appendChild(p);
    li.style.backgroundColor = generateRandomColor();
    const outerDiv = document.createElement("div");
    outerDiv.classList.add("middle");
    const innerDiv = document.createElement("div");
    innerDiv.classList.add("text");
    innerDiv.textContent = "📋 Copy";
    outerDiv.appendChild(innerDiv);
    li.appendChild(outerDiv);
    app.appendChild(li);
  }
  let interval = setInterval(() => {
    addElement();
    if (i === 5) {
      clearInterval(interval);
    }
  }, 200);
}
window.addEventListener("load", () => {
  generateNewColorPalate();
});

function reGenrate() {
  app.innerHTML = "";
  generateNewColorPalate();
}
let height = 1;
let scrollInterval;
function moreColor() {
  height++;
  generateNewColorPalate();
  scrollInterval = setInterval(() => {
    window.scrollTo({
      top: window.innerHeight * height,
      behavior: "smooth",
    });
  }, 200);
}
window.addEventListener("scroll", () => {
  // Clear the interval when the user scrolls manually
  clearInterval(scrollInterval);
});

function copyColorCode() {
  console.log("DOMContentLoaded event fired");
  var liElements = document.querySelectorAll("#app li");
  console.log("Number of li elements found:", liElements.length);
  liElements.forEach(function (li) {
    li.addEventListener("click", function () {
      var colorCode = this.querySelector(".color-code").innerText;
      console.log("Clicked li. Color code:", colorCode);

      navigator.clipboard
        .writeText(colorCode)
        .then(function () {
          console.log("Color code copied to clipboard: " + colorCode);
        })
        .catch(function (err) {
          console.error("Unable to copy color code to clipboard", err);
        });
    });
  });
}
