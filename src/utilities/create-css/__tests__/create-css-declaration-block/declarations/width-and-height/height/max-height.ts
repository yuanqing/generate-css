import { test } from 'tap'

import { createCssDeclarationBlock } from '../../../../../create-css-declaration-block'

test('max-height not defined in `theme`', function (t) {
  t.plan(2)
  t.throw(function () {
    createCssDeclarationBlock('maxh', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('maxh', { maxHeight: {} })
  })
})

test('default max-height defined in `theme.maxHeight`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('maxh', {
      maxHeight: {
        default: '100%'
      }
    }),
    {
      breakpoint: null,
      className: 'maxh',
      declarations: {
        'max-height': '100%'
      },
      pseudoClass: null,
      selector: 'maxh'
    }
  )
})

test('custom max-height defined in `theme.maxHeight`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('maxh-sm', { maxHeight: { sm: '320px' } }),
    {
      breakpoint: null,
      className: 'maxh-sm',
      declarations: {
        'max-height': '320px'
      },
      pseudoClass: null,
      selector: 'maxh-sm'
    }
  )
})

test('pixel max-height', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('maxh-320px', {}), {
    breakpoint: null,
    className: 'maxh-320px',
    declarations: {
      'max-height': '320px'
    },
    pseudoClass: null,
    selector: 'maxh-320px'
  })
})

test('screen max-height', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('maxh-screen', {}), {
    breakpoint: null,
    className: 'maxh-screen',
    declarations: {
      'max-height': '100vh'
    },
    pseudoClass: null,
    selector: 'maxh-screen'
  })
})
