const clientId = "c21eadc5917e4070bf254e1b9c783ea2";
const clientSecret = "AOQkoZo7k4QbU0vpOsyG5L6HCjMVNWvx";

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

async function fetchDeck() {
    const deckCode = document.getElementById("deck-code").value.trim();

    const token = await getToken();
    const response = await fetch(`https://us.api.blizzard.com/hearthstone/deck?locale=es_ES&code=${encodeURIComponent(deckCode)}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();
    
    const container = document.getElementById("deck-container");
    container.innerHTML = "";

    if (!data.cards) {
        container.innerHTML = "<p>No se encontró el mazo.</p>";
        return;
    }

    data.cards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.innerHTML = `<img src="${card.image}" alt="${card.name}" />`;
        container.appendChild(cardElement);
    });
}

document.getElementById("search-btn").addEventListener("click", fetchDeck);
