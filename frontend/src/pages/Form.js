import axios from 'axios'
import { gql, useQuery } from '@apollo/client'

const GET_IMAGE = gql`
  query {
    getAllUser {
      imageUrls
    }
  }
`

function Form() {
  const { data, refetch } = useQuery(GET_IMAGE)

  const onSubmit = (e) => {
    e.preventDefault()
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    const data = e.target[0].files[0]

    axios
      .post('http://localhost:5000/s3url', {
        id: '62a8089b1a6225108d7d2a56',
      })
      .then((res) => {
        axios.put(res.data.url, data, config).then((x) => refetch())
      })
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type='file' accept='image/png, image/jpeg' />
        <button type='submit'>Submit File</button>
      </form>

      {data &&
        data?.getAllUser[0]?.imageUrls.map((image) => (
          <img
            src={`${process.env.REACT_APP_AWS_BASE_URI}${image}`}
            height='250'
            width='250'
            alt='avatar'
            key={image}
          />
        ))}
    </>
  )
}

export default Form
