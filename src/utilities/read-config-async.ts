import * as fs from 'fs-extra'

import { Config } from '../types'

export async function readConfigAsync(path: string): Promise<Config> {
  const string = await fs.readFile(path, 'utf8')
  return JSON.parse(string)
}
