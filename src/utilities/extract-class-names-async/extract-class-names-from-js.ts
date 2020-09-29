import { extractClassNamesFromStringFactory } from './extract-class-names-from-string-factory'

const regex = /(?:const|var) \w*class_?(?:names?)? ?= ?(['"])((?:(?!\1).)+)\1/gi

export const extractClassNamesFromJs = extractClassNamesFromStringFactory(
  regex,
  2
)
