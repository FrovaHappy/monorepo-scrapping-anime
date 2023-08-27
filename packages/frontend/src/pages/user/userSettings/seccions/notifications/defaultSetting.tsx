import { useSettingsContext } from '.'
import { KeysLocalStorage } from '../../../../../enum'
import initDb from '../../../../../utils/DBLocal'
import { DEFAULT_NOTIFICATIONS } from '../../../../../utils/const'
import { stringToObject } from '../../../../../utils/general'

export default function defaultSetting() {
  const { setting, setSetting } = useSettingsContext()
  const notifications = stringToObject(setting?.value)
  if (!notifications) return null
  const onClick = async () => {
    setSetting(await initDb.set(KeysLocalStorage.notifications, JSON.stringify(DEFAULT_NOTIFICATIONS)))
  }
  return (
    <button onClick={onClick} className='button'>
      Restaurar
    </button>
  )
}