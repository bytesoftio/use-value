import { useEffect, useState } from "react"
import { UseValue } from "./types"
import { unwrapValue } from "./unwrapValue"

export const useValue: UseValue = <S>(initialState) => {
  const [value] = useState(() => unwrapValue<S>(initialState))

  try {
    const [state, setState] = useState({ state: value.get() })

    useEffect(() => {
      // try to hook into a component, whenever the state changes outside of react, it needs to be updated inside
      // react too, this is basically what happens here, returns a clean up function to unsubscribe from the value
      // whenever the component un-mounts
      return value.listen((newState) => setState({ state: newState }), false)
    }, [])
  } catch (err) {
  }

  const state = value.get()
  const setState = (newState) => value.set(newState)
  const resetState = () => value.reset()

  return [state, setState, resetState]
}