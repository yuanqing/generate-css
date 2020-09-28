import { test } from 'tap'

import { createCssDeclarationBlock } from '../../create-css-declaration-block'

test('border width not defined in `theme`', function (t) {
  t.plan(2)
  t.throw(function () {
    createCssDeclarationBlock('b', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('b', { borderWidth: {} })
  })
})

test('default border width defined in `theme.borderWidth`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('b', {
      borderWidth: {
        default: '8px'
      }
    }),
    {
      breakpoint: null,
      className: 'b',
      declarations: {
        'border-width': '8px'
      },
      pseudoClass: null,
      selector: 'b'
    }
  )
})

test('custom border width defined in `theme.borderWidth`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('b-sm', { borderWidth: { sm: '4px' } }),
    {
      breakpoint: null,
      className: 'b-sm',
      declarations: {
        'border-width': '4px'
      },
      pseudoClass: null,
      selector: 'b-sm'
    }
  )
})

test('pixel border width', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('b-2px', {}), {
    breakpoint: null,
    className: 'b-2px',
    declarations: {
      'border-width': '2px'
    },
    pseudoClass: null,
    selector: 'b-2px'
  })
})

test('two sides only', function (t) {
  t.plan(2)
  t.deepEqual(
    createCssDeclarationBlock('bx', {
      borderWidth: {
        default: '8px'
      }
    }),
    {
      breakpoint: null,
      className: 'bx',
      declarations: {
        'border-left-width': '8px',
        'border-right-width': '8px'
      },
      pseudoClass: null,
      selector: 'bx'
    }
  )
  t.deepEqual(
    createCssDeclarationBlock('by-sm', {
      borderWidth: {
        sm: '4px'
      }
    }),
    {
      breakpoint: null,
      className: 'by-sm',
      declarations: {
        'border-bottom-width': '4px',
        'border-top-width': '4px'
      },
      pseudoClass: null,
      selector: 'by-sm'
    }
  )
})

test('one side only', function (t) {
  t.plan(4)
  t.deepEqual(createCssDeclarationBlock('bt-2px', {}), {
    breakpoint: null,
    className: 'bt-2px',
    declarations: {
      'border-top-width': '2px'
    },
    pseudoClass: null,
    selector: 'bt-2px'
  })
  t.deepEqual(
    createCssDeclarationBlock('br', {
      borderWidth: { default: '8px' }
    }),
    {
      breakpoint: null,
      className: 'br',
      declarations: {
        'border-right-width': '8px'
      },
      pseudoClass: null,
      selector: 'br'
    }
  )
  t.deepEqual(
    createCssDeclarationBlock('bb-sm', { borderWidth: { sm: '4px' } }),
    {
      breakpoint: null,
      className: 'bb-sm',
      declarations: {
        'border-bottom-width': '4px'
      },
      pseudoClass: null,
      selector: 'bb-sm'
    }
  )
  t.deepEqual(createCssDeclarationBlock('bl-2px', {}), {
    breakpoint: null,
    className: 'bl-2px',
    declarations: {
      'border-left-width': '2px'
    },
    pseudoClass: null,
    selector: 'bl-2px'
  })
})
