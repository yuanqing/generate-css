import * as fs from 'fs-extra'

import { Config } from '../types'

export async function readConfigAsync(
  configPath: string,
  options: {
    baseCssFilesPattern: null | string
    minify: boolean
    outputPath: null | string
    sourceFilesPattern: string
  }
): Promise<Config> {
  const config = JSON.parse(await fs.readFile(configPath, 'utf8'))
  return {
    ...config,
    ...options
  }
}
