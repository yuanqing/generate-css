import { test } from 'tap'

import { createCssDeclarationBlock } from '../../create-css-declaration-block'

test('background color not defined in `theme`', function (t) {
  t.plan(2)
  t.throw(function () {
    createCssDeclarationBlock('bg-black', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('bg-black', {
      color: {}
    })
  })
})

test('valid background color defined in `theme.backgroundColor`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('bg-black', {
      backgroundColor: {
        black: '#000000'
      }
    }),
    {
      breakpoint: null,
      className: 'bg-black',
      declarations: {
        'background-color': '#000000'
      },
      pseudoClass: null,
      selector: 'bg-black'
    }
  )
})

test('valid background color defined in `theme.color`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('bg-black', {
      color: {
        black: '#000000'
      }
    }),
    {
      breakpoint: null,
      className: 'bg-black',
      declarations: {
        'background-color': '#000000'
      },
      pseudoClass: null,
      selector: 'bg-black'
    }
  )
})
