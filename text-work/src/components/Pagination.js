import { useState } from 'react'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

const Pagination = ({ personsPerPage, onClick }) => {
  const [nextButton, setNextButton] = useState(10)
  const [previosButton, setPreviosButton] = useState(0)
  const totalPersons = 1000
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalPersons / personsPerPage); i++) {
    pageNumbers.push(i)
  }
  function fcNext() {
    if (
      nextButton < pageNumbers.length &&
      previosButton < pageNumbers.length - 10
    ) {
      setNextButton(nextButton + 10)
      setPreviosButton(previosButton + 10)
    }
  }
  function fcPrevios() {
    if (nextButton > 10 && previosButton > 0) {
      setNextButton(nextButton - 10)
      setPreviosButton(previosButton - 10)
    }
  }
  return (
    <div>
      <button onClick={fcPrevios} className="button">
        <MdArrowBackIosNew />
      </button>
      {pageNumbers.map(
        (number, index) =>
          previosButton <= number &&
          number <= nextButton && (
            <div
              className="paginG"
              onClick={() => {
                onClick(number - 1)
              }}
            >
              {previosButton <= number && number <= nextButton && (
                <li key={index} className="pagin">
                  <p href="!#" className="numbers">
                    {`${number} ${number < nextButton ? '' : ' '}`}
                  </p>
                  <p></p>
                </li>
              )}
            </div>
          )
      )}
      <button onClick={fcNext} className="button">
        <MdArrowForwardIos />
      </button>
    </div>
  )
}

export default Pagination
