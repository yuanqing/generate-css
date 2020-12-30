import { test } from 'tap'

import { createCssDeclarationBlock } from '../../../../../create-css-declaration-block'

test('width not defined in `theme`', function (t) {
  t.plan(2)
  t.throw(function () {
    createCssDeclarationBlock('w', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('w', { width: {} })
  })
})

test('default width defined in `theme.width`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('w', {
      width: {
        default: '8px'
      }
    }),
    {
      breakpoint: null,
      className: 'w',
      declarations: {
        width: '8px'
      },
      pseudoClass: null,
      selector: 'w'
    }
  )
})

test('custom width defined in `theme.width`', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('w-sm', { width: { sm: '4px' } }), {
    breakpoint: null,
    className: 'w-sm',
    declarations: {
      width: '4px'
    },
    pseudoClass: null,
    selector: 'w-sm'
  })
})

test('pixel width', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('w-2px', {}), {
    breakpoint: null,
    className: 'w-2px',
    declarations: {
      width: '2px'
    },
    pseudoClass: null,
    selector: 'w-2px'
  })
})

test('screen width', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('w-screen', {}), {
    breakpoint: null,
    className: 'w-screen',
    declarations: {
      width: '100vw'
    },
    pseudoClass: null,
    selector: 'w-screen'
  })
})
