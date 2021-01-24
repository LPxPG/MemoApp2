import React, {useState} from 'react'
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
} from 'react-native'

// import AppBar from '../components/AppBar'
import Button from '../components/Button'

export default function SignUpScreen (props) {
  const { navigation } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      {/* <AppBar /> */}

      <View style={styles.inner}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={(text) => { setEmail(text) }}
          autoCapitalize="none" // iOS用
          keyboardType="email-address" // キーボードレイアトをemail向けに
          textContentType="emailAddress" // iOS キーチェーン用
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => { setPassword(text) }}
          autoCapitalize="none" // iOS用
          secureTextEntry
          textContentType="password" // iOS キーチェーン用
        />

        <Button
          label="Submit"
          onPress={() => {
            navigation.reset({ // navigation履歴を操作 : 遷移後の戻るボタンを無効化
              index: 0,
              routes: [{
                name: 'MemoList',
              }],
            })
          }}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registered?</Text>
          <TouchableOpacity onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'LogIn'}],
            })
          }}
          >
            <Text style={styles.footerLink}>
              Log In.
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
  },
  inner: {
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    height: 48,
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: '#fff',
    borderRadius: 2,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#467fd3',
  },
  footer: {
    flexDirection: 'row',
  },

})

