const zeroPad = (value, size) => {
  let s = `000000000${value}`
  return s.substr(s.length - size)
}

const formatNumber = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const convertArrayToString = (array, symbol = ' ') => array.filter((item) => !!item).join(symbol)

const getBase64File = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = (error) => reject(error)
})

// Math.random().toString(36).substr(2, 6)

export {
  zeroPad,
  formatNumber,
  convertArrayToString,
  getBase64File
}
