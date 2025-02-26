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

async function searchCard() {
    const cardName = document.getElementById("search-input").value.trim();
    
    if (!cardName) {
        alert("Por favor, introduce un nombre de carta.");
        return;
    }

    const token = await getToken();
    const response = await fetch(`https://us.api.blizzard.com/hearthstone/cards?textFilter=${encodeURIComponent(cardName)}&locale=es_ES`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();
    
    
    const container = document.getElementById("card-container");
    container.innerHTML = "";

    if (!data.cards || data.cards.length === 0) {
        container.innerHTML = "<p>No se encontró ninguna carta con ese nombre.</p>";
        return;
    }

    
    const uniqueCards = {};
    data.cards.forEach(card => {
        if (!uniqueCards[card.name]) {
            uniqueCards[card.name] = card;
        }
    });

    
    Object.values(uniqueCards).forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.innerHTML = `<img src="${card.image}" alt="${card.name}" />`;
        container.appendChild(cardElement);
    });
}


document.getElementById("search-btn").addEventListener("click", searchCard);


document.getElementById("search-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchCard();
    }
});
