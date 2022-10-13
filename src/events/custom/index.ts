import { CustomEvent } from '@retentioneering/datalayer'
import { isObject, isRequiredString } from '~/utils'
import { CUSTOM_EVENT_TYPE } from '~/events/custom/contracts'

export const isCustomEvent = (event: unknown): event is CustomEvent => {
  return (
    isObject(event) &&
    event.type === CUSTOM_EVENT_TYPE &&
    isRequiredString(event.name)
  )
}

// TODO: Throw error in dev mode if name is invalid
export const buildCustomEvent = (name: string): CustomEvent => ({
  type: CUSTOM_EVENT_TYPE,
  name,
  // TODO: Remove required data filed from `CustomEvent` in `@retentioneering/datalayer`
  data: undefined,
})
