import React, { PureComponent } from 'react'
import { AppRegistry } from 'react-native'
import App from './components/App'
import { name as appName } from './app.json';



class ReactNativeTicTacToe extends PureComponent {
  render() {
    return (
      <App />
    )
  }
}

AppRegistry.registerComponent(appName, () => ReactNativeTicTacToe)
