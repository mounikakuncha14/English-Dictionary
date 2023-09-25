const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

// Create an array of background image URLs
const backgroundImages = [
  'url(https://i.pinimg.com/736x/fb/6b/b7/fb6bb7cca80297ea2f7a451bd474af11.jpg)',
  'url(https://i.pinimg.com/originals/2d/8d/5c/2d8d5c5e953fd50493e388da2759ac41.jpg)',
  
  // Add more image URLs as needed
];

// Function to change the background image dynamically
function changeBackgroundImage() {
  const randomNumber = Math.floor(Math.random() * backgroundImages.length);
  const selectedBackground = backgroundImages[randomNumber];
  document.body.style.backgroundImage = selectedBackground;
}

async function fetchAPI(word) {
  try {
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";
    infoTextEl.innerText = `Searching the meaning of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());

    if (result.title) {
      meaningContainerEl.style.display = "block";
      infoTextEl.style.display = "none";
      titleEl.innerText = word;
      meaningEl.innerText = "N/A";
      audioEl.style.display = "none";
    } else {
      infoTextEl.style.display = "none";
      meaningContainerEl.style.display = "block";
      audioEl.style.display = "inline-flex";
      titleEl.innerText = result[0].word;
      meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
      audioEl.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    console.log(error);
    infoTextEl.innerText = `An error happened, try again later`;
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    // Change the background image before fetching the word's meaning
    changeBackgroundImage();
    // Fetch the word's meaning
    fetchAPI(e.target.value);
  }
});
