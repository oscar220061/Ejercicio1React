import "./EnrolList.css";
import { DetailsList } from "@fluentui/react/lib/DetailsList";
import "../formato.css"
import {useCallback, useEffect, useState} from 'react'

// Columns for the detail list.
const columns = [
  {
    key: "fname",
    name: "First Name",
    fieldName: "fname",
    minWidth: 90,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "lname",
    name: "Last Name",
    fieldName: "lname",
    minWidth: 90,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "program",
    name: "Program",
    fieldName: "program",
    minWidth: 60,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "email",
    name: "Email",
    fieldName: "email",
    minWidth: 130,
    maxWidth: 200,
    isResizable: true,
  },
];
const initialList = [{key: 1, fname:"Oscar", lname:"Gracia", program: "UG", email:"oscar@gmail.com"}]

// Change items by elements introduces in other component


function EnrolList(){
   
    const[usuarios, setUsuarios] = useState(initialList);
  
    
    const [usuario, setUsuario] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [email, setEmail] = useState("")
    const [sexo, setSexo] = useState("UG")
    const [errorUsuario, setErrorUsuario] = useState("El nombre no puede estar vacío.")
    const [errorApellidos, setErrorApellidos] = useState("El apellido no puede estar vacío.")
    const [errorEmail, setErrorEmail]= useState("El email no puede estar vacío.")
   
    const [isValid, setIsValid] = useState(false)
    const [data, setData] = useState({usuario: usuario, apellidos: apellidos, email: email, sexo: sexo, isChecked: true})
    
    
    const validar = useCallback( function(){
        console.log("validar")
       
        if(errorUsuario === "" && errorApellidos === "" && errorEmail === "" ){
            setIsValid(true)
           
        }else{
            setIsValid(false)
        }
    },
    [errorUsuario, errorApellidos, errorEmail]
    )


    function handleUsuario(event){

        setUsuario(event.target.value)
       
       
        if(event.target.value.length > 10){
            setErrorUsuario("El nombre no puede superar los 10 carácteres.")
        }else if(event.target.value === ""){
            setErrorUsuario("El nombre no puede estar vacío.")
        }else{
            setData({...data, usuario: event.target.value})
            setErrorUsuario("")
        }
        
    }
    function handleApellidos(event){
        setApellidos(event.target.value)
        if(event.target.value.length > 20){
            setErrorApellidos("El apellido no puede superar los 20 carácteres.")
        }else if(event.target.value === ""){
            setErrorApellidos("El apellido no puede estar vacío.")
        }else{
            setData({...data, apellidos: event.target.value})
            setErrorApellidos("")  
        }
    }
    function handleEmail(event){
        setEmail(event.target.value)
        if(event.target.value.length > 20){
            setErrorEmail("El email no puede superar los 20 carácteres.")
        }else if(event.target.value === ""){
            setErrorEmail("El email no puede estar vacío.")
        }else if(!event.target.value.includes('@')){
            setErrorEmail("El email debe contener un @")
        }else{
            setData({...data, email: event.target.value})
            setErrorEmail("") 
        }
    }
    function handleSexo(event){
        setSexo(event.target.value)
        setData({...data, sexo: event.target.value})
    }
    
    
    function handleSubmit(e){
        
        if(isValid){
            e.preventDefault()
            setUsuarios([...usuarios, {key: 1, fname: usuario , lname: apellidos, program: sexo, email: email}])
           
            
        }else{
            e.preventDefault()
            console.log("Formulario incorrecto")
        }
    
    }

   

    useEffect(()=>{
        validar()
    },[validar])
   
    return(
        <>
            <form className="form" onSubmit={handleSubmit}>
                <p>Nombre Usuario</p>
                <input value={usuario} onChange={handleUsuario}/>
                <p className='error'>{errorUsuario}</p>
                <p>Apellidos</p>
                <input value={apellidos} onChange={handleApellidos}/>
                <p className='error'>{errorApellidos}</p>
                <p>Email</p>
                <input value={email} onChange={handleEmail}/><br/>
                <p className='error'>{errorEmail}</p>
                <p>Sexo</p>
                <select value={sexo} onChange={handleSexo}>
                    <option value="UG">UG</option>
                    <option value="PG">PG</option>
                </select>
                <p>Mensaje</p>
                
                <button type = 'submit'>Submit</button>
            
            </form>
            <div className="enrolList">
                <DetailsList items={usuarios} columns={columns} />
            </div>
        </>
    )
}
export default EnrolList;