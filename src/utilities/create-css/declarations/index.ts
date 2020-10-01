import { Declarations } from '../../../types'
import { alignItems } from './align-items'
import { cursor } from './cursor'
import { display } from './display'
import { flex } from './flex'
import { justifyContent } from './justify-content'
import { outline } from './outline'
import { position } from './position'
import { select } from './select'
import { textAlign } from './text-align'
import { textTransform } from './text-transform'

export const declarations: { [selector: string]: Declarations } = {
  ...alignItems,
  ...cursor,
  ...display,
  ...flex,
  ...outline,
  ...justifyContent,
  ...position,
  ...select,
  ...textAlign,
  ...textTransform
}
