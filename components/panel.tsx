'use client'

import React, { useState } from 'react'

export default function Panel ({
  exp,
  input,
  setInput,
  setExp
}: {
  exp: string
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
  setExp: React.Dispatch<React.SetStateAction<string>>
}): React.JSX.Element {
  // a variable shows how many left parenthesis is unpair
  const [unpair, setUnpair] = useState(0)

  /**
   * Make the calculator work properly when clicking on the `<button>`s
   * @param e the `MouseEvent` triggered by clicking one `<button>`
   */
  function handleClick (e: React.MouseEvent): void {
    const button = e.target as HTMLButtonElement

    // change the click button style to make it more vivid
    const pressedStyle = 'shadow-[inset_0_0_5px_rgba(255,255,255,0.7)]'
    button.classList.toggle(pressedStyle)
    // style the button back later indicates the button resets
    setTimeout(() => {
      button.classList.toggle(pressedStyle)
    }, 100)

    // handle input for calculator according to which button clicked
    if (button.id === 'equals') {
      // pressing '=' means we want to get the result of expression
      setExp(exp + '=')
      try {
        if (unpair > 0) throw new Error('Err')
        setInput(calculate(exp).toString())
      } catch (error) {
        if (exp.endsWith('=')) {
          setExp(input + '=')
          return
        }
        setInput((error as Error).message)
      }
    } else if (button.id === 'clear') {
      // pressing 'AC' means we want to reset the whole calculator
      setExp('')
      setInput('0')
      setUnpair(0)
    } else if (button.id === 'delete') {
      // pressing '\u2190' means we want to remove the last char we input
      if (exp.endsWith(')')) setUnpair(unpair + 1)
      if (exp.endsWith('(')) setUnpair(unpair - 1)
      setExp(exp.substring(0, exp.length - 1))
      const nextInput = input.substring(0, input.length - 1)
      setInput(nextInput === '' ? '0' : nextInput)
    } else {
      // pressing any other button will input a number or an operator
      // if we just get a result, we need to go on a new expression
      if (exp.endsWith('=')) setExp(exp => '')
      switch (button.id) {
        case 'par-left':
          setUnpair(unpair + 1)
          // prevent left parenthesis directly follows numbers
          if (/[0-9)]$/.test(exp)) {
            setExp(exp => exp + '\u00d7(')
          } else setExp(exp => exp + '(')
          break

        case 'par-right':
          if (unpair > 0) {
            // prevent empty parenthesis
            if (exp.endsWith('(')) setExp(exp => exp + '0')
            setExp(exp => exp + button.innerText)
            setUnpair(unpair - 1)
          }
          break

        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case 'dot':
          if (/[\d.]$/.test(exp)) setInput(input + button.innerText)
          else setInput(button.innerText)
          // prevent numbers directly follows right parenthesis
          if (exp.endsWith(')')) setExp(exp => exp + '\u00d7')
          setExp(exp => exp + button.innerText)
          break

        default:
          // a result got in the previous step, inputting an operator will apply
          // to it
          if (exp.endsWith('=')) setExp(exp => exp + input)
          // last input is an operator, inputting a new one will override it
          if (/[^0-9=]$/.test(exp)) {
            setExp(exp => exp.substring(0, exp.length - 1))
          }
          setExp(exp => exp + button.innerText)
      }
    }
    // prevent focus on the clicked button
    button.blur()
  }

  return (
    <div id="panel" className='m-2 h-[450px] grid grid-rows-5 grid-flow-col
    gap-1'>
      <button className='bg-rose-700 hover:bg-rose-600 transition-colors'
      id='clear' onClick={handleClick}>AC</button>
      <button className='bg-neutral-600 hover:bg-neutral-500
      transition-colors' id='7' onClick={handleClick}>7</button>
      <button className='bg-neutral-600 hover:bg-neutral-500
      transition-colors' id='4' onClick={handleClick}>4</button>
      <button className='bg-neutral-600 hover:bg-neutral-500
      transition-colors' id='1' onClick={handleClick}>1</button>
      <button className='bg-neutral-600 col-span-2 hover:bg-neutral-500
      transition-colors' id='0'
      onClick={handleClick}>0</button>
      <button className='relative bg-stone-500 hover:bg-stone-400
      transition-colors' id='par-left' onClick={handleClick}>
        &#40;
        { unpair > 0
          ? <div className='absolute bottom-1 right-1 text-sm
          pointer-events-none'>{unpair}</div>
          : null }
      </button>
      <button className='bg-neutral-600 hover:bg-neutral-500
      transition-colors' id='8' onClick={handleClick}>8</button>
      <button className='bg-neutral-600 hover:bg-neutral-500
      transition-colors' id='5' onClick={handleClick}>5</button>
      <button className='bg-neutral-600 hover:bg-neutral-500
      transition-colors' id='2' onClick={handleClick}>2</button>
      <button className='bg-stone-500 hover:bg-stone-400
      transition-colors' id='par-right' onClick={handleClick}>
        &#41;
      </button>
      <button className='bg-neutral-600 hover:bg-neutral-500
      transition-colors' id='9' onClick={handleClick}>9</button>
      <button className='bg-neutral-600 hover:bg-neutral-500
      transition-colors' id='6' onClick={handleClick}>6</button>
      <button className='bg-neutral-600 hover:bg-neutral-500
      transition-colors' id='3' onClick={handleClick}>3</button>
      <button className='bg-neutral-600 hover:bg-neutral-500
      transition-colors' id='dot' onClick={handleClick}>
        .
      </button>
      <button className='bg-stone-500 hover:bg-stone-400 transition-colors'
      id='divide' onClick={handleClick}>&divide;</button>
      <button className='bg-stone-500 hover:bg-stone-400 transition-colors'
      id='times' onClick={handleClick}>&times;</button>
      <button className='bg-stone-500 hover:bg-stone-400 transition-colors'
      id='minus' onClick={handleClick}>
        -
      </button>
      <button className='bg-stone-500 hover:bg-stone-400 transition-colors
      row-span-2' id='plus' onClick={handleClick}>+</button>
      <button className='bg-red-600 hover:bg-red-500 transition-colors'
      id='delete' onClick={handleClick}>
        {'\u2190'}
      </button>
      <button className='bg-stone-500 hover:bg-stone-400 transition-colors'
      id='power' onClick={handleClick}>
        ^
      </button>
      <button className='bg-sky-600 hover:bg-sky-500 transition-colors
      row-span-3' id='equals' onClick={handleClick}>=</button>
    </div>
  )
}

