'use client'

import Panel from '@/components/panel'
import React, { useEffect, useState } from 'react'

export default function Home (): React.JSX.Element {
  // a `string` represents mathmaic expression
  const [expression, setExpression] = useState('')
  // a `string` represents current input number or the result of expression
  const [input, setInput] = useState('0')

  /**
   * Make the calculator work properly when pressing down keyboard.
   * @param e the Event
   */
  function handleKeyDown (e: KeyboardEvent): void {
    console.log('keydown')
    const buttons = document.querySelectorAll('button')
    buttons.forEach((button) => {
      if (button.id === parseButtonId(e.key)) button.click()
    })
  }

  // add the above handler to `window` to ensure it works
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    // remove the handler when deconstruct the whole page
    return () => { window.removeEventListener('keydown', handleKeyDown) }
  }, [])

  return (
    <main id="calculator" className='w-[500px] border-gray-500 border-4
    rounded-sm bg-zinc-300'>
      <div id="expression" className='min-h-[2rem] px-2 mt-2 w-full text-right
      text-xl text-black break-words'>
        {expression}
      </div>
      <div id="input" className='px-2 py-4 w-full text-right text-3xl
      text-black'>
        {input}
      </div>
      <Panel exp={expression} input={input} setInput={setInput}
      setExp={setExpression} />
    </main>
  )
}

// a map for `handleKeyDown` to convert the `e.key` to corresponding `<button>`
// id
const keyMap = new Map([
  ['Escape', 'clear'],
  ['Backspace', 'delete'],
  ['Delete', 'delete'],
  ['Enter', 'equals'],
  [' ', 'equals'],
  ['=', 'equals'],
  ['(', 'par-left'],
  [')', 'par-right'],
  ['+', 'plus'],
  ['-', 'minus'],
  ['*', 'times'],
  ['/', 'divide'],
  ['^', 'power'],
  ['.', 'dot']
])

/**
 * Parse the pressed key's `e.key` to `<button>`'s id
 * @param key the `KeyboardEvent.key`
 * @returns the corresponding `<button>` id of pressed key
 */
function parseButtonId (key: string): string | undefined {
  if (/^\d$/.test(key)) return key
  const id = keyMap.get(key)
  return id
}
