import React from 'react'
import styles from '../styles/Home.module.css'

const Button = ({
  symbol,
  setNumber,
  checkExpression,
  getResult,
  Reset,
  Delete,
  symbolControl,
  setSymbolControl,
  equalTogle,
  setEqualTogle,
}) => {
  function addSymbol() {
    if (
      symbol !== '+' &&
      symbol !== '-' &&
      symbol !== '/' &&
      symbol !== '*' &&
      symbol !== '=' &&
      symbol !== '.'
    ) {
      setNumber(symbol)
      checkExpression(symbol)
      setSymbolControl(true)
    }
    if (
      symbol === '+' ||
      symbol === '-' ||
      symbol === '/' ||
      symbol === '*' ||
      symbol === '.'
    ) {
      if (symbolControl === true) {
        setNumber(symbol)
        checkExpression(symbol)
        setSymbolControl(false)
        setEqualTogle(true)
      }
    }
    if (symbol === '=') {
      if (equalTogle === true) {
        getResult()
        setEqualTogle(false)
      }
    }
    if (symbol === 'RESET') {
      Reset()
    }
    if (symbol === 'DEL') {
      Delete()
    }
  }
  return (
    <button
      onClick={() => {
        addSymbol()
      }}
      className={
        symbol === 'RESET' || symbol === '='
          ? styles.calcButtonBig
          : styles.calcButton
      }
    >
      {symbol !== '*' ? symbol : 'x'}
    </button>
  )
}
export default Button
