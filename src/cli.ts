#!/usr/bin/env node
import * as sade from 'sade'

import { generateCssAsync } from './utilities/generate-css'
import { readConfigAsync } from './utilities/read-config-async'

sade('generate-css <pattern>', true)
  .option(
    '--c, --config',
    'Path to a generate-css configuration file',
    'generate-css.config.json'
  )
  .option('--o, --output', 'Path to output the generated CSS file', 'style.css')
  .action(async function (
    pattern: string,
    options: { config: string; output: string }
  ) {
    const config = await readConfigAsync(options.config)
    await generateCssAsync(pattern, config, options.output)
  })
  .parse(process.argv)
