import { CustomEvent } from '@retentioneering/datalayer'

export const PERSIST_ID_EVENT_NAME = 'persist_rete_id' as const

export type PersistReteIdEventData = {
  reteId: string
  gaId?: string
}

export type PersistReteIdEvent = CustomEvent & {
  // TODO: Make `CustomEvent` genetic with typed name field
  // name: typeof PERSIST_ID_EVENT_NAME
  data: PersistReteIdEventData
}
