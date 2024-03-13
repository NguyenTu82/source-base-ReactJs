const getBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(new File([file], 'ooo', { type: 'text/csv' }))
  reader.onload = () => resolve(reader.result)
  reader.onerror = (error) => reject(error)
})

const dataURLtoFile = (dataUrl, filename) => {
  // const formatData = `data:text/csv;base64,${dataUrl}`
  let arr = dataUrl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

const openDownloadLink = (data, filename) => {
  const downloadUrl = `data:text/csv;base64,${data}`
  const a = document.createElement('a')

  if (typeof a.download === 'undefined') {
    window.location = downloadUrl
  } else {
    a.href = downloadUrl
    a.download = filename
    document.body.appendChild(a)
    a.click()
  }
}

const readAsDataURL = (file, callback) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    callback(e.target.result)
  }
  reader.readAsDataURL(file)
}

export {
  getBase64,
  dataURLtoFile,
  openDownloadLink,
  readAsDataURL
}
