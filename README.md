# TRJS

## True Reactive JavaScript is rxjs like reactive library

[![npm version](https://badge.fury.io/js/trjsx.svg)](https://badge.fury.io/js/trjsx)

## Installation and Usage

### install via npm

```shell
npm i trjsx
```

In this example we make flow from any iterable data(from the string in this case), take only 2 first values and log it subscribe callback

```ts
import { from, take } from 'trjsx';

from('1234')
    .pipe(take(2))
    .subscribe(x => console.log(x)) // will emit only 1, 2
```

In this example we can easily filter data with **filter** operator in you flow and even log values with **tap** operator

```ts
import { interval, filter, tap } from 'trjsx';

interval(1000)
    .pipe(
        tap(console.log) // you can log your flow
        filter(x => x % 2 === 0)
    )
    .subscribe(x => console.log(x)) // will emit only even numbers
```

## Building/Testing

- `npm build` build everything
- `npm test` run tests
- `npm test:watch` run tests in watch mode
