import React, {useEffect, useState} from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import firebase from 'firebase'

// import AppBar from '../components/AppBar'
import MemoList from '../components/MemoList'
import CircleButton from '../components/CircleButton'
import LogOutButton from '../components/LogOutButton'

export default function MemoListScreen (props) {
  const { navigation } = props
  // const [memos, setMemos] = useState('')

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    })
  }, [])

  // useEffect(() => {
  //   const db = firebase.firestore()
  //   const { currentUser } = firebase.auth()

  //   let unsubscribe = () => {}
  //   if (currentUser) {
  //     const ref = db.collection(`users/${currentUser.uid}/memos`).orderBy('updatedAt', 'desc')

  //     unsubscribe = ref.onSnapshot((snapshot) => {
  //       const userMemos = []

  //       snapshot.forEach((doc) => {
  //         const data = doc.data()

  //         userMemos.push({
  //           id: doc.id,
  //           bodyText: data.bodyText,
  //           updatedAt: data.updatedAt.toDate(),
  //         })
  //       })
  //       setMemos(userMemos)
  //     }, (error) => {
  //       console.log(error)
  //       Alert.alert('データの読み込みに失敗しました。')
  //     })
  //   }

  //   return unsubscribe
  // }, [])

  return (
    <View style={styles.container}>
      {/* <AppBar /> */}
      {/* <MemoList memos={memos} /> */}
      <MemoList />
      <CircleButton
        name="plus"
        onPress={() => {
          navigation.navigate('MemoCreate')
        }}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})
