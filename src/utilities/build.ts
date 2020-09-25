import { Config } from '../types'
import { generateCssAsync } from './generate-css'
import { log } from './log'

export async function build(config: Config): Promise<void> {
  if (config.outputPath !== null) {
    log.info('Generating CSS...')
  }
  await generateCssAsync(config)
  if (config.outputPath !== null) {
    log.success('Done')
  }
}
