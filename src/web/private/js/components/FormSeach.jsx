import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InputAutoComplete from '../presentational/InputAutoComplete.js';
import Input from '@material-ui/core/Input';

import axios from 'axios';

class FormSeach extends Component {
  constructor(){
    super();
  }
  
  render(){
    return (
      <div className='formRoute'>
        <div>
          Origem 
          {/* <input id={'origemInput'}></input> */}
          <Input
            defaultValue=""
            id={'origemInput'}
            inputProps={{
              'aria-label': 'description',
            }}
          />
          Parada 
          <div className={'inputIcon'}>
            {/* <InputAutoComplete id={'parada'}></InputAutoComplete> */}
            <Input
            defaultValue=""
            id={'destinoInput'}
            inputProps={{
              'aria-label': 'description',
            }}
          />
            <Fab size="small" color="secondary" aria-label="add" className={'classes.margin'}>
              <AddIcon />
            </Fab>
          </div>
        </div>
        <Button variant="contained" color="primary" className={'classes.button'}>
          Roteirizar
      </Button>
      </div>
    )
  }

}
export default FormSeach;