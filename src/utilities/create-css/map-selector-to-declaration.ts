import { Declarations } from '../../types'
import { declarations } from './declarations'

export function mapSelectorToDeclaration(
  selector: string
): null | Declarations {
  const declaration = declarations[selector]
  if (typeof declaration === 'undefined') {
    return null
  }
  return declaration
}
