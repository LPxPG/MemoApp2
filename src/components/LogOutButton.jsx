import React from 'react'
import {
  TouchableOpacity, Text, StyleSheet, Alert,
} from 'react-native'
import firebase from 'firebase'
import { useNavigation } from '@react-navigation/native'
import { func, shape } from 'prop-types'


// export default function LogOutButton() {
export default function LogOutButton(props) {
  const { cleanupFuncs } = props
  const navigation = useNavigation()

  // function handlePress() {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       // // React Hooks はコンポーネント直下で呼び出す必要
  //       // const navigation = useNavigation()
  //       navigation.reset({
  //         index: 0,
  //         routes: [{ name: 'LogIn' }],
  //       })
  //     })
  //     .catch((error) => {
  //       console.log('[firebase error]', error.code, error.message)
  //       Alert.alert('ログアウトに失敗しました')
  //     })
  // }

  function handlePress() {
    Alert.alert('ログアウトします', 'よろしいですか？', [{
      text: 'キャンセル',
      onPress: () => {},
    },
    {
      text: 'OK',
      onPress: () => {
        cleanupFuncs.memos()
        cleanupFuncs.auth()
        firebase.auth().signOut()
          .then(() => {
            navigation.reset({
              index: 0,
              routes: [{
                name: 'MemoList',
              }],
            })
          })
          .catch(() => {
            Alert.alert('ログアウトに失敗しました')
          })
      },
    },
    ])
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
    >
      <Text style={styles.label}>
        ログアウト
      </Text>
    </TouchableOpacity>
  )
}


LogOutButton.propTypes = {
  cleanupFuncs: shape({
    auth: func,
    memos: func,
  }).isRequired,
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    color: 'rgba(255,255,255, 0.7)',
  },
})
