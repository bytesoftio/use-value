import { useEffect, useMemo, useState } from "react"
import { UseValue } from "./types"
import { unwrapValue } from "./unwrapValue"

export const useValue: UseValue = <S>(initialState) => {
  const value = useMemo(() => unwrapValue<S>(initialState), [])

  const [reference, setReference] = useState(0)

  useEffect(() => {
    return value.listen(() => setReference((previous) => previous + 1), false)
  }, [])

  const state = value.get()
  const setState = (newState) => value.set(newState)
  const resetState = (initialState) => value.reset(initialState)

  return [state, setState, resetState]
}