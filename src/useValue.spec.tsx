import React from "react"
import { mount } from "enzyme"
import { useValue } from "./index"
import { act } from "react-dom/test-utils"
import { createValue } from "@bytesoftio/value"

describe("useValue", () => {
  it("uses new value", async () => {
    let receivedSetState

    let renders = 0
    const Component = () => {
      const [state, setState] = useValue(0)
      receivedSetState = setState
      renders++

      return (
        <h1>{state}</h1>
      )
    }

    const wrapper = mount(<Component/>)
    const target = () => wrapper.find("h1")

    expect(renders).toBe(1)
    expect(target().text()).toBe("0")

    act(() => receivedSetState(1))

    expect(renders).toBe(2)
    expect(target().text()).toBe("1")

    act(() => receivedSetState(1))

    expect(renders).toBe(2)
    expect(target().text()).toBe("1")
  })

  it("uses new value with initializer", () => {
    const initializer = () => 1
    let receivedSetState
    let renders = 0

    const Test = () => {
      renders++
      const [value, setState] = useValue(initializer)
      receivedSetState = setState

      return (
        <h1>{value}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(renders).toBe(1)
    expect(target().text()).toBe("1")

    act(() => receivedSetState(2))

    expect(renders).toBe(2)
    expect(target().text()).toBe("2")

    act(() => receivedSetState(3))

    expect(renders).toBe(3)
    expect(target().text()).toBe("3")
  })

  it("uses value", () => {
    const value = createValue(1)
    let receivedSetState
    let renders = 0

    const Test = () => {
      renders++
      const [count, setState] = useValue(value)
      receivedSetState = setState

      return (
        <h1>{count}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(renders).toBe(1)
    expect(target().text()).toBe("1")

    act(() => value.set(2))

    expect(renders).toBe(2)
    expect(target().text()).toBe("2")

    act(() => receivedSetState(3))

    expect(renders).toBe(3)
    expect(target().text()).toBe("3")

    act(() => receivedSetState(4))

    expect(renders).toBe(4)
    expect(target().text()).toBe("4")
  })

  it("uses value with initializer", () => {
    const initializer = () => createValue(1)

    const Test = () => {
      const [count] = useValue(initializer)

      return (
        <h1>{count}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("1")
  })

  it("updates and resets value", () => {
    const value = createValue(1)
    let receivedSetCount
    let receivedResetCount

    let renders = 0

    const Test = () => {
      renders++
      const [count, setCount, resetCount] = useValue(value)

      receivedSetCount = setCount
      receivedResetCount = resetCount

      return (
        <h1>{count}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(renders).toBe(1)
    expect(target().text()).toBe("1")

    act(() => value.set(2))

    expect(value.get()).toBe(2)
    expect(target().text()).toBe("2")
    expect(renders).toBe(2)

    act(() => receivedResetCount(1))

    expect(value.get()).toBe(1)
    expect(target().text()).toBe("1")
    expect(renders).toBe(3)

    act(() => value.set(2))

    expect(target().text()).toBe("2")
    expect(value.get()).toBe(2)
    expect(renders).toBe(4)

    act(() => value.reset(5))

    expect(target().text()).toBe("5")
    expect(value.get()).toBe(5)
    expect(renders).toBe(5)
  })
})