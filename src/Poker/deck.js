function createDeck() {
    var suits = ['H', 'S', 'D', 'C'];
    var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    var deck = [];

    for (var suitCounter = 0; suitCounter < 4; suitCounter++) {
        for(var rankCounter = 0; rankCounter < 13; rankCounter++) {
            deck.push(ranks[rankCounter] + suits[suitCounter]);
        }
    }
    const updateDeck = deck;
    const randomIndex = Math.floor(Math.random() * updateDeck.length);
    const randomCard = updateDeck[randomIndex];

    updateDeck.splice(randomIndex, 1);
    // console.log(updateDeck)
    // console.log(randomCard)
    return ("randomCard " + randomCard, updateDeck);
}

export {createDeck};
