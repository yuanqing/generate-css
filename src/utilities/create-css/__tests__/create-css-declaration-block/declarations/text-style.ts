import { test } from 'tap'

import { createCssDeclarationBlock } from '../../../create-css-declaration-block'

test('text style not defined in `theme`', function (t) {
  t.plan(2)
  t.throw(function () {
    createCssDeclarationBlock('text-sm', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('text-sm', {
      fontSize: {},
      fontWeight: {},
      letterSpacing: {},
      lineHeight: {}
    })
  })
})

test('text style with font size, font weight, letter-spacing and line-height defined in `theme`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('text-sm', {
      fontSize: {
        sm: '1.0rem'
      },
      fontWeight: {
        sm: '400'
      },
      letterSpacing: {
        sm: '0.025em'
      },
      lineHeight: {
        sm: '1.25rem'
      }
    }),
    {
      breakpoint: null,
      className: 'text-sm',
      declarations: {
        'font-size': '1.0rem',
        'font-weight': '400',
        'letter-spacing': '0.025em',
        'line-height': '1.25rem'
      },
      pseudoClass: null,
      selector: 'text-sm'
    }
  )
})
