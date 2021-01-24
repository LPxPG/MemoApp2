import React from 'react'
import { StyleSheet, View } from 'react-native'
import { shape, string } from 'prop-types'
import { Feather } from '@expo/vector-icons'


export default function CircleButton (props) {
  const { style, name } = props
  return (
    <View style={[styles.circleButton, style]}>
      <Feather name={name} size={32} color="ghostwhite" />
      {/* この場合、アイコン名はFeatherシリーズから選択 */}
    </View>
  )
}

CircleButton.propTypes = {
  style: shape(),
  name: string.isRequired,
}

CircleButton.defaultProps = {
  style: null,
}

const styles = StyleSheet.create({
  circleButton: {
    backgroundColor: '#467fd3',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 25,
    bottom: 25,
    // iOS Shadow
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    // Android Shadow
    elevation: 8,
  },
  circleButtonLabel: {
    color: 'ghostwhite',
    fontSize: 48,
    lineHeight: 58,
  },
})
