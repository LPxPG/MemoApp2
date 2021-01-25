import React, { useEffect } from 'react'
import {
  StyleSheet, Text, View, TouchableOpacity, Alert, FlatList,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  shape, string, instanceOf, arrayOf,
} from 'prop-types'

import Icon from './Icon'

export default function MemoList (props) {
  // const { memos } = props
  const navigation = useNavigation()
  const memos = [
    {id: 1, bodyText: 'Title 1', updatedAt: new Date()},
    {id: 2, bodyText: 'Title 2', updatedAt: new Date()},
    {id: 3, bodyText: 'Title 3', updatedAt: new Date()},
    {id: 4, bodyText: 'Title 4', updatedAt: new Date()},
    {id: 5, bodyText: 'Title 5', updatedAt: new Date()},
    {id: 6, bodyText: 'Title 6', updatedAt: new Date()},
    {id: 7, bodyText: 'Title 7', updatedAt: new Date()},
    {id: 8, bodyText: 'Title 8', updatedAt: new Date()},
    {id: 9, bodyText: 'Title 9', updatedAt: new Date()},
    {id: 10, bodyText: 'Title 10', updatedAt: new Date()},
  ]


  function renderItem ({ item }) {
    return (
      <TouchableOpacity
        // key={item.id}
        style={styles.memoListItem}
        onPress={() => {
          navigation.navigate('MemoDetail')
        }}
      >

        <View>
          <Text style={styles.memoListItemTitle} numberOfLines={1}>{item.bodyText}</Text>
          <Text style={styles.memoListItemDate}>{String(item.updatedAt)}</Text>
        </View>

        <TouchableOpacity
          style={styles.memoDelete}
          onPress={() => { Alert.alert('Are you sure?') }}
        />
      </TouchableOpacity>

    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

// MemoList.propTypes = {
//   memos: arrayOf(shape({
//     id: string,
//     bodyText: string,
//     updatedAt: instanceOf(Date),
//   })).isRequired,
// }

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
