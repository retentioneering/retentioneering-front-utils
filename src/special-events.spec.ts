import { getDatalayer } from '@retentioneering/datalayer'
import waitForExpect from 'wait-for-expect'
import { PersistReteIdEvent, events, PERSIST_RETE_ID } from './special-events'


test('persist rete id', async () => {
  const datalayer = getDatalayer()
  const persistIdHandler = jest.fn()
  const allEventsHandler = jest.fn()

  const persistIdStream = events.persistId.createStream()
  const allEventsStream = datalayer.createStream()

  const persistIdSubs = persistIdStream.subscribe(persistIdHandler)
  const allEventsSubs = allEventsStream.subscribe(allEventsHandler)

  const persistIdEvent: PersistReteIdEvent = {
    type: 'custom-event',
    name: PERSIST_RETE_ID,
    data: {
      reteId: '123',
      gaid: '123',
    },
  }

  datalayer.push(persistIdEvent)
  datalayer.push({
    type: 'custom-event',
    name: 'another_event',
    data: {},
  })

  await waitForExpect(() => {
    expect(persistIdHandler).toHaveBeenCalledTimes(1)
    expect(allEventsHandler).toHaveBeenCalledTimes(2)
    persistIdSubs.unsubscribe()
    allEventsSubs.unsubscribe()
  })
})
