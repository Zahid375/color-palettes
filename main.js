const app = document.getElementById("app");

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createColorElement() {
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

  return li;
}

function generateNewColorPalette(count = 5, delay = 200) {
  let i = 0;
  const interval = setInterval(() => {
    if (i < count) {
      createColorElement();
      i++;
    } else {
      clearInterval(interval);
      setupCopyEventHandlers();
    }
  }, delay);
}

function clearAppContent() {
  app.innerHTML = "";
}

function reGenerate() {
  clearAppContent();
  generateNewColorPalette();
  setupCopyEventHandlers();
  playAudio("myAudio");
}

let height = 1;
let scrollInterval;

function moreColor() {
  height++;
  generateNewColorPalette();
  setupCopyEventHandlers();
  playAudio("myAudio");
  scrollInterval = setInterval(() => {
    window.scrollTo({
      top: window.innerHeight * height,
      behavior: "smooth",
    });
  }, 200);
}

window.addEventListener("scroll", () => {
  clearInterval(scrollInterval);
});

function copyColorCode(colorCode) {
  navigator.clipboard
    .writeText(colorCode)
    .then(() => {
      Toastify({
        text: " ✔️ Copied Succesfully !",
        className: "info",
        duration: 1000,
        close: true,
        style: {
          background: "linear-gradient(to right, white,white)",
          color: "black",
        },
      }).showToast();
      playAudio("copyAudio");
    })
    .catch((err) => {
      Toastify({
        text: "Somthing Wrong",
        className: "danger",
      }).showToast();
    });
}

function setupCopyEventHandlers() {
  const liElements = document.querySelectorAll("#app li");

  liElements.forEach((li) => {
    li.addEventListener("click", function () {
      const colorCode = this.querySelector(".color-code").textContent;
      let copytext = this.querySelector(".text");
      console.log(copytext);
      liElements.forEach((item) => {
        const innerDiv = item.querySelector(".text");
        innerDiv.textContent = item === this ? "✔️Copied" : "📋 Copy";
      });

      copyColorCode(colorCode);
    });
  });
}

window.addEventListener("load", () => {
  generateNewColorPalette();
  setupCopyEventHandlers();
  playAudio("myAudio");
});
function playAudio(id) {
  var audio = document.getElementById(id);
  audio.currentTime = 0;
  if (audio.paused || audio.currentTime === 0) {
    audio.load();
    audio.play();
  } else {
    audio.play();
  }
}
