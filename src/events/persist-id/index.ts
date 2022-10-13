import { getDatalayer, Observable } from '@retentioneering/datalayer'
import { isObject, isOptionalString, isRequiredString } from '~/utils'
import {
  PERSIST_ID_EVENT_NAME,
  PersistReteIdEvent,
  PersistReteIdEventData,
} from '~/events/persist-id/contracts'
import { buildCustomEvent, isCustomEvent } from '~/events/custom'

export const isPersistIdEvent = (value: unknown): value is PersistReteIdEvent => {
  return (
    isCustomEvent(value) &&
    value.name === PERSIST_ID_EVENT_NAME &&
    isObject(value.data) &&
    isRequiredString(value.data.reteId) &&
    isOptionalString(value.data.gaId)
  )
}

// TODO: Throw error in dev mode if data is invalid
export const buildPersistIdEvent = (data: PersistReteIdEventData): PersistReteIdEvent => ({
  ...buildCustomEvent(PERSIST_ID_EVENT_NAME),
  data,
})

let stream: Observable<PersistReteIdEvent> | undefined

export const getPersistIdStream = (): Observable<PersistReteIdEvent> => {
  if (!stream) {
    stream = getDatalayer()
      .createStream({ emitInitial: true })
      .filter(isPersistIdEvent)
  }

  return stream
}

export const emitPersistIdEvent = (data: PersistReteIdEventData): void => {
  getDatalayer().push(buildPersistIdEvent(data))
}
