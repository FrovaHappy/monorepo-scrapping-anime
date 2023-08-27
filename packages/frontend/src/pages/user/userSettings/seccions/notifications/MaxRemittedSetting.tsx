import type React from 'react'
import { DEFAULT_NOTIFICATIONS, DEFAULT_TOTAL_PAGES } from '../../../../../utils/const'
import { KeysLocalStorage } from '../../../../../enum'
import { type NotificationsInAired } from '../../../../../../types'
import { stringToObject } from '../../../../../utils/general'
import { useSettingsContext } from '.'
import initDb from '../../../../../utils/DBLocal'
import '../../../../../styles/input.scss'
function mappedOptions(min: number, max: number) {
  const options: React.ReactElement[] = []
  for (let i = min; i <= max; i++) {
    options.push(
      <option value={i} key={i}>
        {i}
      </option>
    )
  }
  return options
}
export default function MaxRemittedSetting() {
  const { setting, setSetting } = useSettingsContext()
  const notifications = stringToObject<NotificationsInAired>(setting?.value)
  if (!notifications) return null

  const onHandleChange = async (e: React.FormEvent<HTMLFormElement>) => {
    const { maxRemitted } = Object.fromEntries(new FormData(e.currentTarget))
    notifications.maxRemitted = parseInt(maxRemitted as string)
    setSetting(await initDb.set(KeysLocalStorage.notifications, JSON.stringify(notifications)))
  }
  return (
    <form onChange={onHandleChange}>
      <select className='input__select' title='maxRemitted' name='maxRemitted' defaultValue={notifications.maxRemitted}>
        {mappedOptions(DEFAULT_NOTIFICATIONS.maxRemitted, DEFAULT_TOTAL_PAGES).map(elem => elem)}
      </select>
    </form>
  )
}