import { test } from 'tap'

import { extractClassNamesFromHtml } from '../extract-class-names-from-html'

test('empty string', function (t) {
  t.plan(1)
  t.deepEqual(extractClassNamesFromHtml(''), [])
})

test('no class attributes', function (t) {
  t.plan(1)
  t.deepEqual(extractClassNamesFromHtml('<div></div>'), [])
})

test('empty class attribute', function (t) {
  t.plan(1)
  t.deepEqual(extractClassNamesFromHtml('<div class=""></div>'), [])
})

test('single class', function (t) {
  t.plan(1)
  t.deepEqual(extractClassNamesFromHtml('<div class="flex"></div>'), ['flex'])
})

test('multiple classes', function (t) {
  t.plan(1)
  t.deepEqual(extractClassNamesFromHtml('<div class="flex bg-black "></div>'), [
    'bg-black',
    'flex'
  ])
})

test('multiple matches', function (t) {
  t.plan(1)
  t.deepEqual(
    extractClassNamesFromHtml(
      '<h1 class="color-red"></h1><div class="flex bg-black"></div>'
    ),
    ['bg-black', 'color-red', 'flex']
  )
})

test('single-quoted attributes', function (t) {
  t.plan(1)
  t.deepEqual(
    extractClassNamesFromHtml(
      "<h1 class='color-red'></h1><div class='flex bg-black'></div>"
    ),
    ['bg-black', 'color-red', 'flex']
  )
})

test('leading and trailing consecutive spaces', function (t) {
  t.plan(1)
  t.deepEqual(
    extractClassNamesFromHtml(
      "<h1 class='color-red'></h1><div class='  flex  bg-black  '></div>"
    ),
    ['bg-black', 'color-red', 'flex']
  )
})
