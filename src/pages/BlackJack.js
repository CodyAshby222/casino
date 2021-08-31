import React from "react";
import "../blackJack.css";

class BlackJack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: [],
      dealer: null,
      player: null,
      money: 0,
      inputValue: '',
      bet: null,
      gameOver: false,
      message: null
    };
  }

  generateDeck() {
    const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
    const suits = ['♦', '♣', '♥', '♠'];
    const deck = [];
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < suits.length; j++) {
        deck.push({ number: cards[i], suit: suits[j] });
      }
    }
    return deck;
  }

  dealCards(deck) {
    const playerCard1 = this.getRandomCard(deck);
    const dealerCard1 = this.getRandomCard(playerCard1.updatedDeck);
    const playerCard2 = this.getRandomCard(dealerCard1.updatedDeck);
    const playerStartingHand = [playerCard1.randomCard, playerCard2.randomCard];
    const dealerStartingHand = [dealerCard1.randomCard, {}];

    const player = {
      cards: playerStartingHand,
      count: this.getCount(playerStartingHand)
    };
    const dealer = {
      cards: dealerStartingHand,
      count: this.getCount(dealerStartingHand)
    };

    return { updatedDeck: playerCard2.updatedDeck, player, dealer };
  }

  startNewGame(type) {
    if (type === 'continue') {
      if (this.state.money > 0) {
        const deck = (this.state.deck.length < 10) ? this.generateDeck() : this.state.deck;
        const { updatedDeck, player, dealer } = this.dealCards(deck);

        this.setState({
          deck: updatedDeck,
          dealer,
          player,
          bet: null,
          gameOver: false,
          message: null
        });
      } else {
        this.setState({ message: 'Game over!' });
      }
    } else {
      const deck = this.generateDeck();
      const { updatedDeck, player, dealer } = this.dealCards(deck);

      this.setState({
        deck: updatedDeck,
        dealer,
        player,
        money: 100,
        inputValue: '',
        bet: null,
        gameOver: false,
        message: null
      });
    }
  }

  getRandomCard(deck) {
    const updatedDeck = deck;
    const randomIndex = Math.floor(Math.random() * updatedDeck.length);
    const randomCard = updatedDeck[randomIndex];

    updatedDeck.splice(randomIndex, 1);
    return { randomCard, updatedDeck };
  }

  placeBet() {
    const bet = this.state.inputValue;

    if (bet > this.state.money) {
      this.setState({ message: `You don't have enough to do that. You have ${"$" + this.state.money} to use.` });
    } else if (bet % 1 !== 0) {
      this.setState({ message: 'Bet using numeric numbers only!' });
    } else {
      const money = this.state.money - bet;
      this.setState({ money, inputValue: '', bet });
    }
  }

  hit() {
    if (!this.state.gameOver) {
      if (this.state.bet) {
        const { randomCard, updatedDeck } = this.getRandomCard(this.state.deck);
        const player = this.state.player;
        player.cards.push(randomCard);
        player.count = this.getCount(player.cards);

        if (player.count > 21) {
          this.setState({
            player,
            gameOver: true,
            message: 'BUST!'
          });
        }
        else if (player.count === 21) {
          this.setState({
            player,
            money: this.state.money + this.state.currentBet * 2 + this.currentBet,
            gameOver: true,
            message: 'Jackblack! You win!'
          });
        } else {
          this.setState({ deck: updatedDeck, player });
        }
      } else {
        this.setState({ message: 'Please place a bet.' });
      }
    } else {
      this.setState({ message: 'Game over!' });
    }
  }


  dealerDraw(dealer, deck) {
    const { randomCard, updatedDeck } = this.getRandomCard(deck);
    dealer.cards.push(randomCard);
    dealer.count = this.getCount(dealer.cards);
    return { dealer, updatedDeck };
  }

  stand() {
    if (!this.state.gameOver) {
      // Show dealer's 2nd card
      const randomCard = this.getRandomCard(this.state.deck);
      let deck = randomCard.updatedDeck;
      let dealer = this.state.dealer;
      dealer.cards.pop();
      dealer.cards.push(randomCard.randomCard);
      dealer.count = this.getCount(dealer.cards);

      // Keep drawing cards until count is 17 or more
      // <= 16 less than or equal to 16
      while (dealer.count < 17) {
        const draw = this.dealerDraw(dealer, deck);
        dealer = draw.dealer;
        deck = draw.updatedDeck;
      }

      if (dealer.count > 21) {
        this.setState({
          deck,
          dealer,
          money: this.state.money + this.state.currentBet * 2,
          gameOver: true,
          message: 'Dealer bust! You win!'
        });
      } else {
        const winner = this.getWinner(dealer, this.state.player);
        let money = this.state.money;
        let message;

        if (winner === 'dealer') {
          message = 'Dealer wins!';
          //payouts
        } else if (winner === 'player') {
          money += this.state.currentBet * 2;
          message = 'You win!';
        } else {
          money += this.state.currentBet;
          message = 'Push.';
        }

        this.setState({
          deck,
          dealer,
          money,
          gameOver: true,
          message
        });
      }
    } else {
      this.setState({ message: 'Game over! Please start a new game.' });
    }
  }

  getCount(cards) {
    const rearranged = [];
    cards.forEach(card => {
      if (card.number === 'A') {
        rearranged.push(card);
      } else if (card.number) {
        rearranged.unshift(card);
      }
    });

    return rearranged.reduce((total, card) => {
      if (card.number === 'J' || card.number === 'Q' || card.number === 'K') {
        return total + 10;
      } else if (card.number === 'A') {
        return (total + 11 <= 21) ? total + 11 : total + 1;
      } else {
        return total + card.number;
      }
    }, 0);
  }

  getWinner(dealer, player) {
    if (dealer.count > player.count) {
      return 'dealer';
    } else if (dealer.count < player.count) {
      return 'player';
    } else {
      return 'push';
    }
  }

  inputChange(e) {
    const inputValue = +e.target.value;
    this.setState({ inputValue });
  }

  handleKeyDown(e) {
    const enter = 13;
    if (e.keyCode === enter) {
      this.placeBet();
    }
  }

  componentWillMount() {
    this.startNewGame();
    const body = document.querySelector('body');
    body.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  render() {
    let dealerCount;
    const card1 = this.state.dealer.cards[0].number;
    const card2 = this.state.dealer.cards[1].number;
    if (card2) {
      dealerCount = this.state.dealer.count;
    } else {
      if (card1 === 'J' || card1 === 'Q' || card1 === 'K') {
        dealerCount = 10;
      } else if (card1 === 'A') {
        dealerCount = 11;
      } else {
        dealerCount = card1;
      }
    }

    return (
      <div className="blackJackBoard">
        <div className="btnBetsMain">
          <div className="buttons">
            <button onClick={() => { this.startNewGame() }}>New Game</button>
            <div className="money">CHIPS: <br />${this.state.money}</div>
            <div onClick={() => { this.stand() }} className="btnBets">STAND</div>
            <div onClick={() => { this.hit() }} className="btnBets">HIT</div>
          </div>
          {
            !this.state.bet ?
              <div>
                <form>
                  <input type="text" name="bet" placeholder="Bet Amount" value={this.state.inputValue} onChange={this.inputChange.bind(this)} />
                </form>
                <button onClick={() => { this.placeBet() }}>Place Bet</button>
              </div>
              : null
          }
          {
            this.state.gameOver ?
              <div className="buttons">
                <button onClick={() => { this.startNewGame('continue') }}>Continue</button>
              </div>
              : null
          }
        </div>
        <div className="playerCards">

          <div className="backPosition">
            <div className="cardBack"></div>
          </div>
          <div className="dealerTotal">{this.state.dealer.count}</div>
          <div className="dealerHand">
            {this.state.dealer.cards.map((card, i) => {
              return <div className={`dcard${i}`}><Card key={i} number={card.number} suit={card.suit} /></div>;
            })}
          </div>
          <div className="message">{this.state.message}</div>
          <div className="playerTotal" style={this.state.message === null ? {marginTop: 464} : {marginTop: 65}}>{this.state.player.count}</div>
          <div className="playerHand">
            {this.state.player.cards.map((card, i) => {
              return <div className={`card${i}`}><Card key={i} number={card.number} suit={card.suit} /></div>
            })}
          </div>
        </div>
      </div>
    );
  }
};

