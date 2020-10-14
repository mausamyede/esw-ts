import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/lib/Decoder'
import { Result } from '..'
import type { Decoder } from '../utils/Decoder'
import { ParameterD } from './ParameterDecoder'

export const ResultD: Decoder<Result> = pipe(
  D.type({
    paramSet: D.array(ParameterD)
  }),
  D.parse((r) => D.success(new Result(r.paramSet)))
)