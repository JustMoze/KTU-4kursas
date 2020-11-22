import React from 'react'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'

export const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: ${(props) => (props.error ? 'red' : props.color)};
  }
  & label.Mui {
    color: ${(props) => (props.error ? 'red' : props.color)};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${(props) => (props.error ? 'red' : props.color)};
    },
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: ${(props) => (props.error ? 'red' : props.color)};
    },
  }

  & p.MuiFormHelperText-root {
          color: ${(props) => (props.error ? 'red' : '#323232')}
      }
  }
`
function Input({ handleChange, error, message, name, color, ...props }) {
  const ConfigureName = (name) => {
    name = name.slice(name.indexOf('_') + 1, name.length)
    return name.charAt(0).toUpperCase() + name.slice(1)
  }
  return (
    <WhiteBorderTextField
      color={color}
      error={error}
      label={ConfigureName(name)}
      helperText={error && message}
      variant="outlined"
      onChange={(text) => handleChange(text)}
      name={name}
      style={{
        width: '100%',
        marginBottom: 10,
      }}
      {...props}
    />
  )
}

export default Input
