import React, { useRef } from 'react'
import './select.style.scss'
interface SelectOptions {
  values: Array<{
    value: string
    node: React.ReactNode
  }>
  onSelect: (value: string) => void
}

function Select({ values, onSelect }: SelectOptions) {
  const templete = (node: React.ReactNode = <p>Elige una Opción</p>) => node
  const headerNode = useRef(templete())
  const Option = (value: string, node: React.ReactNode, key: number) => {
    return (
      <div
        key={key}
        onMouseDown={() => {
          headerNode.current = templete(node)
          onSelect(value)
        }}
      >
        {node}
      </div>
    )
  }
  return (
    <div className="select" tabIndex={0}>
      <div className="select__header">{headerNode.current} </div>
      <div className="select__options" tabIndex={0}>
        {values.map((Value, key) => Option(Value.value, Value.node, key))}
      </div>
    </div>
  )
}

export default Select
