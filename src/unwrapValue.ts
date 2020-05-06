import { isFunction } from "lodash"
import { createValue, ObservableValue, Value, ValueInitializer } from "@bytesoftio/value"

export const unwrapValue = <S>(initialState: ValueInitializer<S | ObservableValue<S>>): ObservableValue<S> => {
  let value = isFunction(initialState) ? initialState() : initialState

  if ( ! (value instanceof Value)) {
    value = createValue(value) as ObservableValue<S>
  }

  return value
}