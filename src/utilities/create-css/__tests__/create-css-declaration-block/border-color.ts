import { test } from 'tap'

import { createCssDeclarationBlock } from '../../create-css-declaration-block'

test('border color not defined in `theme`', function (t) {
  t.plan(2)
  t.throw(function () {
    createCssDeclarationBlock('border-black', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('border-black', {
      color: {}
    })
  })
})

test('valid border color defined in `theme.borderColor`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('border-black', {
      borderColor: {
        black: '#000000'
      }
    }),
    {
      breakpoint: null,
      className: 'border-black',
      declarations: {
        'border-color': '#000000'
      },
      pseudoClass: null,
      selector: 'border-black'
    }
  )
})

test('valid border color defined in `theme.color`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('border-black', {
      color: {
        black: '#000000'
      }
    }),
    {
      breakpoint: null,
      className: 'border-black',
      declarations: {
        'border-color': '#000000'
      },
      pseudoClass: null,
      selector: 'border-black'
    }
  )
})
