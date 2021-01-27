import React, { useEffect } from 'react'
import {
  StyleSheet, Text, View, TouchableOpacity, Alert, FlatList,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  shape, string, instanceOf, arrayOf,
} from 'prop-types'
import firebase from 'firebase'

import Icon from './Icon'
import { dateToString } from '../utils'

export default function MemoList(props) {
  const { memos } = props
  // console.log('MemoList : ', memos)
  const navigation = useNavigation()
  // const memos = [
  //   {id: 1, bodyText: 'Title 1', updatedAt: new Date()},
  //   {id: 2, bodyText: 'Title 2', updatedAt: new Date()},
  //   {id: 3, bodyText: 'Title 3', updatedAt: new Date()},
  //   {id: 4, bodyText: 'Title 4', updatedAt: new Date()},
  //   {id: 5, bodyText: 'Title 5', updatedAt: new Date()},
  //   {id: 6, bodyText: 'Title 6', updatedAt: new Date()},
  //   {id: 7, bodyText: 'Title 7', updatedAt: new Date()},
  //   {id: 8, bodyText: 'Title 8', updatedAt: new Date()},
  //   {id: 9, bodyText: 'Title 9', updatedAt: new Date()},
  //   {id: 10, bodyText: 'Title 10', updatedAt: new Date()},
  // ]

  function deleteMemo(id) {
    const { currentUser } = firebase.auth()
    if (currentUser) {
      const db = firebase.firestore()
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id)
      Alert.alert('メモを削除します', 'よろしいですか？', [
        {
          text: 'キャンセル',
          onPress: () => {},
        },
        {
          text: '削除する',
          style: 'destructive', // 赤文字化： iOS限定
          onPress: () => {
            ref.delete().catch(() => { Alert.alert('削除に失敗しました') })
          },
        },
      ])
    }
  }

  function renderItem({ item }) {
    // console.log('renderItem', item)
    return (
      <TouchableOpacity
        // key={item.id}
        style={styles.memoListItem}
        onPress={() => {
          navigation.navigate(
            'MemoDetail', { id: item.id },
          )
        }}
      >

        <View>
          <Text style={styles.memoListItemTitle} numberOfLines={1}>{item.bodyText}</Text>
          <Text style={styles.memoListItemDate}>{dateToString(item.updatedAt)}</Text>
        </View>

        <TouchableOpacity
          style={styles.memoDelete}
          onPress={() => { deleteMemo(item.id) }}
        >
          <Icon name="delete" size={24} color="#b0b0b0" />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }


  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} // key要素を指定。デフォルトではkeyプロパティを探す。
      />
    </View>
  )
}


MemoList.propTypes = {
  memos: arrayOf(shape({
    id: string,
    bodyText: string,
    updatedAt: instanceOf(Date),
  })).isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memoListItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 19,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    elevation: 2,
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: 'gray',
  },
  memoDelete: {
    padding: 8,
  },
})
