# @retentioneering/front-utils

## Install 

install package & peer dependencies:
```
npm install @retentioneering/front-utils @retentioneering/datalayer
```

## Usage

### subscribe on specific events

```ts
import { events } from '@retentioneering/front-utils'

const subs = events
  .persistId
  .createStream()
  .subscribe(({ data }) => {
    const { reteId, gaid } = data
    // do something
  })
```

### ubsubscribe 

```ts
subs.unsubscribe()
```
