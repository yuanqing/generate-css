import * as csso from 'csso'
import * as findUp from 'find-up'
import * as fs from 'fs-extra'
import * as globby from 'globby'
import * as path from 'path'
import * as prettier from 'prettier'

import { Config } from './types'
import { createBaseFontSizeCss } from './utilities/create-base-font-size-css'
import { createCss } from './utilities/create-css/create-css'
import { extractClassNamesAsync } from './utilities/extract-class-names-async/extract-class-names-async'
import { stringifyCss } from './utilities/stringify-css'

export async function generateCssAsync(config: Config): Promise<void> {
  const classNames = await extractClassNamesAsync(config.sourceFilesPattern)
  const generatedCss = stringifyCss(createCss(classNames, config.theme), config)
  const prependCss =
    config.prependCssFilesPattern === null
      ? ''
      : await readFilesAsync(config.prependCssFilesPattern)
  const resetCss = config.reset === true ? await readResetCssFilesAsync() : ''
  const baseFontSizeCss =
    typeof config.theme.baseFontSize === 'undefined'
      ? ''
      : createBaseFontSizeCss(config)
  const appendCss =
    config.appendCssFilesPattern === null
      ? ''
      : await readFilesAsync(config.appendCssFilesPattern)
  const css = formatCss(
    [prependCss, resetCss, baseFontSizeCss, generatedCss, appendCss].join(''),
    config.prettyPrint
  )
  if (config.outputPath === null) {
    console.log(css) // eslint-disable-line no-console
    return
  }
  await fs.outputFile(config.outputPath, css)
}

async function readResetCssFilesAsync(): Promise<string> {
  const normalizeCssPath = await findUp(
    path.join('node_modules', 'normalize.css', 'normalize.css')
  )
  if (typeof normalizeCssPath === 'undefined') {
    throw new Error('Cannot find normalize.css')
  }
  const resetCssPath = path.join(__dirname, 'css', 'reset.css')
  return [
    await fs.readFile(normalizeCssPath, 'utf8'),
    await fs.readFile(resetCssPath, 'utf8')
  ].join('')
}

async function readFilesAsync(pattern: string): Promise<string> {
  const paths = await globby(pattern)
  if (paths.length === 0) {
    throw new Error(`No files matched by pattern: ${pattern}`)
  }
  const result = []
  for (const path of paths) {
    result.push(await fs.readFile(path, 'utf8'))
  }
  return result.join('')
}

function formatCss(css: string, prettyPrint: boolean) {
  const result = csso.minify(css, { comments: false, forceMediaMerge: true })
    .css
  if (prettyPrint === true) {
    return prettier.format(result, { parser: 'css' })
  }
  return result
}
