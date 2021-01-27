import React, { useEffect, useState } from 'react'
import {
  View, StyleSheet, Alert, Text,
} from 'react-native'
import firebase from 'firebase'

// import AppBar from '../components/AppBar'
import MemoList from '../components/MemoList'
import CircleButton from '../components/CircleButton'
import LogOutButton from '../components/LogOutButton'
import Button from '../components/Button'
import Loading from '../components/Loading'

export default function MemoListScreen(props) {
  const { navigation } = props
  const [memos, setMemos] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    })
  }, [])

  useEffect(() => {
    const db = firebase.firestore()
    const { currentUser } = firebase.auth()

    let unsubscribe = () => {}
    if (currentUser) {
      setLoading(true)
      const ref = db.collection(`users/${currentUser.uid}/memos`).orderBy('updatedAt', 'desc')

      unsubscribe = ref.onSnapshot((snapshot) => {
        const userMemos = []

        snapshot.forEach((doc) => {
          const data = doc.data()
          // console.log('MemoListItem', doc.id, doc.data())
          userMemos.push({
            id: doc.id,
            bodyText: data.bodyText,
            updatedAt: data.updatedAt.toDate(),
          })
        })
        setMemos(userMemos)
        setLoading(false)
      }, (error) => {
        setLoading(false)
        console.log(error)
        Alert.alert('データの読み込みに失敗しました。')
      })
    }

    return unsubscribe
  }, [])


  if (memos.length === 0) {
    return (
      <View style={emptyStyles.container}>
        <Loading isLoading={isLoading} />
        <View style={emptyStyles.inner}>
          <Text sytle={emptyStyles.title}>最初のメモを作成しよう！</Text>
          <Button style={emptyStyles.button} label="作成する" onPress={() => { navigation.navigate('MemoCreate') }} />
        </View>
      </View>
    )
  }
  // ↑が実行された場合、下記returnは実行されない。

  return (
    <View style={styles.container}>
      {/* <AppBar /> */}
      <MemoList memos={memos} />
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

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
  },
  button: {
    alignSelf: 'center',
  },
})
