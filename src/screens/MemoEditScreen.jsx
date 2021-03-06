import React, { useState } from 'react'
import {
  View, TextInput, StyleSheet, KeyboardAvoidingView, Alert, Platform,
} from 'react-native'
import { shape, string } from 'prop-types'
import firebase from 'firebase'

// import AppBar from '../components/AppBar'
import CircleButton from '../components/CircleButton'
// import KeyboardSafeView from '../components/KeyboardSafeView'
// KeyboardAvoidingViewの代替：iOSでの絵文字入力中のfix (逆にAndroidで表示が崩れるので未使用)
import { translateErrors } from '../utils'


export default function MemoEditScreen(props) {
  const { navigation, route } = props
  const { id, bodyText } = route.params
  const [body, setBody] = useState(bodyText)

  function handlePress() {
    const { currentUser } = firebase.auth()
    if (currentUser) {
      const db = firebase.firestore()
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id)

      ref.set({
        bodyText: body,
        updatedAt: new Date(),
      }, { merge: true }) // merge:true 更新対象以外の既存のプロパティがあればマージする。
        .then(() => {
          navigation.goBack()
        })
        .catch((error) => {
          console.log('[firebase error]', error.code, error.message)
          const errorMsg = translateErrors(error.code)
          Alert.alert(errorMsg.title, errorMsg.description)
        })
    }
  }


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'height'} style={styles.container}>
      {/* behavior : iOSでのcircle buttonの表示位置調整 */}
      {/* <AppBar /> */}

      <View style={styles.inputContainer}>
        <TextInput
          value={body}
          multiline
          style={styles.input}
          onChangeText={(text) => { setBody(text) }}
        />
      </View>

      <CircleButton
        name="check"
        onPress={handlePress}
      />
    </KeyboardAvoidingView>
  )
}

MemoEditScreen.propTypes = {
  route: shape({
    params: shape({ id: string, bodyText: string }),
  }).isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    // paddingVertical: 27,
    // paddingHorizontal: 32,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 27,
  },
})
