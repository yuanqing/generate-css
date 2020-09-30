import { Declarations } from '../../../types'
import { cursor } from './cursor'
import { display } from './display'
import { outline } from './outline'
import { position } from './position'
import { select } from './select'
import { textTransform } from './text-transform'

export const declarations: { [selector: string]: Declarations } = {
  ...cursor,
  ...display,
  ...outline,
  ...position,
  ...select,
  ...textTransform
}
