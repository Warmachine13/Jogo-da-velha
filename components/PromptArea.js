import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Vibration
} from 'react-native'

import {
  GAME_RESULT_NO,
  GAME_RESULT_USER,
  GAME_RESULT_AI,
  GAME_RESULT_TIE
} from '../constants/game'

import {
  AdMobBanner,
  AdMobInterstitial
} from 'react-native-admob'


export default class Header extends Component {

  state = {
    human: 0,
    computer: 0,
    toe: 0
  }

  componentDidMount() {

    AdMobInterstitial.setAdUnitID('ca-app-pub-3408462666302033/5408788243');

    this.showAd = () => AdMobInterstitial.requestAd().then(() =>
      AdMobInterstitial.showAd()
    );
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

  getSnapshotBeforeUpdate(s, pos) {
    let { human, computer, toe } = this.state;
    switch (s.result) {
      case GAME_RESULT_USER:
        this.setState({ human: human + 1 })
        AsyncStorage.setItem('human', JSON.stringify(human + 1));
        Vibration.vibrate(1000);
        this.showAd();
        return 'Você ganhou'
      case GAME_RESULT_AI:
        this.setState({ computer: computer + 1 })
        AsyncStorage.setItem('computer', JSON.stringify(computer + 1));
        Vibration.vibrate(2000);
        this.showAd();
        return 'Computador Ganhou a partida'
      case GAME_RESULT_TIE:
        this.setState({ toe: toe + 1 })
        AsyncStorage.setItem('toe', JSON.stringify(toe + 1));
        Vibration.vibrate(1000);
        this.showAd();
        return 'Empate'
      default:
        return ''
    }
  }

  generateResultText(result: number) {
    switch (result) {
      case GAME_RESULT_USER:
        return 'Você ganhou'
      case GAME_RESULT_AI:
        return 'Computador Ganhou a partida'
      case GAME_RESULT_TIE:
        return 'Empate'
      default:
        return ''
    }
  }

  render() {
    const { result, onRestart } = this.props;
    let { human, computer, toe } = this.state;

    return (
      <View style={{ backgroundColor: '#000', flex: 1 }}>

        <Text style={styles.text}>{this.generateResultText(result)}</Text>


        {
          result !== GAME_RESULT_NO && (
            <TouchableOpacity style={{ width: '100%', backgroundColor: '#1919ff', borderRadius: 10, alignItems: 'center', justifyContent: 'center', padding: 6, margin: 10, elevation: 10 }} onPress={onRestart}>
              <Text style={styles.instructions}>
                Clique aqui para recomeçar
              </Text>
            </TouchableOpacity>
          )
        }

        <Text style={styles.text}>Resultados</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.instructions}> Humano: {human}</Text>
          <Text style={styles.instructions}> Computador: {computer}</Text>
          <Text style={styles.instructions}> Empate: {toe}</Text>
        </View>
        {/* 
        <View style={{ flex: 1, backgroundColor: 'white' }}>

        </View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff'
  },
  instructions: {
    marginTop: 20,
    color: 'white',
    marginBottom: 5,
    textAlign: 'center'
  },
})
