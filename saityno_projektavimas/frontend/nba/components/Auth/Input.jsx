import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'

function Input({ handleChange, error, message, name, ...props }) {
  const WhiteBorderTextField = styled(TextField)`
    & label.Mui-focused {
      color: ${error ? 'red' : 'green'};
    }
    & label.Mui {
      color: ${error ? 'red' : 'green'};
    }
    & .MuiOutlinedInput-root {
      &.Mui-focused fieldset {
        border-color: ${error ? 'red' : 'green'};
      },
    }
    & .MuiOutlinedInput-root {
      & fieldset {
        border-color: ${error ? 'red' : 'green'};
      },
    }

    & p.MuiFormHelperText-root {
            color: ${error ? 'red' : '#323232'}
        }
    }
  `
  const ConfigureName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }
  return (
    <WhiteBorderTextField
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
