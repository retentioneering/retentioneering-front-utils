# Retentioneering Front Utils

## Installation

```shell
npm install @retentioneering/datalayer @retentioneering/front-utils
```

## Usage

### Subscribe to `persist_rete_id` event

```typescript
import { getPersistIdStream } from '@retentioneering/front-utils'

const subscription = getPersistIdStream()
  .subscribe(({ data }) => {
    const { reteId, gaId } = data
    
    // Do something ...
  })
```

### Unsubscribe 

```typescript
subscription.unsubscribe()
```

## API

```typescript
type PersistReteIdEvent = {
    type: 'custom-event'
    name: 'persist_rete_id'
    data: PersistReteIdEventData
}

type PersistReteIdEventData = {
  reteId: string
  gaId?: string // Optional
}
```

### `PERSIST_ID_EVENT_NAME`

Constant for `persist_rete_id` event name.

### `isPersistIdEvent(value: any): boolean`

Returns `true` if `value` is `PersistReteIdEvent`.

### `buildPersistIdEvent(data: PersistReteIdEventData): PersistReteIdEvent`

Returns new `PersistReteIdEvent` object.

### `getPersistIdStream(): Observable<PersistReteIdEvent>`

Returns `PersistReteIdEvent` stream.
For more details see [here](https://github.com/retentioneering/retentioneering-datalayer).

### `emitPersistIdEvent(data: PersistReteIdEventData): void`

Emits new `PersistReteIdEvent` event.
