import * as fs from 'fs-extra'
import * as path from 'path'

import { CliOptions, Config, Theme } from '../types'

const CONFIG_FILE_NAME = 'generate-css.config.json'
const PACKAGE_JSON_KEY = 'generate-css'

const defaultConfig = {
  reset: true,
  theme: {}
}

export async function readConfigAsync(cliOptions: CliOptions): Promise<Config> {
  const configFilePath = cliOptions.configFilePath
  if (typeof configFilePath === 'string') {
    if ((await fs.pathExists(configFilePath)) === false) {
      throw new Error(`Configuration file not found: ${configFilePath}`)
    }
    const config = await readGenerateCssConfig(configFilePath)
    return {
      ...defaultConfig,
      ...cliOptions,
      ...config
    }
  }
  const packageJsonConfig = await readPackageJsonConfig()
  if (packageJsonConfig !== null) {
    return {
      ...defaultConfig,
      ...cliOptions,
      ...packageJsonConfig
    }
  }
  const defaultConfigFilePath = path.join(process.cwd(), CONFIG_FILE_NAME)
  if ((await fs.pathExists(defaultConfigFilePath)) === true) {
    const config = await readGenerateCssConfig(defaultConfigFilePath)
    return {
      ...defaultConfig,
      ...cliOptions,
      ...config
    }
  }
  return {
    ...defaultConfig,
    ...cliOptions
  }
}

async function readPackageJsonConfig(): Promise<null | {
  reset: boolean
  theme: Theme
}> {
  const packageJsonFilePath = path.join(process.cwd(), 'package.json')
  if ((await fs.pathExists(packageJsonFilePath)) === false) {
    return null
  }
  const packageJson = JSON.parse(await fs.readFile(packageJsonFilePath, 'utf8'))
  const config = packageJson[PACKAGE_JSON_KEY]
  if (typeof config === 'undefined') {
    return null
  }
  return config
}

async function readGenerateCssConfig(
  filePath: string
): Promise<{
  reset: boolean
  theme: Theme
}> {
  return JSON.parse(await fs.readFile(filePath, 'utf8'))
}
