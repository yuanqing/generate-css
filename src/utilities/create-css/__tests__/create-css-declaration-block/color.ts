import { test } from 'tap'

import { createCssDeclarationBlock } from '../../create-css-declaration-block'

test('color not defined in `theme`', function (t) {
  t.plan(3)
  t.throw(function () {
    createCssDeclarationBlock('color', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('color-black', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('color-black', {
      color: {}
    })
  })
})

test('default color', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('color', {
      color: {
        default: '#ffffff'
      }
    }),
    {
      breakpoint: null,
      className: 'color',
      declarations: {
        color: '#ffffff'
      },
      pseudoClass: null,
      selector: 'color'
    }
  )
})

test('custom color defined in `theme.color`', function (t) {
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
