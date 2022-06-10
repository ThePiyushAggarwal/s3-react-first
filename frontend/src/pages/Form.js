import axios from 'axios'
import { useState } from 'react'

function Form() {
  const [url, setUrl] = useState('')

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
        name: data.name,
      })
      .then((res) => {
        axios.put(res.data.url, data, config).then(() => setUrl(res.data.url))
      })
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="file" accept="image/png, image/jpeg" />
        <button type="submit">Submit File</button>
      </form>

      {url && (
        <img src={url.split('?')[0]} height="500" width="500" alt="avatar" />
      )}
    </>
  )
}

export default Form
