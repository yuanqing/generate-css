import * as fs from 'fs-extra'

import { Config } from '../types'

export async function readConfigAsync(
  configPath: string,
  options: {
    appendCssFilesPattern: null | string
    outputPath: null | string
    prependCssFilesPattern: null | string
    prettyPrint: boolean
    sourceFilesPattern: string
  }
): Promise<Config> {
  const config = JSON.parse(await fs.readFile(configPath, 'utf8'))
  return {
    ...options,
    ...config
  }
}
