import { ObservableValue } from "@bytesoftio/value"

export type ValueReseter = () => void
export type ValueUpdater<S> = (newValue: S) => void
export type UseValue = <S>(initialState: S | ObservableValue<S> | (() => S | ObservableValue<S>)) => UseValueSpread<S>
export type UseValueSpread<S> = [S, ValueUpdater<S>, ValueReseter]