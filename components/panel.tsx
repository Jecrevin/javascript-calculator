'use client'

import React from 'react'

export default function Panel ({
  setInput,
  expDispatch
}: {
  setInput: React.Dispatch<React.SetStateAction<string>>
  expDispatch: React.Dispatch<{
    type: 'input' | 'calculate' | 'clear'
    input?: string
  }>
}): React.JSX.Element {
  function handleClick (e: React.MouseEvent): void {
    const clickedButton = e.target as HTMLButtonElement
    if (/^[0-9+\-^.]$/.test(clickedButton.innerText)) {
      setInput(clickedButton.innerText)
      expDispatch({ type: 'input', input: clickedButton.innerText })
    } else {
      switch (clickedButton.id) {
        case 'times':
          setInput(clickedButton.innerText)
          expDispatch({ type: 'input', input: '*' })
          break
        case 'divide':
          setInput(clickedButton.innerText)
          expDispatch({ type: 'input', input: '/' })
          break
        case 'clear':
          setInput('0')
          expDispatch({ type: 'clear' })
          break
        case 'equals':
          expDispatch({ type: 'calculate' })
          break
        default:
          throw new Error('Unknown button input to this calculator!')
      }
    }
  }

  return (
    <div id="panel" className='m-2 h-[450px] grid grid-cols-4 grid-rows-5
    gap-1'>
      <button className='col-span-2 bg-rose-700' id='clear'
      onClick={handleClick}>AC</button>
      <button className='bg-stone-500' id='times'
      onClick={handleClick}>&times;</button>
      <button className='bg-stone-500' id='divide'
      onClick={handleClick}>&divide;</button>
      <button className='bg-neutral-600' id='7' onClick={handleClick}>7</button>
      <button className='bg-neutral-600' id='8' onClick={handleClick}>8</button>
      <button className='bg-neutral-600' id='9' onClick={handleClick}>9</button>
      <button className='bg-stone-500' id='power' onClick={handleClick}>
        ^
      </button>
      <button className='bg-neutral-600' id='4' onClick={handleClick}>4</button>
      <button className='bg-neutral-600' id='5' onClick={handleClick}>5</button>
      <button className='bg-neutral-600' id='6' onClick={handleClick}>6</button>
      <button className='bg-stone-500' id='minus' onClick={handleClick}>
        -
      </button>
      <button className='bg-neutral-600' id='1' onClick={handleClick}>1</button>
      <button className='bg-neutral-600' id='2' onClick={handleClick}>2</button>
      <button className='bg-neutral-600' id='3' onClick={handleClick}>3</button>
      <button className='bg-stone-500' id='plus'onClick={handleClick}>+</button>
      <button className='col-span-2 bg-neutral-600' id='0'
      onClick={handleClick}>0</button>
      <button className='bg-neutral-600' id='dot' onClick={handleClick}>
        .
      </button>
      <button className='bg-sky-600' id='equals' onClick={handleClick}>
        =
      </button>
    </div>
  )
}
