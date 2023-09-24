'use client'

import Panel from '@/components/panel'
import React, { useEffect, useState } from 'react'

export default function Home (): React.JSX.Element {
  const [expression, setExpression] = useState('')
  const [input, setInput] = useState('0')

  function handleKeyDown (e: KeyboardEvent): void {
    console.log('keydown')
    const buttons = document.querySelectorAll('button')
    buttons.forEach((button) => {
      if (button.innerText === e.key) {
        button.click()
        return
      }
      switch (e.key) {
        case '*':
          document.getElementById('times')?.click()
          break

        case '/':
          document.getElementById('divide')?.click()
          break

        case 'Delete':
        case 'Backspace':
          document.getElementById('delete')?.click()
          break

        case ' ':
        case 'Enter':
          document.getElementById('equals')?.click()
          break

        case 'Escape':
          document.getElementById('clear')?.click()
      }
    })
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
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
