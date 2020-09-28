import { test } from 'tap'

import { createCssDeclarationBlock } from '../../create-css-declaration-block'

test('font size not defined in `theme`', function (t) {
  t.plan(2)
  t.throw(function () {
    createCssDeclarationBlock('font-sm', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('font-sm', {
      fontSize: {}
    })
  })
})

test('custom font size defined in `theme.fontSize`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('font-sm', {
      fontSize: {
        sm: '1.0rem'
      }
    }),
    {
      breakpoint: null,
      className: 'font-sm',
      declarations: {
        'font-size': '1.0rem'
      },
      pseudoClass: null,
      selector: 'font-sm'
    }
  )
})

test('pixel font size', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('font-16px', {}), {
    breakpoint: null,
    className: 'font-16px',
    declarations: {
      'font-size': '16px'
    },
    pseudoClass: null,
    selector: 'font-16px'
  })
})
