
const loveButton = document.getElementById("loveButton");
const loveMessage = document.getElementById("loveMessage");

const messages = [
    "Jesteś moim małym słoneczkiem ☀️",
    "Jesteś najlepszym co mnie spotkało ♡",
    "Wyprzytulam Cię kiedy się spotkamy 🤗",
    "Ти неймовірна, моя кохана! ♡",
    "Jestem z Ciebie dumny 😎",
    "Wysyłam Ci milion buziaków! 😘",
    "Я завжди поруч, моє сонечко ♡",
    "я сумую за тобою 💕",
    "Я тебе обіймаю ☺️",
    "Je t'aime 😏",
    "цьом цьом 💋",
];

let lastMessageIndex = -1;

// Miękki dźwięk POP
function playPop() {
    const audio = new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audio.createOscillator();
    const volume = audio.createGain();

    oscillator.connect(volume);
    volume.connect(audio.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(560, audio.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
        180,
        audio.currentTime + 0.12
    );

    volume.gain.setValueAtTime(0.0001, audio.currentTime);
    volume.gain.exponentialRampToValueAtTime(
        0.5,
        audio.currentTime + 0.015
    );
    volume.gain.exponentialRampToValueAtTime(
        0.0001,
        audio.currentTime + 0.16
    );

    oscillator.start();
    oscillator.stop(audio.currentTime + 0.17);

    oscillator.onended = () => audio.close();
}

// Wyskakujące serduszka


function createHearts() {
    const rect = loveButton.getBoundingClientRect();

    const amount = 28;

    for (let i = 0; i < amount; i++) {
        const heart = document.createElement("span");

        heart.className = "pop-heart";
        heart.textContent = "♥";

        // Równomierne rozmieszczenie na całej szerokości przycisku
        const startX = rect.left + (i / (amount - 1)) * rect.width;

        // Niewielkie losowe odchylenie punktu startowego
        const startY = rect.top + rect.height / 2 +
            (Math.random() - 0.5) * 12;

        heart.style.left = startX + "px";
        heart.style.top = startY + "px";

        // Wachlarz skierowany ku górze
        const angle = -Math.PI / 2 +
            (Math.random() - 0.5) * Math.PI * 0.8;

        const distance = 75 + Math.random() * 85;

        heart.style.setProperty(
            "--move-x",
            Math.cos(angle) * distance + "px"
        );

        heart.style.setProperty(
            "--move-y",
            Math.sin(angle) * distance + "px"
        );

        heart.style.fontSize = (13 + Math.random() * 9) + "px";
        heart.style.color = "#f4a6bd";

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1300);
    }
}



// Losowe dodatkowe efekty

function createRandomEffects() {
    const rect = loveButton.getBoundingClientRect();

    const effects = ["sparkles", "petals", "mixed"];
    const selectedEffect =
        effects[Math.floor(Math.random() * effects.length)];

    let symbols = [];

    if (selectedEffect === "sparkles") {
        symbols = ["✨", "⭐", "✦"];
    } else if (selectedEffect === "petals") {
        symbols = ["🌸", "🌷", "🩷"];
    } else {
        symbols = ["✨", "🌸", "⭐", "🌷", "✦"];
    }

    const amount = Math.floor(Math.random() * 4) + 3;

    for (let i = 0; i < amount; i++) {
        const symbol =
            symbols[Math.floor(Math.random() * symbols.length)];

        const isPetal = ["🌸", "🌷"].includes(symbol);

        const element = document.createElement("span");

        element.className = isPetal ? "pop-petal" : "pop-sparkle";
        element.textContent = symbol;

        // Losowy punkt startowy wokół przycisku
        element.style.left =
            (rect.left + rect.width / 2) + "px";

        element.style.top =
            (rect.top + rect.height / 2) + "px";

        // Losowy kierunek i odległość lotu
        const angle = Math.random() * Math.PI * 2;
        const distance = 45 + Math.random() * 65;

        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        element.style.setProperty("--move-x", moveX + "px");
        element.style.setProperty("--move-y", moveY + "px");

        element.style.fontSize =
            (8 + Math.random() * 7) + "px";

        element.style.animationDuration =
            (0.8 + Math.random() * 0.9) + "s";

        document.body.appendChild(element);

        setTimeout(() => {
            element.remove();
        }, 1900);
    }
}

// Obsługa przycisku
loveButton.addEventListener("click", function() {
    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * messages.length);
    } while (randomIndex === lastMessageIndex);

    lastMessageIndex = randomIndex;

    loveMessage.classList.remove("message-appear");

    loveMessage.textContent = messages[randomIndex];
    loveMessage.classList.remove("hidden");

    void loveMessage.offsetWidth;
    loveMessage.classList.add("message-appear");

    createHearts();
playPop();
createRandomEffects();
});
