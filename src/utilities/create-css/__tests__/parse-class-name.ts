import { test } from 'tap'

import { parseClassName } from '../parse-class-name'

test('invalid class name', function (t) {
  t.plan(2)
  t.throw(function () {
    parseClassName('', [])
  })
  t.throw(function () {
    parseClassName(':', [])
  })
})

test('plain selector', function (t) {
  t.plan(1)
  t.deepEqual(parseClassName('block', []), {
    breakpoint: null,
    pseudoClass: null,
    selector: 'block'
  })
})

test('breakpoint not defined', function (t) {
  t.plan(1)
  t.throw(function () {
    parseClassName('sm@block', [])
  })
})

test('breakpoint defined', function (t) {
  t.plan(1)
  t.deepEqual(parseClassName('sm@block', ['sm']), {
    breakpoint: 'sm',
    pseudoClass: null,
    selector: 'block'
  })
})

test('pseudo-class', function (t) {
  t.plan(1)
  t.deepEqual(parseClassName('hover:block', []), {
    breakpoint: null,
    pseudoClass: {
      isGroup: false,
      value: 'hover'
    },
    selector: 'block'
  })
})

test('group pseudo-class', function (t) {
  t.plan(1)
  t.deepEqual(parseClassName('group-hover:block', []), {
    breakpoint: null,
    pseudoClass: {
      isGroup: true,
      value: 'hover'
    },
    selector: 'block'
  })
})

test('valid breakpoint and pseudo-class', function (t) {
  t.plan(1)
  t.deepEqual(parseClassName('sm@hover:block', ['sm']), {
    breakpoint: 'sm',
    pseudoClass: {
      isGroup: false,
      value: 'hover'
    },
    selector: 'block'
  })
})

test('valid breakpoint and group pseudo-class', function (t) {
  t.plan(1)
  t.deepEqual(parseClassName('sm@group-hover:block', ['sm']), {
    breakpoint: 'sm',
    pseudoClass: {
      isGroup: true,
      value: 'hover'
    },
    selector: 'block'
  })
})
