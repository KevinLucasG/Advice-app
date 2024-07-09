const adviceText = document.getElementById("advice-text");
const btnAdvice = document.getElementById("btn-advice");
const btnLanguage = document.getElementById("btn-language");

let isEnglish = true;

btnLanguage.addEventListener("click", () => {
  isEnglish = !isEnglish; // Inverte o estado de isEnglish

  if (isEnglish) {
    btnLanguage.innerHTML = "CHANGE TO PORTUGUESE";
  } else {
    btnLanguage.innerHTML = "CHANGE TO ENGLISH";
  }

  // Chama a função para obter e exibir o conselho com o novo idioma
  fetchAdvice();
});

btnAdvice.addEventListener("click", fetchAdvice);

async function fetchAdvice() {
  try {
    const response = await fetch("https://api.adviceslip.com/advice");

    if (!response.ok) {
      throw new Error("Erro ao carregar os dados");
    }

    const data = await response.json();

    if (isEnglish) {
      adviceText.innerHTML = "";

      const newElement = document.createElement("div");
      newElement.innerHTML = `<p>“${data.slip.advice}”</p>`;

      adviceText.appendChild(newElement);
    } else {
      const translatedResponse = await fetch(
        `https://api.mymemory.translated.net/get?q=${data.slip.advice}&langpair=en|pt-br`
      );

      if (!translatedResponse.ok) {
        throw new Error("Erro ao carregar a tradução");
      }

      const translatedData = await translatedResponse.json();

      //Remove double quotes from the beginning and end of the text
      const translatedText = translatedData.responseData.translatedText.replace(
        /^"|"$/g,
        ""
      );

      adviceText.innerHTML = "";

      const newElement = document.createElement("div");
      newElement.innerHTML = `<p>“${translatedText}”</p>`;

      adviceText.appendChild(newElement);
    }
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}
