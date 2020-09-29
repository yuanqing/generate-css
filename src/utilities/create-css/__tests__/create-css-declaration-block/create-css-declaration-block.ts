import { test } from 'tap'

import { createCssDeclarationBlock } from '../../create-css-declaration-block'

test('invalid class name', function (t) {
  t.plan(2)
  t.throw(function () {
    createCssDeclarationBlock('', {})
  })
  t.throw(function () {
    createCssDeclarationBlock(':', {})
  })
})

test('unrecognized class name', function (t) {
  t.plan(1)
  t.equal(createCssDeclarationBlock('foo', {}), null)
})

test('plain selector', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('block', {}), {
    breakpoint: null,
    className: 'block',
    declarations: {
      display: 'block'
    },
    pseudoClass: null,
    selector: 'block'
  })
})

test('breakpoint not defined', function (t) {
  t.plan(1)
  t.throw(function () {
    createCssDeclarationBlock('sm@block', {})
  })
})

test('breakpoint defined', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('sm@block', {
      breakpoint: {
        sm: '320px'
      }
    }),
    {
      breakpoint: 'sm',
      className: 'sm@block',
      declarations: {
        display: 'block'
      },
      pseudoClass: null,
      selector: 'block'
    }
  )
})

test('pseudo-class', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('block:hover', {}), {
    breakpoint: null,
    className: 'block:hover',
    declarations: {
      display: 'block'
    },
    pseudoClass: { isGroup: false, value: 'hover' },
    selector: 'block'
  })
})

test('group pseudo-class', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('block:group-hover', {}), {
    breakpoint: null,
    className: 'block:group-hover',
    declarations: {
      display: 'block'
    },
    pseudoClass: { isGroup: true, value: 'hover' },
    selector: 'block'
  })
})

test('valid breakpoint and pseudo-class', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('sm@block:hover', {
      breakpoint: {
        sm: '320px'
      }
    }),
    {
      breakpoint: 'sm',
      className: 'sm@block:hover',
      declarations: {
        display: 'block'
      },
      pseudoClass: { isGroup: false, value: 'hover' },
      selector: 'block'
    }
  )
})

test('valid breakpoint and group pseudo-class', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('sm@block:group-hover', {
      breakpoint: {
        sm: '320px'
      }
    }),
    {
      breakpoint: 'sm',
      className: 'sm@block:group-hover',
      declarations: {
        display: 'block'
      },
      pseudoClass: { isGroup: true, value: 'hover' },
      selector: 'block'
    }
  )
})
