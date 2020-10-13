import * as fs from 'fs-extra'
import * as path from 'path'
import { test } from 'tap'

import { readConfigAsync } from '../read-config-async'

const defaultCliOptions = {
  appendCssFilesPattern: null,
  minify: false,
  outputPath: null,
  prependCssFilesPattern: null,
  sourceFilesPattern: '*'
}

test('no config', async function (t) {
  t.plan(3)
  process.chdir(path.join(__dirname, 'fixtures', '1-no-config'))
  t.false(await fs.pathExists('package.json'))
  t.false(await fs.pathExists('generate-css.config.json'))
  const config = await readConfigAsync({
    ...defaultCliOptions,
    configFilePath: null
  })
  t.deepEqual(config, {
    ...config,
    reset: true,
    theme: {}
  })
})

test('package.json config', async function (t) {
  t.plan(3)
  process.chdir(path.join(__dirname, 'fixtures', '2-package-json-config'))
  t.true(await fs.pathExists('package.json'))
  t.false(await fs.pathExists('generate-css.config.json'))
  const config = await readConfigAsync({
    ...defaultCliOptions,
    configFilePath: null
  })
  t.deepEqual(config, {
    ...config,
    reset: false,
    theme: {
      color: {
        default: '#ffffff'
      }
    }
  })
})

test('generate-css.config', async function (t) {
  t.plan(3)
  process.chdir(path.join(__dirname, 'fixtures', '3-generate-css-config'))
  t.false(await fs.pathExists('package.json'))
  t.true(await fs.pathExists('generate-css.config.json'))
  const config = await readConfigAsync({
    ...defaultCliOptions,
    configFilePath: null
  })
  t.deepEqual(config, {
    ...config,
    reset: false,
    theme: {
      color: {
        default: '#ffffff'
      }
    }
  })
})

test('custom config', async function (t) {
  t.plan(4)
  process.chdir(path.join(__dirname, 'fixtures', '4-custom-config'))
  t.false(await fs.pathExists('package.json'))
  t.false(await fs.pathExists('generate-css.config.json'))
  t.true(await fs.pathExists('foo.json'))
  const config = await readConfigAsync({
    ...defaultCliOptions,
    configFilePath: 'foo.json'
  })
  t.deepEqual(config, {
    ...config,
    reset: false,
    theme: {
      color: {
        default: '#ffffff'
      }
    }
  })
})

test('invalid custom config', async function (t) {
  t.plan(4)
  process.chdir(path.join(__dirname, 'fixtures', '5-invalid-custom-config'))
  t.false(await fs.pathExists('package.json'))
  t.false(await fs.pathExists('generate-css.config.json'))
  t.false(await fs.pathExists('foo.json'))
  try {
    await readConfigAsync({
      ...defaultCliOptions,
      configFilePath: 'foo.json'
    })
    t.fail()
  } catch {
    t.pass()
  }
})
