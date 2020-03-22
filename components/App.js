import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'

import Header from './Header'
import GameBoard from './GameBoard'

export default class App extends Component {
  state = {
    gameStarted: false,

    human: 0,
    computer: 0,
    toe: 0
  };

  startGame() {
    this.setState({ gameStarted: true })
  }


  componentDidMount() {
    AsyncStorage.multiGet(['human', 'computer', 'toe'], (err, result) => {
      if (!err) {

        this.setState({
          human: result[0][1] ? JSON.parse(result[0][1]) : 0,
          computer: result[1][1] ? JSON.parse(result[1][1]) : 0,
          toe: result[2][1] ? JSON.parse(result[2][1]) : 0
        })
      }
    })
  }

  render() {
    const { gameStarted, human, computer, toe } = this.state

    return (
      <View style={styles.container}>
        <Header />
        {
          gameStarted ? (
            <GameBoard />
          ) : (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.welcome}>
                  Bem vindo ao Jogo da velha
              </Text>

                <TouchableOpacity style={{ width: '100%', backgroundColor: '#b20000', borderRadius: 10, alignItems: 'center', justifyContent: 'center', padding: 6, margin: 10, elevation: 10 }} onPress={() => this.startGame()}>
                  <Text style={{ ...styles.instructions, marginTop: 0, color: 'light-gray', fontStyle: 'italic', fontFamily: 'sans-serif' }}>
                    Clique aqui para começar
                </Text>
                </TouchableOpacity>
              </View>
            )
        }

        <Text style={styles.text}>Resultados</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.instructions}> Humano: {human}</Text>
          <Text style={styles.instructions}> Computador: {computer}</Text>
          <Text style={styles.instructions}> Empate: {toe}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000',
  },
  welcome: {
    fontSize: 20,
    marginTop: 50,
    color: '#fff'
  },
  instructions: {
    textAlign: 'center',
    marginTop: 20,
    color: '#a6a6a6',
    marginBottom: 5,
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  text: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff'
  },
})
