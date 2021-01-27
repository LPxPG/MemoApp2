import React from 'react'
import { createIconSetFromIcoMoon } from '@expo/vector-icons'
import { useFonts } from '@use-expo/font'
import { number, string, oneOf } from 'prop-types'

import icomoon from '../../assets/fonts/icomoon.ttf'
import selection from '../../assets/fonts/selection.json'

export default function Icon(props) {
  const [fontLoaded] = useFonts({ icomoon })
  const { name, size, color } = props
  const CustomIcon = createIconSetFromIcoMoon(selection)

  if (!fontLoaded) {
    return null
  }
  return (
    <CustomIcon
      name={name}
      size={size}
      color={color}
      style={{ lineHeight: size - 1 }}
      // Android での表示位置のずれを整えるfix
    />
  )
}

Icon.propTypes = {
  name: oneOf(['check', 'delete', 'pencil', 'plus']).isRequired,
  size: number,
  color: string,
}

Icon.defaultProps = {
  size: 24,
  color: '#000',
}
