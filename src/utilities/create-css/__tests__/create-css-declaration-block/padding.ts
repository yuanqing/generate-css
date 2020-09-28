import { test } from 'tap'

import { createCssDeclarationBlock } from '../../create-css-declaration-block'

test('padding not defined in `theme`', function (t) {
  t.plan(2)
  t.throw(function () {
    createCssDeclarationBlock('p', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('p', { padding: {} })
  })
})

test('default padding defined in `theme.padding`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('p', {
      padding: {
        default: '8px'
      }
    }),
    {
      breakpoint: null,
      className: 'p',
      declarations: {
        padding: '8px'
      },
      pseudoClass: null,
      selector: 'p'
    }
  )
})

test('custom padding defined in `theme.padding`', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('p-sm', { padding: { sm: '4px' } }), {
    breakpoint: null,
    className: 'p-sm',
    declarations: {
      padding: '4px'
    },
    pseudoClass: null,
    selector: 'p-sm'
  })
})

test('pixel padding', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('p-2px', {}), {
    breakpoint: null,
    className: 'p-2px',
    declarations: {
      padding: '2px'
    },
    pseudoClass: null,
    selector: 'p-2px'
  })
})

test('two sides only', function (t) {
  t.plan(2)
  t.deepEqual(
    createCssDeclarationBlock('px', {
      padding: {
        default: '8px'
      }
    }),
    {
      breakpoint: null,
      className: 'px',
      declarations: {
        'padding-left': '8px',
        'padding-right': '8px'
      },
      pseudoClass: null,
      selector: 'px'
    }
  )
  t.deepEqual(
    createCssDeclarationBlock('py-sm', {
      padding: {
        sm: '4px'
      }
    }),
    {
      breakpoint: null,
      className: 'py-sm',
      declarations: {
        'padding-bottom': '4px',
        'padding-top': '4px'
      },
      pseudoClass: null,
      selector: 'py-sm'
    }
  )
})

test('one side only', function (t) {
  t.plan(4)
  t.deepEqual(createCssDeclarationBlock('pt-2px', {}), {
    breakpoint: null,
    className: 'pt-2px',
    declarations: {
      'padding-top': '2px'
    },
    pseudoClass: null,
    selector: 'pt-2px'
  })
  t.deepEqual(
    createCssDeclarationBlock('pr', {
      padding: { default: '8px' }
    }),
    {
      breakpoint: null,
      className: 'pr',
      declarations: {
        'padding-right': '8px'
      },
      pseudoClass: null,
      selector: 'pr'
    }
  )
  t.deepEqual(createCssDeclarationBlock('pb-sm', { padding: { sm: '4px' } }), {
    breakpoint: null,
    className: 'pb-sm',
    declarations: {
      'padding-bottom': '4px'
    },
    pseudoClass: null,
    selector: 'pb-sm'
  })
  t.deepEqual(createCssDeclarationBlock('pl-2px', {}), {
    breakpoint: null,
    className: 'pl-2px',
    declarations: {
      'padding-left': '2px'
    },
    pseudoClass: null,
    selector: 'pl-2px'
  })
})
