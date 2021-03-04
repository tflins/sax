import test from 'ava'

import { PubSub } from './pubsub'

const pubsub = new PubSub()
const event = 'test'
const callback = (n: unknown) => n

test('PubSub subscribe', (t) => {
  t.notThrows(() => {
    pubsub.subscribe(event, callback)
  })
  const subscribe = pubsub.subscriberMap.get(event) || []
  t.is(subscribe[0], callback)
})

test('PubSub publish', (t) => {
  t.notThrows(() => {
    pubsub.publish(event)
  })
})
