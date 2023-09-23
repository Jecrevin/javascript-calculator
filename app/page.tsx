'use client'

import Panel from '@/components/panel'
import React, { useReducer, useState } from 'react'

export default function Home (): React.JSX.Element {
  const [expression, dispatch] = useReducer(reducer, '')
  const [input, setInput] = useState('0')

  return (
    <main id="calculator" className='w-2/5 border-gray-400 border-2
    bg-black'>
      <div id="expression" className='px-2 py-4 w-full text-right text-xl'>
        {expression}
      </div>
      <div id="input" className='px-2 py-4 w-full text-right text-3xl'>
        {input}
      </div>
      <Panel setInput={setInput} expDispatch={dispatch} />
    </main>
  )
}

function calculate (exp: string): number {
  if (/^\d*[.]?\d+$/.test(exp)) return parseFloat(exp)
  if (exp[0] === '(') {
    const right = exp.lastIndexOf(')')
    return calculate(
      calculate(exp.substring(0, right)).toString() + exp.substring(right + 1)
    )
  }
  for (let i = 0; i < exp.length; i++) {
    switch (exp[i]) {
      case '+':
        return calculate(exp.substring(0, i)) + calculate(exp.substring(i + 1))
      case '-':
        return calculate(exp.substring(0, i)) - calculate(exp.substring(i + 1))
      case '*':
        return calculate(exp.substring(0, i)) * calculate(exp.substring(i + 1))
      case '/':
        return calculate(exp.substring(0, i)) / calculate(exp.substring(i + 1))
      case '^':
        return Math.pow(
          calculate(exp.substring(0, i)), calculate(exp.substring(i + 1))
        )
    }
  }
  throw new Error('Err')
}

function reducer (
  state: string,
  action: {
    type: 'input' | 'calculate' | 'clear'
    input?: string
  }
): string {
  if (action.type === 'input') return state + action.input
  if (action.type === 'calculate') {
    return (/^[+-]/.test(state)
      ? calculate('0' + state)
      : calculate(state)).toString()
  }
  if (action.type === 'clear') return ''
  throw new Error(`Unknown action: ${action.type as string}`)
}
