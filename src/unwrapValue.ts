import { isFunction } from "lodash"
import { createValue, ObservableValue, Value, ValueInitializer } from "@bytesoftio/value"

export const unwrapValue = <TState>(initialState: ValueInitializer<TState | ObservableValue<TState>>): ObservableValue<TState> => {
  let value = isFunction(initialState) ? initialState() : initialState

  if ( ! (value instanceof Value)) {
    value = createValue(value) as ObservableValue<TState>
  }

  return value
}
