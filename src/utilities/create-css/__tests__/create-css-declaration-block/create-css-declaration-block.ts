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
  t.deepEqual(createCssDeclarationBlock('hover:block', {}), {
    breakpoint: null,
    className: 'hover:block',
    declarations: {
      display: 'block'
    },
    pseudoClass: { isParent: false, value: 'hover' },
    selector: 'block'
  })
})

test('group pseudo-class', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('group-hover:block', {}), {
    breakpoint: null,
    className: 'group-hover:block',
    declarations: {
      display: 'block'
    },
    pseudoClass: { isParent: true, value: 'hover' },
    selector: 'block'
  })
})

test('valid breakpoint and pseudo-class', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('sm@hover:block', {
      breakpoint: {
        sm: '320px'
      }
    }),
    {
      breakpoint: 'sm',
      className: 'sm@hover:block',
      declarations: {
        display: 'block'
      },
      pseudoClass: { isParent: false, value: 'hover' },
      selector: 'block'
    }
  )
})

test('valid breakpoint and group pseudo-class', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('sm@group-hover:block', {
      breakpoint: {
        sm: '320px'
      }
    }),
    {
      breakpoint: 'sm',
      className: 'sm@group-hover:block',
      declarations: {
        display: 'block'
      },
      pseudoClass: { isParent: true, value: 'hover' },
      selector: 'block'
    }
  )
})
