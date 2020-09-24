import { Config } from '../types'
import { generateCssAsync } from './generate-css'
import { log } from './log'

export async function build(
  pattern: string,
  baseCssFilesPattern: null | string,
  config: Config,
  outputPath: string
): Promise<void> {
  log.info('Generating CSS...')
  await generateCssAsync(pattern, baseCssFilesPattern, config, outputPath)
  log.success('Done')
}
