import { test } from 'tap'

import { createCssDeclarationBlock } from '../../create-css-declaration-block'

test('font-weight not defined in `theme`', function (t) {
  t.plan(2)
  t.throw(function () {
    createCssDeclarationBlock('font-bold', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('font-bold', {
      fontWeight: {}
    })
  })
})

test('custom font weight defined in `theme.fontWeight`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('font-bold', {
      fontWeight: {
        bold: '600'
      }
    }),
    {
      breakpoint: null,
      className: 'font-bold',
      declarations: {
        'font-weight': '600'
      },
      pseudoClass: null,
      selector: 'font-bold'
    }
  )
})
