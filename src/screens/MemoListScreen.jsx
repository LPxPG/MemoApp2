import React, { useEffect, useState } from 'react'
import {
  View, StyleSheet, Alert, Text,
} from 'react-native'
import firebase from 'firebase'

// import AppBar from '../components/AppBar'
import MemoList from '../components/MemoList'
import CircleButton from '../components/CircleButton'
// import LogOutButton from '../components/LogOutButton'
import Button from '../components/Button'
import Loading from '../components/Loading'
import HeaderRightButton from '../components/HeaderRightButton'

export default function MemoListScreen(props) {
  const { navigation } = props
  const [memos, setMemos] = useState([])
  const [isLoading, setLoading] = useState(false)

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => <LogOutButton />,
  //   })
  // }, [])

  // useEffect(() => {
  //   const db = firebase.firestore()
  //   const { currentUser } = firebase.auth()

  //   let unsubscribe = () => {}
  //   if (currentUser) {
  //     setLoading(true)
  //     const ref = db.collection(`users/${currentUser.uid}/memos`).orderBy('updatedAt', 'desc')

  //     unsubscribe = ref.onSnapshot((snapshot) => {
  //       const userMemos = []

  //       snapshot.forEach((doc) => {
  //         const data = doc.data()
  //         // console.log('MemoListItem', doc.id, doc.data())
  //         userMemos.push({
  //           id: doc.id,
  //           bodyText: data.bodyText,
  //           updatedAt: data.updatedAt.toDate(),
  //         })
  //       })
  //       setMemos(userMemos)
  //       setLoading(false)
  //     }, (error) => {
  //       setLoading(false)
  //       console.log('[firebase error]', error.code, error.message)
  //       Alert.alert('データの読み込みに失敗しました。')
  //     })
  //   }

  useEffect(() => {
    setLoading(true)
    const cleanupFuncs = {
      auth: () => {},
      memos: () => {},
    }

    cleanupFuncs.auth = firebase.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          console.log(user.uid)
          const db = firebase.firestore()
          const ref = db.collection(`users/${user.uid}/memos`).orderBy('updatedAt', 'desc')

          cleanupFuncs.memos = ref.onSnapshot((snapshot) => {
            const userMemos = []

            snapshot.forEach((doc) => {
              const data = doc.data()
              userMemos.push({
                id: doc.id,
                bodyText: data.bodyText,
                updatedAt: data.updatedAt.toDate(),
              })
            })

            setMemos(userMemos)
            setLoading(false)
          }, () => {
            setLoading(false)
          })

          // ユーザーが存在したら会員登録ボタンかログアウトボタンを表示
          // 会員登録ボタン：匿名ユーザー
          // ログアウトボタン：メアド登録ユーザー
          navigation.setOptions({
            headerRight: () => (
              <HeaderRightButton currentUser={user} cleanupFuncs={cleanupFuncs} />
            ),
          })
        } else {
          //  匿名ログイン（firebaseのAuthentication > Sign-in methodから有効にする必要があります）
          firebase.auth()
            .signInAnonymously()
            .catch(() => {
              Alert.alert('エラー', 'アプリを再起動してください')
            })
            .then(() => {
              setLoading(false)
            })
        }
      })

    return () => {
      cleanupFuncs.auth()
      cleanupFuncs.memos()
    }
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
