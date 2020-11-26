import { ObservableValue } from "@bytesoftio/value"

export type ValueInitializer<TValue> = TValue | (() => TValue)
export type UseValue = <TValue>(initialValue: ValueInitializer<TValue | ObservableValue<TValue>>) => ObservableValue<TValue>
