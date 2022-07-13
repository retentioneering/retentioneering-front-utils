# @retentioneering/front-utils

## Install 

```
npm install @retentioneering/front-utils
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

### use datalayer

This package already contains [@retentioneering/datalayer](https://www.npmjs.com/package/@retentioneering/datalayer). If you want to use datalayer, import it from @retentioneering/datalayer:

```ts
import { getDatalayer } from '@retentioneering/front-utils'

const datalayer = getDatalayer()
// do something
datalayer.push(event)
```

For more details see the @retentioneering/datalayer [docs](https://www.npmjs.com/package/zen-observable).
