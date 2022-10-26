import { useState } from 'react'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Col,Form,Row,Container} from 'react-bootstrap';
import { Formik } from 'formik';
 import * as yup from 'yup';

function App() {

  const schema = yup.object().shape({
    nome: yup.string().required("Esse campo é obrigatorio"),
    endereco: yup.string().required("Esse campo é obrigatorio"),
    celular: yup.string().min(15,'Numero insuficiente').required("Esse campo é obrigatorio"),
    cpf: yup.string().min(14,'Numero insuficiente').required("Esse campo é obrigatorio"),
    email:yup.string().email('Email é inválido!')
    .required('Esse campo é obrigatorio'),
    observacao: yup.string().required("Esse campo é obrigatorio"),
    nascimento: yup.string().required("Esse campo é obrigatorio"),

  });

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
  
        <header >
        <h1>Cadastro de Cliente</h1>
        <p><em>Local de cadastro de clientes</em></p>
        </header>
     
      <Formik
        validationSchema={schema}
        onSubmit={values=>{

/*           console.log("testando aquiiii")
         // Axios.post('https://tranquil-shelf-46464.herokuapp.com/users',{email:values.email,cpf:values.cpf,nome:values.nome,endereco:values.endereco,observacao:values.observacao,celular:values.celular,nascimento:values.nascimento})
         // .then((value)=>console.log(`dado foi submitted`))
          props.backendData.push({email:values.email,cpf:values.cpf,nome:values.nome,endereco:values.endereco,observacao:values.observacao,celular:values.celular,nascimento:values.nascimento})
          props.setBackendData(props.backendData)
          navigate("/Registrar-Clientes/search") */
        }}
        initialValues={{
          nome: '',
          endereco: '',
          celular: '',
          cpf: '',
          email: '',
          observacao: "",
          nascimento:"",
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

              <Form.Group as={Col} md="10" controlId="validationFormik05">
                <Form.Label>Observacao</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Observacao"
                  name="observacao"
                  value={values.observacao}
                  onChange={handleChange}
                  isValid={touched.observacao && !errors.observacao}
                />
                <Form.Control.Feedback>Tudo certo!</Form.Control.Feedback>
              </Form.Group>
              </Col> 

              </Row>
              
            <Button style={{marginTop:"10vh"}} type="submit">Confirmar</Button>
          </Form>
        )}
      </Formik>
     
    </Container>
  </div>
        );
}

export default App;
