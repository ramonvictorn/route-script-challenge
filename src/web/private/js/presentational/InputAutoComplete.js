import React from 'react';
import Select from 'react-select';
function InputAutoComplete({options,id}){
    console.log('InputAutoComplete ', id);
    return(
        <Select
          classes={'classes'}
          styles={'selectStyles'}
          inputId={id}
          TextFieldProps={{
            label: 'Country',
            InputLabelProps: {
              htmlFor: id,
              shrink: true,
            }
          }}
          placeholder="Digite sua origem"
          // options={suggestions}
          // components={components}
          // value={single}
          // onChange={handleChangeSingle}
        />
    )
}
export default InputAutoComplete;