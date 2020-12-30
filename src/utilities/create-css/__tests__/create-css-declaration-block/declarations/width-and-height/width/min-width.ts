import { test } from 'tap'

import { createCssDeclarationBlock } from '../../../../../create-css-declaration-block'

test('min-width not defined in `theme`', function (t) {
  t.plan(2)
  t.throw(function () {
    createCssDeclarationBlock('minw', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('minw', { minWidth: {} })
  })
})

test('default min-width defined in `theme.minWidth`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('minw', {
      minWidth: {
        default: '100%'
      }
    }),
    {
      breakpoint: null,
      className: 'minw',
      declarations: {
        'min-width': '100%'
      },
      pseudoClass: null,
      selector: 'minw'
    }
  )
})

test('custom min-width defined in `theme.minWidth`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('minw-sm', { minWidth: { sm: '320px' } }),
    {
      breakpoint: null,
      className: 'minw-sm',
      declarations: {
        'min-width': '320px'
      },
      pseudoClass: null,
      selector: 'minw-sm'
    }
  )
})

test('pixel min-width', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('minw-320px', {}), {
    breakpoint: null,
    className: 'minw-320px',
    declarations: {
      'min-width': '320px'
    },
    pseudoClass: null,
    selector: 'minw-320px'
  })
})

test('screen min-width', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('minw-screen', {}), {
    breakpoint: null,
    className: 'minw-screen',
    declarations: {
      'min-width': '100vw'
    },
    pseudoClass: null,
    selector: 'minw-screen'
  })
})
