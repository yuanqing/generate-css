import { test } from 'tap'

import { computeNumericValueFactory } from '../compute-numeric-value-factory'

test('invalid `theme.space`', function (t) {
  t.plan(1)
  t.throw(function () {
    computeNumericValueFactory({ baseSpace: '' })
  })
})

test('invalid `value`', function (t) {
  t.plan(1)
  const computeNumericValue = computeNumericValueFactory({
    baseSpace: '0.5rem'
  })
  t.equal(computeNumericValue('foo', []), null)
})

test('theme `value`, single `themeKey`', function (t) {
  t.plan(2)
  const computeNumericValue = computeNumericValueFactory({
    breakpoint: { sm: '320px' },
    padding: { sm: '8px' }
  })
  t.equal(computeNumericValue('sm', ['breakpoint']), '320px')
  t.equal(computeNumericValue('sm', ['padding']), '8px')
})

test('theme `value`, multiple `themeKey`', function (t) {
  t.plan(2)
  const computeNumericValue = computeNumericValueFactory({
    breakpoint: { sm: '320px' },
    padding: { sm: '8px' }
  })
  t.equal(computeNumericValue('sm', ['breakpoint', 'padding']), '320px')
  t.equal(computeNumericValue('sm', ['padding', 'breakpoint']), '8px')
})

test('auto `value`', function (t) {
  t.plan(1)
  const computeNumericValue = computeNumericValueFactory({
    baseSpace: '0.5rem'
  })
  t.equal(computeNumericValue('auto', []), 'auto')
})

test('full `value`', function (t) {
  t.plan(1)
  const computeNumericValue = computeNumericValueFactory({
    baseSpace: '0.5rem'
  })
  t.equal(computeNumericValue('full', []), '100%')
})

test('pixel `value`', function (t) {
  t.plan(3)
  const computeNumericValue = computeNumericValueFactory({
    baseSpace: '0.5rem'
  })
  t.equal(computeNumericValue('0px', []), '0px')
  t.equal(computeNumericValue('1px', []), '1px')
  t.equal(computeNumericValue('px', []), '1px')
})

test('fraction `value`', function (t) {
  t.plan(3)
  const computeNumericValue = computeNumericValueFactory({
    baseSpace: '0.5rem'
  })
  t.equal(computeNumericValue('1/2', []), '50%')
  t.equal(computeNumericValue('1/3', []), '33.333333%')
  t.equal(computeNumericValue('2/3', []), '66.666667%')
})

test('numeric `value`, with `theme.space` not defined', function (t) {
  t.plan(1)
  const computeNumericValue = computeNumericValueFactory({})
  t.throw(function () {
    computeNumericValue('1', [])
  })
})

test('numeric `value`, with `theme.space` defined', function (t) {
  t.plan(3)
  const computeNumericValue = computeNumericValueFactory({
    baseSpace: '0.5rem'
  })
  t.equal(computeNumericValue('0', []), '0')
  t.equal(computeNumericValue('1', []), '0.5rem')
  t.equal(computeNumericValue('3', []), '1.5rem')
})
