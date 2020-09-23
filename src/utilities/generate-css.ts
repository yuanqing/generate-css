import * as fs from 'fs-extra'

import { Config } from '../types'
import { createCss } from './create-css/create-css'
import { extractClassNamesAsync } from './extract-class-names-async/extract-class-names-async'
import { stringifyCss } from './stringify-css'

export async function generateCssAsync(
  pattern: string,
  config: Config,
  outputPath: string
): Promise<void> {
  const classNames = await extractClassNamesAsync(pattern)
  const css = createCss(classNames, config)
  const string = stringifyCss(css, config)
  await fs.outputFile(outputPath, string)
}
