import { test } from 'tap'

import { createCssDeclarationBlock } from '../../../create-css-declaration-block'

test('min-height not defined in `theme`', function (t) {
  t.plan(2)
  t.throw(function () {
    createCssDeclarationBlock('minh', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('minh', { minHeight: {} })
  })
})

test('default min-height defined in `theme.minHeight`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('minh', {
      minHeight: {
        default: '100%'
      }
    }),
    {
      breakpoint: null,
      className: 'minh',
      declarations: {
        'min-height': '100%'
      },
      pseudoClass: null,
      selector: 'minh'
    }
  )
})

test('custom min-height defined in `theme.minHeight`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('minh-sm', { minHeight: { sm: '320px' } }),
    {
      breakpoint: null,
      className: 'minh-sm',
      declarations: {
        'min-height': '320px'
      },
      pseudoClass: null,
      selector: 'minh-sm'
    }
  )
})

test('pixel min-height', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('minh-320px', {}), {
    breakpoint: null,
    className: 'minh-320px',
    declarations: {
      'min-height': '320px'
    },
    pseudoClass: null,
    selector: 'minh-320px'
  })
})

test('screen min-height', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('minh-screen', {}), {
    breakpoint: null,
    className: 'minh-screen',
    declarations: {
      'min-height': '100vh'
    },
    pseudoClass: null,
    selector: 'minh-screen'
  })
})
