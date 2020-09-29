import { extractClassNamesFromStringFactory } from './extract-class-names-from-string-factory'

const regex = /class=(['"])((?:(?!\1).)+)\1/gi // https://stackoverflow.com/a/8057827

export const extractClassNamesFromHtml = extractClassNamesFromStringFactory(
  regex,
  2
)
