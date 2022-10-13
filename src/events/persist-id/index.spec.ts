import { emitPersistIdEvent, getPersistIdStream } from '~/events/persist-id'

test('persist rete id', () => {
  const persistIdHandler = jest.fn()

  const subscription = getPersistIdStream().subscribe(persistIdHandler)

  emitPersistIdEvent({ reteId: 'test-rete-id', gaId: 'test-ga-id' })

  expect(persistIdHandler).toHaveBeenCalledTimes(1)
  expect(persistIdHandler).nthCalledWith(1, {
    type: 'custom-event',
    name: 'persist_rete_id',
    data: {
      reteId: 'test-rete-id',
      gaId: 'test-ga-id',
    },
  })

  subscription.unsubscribe()

  emitPersistIdEvent({ reteId: 'test-rete-id', gaId: 'test-ga-id' })

  // Nothing changes
  expect(persistIdHandler).toHaveBeenCalledTimes(1)
})
