import * as fs from 'fs-extra'

import { Config } from '../types'
import { createCss } from './create-css/create-css'
import { extractClassNames } from './extract-class-names/extract-class-names'
import { stringifyCss } from './stringify-css'

export async function generateCss(
  globPattern: string,
  config: Config,
  outputPath: string
): Promise<void> {
  const classNames = await extractClassNames(globPattern)
  const css = createCss(classNames, config)
  const string = stringifyCss(css, config)
  await fs.outputFile(outputPath, string)
}
