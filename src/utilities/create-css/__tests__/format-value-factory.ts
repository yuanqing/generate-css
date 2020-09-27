import { test } from 'tap'

import { formatValueFactory } from '../format-value-factory'

test('invalid space', function (t) {
  t.plan(1)
  t.throw(function () {
    formatValueFactory({}, 'foo')
  })
})

test('invalid value', function (t) {
  t.plan(1)
  const formatValue = formatValueFactory({}, '0.5rem')
  t.equal(formatValue('foo'), null)
})

test('breakpoint', function (t) {
  t.plan(1)
  const formatValue = formatValueFactory({ sm: '320px' }, '0.5rem')
  t.equal(formatValue('sm'), '320px')
})

test('auto', function (t) {
  t.plan(1)
  const formatValue = formatValueFactory({}, '0.5rem')
  t.equal(formatValue('auto'), 'auto')
})

test('full', function (t) {
  t.plan(1)
  const formatValue = formatValueFactory({}, '0.5rem')
  t.equal(formatValue('full'), '100%')
})

test('pixel', function (t) {
  t.plan(3)
  const formatValue = formatValueFactory({}, '0.5rem')
  t.equal(formatValue('px'), '1px')
  t.equal(formatValue('0px'), '0')
  t.equal(formatValue('1px'), '1px')
})

test('fraction', function (t) {
  t.plan(3)
  const formatValue = formatValueFactory({}, '0.5rem')
  t.equal(formatValue('1/2'), '50%')
  t.equal(formatValue('1/3'), '33.333333%')
  t.equal(formatValue('2/3'), '66.666667%')
})

test('integer, with numeric space', function (t) {
  t.plan(3)
  const formatValue = formatValueFactory({}, 8)
  t.equal(formatValue('0'), '0')
  t.equal(formatValue('1'), '8px')
  t.equal(formatValue('3'), '24px')
})

test('integer, with string space', function (t) {
  t.plan(3)
  const formatValue = formatValueFactory({}, '0.5rem')
  t.equal(formatValue('0'), '0')
  t.equal(formatValue('1'), '0.5rem')
  t.equal(formatValue('3'), '1.5rem')
})