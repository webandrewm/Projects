import React from 'react'
import styles from '../styles/Home.module.css'
import symbols from './components/symbols'
import Button from './Button'
import { useState } from 'react'
import { evaluate } from 'mathjs'

const Calc = () => {
  const [number, setNumber] = useState(0)
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState(0)
  const [symbolControl, setSymbolControl] = useState(true)
  const [equalTogle, setEqualTogle] = useState(true)
  function checkExpression(symbol) {
    let length = expression.length
    setExpression(expression + symbol)
  }
  function getResult() {
    let val = expression.slice(-1)
    if (val !== '+' && val !== '/' && val !== '*' && val !== '-') {
      let exp = evaluate(expression)
      setResult(exp)
      setExpression(exp)
    }
  }
  const Reset = () => {
    setExpression('')
    setResult('')
  }
  const Delete = () => {
    let length = expression.length
    setExpression(expression.toString().slice(0, -1))
  }
  return (
    <div className={styles.mainCalc}>
      <div className={styles.calcExpression}>
        <h1 className={styles.expression}>{expression}</h1>
      </div>
      <div className={styles.calcTable}>
        {symbols.map((symbol, index) => {
          return (
            <Button
              equalTogle={equalTogle}
              setEqualTogle={setEqualTogle}
              symbolControl={symbolControl}
              setSymbolControl={setSymbolControl}
              Delete={Delete}
              Reset={Reset}
              getResult={getResult}
              checkExpression={checkExpression}
              setNumber={setNumber}
              symbol={symbol}
              key={index}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Calc
