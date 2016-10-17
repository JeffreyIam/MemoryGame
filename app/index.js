import React from 'react'
import ReactDOM from 'react-dom'
import {range, flatten, shuffle} from 'lodash'

var App = React.createClass({
  getInitialState: function() {
    return {
      cards: flatten(range(10).map((numPair, index) => range(2).map((number) =>
        ({value: index+ 1, found: false})))),
      firstClicked: null,
      secondClicked: null,
      cardCount: 0
    }
  },
  flipCard: function(card, index) {
    var {cards, firstClicked, secondClicked, cardCount} = this.state
    cardCount += 1
    if(firstClicked == null || cardCount % 2 !== 0) {
      this.setState({
      firstClicked: index,
      cardCount: cardCount
      })
    } else {
      this.setState({
        secondClicked: index,
        cardCount: cardCount
      })
      if(cardCount % 2 === 0) {
        if(cards[firstClicked].value === cards[index].value) {
          cards[firstClicked].found = true
          cards[index].found = true
        } else {
          this.setState({
            secondClicked: index
          })
          setTimeout(() => {
            this.setState({
              firstClicked: null,
              secondClicked: null
            })
          }, 1000)
        }
      }
    }
  },
  shuffleCards: function() {
    var {cards} = this.state
    this.setState({
      cards: shuffle(cards)
    })
  },
  giveUp: function() {
    var {cards} = this.state
    for(var i = 0; i < cards.length; i++) {
      cards[i].found = true
    }
    this.setState({
      cards: cards
    })
  },
  reset: function() {
    this.setState({
      cards: flatten(range(10).map((numPair, index) => range(2).map((number) =>
        ({value: index+ 1, found: false})))),
      firstClicked: null,
      secondClicked: null,
      cardCount: 0
      })
  },
  render: function() {
    return (
      <div className="col-xs-1">
        <table className = "table table-bordered table-hover table-condensed">
          <tbody>
            {this.state.cards.map((card, index) => (
              <tr key={index} onClick={() => this.flipCard(card, index)}>
                {this.state.firstClicked === index || this.state.secondClicked === index || card.found === true ? <td key={index}> {card.value} </td> : <td key={index}> Back Of Card </td> }
              </tr>
              ))}
          </tbody>
        </table>
        {this.state.cardCount > 0
          ? <div><p>Game in Progress</p><button className="btn-primary" onClick={this.giveUp}>Give Up</button><button className="btn-danger" onClick={this.reset}>Reset</button></div>
          : <button className="btn-success" onClick={this.shuffleCards}>Shuffle</button>}
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'))