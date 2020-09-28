import { test } from 'tap'

import { createCssDeclarationBlock } from '../../create-css-declaration-block'

test('letter-spacing not defined in `theme`', function (t) {
  t.plan(2)
  t.throw(function () {
    createCssDeclarationBlock('kerning', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('kerning', { letterSpacing: {} })
  })
})

test('default letter-spacing defined in `theme.letterSpacing`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('kerning', {
      letterSpacing: {
        default: '0.05em'
      }
    }),
    {
      breakpoint: null,
      className: 'kerning',
      declarations: {
        'letter-spacing': '0.05em'
      },
      pseudoClass: null,
      selector: 'kerning'
    }
  )
})

test('custom letter-spacing defined in `theme.letterSpacing`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('kerning-sm', {
      letterSpacing: { sm: '0.025em' }
    }),
    {
      breakpoint: null,
      className: 'kerning-sm',
      declarations: {
        'letter-spacing': '0.025em'
      },
      pseudoClass: null,
      selector: 'kerning-sm'
    }
  )
})

test('pixel letter-spacing', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('kerning-1px', {}), {
    breakpoint: null,
    className: 'kerning-1px',
    declarations: {
      'letter-spacing': '1px'
    },
    pseudoClass: null,
    selector: 'kerning-1px'
  })
})
