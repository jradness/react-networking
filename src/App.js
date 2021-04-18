import React from 'react';
import './App.css';
import HttpService from "./service";
import Card from './components/Card/Card';

const http = new HttpService()

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      cardList: [],
      loading: false,
    }
  }

  loadData = () => {
    http.fetchAllPokemon().then((data) => {
      if (data.length) this.setState({ pokemonList: data});
    });
  }

  loadCardList = () => {
    http.getCardList().then((cards) => {
      if (cards.length) {
        this.setState({ cardList: cards });
      }
    })
  }

  componentDidMount() {
    this.loadData();
    this.loadCardList();
  }

  addPokemon = (data) => () => {
    const hasItem = this.state.cardList.some((item) => item.name === data.name);
    if (!hasItem) {
      http.postItem(data).then(() => this.loadCardList())
    } else {
      console.log('Has item');
    }
  }

  render() {
    const { pokemonList, cardList } = this.state;
    return (
      <div className="App">
        <div className="container">
          <h1>Pokemon API</h1>
          <div className="list-wrapper">
            {pokemonList.length ? pokemonList.map((poke) => (
              <div key={poke.name} className="pokemon-btn" onClick={this.addPokemon(poke)}>{poke.name}</div>
            )) : null}
          </div>
        </div>
        <div className="container">
          <h1>My Fav</h1>
          <div className="list">
            {cardList.length ? cardList.map((item) => (
                <Card key={item.name} data={item} />
            )) : <div>No Fav</div> }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
