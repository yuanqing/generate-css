import { test } from 'tap'

import { createCssDeclarationBlock } from '../../../../../create-css-declaration-block'

test('default left position', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('left', {}), {
    breakpoint: null,
    className: 'left',
    declarations: {
      left: '0'
    },
    pseudoClass: null,
    selector: 'left'
  })
})

test('custom left position defined in `theme.space`', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('left-sm', { space: { sm: '4px' } }), {
    breakpoint: null,
    className: 'left-sm',
    declarations: {
      left: '4px'
    },
    pseudoClass: null,
    selector: 'left-sm'
  })
})

test('pixel left position', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('left-2px', {}), {
    breakpoint: null,
    className: 'left-2px',
    declarations: {
      left: '2px'
    },
    pseudoClass: null,
    selector: 'left-2px'
  })
})
