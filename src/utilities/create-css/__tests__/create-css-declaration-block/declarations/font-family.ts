import { test } from 'tap'

import { createCssDeclarationBlock } from '../../../create-css-declaration-block'

test('font-family not defined in `theme`', function (t) {
  t.plan(3)
  t.throw(function () {
    createCssDeclarationBlock('font', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('font', {
      fontFamily: {}
    })
  })
  t.throw(function () {
    createCssDeclarationBlock('font-serif', {
      fontFamily: {}
    })
  })
})

test('default font defined in `theme.fontFamily`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('font', {
      fontFamily: {
        default: 'sans-serif'
      }
    }),
    {
      breakpoint: null,
      className: 'font',
      declarations: {
        'font-family': 'sans-serif'
      },
      pseudoClass: null,
      selector: 'font'
    }
  )
})

test('custom font defined in `theme.font`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('font-serif', {
      fontFamily: {
        serif: 'serif'
      }
    }),
    {
      breakpoint: null,
      className: 'font-serif',
      declarations: {
        'font-family': 'serif'
      },
      pseudoClass: null,
      selector: 'font-serif'
    }
  )
})
