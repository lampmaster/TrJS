# TRJS

## True Reactive JavaScript is rxjs like reactive library

[![npm version](https://badge.fury.io/js/trjsx.svg)](https://badge.fury.io/js/trjsx)

## Installation and Usage

### install via npm

```shell
npm i trjsx
```

In this example we make flow from any iterable data(from the string in this case), take only 2 first values and log in subscribe callback

```ts
import { from, take } from 'trjsx';

from('1234')
    .pipe(take(2))
    .subscribe(x => console.log(x)) // will emit only 1, 2
```

Also it is posible to create several flows from one observable

```ts
import { interval, filter, take } from 'trjsx';

const $flow = interval(1000)

$flow.pipe(
    filter(x => x % 2 === 0)    
).subscribe(console.log) // 0, 2, 4 ....

$flow.pipe(
    take(2)  
).subscribe(console.log) // 0, 1 - after the second emited value subscription close
```

In this example we can easily filter data with **filter** operator in you flow and even log values with **tap** operator

```ts
import { interval, filter, tap } from 'trjsx';

interval(1000)
    .pipe(
        tap(x => console.log(`log value ${x}`)), // log your flow
        filter((x: any) => x % 2 === 0)
    )
    .subscribe(x => console.log(`subscription ===> ${x}`)) // will emit only even numbers
```

![](https://raw.githubusercontent.com/lampmaster/trjs/release-0.0.4/source/example.gif)

Every observable returns **unsubscribe** function on subscribe call

```ts
import { interval, timer } from 'trjsx';

const unsubscribe = interval(1000).subscribe(console.log)

timer(1000).subscribe((x) => {
    unsubscribe()
})

```

## It is SCALABLE

It is possible to create your own observables and operators to scale functionanlity

Let's create **fromEvent** observable

```ts
import { Observable, Subscriber } from "../core"

const EE = require('event-emitter')
cosnt ee = new EE()

export function fromEvent(target: EE, eventName: string) {
    return new Observable((subscriber: Subscriber) => {
        const listener = (event) => {
            if (subscriber.closed) {
                target.off(eventName, listener)
            } else {
                subscriber.next(event)
            }
        }

        target.on(eventName, listener)
    })
}

fromEvent(ee, 'click').pipe(take(2)).subscribe(console.log) // 1, 2

ee.emit('click', 1)
ee.emit('click', 2)
ee.emit('click', 3)
```

And **map** operator

```ts
import { Observable, Subscriber } from "../core"

export const map = (cb: (x: unknown) => unknown) => (prevObservable: Observable) => {
    return new Observable((subscriber: Subscriber) => {
        const unsubscribe = prevObservable.subscribe((value: unknown) => {
            if (subscriber.closed) {
                unsubscribe()
            } else {
                subscriber.next(cb(value))
            }
        })
    })
}

from([1, 2, 3]).pipe(map(x => x * 2)).subscribe(console.log) // 2, 4, 6
```



## Building/Testing

- `npm build` build everything
- `npm test` run tests
- `npm test:watch` run tests in watch mode
