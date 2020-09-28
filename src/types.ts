import { ObservableValue } from "@bytesoftio/value"

export type ValueInitializer<TState> = TState | (() => TState)
export type UseValue = <TState>(initialState: ValueInitializer<TState | ObservableValue<TState>>) => ObservableValue<TState>
