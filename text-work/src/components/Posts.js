function Post({ id, firstName, lastName, email, phone, openAdress, index }) {
  return (
    <>
      <tr
        onClick={() => {
          let value = index
          return openAdress(value)
        }}
        className="tableS"
      >
        <td>{id}</td>
        <td>{firstName}</td>
        <td>{email}</td>
        <td>{phone}</td>
      </tr>
    </>
  )
}

export default Post