const Card = ({ number, suit }) => {
  const combo = (number) ? `${number}${suit}` : null;
  // console.log(combo)

  if (combo === "A♥") {
    return (
      <div className="heartsAce">
      </div>
    )
  }
  if (combo === "2♥") {
    return (
      <div className="heartsTwo">
      </div>
    )
  }
  if (combo === "3♥") {
    return (
      <div className="heartsThree">
      </div>
    )
  }
  if (combo === "4♥") {
    return (
      <div className="heartsFour">
      </div>
    )
  }
  if (combo === "5♥") {
    return (
      <div className="heartsFive">
      </div>
    )
  }
  if (combo === "6♥") {
    return (
      <div className="heartsSix">
      </div>
    )
  }
  if (combo === "7♥") {
    return (
      <div className="heartsSeven">
      </div>
    )
  }
  if (combo === "8♥") {
    return (
      <div className="heartsEight">
      </div>
    )
  }
  if (combo === "9♥") {
    return (
      <div className="heartsNine">
      </div>
    )
  }
  if (combo === "10♥") {
    return (
      <div className="heartsTen">
      </div>
    )
  }
  if (combo === "J♥") {
    return (
      <div className="heartsJack">
      </div>
    )
  }
  if (combo === "Q♥") {
    return (
      <div className="heartsQueen">
      </div>
    )
  }
  if (combo === "K♥") {
    return (
      <div className="heartsKing">
      </div>
    )
  }
  if (combo === "A♣") {
    return (
      <div className="clubsAce">
      </div>
    )
  }
  if (combo === "2♣") {
    return (
      <div className="clubsTwo">
      </div>
    )
  }
  if (combo === "3♣") {
    return (
      <div className="clubsThree">
      </div>
    )
  }
  if (combo === "4♣") {
    return (
      <div className="clubsFour">
      </div>
    )
  }
  if (combo === "5♣") {
    return (
      <div className="clubsFive">
      </div>
    )
  }
  if (combo === "6♣") {
    return (
      <div className="clubsSix">
      </div>
    )
  }
  if (combo === "7♣") {
    return (
      <div className="clubsSeven">
      </div>
    )
  }
  if (combo === "8♣") {
    return (
      <div className="clubsEight">
      </div>
    )
  }
  if (combo === "9♣") {
    return (
      <div className="clubsNine">
      </div>
    )
  }
  if (combo === "10♣") {
    return (
      <div className="clubsTen">
      </div>
    )
  }
  if (combo === "J♣") {
    return (
      <div className="clubsJack">
      </div>
    )
  }
  if (combo === "Q♣") {
    return (
      <div className="clubsQueen">
      </div>
    )
  }
  if (combo === "K♣") {
    return (
      <div className="clubsKing">
      </div>
    )
  }
  if (combo === "K♠") {
    return (
      <div className="spadesKing">
      </div>
    )
  }
  if (combo === "A♠") {
    return (
      <div className="spadesAce">
      </div>
    )
  }
  if (combo === "2♠") {
    return (
      <div className="spadesTwo">
      </div>
    )
  }
  if (combo === "3♠") {
    return (
      <div className="spadesThree">
      </div>
    )
  }
  if (combo === "4♠") {
    return (
      <div className="spadesFour">
      </div>
    )
  }
  if (combo === "5♠") {
    return (
      <div className="spadesFive">
      </div>
    )
  }
  if (combo === "6♠") {
    return (
      <div className="spadesSix">
      </div>
    )
  }
  if (combo === "7♠") {
    return (
      <div className="spadesSeven">
      </div>
    )
  }
  if (combo === "8♠") {
    return (
      <div className="spadesEight">
      </div>
    )
  }
  if (combo === "9♠") {
    return (
      <div className="spadesNine">
      </div>
    )
  }
  if (combo === "10♠") {
    return (
      <div className="spadesTen">
      </div>
    )
  }
  if (combo === "J♠") {
    return (
      <div className="spadesJack">
      </div>
    )
  }
  if (combo === "Q♠") {
    return (
      <div className="spadesQueen">
      </div>
    )
  }
  if (combo === "K♠") {
    return (
      <div className="spadesKing">
      </div>
    )
  }
  if (combo === "A♦") {
    return (
      <div className="diamondsAce">
      </div>
    )
  }
  if (combo === "2♦") {
    return (
      <div className="diamondsTwo">
      </div>
    )
  }
  if (combo === "3♦") {
    return (
      <div className="diamondsThree">
      </div>
    )
  }
  if (combo === "4♦") {
    return (
      <div className="diamondsFour">
      </div>
    )
  }
  if (combo === "5♦") {
    return (
      <div className="diamondsFive">
      </div>
    )
  }
  if (combo === "6♦") {
    return (
      <div className="diamondsSix">
      </div>
    )
  }
  if (combo === "7♦") {
    return (
      <div className="diamondsSeven">
      </div>
    )
  }
  if (combo === "8♦") {
    return (
      <div className="diamondsEight">
      </div>
    )
  }
  if (combo === "9♦") {
    return (
      <div className="diamondsNine">
      </div>
    )
  }
  if (combo === "10♦") {
    return (
      <div className="diamondsTen">
      </div>
    )
  }
  if (combo === "J♦") {
    return (
      <div className="diamondsJack">
      </div>
    )
  }
  if (combo === "Q♦") {
    return (
      <div className="diamondsQueen">
      </div>
    )
  }
  if (combo === "K♦") {
    return (
      <div className="diamondsKing">
      </div>
    )
  }
  return (
    <div className="card">
      <div>
      </div>
    </div>
  )
}


export default BlackJack;
