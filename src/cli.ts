#!/usr/bin/env node
import * as fs from 'fs-extra'
import * as sade from 'sade'

import { Config } from './types'
import { generateCss } from './utilities/generate-css'

sade('generate-css <pattern>', true)
  .option(
    '--c, --config',
    'Path to a generate-css configuration file',
    'generate-css.config.json'
  )
  .option('--o, --output', 'Path to write the generated CSS file', 'style.css')
  .action(async function (
    pattern: string,
    options: { config: string; output: string }
  ) {
    const config: Config = JSON.parse(await fs.readFile(options.config, 'utf8'))
    await generateCss(pattern, config, options.output)
  })
  .parse(process.argv)
