import { test } from 'tap'

import { parseClassName } from '../parse-class-name'

test('empty string', function (t) {
  t.plan(1)
  t.throw(function () {
    parseClassName('', [])
  })
})

test('invalid class name', function (t) {
  t.plan(1)
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

test('invalid media query', function (t) {
  t.plan(1)
  t.throw(function () {
    parseClassName('sm@block', [])
  })
})

test('valid media query', function (t) {
  t.plan(1)
  t.deepEqual(parseClassName('sm@block', ['sm']), {
    breakpoint: 'sm',
    pseudoClass: null,
    selector: 'block'
  })
})

test('pseudo-class', function (t) {
  t.plan(1)
  t.deepEqual(parseClassName('block:hover', []), {
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
  t.deepEqual(parseClassName('block:group-hover', []), {
    breakpoint: null,
    pseudoClass: {
      isGroup: true,
      value: 'hover'
    },
    selector: 'block'
  })
})

test('valid media query and pseudo-class', function (t) {
  t.plan(1)
  t.deepEqual(parseClassName('sm@block:hover', ['sm']), {
    breakpoint: 'sm',
    pseudoClass: {
      isGroup: false,
      value: 'hover'
    },
    selector: 'block'
  })
})

test('valid media query and group pseudo-class', function (t) {
  t.plan(1)
  t.deepEqual(parseClassName('sm@block:group-hover', ['sm']), {
    breakpoint: 'sm',
    pseudoClass: {
      isGroup: true,
      value: 'hover'
    },
    selector: 'block'
  })
})
