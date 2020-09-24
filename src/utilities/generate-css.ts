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
  outputPath: string
): Promise<void> {
  const classNames = await extractClassNamesAsync(pattern)
  const css = createCss(classNames, config)
  const string = stringifyCss(css, config)
  const baseCss =
    baseCssFilesPattern === null
      ? ''
      : await readBaseCssFilesAsync(baseCssFilesPattern)
  await fs.outputFile(outputPath, `${baseCss}${string}`)
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
