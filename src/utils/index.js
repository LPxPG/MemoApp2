import { format } from 'date-fns'

// default未宣言を許可： "import/prefer-default-export": 0
export function dateToString (date) {
  if (!date) { return '' }
  return format(date, 'yyyy年M月d日 HH時mm分')
}
