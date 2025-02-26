const clientId = "c21eadc5917e4070bf254e1b9c783ea2";
const clientSecret = "AOQkoZo7k4QbU0vpOsyG5L6HCjMVNWvx";

let currentClassIndex = 0;
const classes = [
    "hunter", "mage", "paladin", "priest", "rogue", 
    "shaman", "warlock", "warrior", "druid", "demonhunter", "deathknight"
];
let allCardsByClass = {};

async function getToken() {
    const response = await fetch("https://oauth.battle.net/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    });

    const data = await response.json();
    return data.access_token;
}

async function fetchCardsByClass(className) {
    if (allCardsByClass[className]) {
        displayCards();
        return;
    }

    const token = await getToken();
    let page = 1;
    let allCards = [];
    let totalPages = 1;

    do {
        const response = await fetch(`https://us.api.blizzard.com/hearthstone/cards?class=${className}&locale=es_ES&page=${page}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error(`Error al obtener datos para ${className}, página ${page}:`, response.statusText);
            break;
        }

        const data = await response.json();

        if (data.cards && data.cards.length > 0) {
            allCards = allCards.concat(data.cards);
        } else {
            break;
        }

        totalPages = data.pageCount || totalPages;
        page++;

    } while (page <= totalPages);

    
    allCardsByClass[className] = filterUniqueCards(allCards);
    displayCards();
}


function filterUniqueCards(cards) {
    const uniqueCards = {};
    cards.forEach(card => {
        if (card.name && !uniqueCards[card.name]) {
            uniqueCards[card.name] = card;
        }
    });
    return Object.values(uniqueCards);
}

function displayCards() {
    const className = classes[currentClassIndex];
    document.getElementById("class-title").textContent = `Clase: ${className.charAt(0).toUpperCase() + className.slice(1)}`;

    const container = document.getElementById("cards-container");
    container.innerHTML = "";

    if (!allCardsByClass[className] || allCardsByClass[className].length === 0) {
        container.innerHTML = "<p>No se encontraron cartas para esta clase.</p>";
        return;
    }

    allCardsByClass[className].forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.innerHTML = `<img src="${card.image}" alt="${card.name}" />`;
        container.appendChild(cardElement);
    });

    updatePaginationButtons();
}

function updatePaginationButtons() {
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    prevBtn.disabled = currentClassIndex === 0;
    nextBtn.disabled = currentClassIndex === classes.length - 1;
}

document.getElementById("next-btn").addEventListener("click", nextClass);
document.getElementById("prev-btn").addEventListener("click", prevClass);

function nextClass() {
    if (currentClassIndex < classes.length - 1) {
        currentClassIndex++;
        fetchCardsByClass(classes[currentClassIndex]);
    }
}

function prevClass() {
    if (currentClassIndex > 0) {
        currentClassIndex--;
        fetchCardsByClass(classes[currentClassIndex]);
    }
}

fetchCardsByClass(classes[currentClassIndex]);
