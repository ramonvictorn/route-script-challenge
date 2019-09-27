import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InputAutoComplete from '../presentational/InputAutoComplete.js';
import Input from '@material-ui/core/Input';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from 'axios';

class FormSeach extends Component {
  constructor(){
    super();
  }
  
  render(){
    return (
      <div className='formRoute'>
        <Row>
            <Col>Origem</Col>
        </Row>
        <Row>
            <Col>
                <Input
                    defaultValue=""
                    id={'origemInput'}
                    inputProps={{
                    'aria-label': 'description',
                    }}
                />
            </Col>
        </Row>
        <Row>
            <Col>Destino</Col>
        </Row>
        <Row>
            <Col>
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
            </Col>
        </Row>
        <Button variant="contained" color="primary" className={'classes.button'}>
          Roteirizar
      </Button>
      <Row className={'rowfix'} >
          <Col>
            <div id={'routesDescription'}></div>
          </Col>
      </Row>
      </div>
    )
  }

}
export default FormSeach;