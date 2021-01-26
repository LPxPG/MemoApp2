import React, { useState } from 'react'
import {
  // View, TextInput, StyleSheet, KeyboardAvoidingView, Keyboard,
  View, TextInput, StyleSheet, KeyboardAvoidingView,
} from 'react-native'

import firebase from 'firebase'

// import AppBar from '../components/AppBar'
import CircleButton from '../components/CircleButton'
// import KeyboardSafeView from '../components/KeyboardSafeView'
// KeyboardAvoidingViewの代替：iOSでの絵文字入力中のfix (逆にAndroidで表示が崩れるので未使用)

export default function MemoCreateScreen (props) {
  const { navigation } = props
  const [bodyText, setBodyText] = useState('')

  function handlePress () {
    const { currentUser } = firebase.auth()
    const db = firebase.firestore()
    const ref = db.collection(`users/${currentUser.uid}/memos`)

    ref.add({
      bodyText,
      updatedAt: new Date(),
    })
      .then((docRef) => {
        console.log('Created!', docRef.id)
        navigation.goBack()
      })
      .catch((error) => {
        console.log('Error!', error)
      })
  }

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      {/* behavior : iOSでのcircle buttonの表示位置調整 */}
      {/* <AppBar /> */}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="新規メモ"
          value={bodyText}
          multiline
          style={styles.input}
          onChangeText={(text) => { setBodyText(text) }}
          autoFocus
        />
      </View>

      <CircleButton
        name="check"
        onPress={handlePress}
        // onPress={() => {
        //   navigation.goBack()
        // }}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    paddingVertical: 27,
    paddingHorizontal: 32,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
})
