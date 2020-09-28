import { test } from 'tap'

import { createCssDeclarationBlock } from '../../create-css-declaration-block'

test('line-height not defined in `theme`', function (t) {
  t.plan(2)
  t.throw(function () {
    createCssDeclarationBlock('leading', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('leading', { lineHeight: {} })
  })
})

test('default line-height defined in `theme.lineHeight`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('leading', {
      lineHeight: {
        default: '1.5rem'
      }
    }),
    {
      breakpoint: null,
      className: 'leading',
      declarations: {
        'line-height': '1.5rem'
      },
      pseudoClass: null,
      selector: 'leading'
    }
  )
})

test('custom line-height defined in `theme.lineHeight`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('leading-sm', { lineHeight: { sm: '1.25rem' } }),
    {
      breakpoint: null,
      className: 'leading-sm',
      declarations: {
        'line-height': '1.25rem'
      },
      pseudoClass: null,
      selector: 'leading-sm'
    }
  )
})

test('pixel line-height', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('leading-16px', {}), {
    breakpoint: null,
    className: 'leading-16px',
    declarations: {
      'line-height': '16px'
    },
    pseudoClass: null,
    selector: 'leading-16px'
  })
})
