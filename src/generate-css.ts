import * as csso from 'csso'
import * as fs from 'fs-extra'
import * as globby from 'globby'

import { Config } from './types'
import { createCss } from './utilities/create-css/create-css'
import { extractClassNamesAsync } from './utilities/extract-class-names-async/extract-class-names-async'
import { stringifyCss } from './utilities/stringify-css'

export async function generateCssAsync(config: Config): Promise<void> {
  const classNames = await extractClassNamesAsync(config.sourceFilesPattern)
  const generatedCss = createCss(classNames, config)
  const baseCss =
    config.baseCssFilesPattern === null
      ? ''
      : await readBaseCssFilesAsync(config.baseCssFilesPattern)
  const css = formatCss(
    `${baseCss}${stringifyCss(generatedCss, config)}`,
    config.minify
  )
  if (config.outputPath === null) {
    console.log(css) // eslint-disable-line no-console
    return
  }
  await fs.outputFile(config.outputPath, css)
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

function formatCss(css: string, minify: boolean) {
  return minify === true ? csso.minify(css).css : css
}
