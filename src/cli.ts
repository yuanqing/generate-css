#!/usr/bin/env node
import * as sade from 'sade'

import { build } from './utilities/build'
import { readConfigAsync } from './utilities/read-config-async'
import { watch } from './utilities/watch'

sade('generate-css <pattern>', true)
  .option(
    '--b, --base',
    'Glob pattern for base CSS files to prepend to the generated CSS file'
  )
  .option(
    '--c, --config',
    'Path to a generate-css configuration file',
    'generate-css.config.json'
  )
  .option('--o, --output', 'Path to output the generated CSS file', 'style.css')
  .option(
    '--w, --watch',
    'Watch the input files and regenerate a CSS file on changes',
    false
  )
  .action(async function (
    pattern: string,
    options: { base: string; config: string; output: string; watch: boolean }
  ) {
    const config = await readConfigAsync(options.config)
    const baseCssFilesPattern =
      typeof options.base === 'undefined' ? null : options.base
    if (options.watch === true) {
      watch(pattern, baseCssFilesPattern, config, options.output)
      return
    }
    await build(pattern, baseCssFilesPattern, config, options.output)
  })
  .parse(process.argv)
