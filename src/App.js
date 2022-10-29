import { useState } from 'react'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Col,Form,Row,Container} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import Multiselect from "multiselect-react-dropdown";
import './App.css'
import { useEffect } from 'react';

const instance=Axios.create({ 
  baseURL: 'https://amazon-api.sellead.com/',
}); 

function App() {
  const [validarPais, setValidarPais] = useState('form-control is-invalid');
  const [validarCidade, setValidarCidade] = useState('form-control is-invalid');
  const [listaPaises,setListaPaises]= useState([])
  const [listaCidades,setListaCidades]= useState([])
  const [paises,setPaises]= useState([])
  const [cidades,setCidades]= useState([])


  useEffect(()=>{
      const fetchPais=async()=>{
        try{
          const result=await instance.get('/country')
          let yep=result.data.map(pais=>{
            return pais.name_ptbr
          })
          setListaPaises(yep)
        }
        catch(e){
          console.error(e.message)
        }

      }
      const fetchCidades=async()=>{
        try{
          const result=await instance.get('/city')
          let yep=result.data.map(cidade=>{
           return cidade.name
          })
          setListaCidades(yep)
        }
        catch(e){
          console.error(e.message)
        }

      }
      fetchPais()
      fetchCidades()
  },[])
  const schema = yup.object().shape({
    nome: yup.string().required("Esse campo é obrigatorio"),
    celular: yup.string().min(15,'Numero insuficiente').required("Esse campo é obrigatorio"),
    cpf: yup.string().min(14,'Numero insuficiente').required("Esse campo é obrigatorio"),
    email:yup.string().email('Email é inválido!')
    .required('Esse campo é obrigatorio'),
  });

  function modificarPais(e){
    setPaises(e)
    if(e.length){
      console.log('Valido')
      setValidarPais('')
    }
    else{
      console.log('Invalido')
      setValidarPais('form-control is-invalid')
    }
    }

  function modificarCidade(e){
    setCidades(e)
      if(e.length){
        console.log('Valido')
        setValidarCidade('')
      }
      else{
        console.log('Invalido')
        setValidarCidade('form-control is-invalid')
      }
      }

  function mphone(v) {
    if(!v){
      return
    }
    
    var r = v.toString().replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
   } else if (r.length > 5) {
      r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
      r = r.replace(/^(\d*)/, "($1");
    }
  return r
  }
  
  function _cpf(cpf) {
    return cpf
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    }
  
      return (
          <div>
      <Container fluid>
    
      <Formik
        validationSchema={schema}
        onSubmit={values=>{
          if(paises[0]&&cidades[0]){
            console.log('submiting')
            console.log(paises[0])
          }
          else{
            console.log("Valores Invalidos!")
          }
        }}
        initialValues={{
          nome: '',
          celular: '',
          cpf: '',
          email: '',
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
          isValidating,
          validate,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
          <Row>

            <Col>
            <h2>Dados Pessoais</h2>
              <Form.Group as={Col} md="10" controlId="validationFormik01">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={values.nome}
                  onChange={handleChange}
                  isValid={touched.nome && !errors.nome}
                  isInvalid={!!errors.nome}
                  placeholder="Tony Stark"
                />
                <Form.Control.Feedback>Tudo certo!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="10" controlId="validationFormik04">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="nome@exemplo.com"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  isValid={touched.email && !errors.email}
                />
                <Form.Control.Feedback>Tudo certo!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="10" controlId="validationFormik03">
                <Form.Label>Celular</Form.Label>
                <Form.Control
                  type="text" 
                  placeholder="(75) 99220-4987"
                  name="celular"
                  value={mphone(values.celular)}
                  onChange={handleChange}
                  isInvalid={!!errors.celular}
                  isValid={touched.celular && !errors.celular}
                />
                <Form.Control.Feedback>Tudo certo!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{errors.celular}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="10" controlId="validationFormik01">
                <Form.Label>Cpf</Form.Label>
                <Form.Control
                  type="text"
                  name="cpf"
                  value={_cpf(values.cpf)}
                  onChange={handleChange}
                  isValid={touched.cpf && !errors.cpf}
                  isInvalid={!!errors.cpf}
                  placeholder="000.000.000-00"
                />
    <Form.Control.Feedback>Tudo certo!</Form.Control.Feedback>
    <Form.Control.Feedback type="invalid">{errors.cpf}</Form.Control.Feedback>         
              </Form.Group>
            </Col>

          <Col>
          <h2>Destino de Interesse</h2>
              <Form.Group>
              <Form.Label>Pais</Form.Label>
              {listaPaises?
                            <Multiselect
                            isObject={false}
                            onRemove={modificarPais}
                            onSelect={modificarPais}
                            options={listaPaises}
                            showCheckbox
                            className={validarPais}
                    />
              :null}

        {!paises[0]?<p className='invalid-text'>Esse campo é obrigatorio</p>:null} 
              </Form.Group>

              <Form.Group>
              <Form.Label>Cidade</Form.Label>
              {listaCidades?
                            <Multiselect
                            isObject={false}
                            onRemove={modificarCidade}
                            onSelect={modificarCidade}
                            options={listaCidades}
                            showCheckbox
                            className={validarCidade}
                    />
              :null}
                 {!cidades[0]?<p className='invalid-text'>Esse campo é obrigatorio</p>:null} 
              </Form.Group>
          </Col> 

              </Row>
              <div style={{display: 'flex',justifyContent: 'center'}}>
              <Button style={{width:'30%'}}type="submit">Enviar</Button>

              </div>

          </Form>
        )}
      </Formik>
     
    </Container>
  </div>
        );
}

export default App;
