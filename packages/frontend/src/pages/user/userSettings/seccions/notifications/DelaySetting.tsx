import type React from 'react'
import { KeysLocalStorage, Timestamps } from '../../../../../enum'
import { stringToObject } from '../../../../../utils/general'
import { type NotificationsInAired } from '../../../../../../types'
import initDb from '../../../../../utils/DBLocal'
import { useSettingsContext } from '.'

export default function DelaySetting() {
  const { setting, setSetting } = useSettingsContext()
  const notifications = stringToObject<NotificationsInAired>(setting?.value)
  if (!notifications) return null
  const onHandleDelay = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { delay } = Object.fromEntries(new FormData(e.currentTarget))
    if (parseInt(delay as string) < Timestamps.fifteen_minutes) return
    notifications.delay = parseInt(delay as string)
    setSetting(await initDb().set(KeysLocalStorage.notifications, JSON.stringify(notifications)))
  }
  return (
    <form
      onSubmit={e => async () => {
        await onHandleDelay(e)
      }}
      onChange={e => async () => {
        await onHandleDelay(e)
      }}>
      <input
        type='number'
        min={Timestamps.fifteen_minutes}
        name='delay'
        id='delay'
        defaultValue={notifications.delay}
      />
    </form>
  )
}
