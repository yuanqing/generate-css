import { test } from 'tap'

import { createCssDeclarationBlock } from '../../../../../create-css-declaration-block'

test('default top position', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('top', {}), {
    breakpoint: null,
    className: 'top',
    declarations: {
      top: '0'
    },
    pseudoClass: null,
    selector: 'top'
  })
})

test('custom top position defined in `theme.space`', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('top-sm', { space: { sm: '4px' } }), {
    breakpoint: null,
    className: 'top-sm',
    declarations: {
      top: '4px'
    },
    pseudoClass: null,
    selector: 'top-sm'
  })
})

test('pixel top position', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('top-2px', {}), {
    breakpoint: null,
    className: 'top-2px',
    declarations: {
      top: '2px'
    },
    pseudoClass: null,
    selector: 'top-2px'
  })
})
