import { test } from 'tap'

import { createCssDeclarationBlock } from '../../create-css-declaration-block'

test('color not defined in `theme`', function (t) {
  t.plan(2)
  t.throw(function () {
    createCssDeclarationBlock('color-black', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('color-black', {
      color: {}
    })
  })
})

test('valid color defined in `theme.color`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('color-black', {
      color: {
        black: '#000000'
      }
    }),
    {
      breakpoint: null,
      className: 'color-black',
      declarations: {
        color: '#000000'
      },
      pseudoClass: null,
      selector: 'color-black'
    }
  )
})

test('valid color defined in `theme.color`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('color-black', {
      color: {
        black: '#000000'
      }
    }),
    {
      breakpoint: null,
      className: 'color-black',
      declarations: {
        color: '#000000'
      },
      pseudoClass: null,
      selector: 'color-black'
    }
  )
})
