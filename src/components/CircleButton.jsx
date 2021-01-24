import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { shape, string } from 'prop-types'

export default function CircleButton (props) {
  const { children, style } = props
  return (
    <View style={[styles.circleButton, style]}>
      <Text style={[styles.circleButtonLabel]}>{children}</Text>
    </View>
  )
}

CircleButton.propTypes = {
  children: string.isRequired,
  style: shape(),
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
