import * as fs from 'fs-extra'

import { CliOptions, Config } from '../types'

export async function readConfigAsync(cliOptions: CliOptions): Promise<Config> {
  const config = JSON.parse(
    await fs.readFile(cliOptions.configFilePath, 'utf8')
  )
  return {
    ...cliOptions,
    ...config
  }
}
