import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import { GENEROS } from "../utils/endpoints";
import ListadoGenerico from "../utils/ListadoGenerico";
import Paginacion from "../utils/paginacion";
import { generoDTO } from "./Generos.model";



export default function IndexGeneros()
{
    const [generos,setGeneros]= useState<generoDTO[]>()
    const [totalPag, setTotalPag]=useState(0)
    const [recordsPorPagina, SetRecordsPorPagina]=useState(3)
    const [pagina, setPagina]=useState(1)

    //asi se usa axios    
    useEffect(()=>{
        console.log('Peticion a => ' + GENEROS)
        axios.get(GENEROS, {
            params:{pagina, recordsPorPagina}
            
        })
            .then((resp:AxiosResponse<generoDTO[]>) => {
                const totalDeRegistro = 
                    parseInt(resp.headers['cantidadtotalregistros'],10)
                setTotalPag(Math.ceil(totalDeRegistro/recordsPorPagina))
                console.info(resp.data)
                setGeneros(resp.data)
            })
    },[pagina,recordsPorPagina])
    //el objeto vacio es para que el axio no se conecte si no una sola ves
    return(
        <>
            <Link className="btn btn-dark" to="Generos/Create">Nuevo</Link>
            <h3> Generos</h3>

            <Paginacion
                cantidadTotalDePaginas={totalPag}
                paginaActual={pagina}
                onChange={nuevaPagina=>setPagina(nuevaPagina)}/>
                
            <ListadoGenerico listado={generos}>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generos?.map(genero=>
                                <tr>
                                    <td className="btn-group">
                                        <Link className="btn btn-success" to={`/Generos/${genero.id}`}>
                                            Edit
                                        </Link>
                                        
                                        <Button className="btn btn-danger">
                                            Detele
                                        </Button>
                                    </td>    
                                    <td>
                                        {genero.nombre}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </ListadoGenerico>
        </>
    ) 
}
