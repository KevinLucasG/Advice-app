const adviceText = document.getElementById("advice-text");
const btnAdvice = document.getElementById("btn-advice");

let isEnglish = true;

const btnLanguage = document.getElementById("btn-language");
btnLanguage.addEventListener("click", () => (isEnglish = false));

btnAdvice.addEventListener("click", async () => {
  try {
    const response = await fetch("https://api.adviceslip.com/advice");

    if (!response.ok) {
      throw new Error("Erro ao carregar os dados");
    }

    if (isEnglish) {
      const data = await response.json();

      adviceText.innerHTML = "";
      console.log(data);

      const newElement = document.createElement("div");
      newElement.innerHTML = `<p>${data.slip.advice}</p>`;

      adviceText.appendChild(newElement);
    } else {
    }
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
});
