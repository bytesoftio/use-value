import { ObservableValue } from "@bytesoftio/value"

export type ValueReseter = <TState>(initialState?: TState) => void
export type ValueUpdater<TState> = (newValue: TState) => void
export type UseValue = <TState>(initialState: TState | ObservableValue<TState> | (() => TState | ObservableValue<TState>)) => UseValueSpread<TState>
export type UseValueSpread<TState> = [TState, ValueUpdater<TState>, ValueReseter]
