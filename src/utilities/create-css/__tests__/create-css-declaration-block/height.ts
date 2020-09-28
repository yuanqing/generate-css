import { test } from 'tap'

import { createCssDeclarationBlock } from '../../create-css-declaration-block'

test('height not defined in `theme`', function (t) {
  t.plan(2)
  t.throw(function () {
    createCssDeclarationBlock('h', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('h', { height: {} })
  })
})

test('default height defined in `theme.height`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('h', {
      height: {
        default: '8px'
      }
    }),
    {
      breakpoint: null,
      className: 'h',
      declarations: {
        height: '8px'
      },
      pseudoClass: null,
      selector: 'h'
    }
  )
})

test('custom height defined in `theme.height`', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('h-sm', { height: { sm: '4px' } }), {
    breakpoint: null,
    className: 'h-sm',
    declarations: {
      height: '4px'
    },
    pseudoClass: null,
    selector: 'h-sm'
  })
})

test('pixel height', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('h-2px', {}), {
    breakpoint: null,
    className: 'h-2px',
    declarations: {
      height: '2px'
    },
    pseudoClass: null,
    selector: 'h-2px'
  })
})
