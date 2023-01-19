import { AiOutlineSearch } from 'react-icons/ai'
import React, { useState } from 'react'
import Countrie from './Countrie'
import styles from '../styles/Home.module.css'
import { Dropdown } from '@nextui-org/react'

const Countries = ({ data }) => {
  const [showMore, setShowMore] = useState(20)
  const [search, setSearch] = useState('')
  const [dataNow, setDataNow] = useState('')
  const [dataSort, setDataSort] = useState('')
  function serchData(Data) {
    let newData = Data.filter((item, index) => {
      if (item.name.common.toLowerCase().includes(search.toLowerCase())) {
        return item
      }
    })
    console.log(newData)
    setDataSort('')
    setDataNow(newData)
  }
  function searchByRegion(Data, key) {
    let newData = Data.filter((item) => {
      if (item.region.includes(key)) {
        return item
      }
    })
    setDataNow('')
    setShowMore(20)
    setSearch('')
    setDataSort(newData)
  }
  function addShowMore() {
    if (showMore < dataSort.length || showMore < dataNow.length || data) {
      setShowMore((showMore) => showMore + 20)
    }
  }
  function downShowMore() {
    if (showMore > 20) {
      setShowMore((showMore) => showMore - 20)
    }
  }
  return (
    <div>
      <div className={styles.dropAndSearch}>
        <div className={styles.search}>
          <AiOutlineSearch className={styles.searchIcon} />
          <input
            type="text"
            value={search}
            className={styles.searchInput}
            onChange={(e) => {
              e.preventDefault()
              setSearch(e.target.value)
              serchData(data)
            }}
            placeholder="Serach for a country..."
          ></input>
        </div>
        <div>
          <Dropdown>
            <Dropdown.Button
              css={{
                height: '30px',
                margin: '15px',
                fontSize: '20px',
                color: '#2a639d',
                backgroundColor: 'white',
              }}
              flat
            >
              Filter by Region
            </Dropdown.Button>
            <Dropdown.Menu
              onAction={(key) => searchByRegion(data, key)}
              aria-label="Static Actions"
            >
              <Dropdown.Item
                css={{ color: '#2a639d', fontSize: '20px' }}
                key="Africa"
              >
                Africa
              </Dropdown.Item>
              <Dropdown.Item
                css={{ color: '#2a639d', fontSize: '20px' }}
                key="America"
              >
                America
              </Dropdown.Item>
              <Dropdown.Item
                css={{ color: '#2a639d', fontSize: '20px' }}
                key="Asia"
              >
                Asia
              </Dropdown.Item>
              <Dropdown.Item
                css={{ color: '#2a639d', fontSize: '20px' }}
                key="Europe"
              >
                Europe
              </Dropdown.Item>
              <Dropdown.Item
                css={{ color: '#2a639d', fontSize: '20px' }}
                key="Oceania"
              >
                Oceania
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className={styles.cards}>
        {(() => {
          if (dataNow.length === 0 && dataSort.length === 0) {
            return data.map((item, index) => {
              if (index < showMore) {
                return <Countrie countrie={item} key={index} />
              }
            })
          } else if (dataNow.length !== 0) {
            return dataNow.map((item, index) => {
              if (index < showMore) {
                return <Countrie countrie={item} key={index} />
              }
            })
          } else if (dataSort.length !== 0) {
            return dataSort.map((item, index) => {
              if (index < showMore) {
                return <Countrie countrie={item} key={index} />
              }
            })
          }
        })()}
      </div>
      <div className={styles.showCardsButton}>
        <button onClick={addShowMore} className={styles.showMore}>
          Show more
        </button>
        {showMore > 20 ? (
          <button onClick={downShowMore} className={styles.showMore}>
            Show Back
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Countries
