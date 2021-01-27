import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { shape, string, func } from 'prop-types'

import Icon from './Icon'

export default function CircleButton(props) {
  const {
    style, name, onPress,
  } = props
  return (
    <TouchableOpacity style={[styles.circleButton, style]} onPress={onPress}>
      <Icon name={name} size={40} color="ghostwhite" />
    </TouchableOpacity>
  )
}

CircleButton.propTypes = {
  style: shape(),
  name: string.isRequired,
  onPress: func,
}

CircleButton.defaultProps = {
  style: null,
  onPress: null,
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
