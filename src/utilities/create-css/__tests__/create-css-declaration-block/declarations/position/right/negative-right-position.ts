import { test } from 'tap'

import { createCssDeclarationBlock } from '../../../../../create-css-declaration-block'

test('custom right position defined in `theme.space`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('-right-sm', { space: { sm: '4px' } }),
    {
      breakpoint: null,
      className: '-right-sm',
      declarations: {
        right: '-4px'
      },
      pseudoClass: null,
      selector: '-right-sm'
    }
  )
})

test('pixel right position', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('-right-2px', {}), {
    breakpoint: null,
    className: '-right-2px',
    declarations: {
      right: '-2px'
    },
    pseudoClass: null,
    selector: '-right-2px'
  })
})
