import React from 'react'
import {
  // View, TextInput, StyleSheet, KeyboardAvoidingView, Keyboard,
  View, TextInput, StyleSheet, KeyboardAvoidingView,
} from 'react-native'

import AppBar from '../components/AppBar'
import CircleButton from '../components/CircleButton'
// import KeyboardSafeView from '../components/KeyboardSafeView'
// KeyboardAvoidingViewの代替：iOSでの絵文字入力中のfix (逆にAndroidで表示が崩れるので未使用)

export default function MemoCreateScreen () {
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      {/* behavior : iOSでのcircle buttonの表示位置調整 */}
      <AppBar />

      <View style={styles.inputContainer}>
        {/* <TextInput placeholder="新規メモ" value="" multiline style={styles.input} onSubmitEditing={Keyboard.dismiss} /> */}
        <TextInput placeholder="新規メモ" value="" multiline style={styles.input} />
      </View>

      <CircleButton name="check" />
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
