import axios from 'axios'
import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'

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
  const [loading, setLoading] = useState([])
  const [error, setError] = useState(null)

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('voila')
  }

  const onChangeUpload = (e) => {
    const data = e.target.files[0]

    console.log(data)
    if (!data) {
      return
    }

    setLoading(loading.concat(e.target.id))

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    axios
      .post('http://localhost:5000/s3url', {
        id: '62a8089b1a6225108d7d2a56',
        field: e.target.id,
      })
      .then((res) => {
        console.log(res.data)
        axios
          .put(res.data.uploadURL, data, config)
          .then(() => {
            refetch()
            setLoading(loading.splice(loading.indexOf(e.target.id), 1))
          })
          .catch((err) => setError(err))
      })
  }

  if (error) {
    return <p>Something went wrong. Please try again later.</p>
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
        {loading.some((x) => x === 'imageUrls') && (
          <p>Wait for the upload biatch!</p>
        )}
        <input
          type='file'
          accept='image/png, image/jpeg'
          onChange={onChangeUpload}
          id='imageUrls2'
        />
        {loading.some((x) => x === 'imageUrls2') && (
          <p>Wait for the upload biatch!</p>
        )}
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
