const email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const onlyNumber = /^[0-9][0-9]*([.]?[0-9]|)$/
const onlyNumberThan0 = /^[1-9][0-9]*([.]?[0-9]|)$/
const decimal = /^\d*\.?\d*$/
const latinCharacter = /^(([A-Za-z0-9]|[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]|\s){1,200})$/
const uppercase = /[A-Z]/
const lowercase = /[a-z]/
const number = /[0-9]/

export {
  email,
  onlyNumber,
  onlyNumberThan0,
  decimal,
  latinCharacter,
  uppercase,
  lowercase,
  number
}
