import { test } from 'tap'

import { createCssDeclarationBlock } from '../../create-css-declaration-block'

test('empty string', function (t) {
  t.plan(1)
  t.throw(function () {
    createCssDeclarationBlock('', {})
  })
})
