import { MdArrowLeft, MdArrowDropDown } from 'react-icons/md'
import { useState } from 'react'
import Pagination from './Pagination'
import Post from './Posts'
import PersonInfo from './PersonInfo'
const personsPerPage = 20

function PersonList({
  posts,
  setPosts,
  // error,
  // setError,
  isLoading,
  //  setIsLoading,
}) {
  const [stateOfMenu, setStateOfMenu] = useState(0)
  const [openMenu, setOpenMenu] = useState(false)
  const [arrowChange, setArrowChange] = useState([false, false, false, false])
  const [newForm, setNewForm] = useState(false)
  const [count, setCount] = useState(0)
  const [nextCount, setNextCount] = useState(20)
  const [data, setData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      streetAddress: '',
      city: '',
      state: '',
      zip: '',
    },
  })
  function sortByID(posts, key) {
    const newPost = [...posts]
    newPost.sort((a, b) => (a[key] > b[key] ? 1 : -1))
    setPosts(newPost)
  }
  function sortByFirstName(posts, key) {
    let newPost = [...posts]
    newPost.sort((a, b) => (a[key].length > b[key].length ? 1 : -1))
    setPosts(newPost)
  }
  function getForm() {
    if (newForm) {
      setNewForm(false)
    } else {
      setNewForm(true)
    }
  }
  function handleOfInutChange(e, name) {
    setData({ ...data, [name]: e.target.value })
  }
  function onSubmitForm(e) {
    e.preventDefault()
    const newPosts = [...posts]
    newPosts.unshift({})
    newPosts[0] = data
    setPosts(newPosts)
  }
  function showTen(props) {
    setCount(props * 20)
    setNextCount((props + 1) * 20)
  }
  function changeArrowWay(ind) {
    if (arrowChange[ind]) {
      setArrowChange(
        arrowChange.map((item, index) => {
          if (index === ind) {
            return (item = false)
          }
        })
      )
    } else {
      setArrowChange(
        arrowChange.map((item, index) => {
          if (index === ind) {
            return (item = true)
          }
        })
      )
    }
  }
  function openAdress(value) {
    setStateOfMenu(value)
    openMenu === false ? setOpenMenu(true) : setOpenMenu(false)
  }
  return (
    <div className="fullDiv">
      {!isLoading ? (
        <button className="button" onClick={getForm}>
          Add person
        </button>
      ) : (
        ''
      )}
      {newForm ? (
        <form>
          <input
            className="form"
            placeholder="Id"
            value={data.id}
            onChange={(e) => handleOfInutChange(e, 'id')}
          ></input>
          <input
            className="form"
            placeholder="First Name"
            value={data.firstName}
            onChange={(e) => handleOfInutChange(e, 'firstName')}
          ></input>
          <input
            className="form"
            placeholder="Email"
            value={data.email}
            onChange={(e) => handleOfInutChange(e, 'email')}
          ></input>
          <input
            className="form"
            placeholder="Phone"
            value={data.phone}
            onChange={(e) => handleOfInutChange(e, 'phone')}
          ></input>
          <br></br>
        </form>
      ) : (
        ''
      )}
      <br />
      {data.id && newForm ? (
        <button
          className="button"
          value={data}
          onClick={(e) => onSubmitForm(e)}
        >
          Add
        </button>
      ) : (
        ''
      )}
      {newForm ? (
        <button
          className="button"
          onClick={() => {
            if (newForm) {
              setNewForm(false)
            } else {
              setNewForm(true)
            }
          }}
        >
          Hide
        </button>
      ) : (
        ''
      )}
      <div>
        {!isLoading ? (
          <table className="table">
            <tbody className="tableBody">
              <tr className="line">
                {
                  <td
                    onClick={() => {
                      sortByID(posts, 'id')
                    }}
                  >
                    <div
                      onClick={() => {
                        changeArrowWay(0)
                      }}
                    >
                      {arrowChange[0] ? <MdArrowDropDown /> : <MdArrowLeft />}
                      id
                    </div>
                  </td>
                }
                <td>
                  {
                    <div
                      onClick={() => {
                        sortByFirstName(posts, 'firstName')
                      }}
                    >
                      <div
                        onClick={() => {
                          sortByID(posts, 'id')
                        }}
                      >
                        <div
                          onClick={() => {
                            changeArrowWay(1)
                          }}
                        >
                          {arrowChange[1] ? (
                            <MdArrowDropDown />
                          ) : (
                            <MdArrowLeft />
                          )}
                          First Name
                        </div>
                      </div>
                    </div>
                  }
                </td>

                <td>
                  <div
                    onClick={() => {
                      sortByFirstName(posts, 'email')
                    }}
                  >
                    <div
                      onClick={() => {
                        changeArrowWay(2)
                      }}
                    >
                      {arrowChange[2] ? <MdArrowDropDown /> : <MdArrowLeft />}
                      Email
                    </div>
                  </div>
                </td>
                <td className="tableElement">
                  {
                    <div
                      onClick={() => {
                        sortByFirstName(posts, 'phone')
                      }}
                    >
                      <div
                        onClick={() => {
                          changeArrowWay(3)
                        }}
                      >
                        {arrowChange[3] ? <MdArrowDropDown /> : <MdArrowLeft />}
                        Phone
                      </div>
                    </div>
                  }
                </td>
              </tr>
              {posts.map((post, index) => {
                if (count < index && index < nextCount) {
                  return (
                    <Post {...post} index={index} openAdress={openAdress} />
                  )
                }
              })}
            </tbody>
          </table>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <div className="fullDiv">
        {posts.map((post, index) => {
          if (count < index && index < nextCount) {
            return (
              <PersonInfo
                {...post}
                index={index}
                openMenu={openMenu}
                stateOfMenu={stateOfMenu}
              />
            )
          }
        })}
      </div>
      {!isLoading ? (
        <Pagination
          personsPerPage={personsPerPage}
          totlaPersons={posts.length}
          onClick={showTen}
        />
      ) : (
        ''
      )}
    </div>
  )
}

export default PersonList
