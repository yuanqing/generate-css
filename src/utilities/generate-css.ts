import * as csso from 'csso'
import * as fs from 'fs-extra'
import * as globby from 'globby'

import { Config } from '../types'
import { createCss } from './create-css/create-css'
import { extractClassNamesAsync } from './extract-class-names-async/extract-class-names-async'
import { stringifyCss } from './stringify-css'

export async function generateCssAsync(
  pattern: string,
  baseCssFilesPattern: null | string,
  config: Config,
  outputPath: string,
  minify: boolean
): Promise<void> {
  const classNames = await extractClassNamesAsync(pattern)
  const generatedCss = createCss(classNames, config)
  const baseCss =
    baseCssFilesPattern === null
      ? ''
      : await readBaseCssFilesAsync(baseCssFilesPattern)
  const css = `${baseCss}${stringifyCss(generatedCss, config)}`
  await fs.outputFile(outputPath, minify === true ? csso.minify(css).css : css)
}

async function readBaseCssFilesAsync(pattern: string): Promise<string> {
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
