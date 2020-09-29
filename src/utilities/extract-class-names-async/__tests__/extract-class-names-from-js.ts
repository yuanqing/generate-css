import { test } from 'tap'

import { extractClassNamesFromJs } from '../extract-class-names-from-js'

test('empty string', function (t) {
  t.plan(1)
  t.deepEqual(extractClassNamesFromJs(''), [])
})

test('does not match constants without a "CLASS" suffix', function (t) {
  t.plan(2)
  t.deepEqual(extractClassNamesFromJs('const HIDDEN = "hidden"'), [])
  t.deepEqual(extractClassNamesFromJs("const HIDDEN = 'hidden'"), [])
})

test('matches string constants with a "CLASS" suffix containing a single class', function (t) {
  t.plan(5)
  t.deepEqual(extractClassNamesFromJs('const DIV_CLASS = "flex"'), ['flex'])
  t.deepEqual(extractClassNamesFromJs('const DIV_CLASSNAME = "flex"'), ['flex'])
  t.deepEqual(extractClassNamesFromJs('const DIV_CLASSNAMES = "flex"'), [
    'flex'
  ])
  t.deepEqual(extractClassNamesFromJs('const DIV_CLASS_NAME = "flex"'), [
    'flex'
  ])
  t.deepEqual(extractClassNamesFromJs('const DIV_CLASS_NAMES = "flex"'), [
    'flex'
  ])
})

test('matches string constants with a "CLASS" suffix containing multiple classes', function (t) {
  t.plan(5)
  t.deepEqual(extractClassNamesFromJs('const DIV_CLASS = "flex bg-black"'), [
    'bg-black',
    'flex'
  ])
  t.deepEqual(
    extractClassNamesFromJs('const DIV_CLASSNAME = "flex bg-black"'),
    ['bg-black', 'flex']
  )
  t.deepEqual(
    extractClassNamesFromJs('const DIV_CLASSNAMES = "flex bg-black"'),
    ['bg-black', 'flex']
  )
  t.deepEqual(
    extractClassNamesFromJs('const DIV_CLASS_NAME = "flex bg-black"'),
    ['bg-black', 'flex']
  )
  t.deepEqual(
    extractClassNamesFromJs('const DIV_CLASS_NAMES = "flex bg-black"'),
    ['bg-black', 'flex']
  )
})

test('multiple matches', function (t) {
  t.plan(1)
  const js = `
    const DIV_CLASS = "flex bg-black"
    const H1_CLASS = "color-red"
  `
  t.deepEqual(extractClassNamesFromJs(js), ['bg-black', 'color-red', 'flex'])
})

test('var', function (t) {
  t.plan(1)
  t.deepEqual(extractClassNamesFromJs('var DIV_CLASS = "flex bg-black"'), [
    'bg-black',
    'flex'
  ])
})

test('single-quoted strings', function (t) {
  t.plan(1)
  t.deepEqual(extractClassNamesFromJs("var DIV_CLASS = 'flex bg-black'"), [
    'bg-black',
    'flex'
  ])
})

test('lowercase', function (t) {
  t.plan(1)
  t.deepEqual(extractClassNamesFromJs("const div_class = 'flex bg-black'"), [
    'bg-black',
    'flex'
  ])
})

test('leading and trailing consecutive spaces', function (t) {
  t.plan(1)
  t.deepEqual(
    extractClassNamesFromJs("const div_class = '  flex  bg-black  '"),
    ['bg-black', 'flex']
  )
})
