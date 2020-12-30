import { test } from 'tap'

import { createCssDeclarationBlock } from '../../../../create-css-declaration-block'

test('margin not defined in `theme`', function (t) {
  t.plan(2)
  t.throw(function () {
    createCssDeclarationBlock('m', {})
  })
  t.throw(function () {
    createCssDeclarationBlock('m', { margin: {} })
  })
})

test('default margin defined in `theme.margin`', function (t) {
  t.plan(1)
  t.deepEqual(
    createCssDeclarationBlock('m', {
      margin: {
        default: '8px'
      }
    }),
    {
      breakpoint: null,
      className: 'm',
      declarations: {
        margin: '8px'
      },
      pseudoClass: null,
      selector: 'm'
    }
  )
})

test('custom margin defined in `theme.margin`', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('m-sm', { margin: { sm: '4px' } }), {
    breakpoint: null,
    className: 'm-sm',
    declarations: {
      margin: '4px'
    },
    pseudoClass: null,
    selector: 'm-sm'
  })
})

test('pixel margin', function (t) {
  t.plan(1)
  t.deepEqual(createCssDeclarationBlock('m-2px', {}), {
    breakpoint: null,
    className: 'm-2px',
    declarations: {
      margin: '2px'
    },
    pseudoClass: null,
    selector: 'm-2px'
  })
})

test('two sides only', function (t) {
  t.plan(2)
  t.deepEqual(
    createCssDeclarationBlock('mx', {
      margin: {
        default: '8px'
      }
    }),
    {
      breakpoint: null,
      className: 'mx',
      declarations: {
        'margin-left': '8px',
        'margin-right': '8px'
      },
      pseudoClass: null,
      selector: 'mx'
    }
  )
  t.deepEqual(
    createCssDeclarationBlock('my-sm', {
      margin: {
        sm: '4px'
      }
    }),
    {
      breakpoint: null,
      className: 'my-sm',
      declarations: {
        'margin-bottom': '4px',
        'margin-top': '4px'
      },
      pseudoClass: null,
      selector: 'my-sm'
    }
  )
})

test('one side only', function (t) {
  t.plan(4)
  t.deepEqual(createCssDeclarationBlock('mt-2px', {}), {
    breakpoint: null,
    className: 'mt-2px',
    declarations: {
      'margin-top': '2px'
    },
    pseudoClass: null,
    selector: 'mt-2px'
  })
  t.deepEqual(
    createCssDeclarationBlock('mr', {
      margin: { default: '8px' }
    }),
    {
      breakpoint: null,
      className: 'mr',
      declarations: {
        'margin-right': '8px'
      },
      pseudoClass: null,
      selector: 'mr'
    }
  )
  t.deepEqual(createCssDeclarationBlock('mb-sm', { margin: { sm: '4px' } }), {
    breakpoint: null,
    className: 'mb-sm',
    declarations: {
      'margin-bottom': '4px'
    },
    pseudoClass: null,
    selector: 'mb-sm'
  })
  t.deepEqual(createCssDeclarationBlock('ml-2px', {}), {
    breakpoint: null,
    className: 'ml-2px',
    declarations: {
      'margin-left': '2px'
    },
    pseudoClass: null,
    selector: 'ml-2px'
  })
})
