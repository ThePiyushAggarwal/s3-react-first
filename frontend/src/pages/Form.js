import { useMemo } from 'react'
import axios from 'axios'
import { gql, useQuery } from '@apollo/client'
import { useDropzone } from 'react-dropzone'

// Styles for Drap and Drop component
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const focusedStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

// GraphQL Query
const GET_IMAGE = gql`
  query {
    getAllUser {
      imageUrls
    }
  }
`

function Form(props) {
  const { data, refetch } = useQuery(GET_IMAGE)
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ accept: { 'image/*': [] } })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  const onSubmit = () => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    const data = acceptedFiles

    console.log(data)

    data.map((file) =>
      axios
        .post('http://localhost:5000/s3url', {
          id: '62a8089b1a6225108d7d2a56',
        })
        .then((res) => {
          axios.put(res.data.url, file, config).then(() => refetch())
        })
    )
  }

  return (
    <>
      <div className='container'>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <button onClick={onSubmit}>Submit</button>
      </div>

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
