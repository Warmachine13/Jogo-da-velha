import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#000'
  },
  board: {
    width: 312,
    height: 312,
    borderWidth: 3,
    borderColor: '#fff'
  },
  line: {
    position: 'absolute',
    width: 3,
    height: 306,
    backgroundColor: '#fff',
    transform: [
      { translateX: 100 }
    ]
  }
})
