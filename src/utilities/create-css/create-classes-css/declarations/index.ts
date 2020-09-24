import { Declarations } from '../../../../types'
import { cursor } from './cursor'
import { display } from './display'
import { position } from './position'
import { select } from './select'

export const declarations: { [selector: string]: Declarations } = {
  ...cursor,
  ...display,
  ...position,
  ...select
}
