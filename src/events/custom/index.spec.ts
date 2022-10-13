import { getDatalayer } from '@retentioneering/datalayer'
import { buildCustomEvent } from '~/events/custom'

// TODO: This tests should be in `@retentioneering/datalayer`
test('persist rete id', () => {
  const datalayer = getDatalayer()

  const handleAnyEvent = jest.fn()
  const handleSpecificEvent = jest.fn()

  const anyEventSubscription = datalayer.createStream().subscribe(handleAnyEvent)

  const specificEventSubscription = datalayer
    .createStream({ emitInitial: true })
    .filter((event) => event.name === 'specific-event')
    .subscribe(handleSpecificEvent)

  const getAnyEvent = () => buildCustomEvent('any-event')
  const getSpecificEvent = () => ({
    ...buildCustomEvent('specific-event'),
    data: 'any-data',
  })

  datalayer.push(getAnyEvent())
  datalayer.push(getSpecificEvent())

  expect(handleAnyEvent).toHaveBeenCalledTimes(2)
  expect(handleAnyEvent).nthCalledWith(1, {
    type: 'custom-event',
    name: 'any-event',
    data: undefined,
  })
  expect(handleAnyEvent).nthCalledWith(2, {
    type: 'custom-event',
    name: 'specific-event',
    data: 'any-data',
  })

  expect(handleSpecificEvent).toHaveBeenCalledTimes(1)
  expect(handleSpecificEvent).nthCalledWith(1, {
    type: 'custom-event',
    name: 'specific-event',
    data: 'any-data',
  })

  specificEventSubscription.unsubscribe()
  anyEventSubscription.unsubscribe()

  datalayer.push(getAnyEvent())
  datalayer.push(getSpecificEvent())

  // Nothing changes after unsubscription
  expect(handleAnyEvent).toHaveBeenCalledTimes(2)
  expect(handleSpecificEvent).toHaveBeenCalledTimes(1)
})
