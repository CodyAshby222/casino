import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import React, { useState, useEffect } from "react";
//import { createDeck} from "../Poker/deck";
import "../poker.css"
import Chips from "../components/Chips.jsx";
import Rules from "../components/Rules";
import { pokerRules } from "../rules/pokerRules.js";
import "../Poker/cards.css";

  class PokerPlay extends React.Component {
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

    ChipHandler() {
      const chipValue = this.state.chip;
      this.setState((state) => {
        return {chip: state.chipValue}
      })
    };
  
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
  
  
    dealerDraw(dealer, deck) {
      const { randomCard, updatedDeck } = this.getRandomCard(deck);
      dealer.cards.push(randomCard);
      dealer.count = this.getCount(dealer.cards);
      return { dealer, updatedDeck };
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
  
    inputChange(e) {
      const inputValue = +e.target.value;
      this.setState({ inputValue });
    }
  
    handleKeyDown(e) {
      const enter = 13;
      console.log(e.keyCode);
  
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
        <div className="pokerBoard">
          <div className="btnBet">
            <div className="">
              <button onClick={() => { this.startNewGame() }}>New Game</button>
            </div>
            {
              this.state.gameOver ?
                <div className="buttons">
                  <button onClick={() => { this.startNewGame('continue') }}>Continue</button>
                </div>
                : null
            }
          </div>
          <div className="dealerTop">Total: {this.state.dealer.count}</div>
          <div className="dealerHand">
            {this.state.dealer.cards.map((card, i) => {
              return <Card key={i} number={card.number} suit={card.suit} />;
            })}
          </div>
          <div>{this.state.message}</div>
          <div className="dealerBottom">Your Total: ({this.state.player.count})</div>
          <div className="playerCardsMain">
            <div className="playerCards">
              {this.state.player.cards.map((card, i) => {
                return <Card key={i} number={card.number} suit={card.suit} />
              })}
            </div>
          </div>
          <Chips setChipSelected={this.ChipHandler} />
        </div>
      );
    }
  }

  const Card = ({ number, suit }) => {
    const combo = (number) ? `${number}${suit}` : null;
    console.log(combo)
  
    if (combo === "A♥") {
      return (
        <div className="heartsAce">
          {combo}
        </div>
      )
    }
    if (combo === "2♥") {
      return (
        <div className="heartsTwo">
          {combo}
        </div>
      )
    }
    if (combo === "3♥") {
      return (
        <div className="heartsThree">
          {combo}
        </div>
      )
    }
    if (combo === "4♥") {
      return (
        <div className="heartsFour">
          {combo}
        </div>
      )
    }
    if (combo === "5♥") {
      return (
        <div className="heartsFive">
          {combo}
        </div>
      )
    }
    if (combo === "6♥") {
      return (
        <div className="heartsSix">
          {combo}
        </div>
      )
    }
    if (combo === "7♥") {
      return (
        <div className="heartsSeven">
          {combo}
        </div>
      )
    }
    if (combo === "8♥") {
      return (
        <div className="heartsEight">
          {combo}
        </div>
      )
    }
    if (combo === "9♥") {
      return (
        <div className="heartsNine">
          {combo}
        </div>
      )
    }
    if (combo === "10♥") {
      return (
        <div className="heartsTen">
          {combo}
        </div>
      )
    }
    if (combo === "J♥") {
      return (
        <div className="heartsJack">
          {combo}
        </div>
      )
    }
    if (combo === "Q♥") {
      return (
        <div className="heartsQueen">
          {combo}
        </div>
      )
    }
    if (combo === "K♥") {
      return (
        <div className="heartsKing">
          {combo}
        </div>
      )
    }
    if (combo === "A♣") {
      return (
        <div className="clubsAce">
          {combo}
        </div>
      )
    }
    if (combo === "2♣") {
      return (
        <div className="clubsTwo">
          {combo}
        </div>
      )
    }
    if (combo === "3♣") {
      return (
        <div className="clubsThree">
          {combo}
        </div>
      )
    }
    if (combo === "4♣") {
      return (
        <div className="clubsFour">
          {combo}
        </div>
      )
    }
    if (combo === "5♣") {
      return (
        <div className="clubsFive">
          {combo}
        </div>
      )
    }
    if (combo === "6♣") {
      return (
        <div className="clubsSix">
          {combo}
        </div>
      )
    }
    if (combo === "7♣") {
      return (
        <div className="clubsSeven">
          {combo}
        </div>
      )
    }
    if (combo === "8♣") {
      return (
        <div className="clubsEight">
          {combo}
        </div>
      )
    }
    if (combo === "9♣") {
      return (
        <div className="clubsNine">
          {combo}
        </div>
      )
    }
    if (combo === "10♣") {
      return (
        <div className="clubsTen">
          {combo}
        </div>
      )
    }
    if (combo === "J♣") {
      return (
        <div className="clubsJack">
          {combo}
        </div>
      )
    }
    if (combo === "Q♣") {
      return (
        <div className="clubsQueen">
          {combo}
        </div>
      )
    }
    if (combo === "K♣") {
      return (
        <div className="clubsKing">
          {combo}
        </div>
      )
    }
    if (combo === "K♠") {
      return (
        <div className="spadeKing">
          {combo}
        </div>
      )
    }
    if (combo === "A♠") {
      return (
        <div className="spadeAce">
          {combo}
        </div>
      )
    }
    if (combo === "2♠") {
      return (
        <div className="spadeTwo">
          {combo}
        </div>
      )
    }
    if (combo === "3♠") {
      return (
        <div className="spadeThree">
          {combo}
        </div>
      )
    }
    if (combo === "4♠") {
      return (
        <div className="spadeFour">
          {combo}
        </div>
      )
    }
    if (combo === "5♠") {
      return (
        <div className="spadeFive">
          {combo}
        </div>
      )
    }
    if (combo === "6♠") {
      return (
        <div className="spadeSix">
          {combo}
        </div>
      )
    }
    if (combo === "7♠") {
      return (
        <div className="spadeSeven">
          {combo}
        </div>
      )
    }
    if (combo === "8♠") {
      return (
        <div className="spadeEight">
          {combo}
        </div>
      )
    }
    if (combo === "9♠") {
      return (
        <div className="spadeNine">
          {combo}
        </div>
      )
    }
    if (combo === "10♠") {
      return (
        <div className="spadeTen">
          {combo}
        </div>
      )
    }
    if (combo === "J♠") {
      return (
        <div className="spadeJack">
          {combo}
        </div>
      )
    }
    if (combo === "Q♠") {
      return (
        <div className="spadeQueen">
          {combo}
        </div>
      )
    }
    if (combo === "K♠") {
      return (
        <div className="spadeKing">
          {combo}
        </div>
      )
    }
    if (combo === "A♦") {
      return (
        <div className="diamondsAce">
          {combo}
        </div>
      )
    }
    if (combo === "2♦") {
      return (
        <div className="diamondsTwo">
          {combo}
        </div>
      )
    }
    if (combo === "3♦") {
      return (
        <div className="diamondsThree">
          {combo}
        </div>
      )
    }
    if (combo === "4♦") {
      return (
        <div className="diamondsFour">
          {combo}
        </div>
      )
    }
    if (combo === "5♦") {
      return (
        <div className="diamondsFive">
          {combo}
        </div>
      )
    }
    if (combo === "6♦") {
      return (
        <div className="diamondsSix">
          {combo}
        </div>
      )
    }
    if (combo === "7♦") {
      return (
        <div className="diamondsSeven">
          {combo}
        </div>
      )
    }
    if (combo === "8♦") {
      return (
        <div className="diamondsEight">
          {combo}
        </div>
      )
    }
    if (combo === "9♦") {
      return (
        <div className="diamondsNine">
          {combo}
        </div>
      )
    }
    if (combo === "10♦") {
      return (
        <div className="diamondsTen">
          {combo}
        </div>
      )
    }
    if (combo === "J♦") {
      return (
        <div className="diamondsJack">
          {combo}
        </div>
      )
    }
    if (combo === "Q♦") {
      return (
        <div className="diamondsQueen">
          {combo}
        </div>
      )
    }
    if (combo === "K♦") {
      return (
        <div className="diamondsKing">
          {combo}
        </div>
      )
    }
    return (
      <div className="card">
        <div>
          {combo}
        </div>
      </div>
    )
  }
  
  
  export default PokerPlay;