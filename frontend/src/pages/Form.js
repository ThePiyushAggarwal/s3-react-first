import axios from 'axios'
import { gql, useQuery } from '@apollo/client'

const GET_IMAGE = gql`
  query {
    getAllUser {
      imageUrls
      imageUrls2
    }
  }
`

function Form() {
  const { data, refetch } = useQuery(GET_IMAGE)

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('voila')
  }

  const onChangeUpload = (e) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    const data = e.target.files[0]

    axios
      .post('http://localhost:5000/s3url', {
        id: '62a8089b1a6225108d7d2a56',
        field: e.target.id,
      })
      .then((res) => {
        axios.put(res.data.url, data, config).then(() => refetch())
      })
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type='file'
          accept='image/png, image/jpeg'
          onChange={onChangeUpload}
          id='imageUrls'
        />
        <input
          type='file'
          accept='image/png, image/jpeg'
          onChange={onChangeUpload}
          id='imageUrls2'
        />
        <button type='submit'>Submit File</button>
      </form>
      <p>imageUrls</p>
      {data &&
        data?.getAllUser[0]?.imageUrls?.map((image) => (
          <img
            src={`${process.env.REACT_APP_AWS_BASE_URI}${image}`}
            height='250'
            width='250'
            alt='avatar'
            key={image}
          />
        ))}
      <p>imageUrls2</p>
      {data &&
        data?.getAllUser[0]?.imageUrls2?.map((image) => (
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
