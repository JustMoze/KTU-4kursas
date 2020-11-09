export const register = [
  {
    name: 'name',
    value: 'Mykolas',
    type: 'text',
    validation: {
      email: false,
      min: 1,
      max: 255,
    },
  },
  {
    name: 'surname',
    value: 'Motiejus',
    type: 'text',
    validation: {
      email: false,
      min: 1,
      max: 255,
    },
  },
  {
    name: 'username',
    value: 'Mykolas',
    type: 'text',
    validation: {
      email: false,
      min: 5,
      max: 255,
    },
  },

  {
    name: 'email',
    value: 'mykolas@gmail.com',
    type: 'email',
    validation: {
      email: true,
    },
  },
  {
    name: 'password',
    value: 'Password',
    type: 'password',
    validation: {
      email: false,
      min: 7,
      max: 255,
    },
  },
]
export const login = [
  {
    name: 'email',
    value: 'mykolas@gmail.com',
    type: 'email',
    validation: {
      email: false,
    },
  },
  {
    name: 'password',
    value: 'Password',
    type: 'password',
    validation: {
      email: false,
      min: 7,
      max: 255,
    },
  },
]

export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export function validateLength(min, max, input, name) {
  let errorArr = []
  if (input.length < min) {
    errorArr.push(`${name} msut be longer then ${min - 1} characters`)
  } else if (input.length > max) {
    errorArr.push(`${name} msut be longer then ${min - 1} characters`)
  }
  return errorArr
}
