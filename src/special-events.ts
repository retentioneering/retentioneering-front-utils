import { getDatalayer } from '@retentioneering/datalayer'
import { CustomEvent } from './types'

export const PERSIST_RETE_ID = 'persist_rete_id'

export type PersistReteIdEvent = CustomEvent & {
  name: typeof PERSIST_RETE_ID,
  data: {
    reteId: string,
    gaid: string | null
  }
}

const isCustomEvent = (event: any): event is CustomEvent => {
  return Boolean(
    typeof event === 'object' &&
    event.type === 'custom-event' &&
    typeof event.name === 'string'
  )
}

const isPersistIdEvent = (event: CustomEvent): event is PersistReteIdEvent => {
  return Boolean(
    isCustomEvent(event) &&
    event.name == PERSIST_RETE_ID &&
    typeof event.data == 'object' &&
    typeof event.data.reteId === 'string' &&
    (event.data.gaid === null || typeof event.data.gaid === 'string')
  )
}

const createPersistIdStream = () => {
  return getDatalayer()
    .createStream({ emitInitial: true })
    .filter(isPersistIdEvent)
}

export const events = {
  persistId: {
    filter: isPersistIdEvent,
    createStream: createPersistIdStream,
  },
}