/**
 * Get the result of an `string` which is a mathmatic expression.
 * @param exp a mathmatic expression to be calculated
 * @returns a number which represents the result of `exp`
 */
function calculate (exp: string): number {
  if (/^\d*[.]?\d+$/.test(exp)) return parseFloat(exp)
  if (/^[+-]/.test(exp)) exp = '0' + exp
  const leftPar = exp.indexOf('(')
  if (leftPar !== -1) {
    const rightPar = findPairedPar(exp, leftPar)
    return calculate(
      exp.substring(0, leftPar) +
      calculate(exp.substring(leftPar + 1, rightPar).toString() +
      exp.substring(rightPar + 1))
    )
  }
  const processPlus = exp.split('+')
  if (processPlus.length > 1) {
    return processPlus.map(subExp => calculate(subExp))
      .reduce((sum, num) => sum + num)
  }
  const processMinus = exp.split('-')
  if (processMinus.length > 1) {
    return processMinus.map(subExp => calculate(subExp))
      .reduce((ans, num) => ans - num)
  }
  const processTimes = exp.split('\u00d7')
  if (processTimes.length > 1) {
    return processTimes.map(subExp => calculate(subExp))
      .reduce((ans, num) => ans * num)
  }
  const processDivide = exp.split('\u00f7')
  if (processDivide.length > 1) {
    return processDivide.map(subExp => calculate(subExp))
      .reduce((ans, num) => ans / num)
  }
  const processPower = exp.split('^')
  if (processPower.length > 1) {
    return processPower.map(subExp => calculate(subExp))
      .reduce((ans, num) => Math.pow(ans, num))
  }
  throw new Error('Err')
}

/**
 * An function to find the corresponding close parenthesis.
 * @param exp a mathmatic expression
 * @param leftIndex the index of open parenthesis in the `exp`
 * @returns the index of corresponding close parenthesis of the open one on
 * `leftIndex`
 */
function findPairedPar (exp: string, leftIndex: number): number {
  let unpair = 0
  for (let i = leftIndex + 1; i < exp.length; i++) {
    switch (exp[i]) {
      case '(':
        unpair++
        break

      case ')':
        if (unpair === 0) return i
        unpair--
    }
  }
  return -1
}
