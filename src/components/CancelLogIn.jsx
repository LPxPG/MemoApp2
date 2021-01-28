import React from 'react'
import {
  TouchableOpacity, StyleSheet,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from './Icon'


export default function CancelLogIn() {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.reset({
          index: 0,
          routes: [{
            name: 'MemoList',
          }],
        })
      }}
    >
      <Icon name="delete" size={24} color="rgba(255,255,255, 0.8)" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginRight: 8,
  },
})
