import { useState, useEffect } from "react";
import './api.css';
const Api = ()=>{
    const [allUsers,setAllUsers] = useState([]);
    const [users,setUsers] = useState([]);
    const [value,setValue] = useState("");

    useEffect(()=>{
        getObtenerDatos();
    }, []);

    useEffect(()=>{
        const valorMinuscula = value.toLowerCase();
        const filtrado = allUsers.filter((users)=>users.fullName.toLowerCase().includes(valorMinuscula));
        setUsers(filtrado);
    }, [value]);

    
        const getObtenerDatos=  async()=>{
              const url = 'https://thronesapi.com/api/v2/Characters';
              const respuesta = await fetch(url);
              const json = await respuesta.json();
              const jsonOrdenado = json.sort((orden1, orden2) =>{
                if (orden1.firstName < orden2.firstName) {
                    return -1;
                }else  if (orden1.firstName > orden2.firstName) {
                    return 1;
                }else{
                    return 0;
                }
              } );
              setAllUsers(jsonOrdenado);
              setUsers(jsonOrdenado);
        }

        return (
            <div>
                <input className="input" type="text" placeholder="Buscar por nombre" onChange={(e)=>setValue(e.target.value)} />
           
           <div className="contenedor">
                {
                     users.map((user)=>{
                        return ( 
                            <>
                           
                            <div className="contenedor-user" key={user.id}>
                                <div className="contenedor-img">
                                <img src={user.imageUrl}/>
                                </div>
                                <div>
                                    <h5 className="title-img">{user.fullName}</h5>
                                    <p className="texto-img">{user.title}</p>
                                 </div>
                                 
                            </div>
                                  
                            </>
                
                        )
                    })
                   
                }
                 </div>
           
           </div>


        )

    

}

export default Api;