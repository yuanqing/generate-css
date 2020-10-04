import * as fs from 'fs-extra'

import { CliOptions, Config } from '../types'

export async function readConfigAsync(cliOptions: CliOptions): Promise<Config> {
  if ((await fs.pathExists(cliOptions.configFilePath)) === false) {
    throw new Error(`File not found: ${cliOptions.configFilePath}`)
  }
  const config = JSON.parse(
    await fs.readFile(cliOptions.configFilePath, 'utf8')
  )
  return {
    reset: true,
    theme: {},
    ...cliOptions,
    ...config
  }
}
