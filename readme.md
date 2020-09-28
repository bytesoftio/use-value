# @bytesoftio/use-value

## Installation

`yarn add @bytesoftio/use-value` or `npm install @bytesoftio/use-value`

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Description](#description)
- [useValue](#usevalue)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Description

This package provides a React integration for [@bytesoftio/value](https://github.com/bytesoftio/value).

## useValue

This helper can be used to hook up a value inside a component.

```tsx
import React from "react"
import { createValue } from "@bytesoftio/value"
import { useValue } from "@bytesoftio/use-value"

const globalCount = createValue(0)

const Component = () => {
  // hook up a new value, creates a new instance of ObservableValue behind the scenes
  const count1 = useValue(0)
  // use an initializer / factory
  const count2 = useValue(() => 0)
  // use an existing instance of ObservableValue
  const count3 = useValue(globalCount)
  
  const increment = () => count1.set(count1 + 1)

  return <button onClick={increment}>count: {count1.get()}</button>
}
```
