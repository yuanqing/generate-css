import { test } from 'tap'

import { createCssDeclarationBlock } from '../../../create-css-declaration-block'

test('max-width not defined in `theme`', function (t) {
  t.plan(2)
  t.throw(function () {
    createCssDeclarationBlock('maxw', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('maxw', { maxWidth: {} })
  })
})

test('default max-width defined in `theme.maxWidth`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('maxw', {
      maxWidth: {
        default: '100%'
      }
    }),
    {
      breakpoint: null,
      className: 'maxw',
      declarations: {
        'max-width': '100%'
      },
      pseudoClass: null,
      selector: 'maxw'
    }
  )
})

test('custom max-width defined in `theme.maxWidth`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('maxw-sm', { maxWidth: { sm: '320px' } }),
    {
      breakpoint: null,
      className: 'maxw-sm',
      declarations: {
        'max-width': '320px'
      },
      pseudoClass: null,
      selector: 'maxw-sm'
    }
  )
})

test('pixel max-width', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('maxw-320px', {}), {
    breakpoint: null,
    className: 'maxw-320px',
    declarations: {
      'max-width': '320px'
    },
    pseudoClass: null,
    selector: 'maxw-320px'
  })
})

test('screen max-width', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('maxw-screen', {}), {
    breakpoint: null,
    className: 'maxw-screen',
    declarations: {
      'max-width': '100vw'
    },
    pseudoClass: null,
    selector: 'maxw-screen'
  })
})
