import { test } from 'tap'

import { createCssDeclarationBlock } from '../../../../../create-css-declaration-block'

test('default bottom position', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('bottom', {}), {
    breakpoint: null,
    className: 'bottom',
    declarations: {
      bottom: '0'
    },
    pseudoClass: null,
    selector: 'bottom'
  })
})

test('custom bottom position defined in `theme.space`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('bottom-sm', { space: { sm: '4px' } }),
    {
      breakpoint: null,
      className: 'bottom-sm',
      declarations: {
        bottom: '4px'
      },
      pseudoClass: null,
      selector: 'bottom-sm'
    }
  )
})

test('pixel bottom position', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('bottom-2px', {}), {
    breakpoint: null,
    className: 'bottom-2px',
    declarations: {
      bottom: '2px'
    },
    pseudoClass: null,
    selector: 'bottom-2px'
  })
})
