import { test } from 'tap'

import { createCssDeclarationBlock } from '../../../create-css-declaration-block'

test('border radius not defined in `theme`', function (t) {
  t.plan(2)
  t.throw(function () {
    createCssDeclarationBlock('rounded', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('rounded', { borderRadius: {} })
  })
})

test('full border radius', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('rounded-full', {}), {
    breakpoint: null,
    className: 'rounded-full',
    declarations: {
      'border-radius': '9999px'
    },
    pseudoClass: null,
    selector: 'rounded-full'
  })
})

test('default border radius defined in `theme.borderRadius`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('rounded', {
      borderRadius: {
        default: '8px'
      }
    }),
    {
      breakpoint: null,
      className: 'rounded',
      declarations: {
        'border-radius': '8px'
      },
      pseudoClass: null,
      selector: 'rounded'
    }
  )
})

test('custom border radius defined in `theme.borderRadius`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('rounded-sm', { borderRadius: { sm: '4px' } }),
    {
      breakpoint: null,
      className: 'rounded-sm',
      declarations: {
        'border-radius': '4px'
      },
      pseudoClass: null,
      selector: 'rounded-sm'
    }
  )
})

test('pixel border radius', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('rounded-2px', {}), {
    breakpoint: null,
    className: 'rounded-2px',
    declarations: {
      'border-radius': '2px'
    },
    pseudoClass: null,
    selector: 'rounded-2px'
  })
})

test('two corners only', function (t) {
  t.plan(4)
  t.deepEqual(createCssDeclarationBlock('rounded-t-full', {}), {
    breakpoint: null,
    className: 'rounded-t-full',
    declarations: {
      'border-top-left-radius': '9999px',
      'border-top-right-radius': '9999px'
    },
    pseudoClass: null,
    selector: 'rounded-t-full'
  })
  t.deepEqual(
    createCssDeclarationBlock('rounded-r', {
      borderRadius: { default: '8px' }
    }),
    {
      breakpoint: null,
      className: 'rounded-r',
      declarations: {
        'border-bottom-right-radius': '8px',
        'border-top-right-radius': '8px'
      },
      pseudoClass: null,
      selector: 'rounded-r'
    }
  )
  t.deepEqual(
    createCssDeclarationBlock('rounded-b-sm', { borderRadius: { sm: '4px' } }),
    {
      breakpoint: null,
      className: 'rounded-b-sm',
      declarations: {
        'border-bottom-left-radius': '4px',
        'border-bottom-right-radius': '4px'
      },
      pseudoClass: null,
      selector: 'rounded-b-sm'
    }
  )
  t.deepEqual(createCssDeclarationBlock('rounded-l-2px', {}), {
    breakpoint: null,
    className: 'rounded-l-2px',
    declarations: {
      'border-bottom-left-radius': '2px',
      'border-top-left-radius': '2px'
    },
    pseudoClass: null,
    selector: 'rounded-l-2px'
  })
})

test('one corner only', function (t) {
  t.plan(4)
  t.deepEqual(createCssDeclarationBlock('rounded-tl-full', {}), {
    breakpoint: null,
    className: 'rounded-tl-full',
    declarations: {
      'border-top-left-radius': '9999px'
    },
    pseudoClass: null,
    selector: 'rounded-tl-full'
  })
  t.deepEqual(
    createCssDeclarationBlock('rounded-tr', {
      borderRadius: { default: '8px' }
    }),
    {
      breakpoint: null,
      className: 'rounded-tr',
      declarations: {
        'border-top-right-radius': '8px'
      },
      pseudoClass: null,
      selector: 'rounded-tr'
    }
  )
  t.deepEqual(
    createCssDeclarationBlock('rounded-bl-sm', { borderRadius: { sm: '4px' } }),
    {
      breakpoint: null,
      className: 'rounded-bl-sm',
      declarations: {
        'border-bottom-left-radius': '4px'
      },
      pseudoClass: null,
      selector: 'rounded-bl-sm'
    }
  )
  t.deepEqual(createCssDeclarationBlock('rounded-br-2px', {}), {
    breakpoint: null,
    className: 'rounded-br-2px',
    declarations: {
      'border-bottom-right-radius': '2px'
    },
    pseudoClass: null,
    selector: 'rounded-br-2px'
  })
})
