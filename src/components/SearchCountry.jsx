//! IMPORTACIONES: useState | useEffect | axios
import React, { useState, useEffect } from 'react';
import axios from 'axios';

//! FUNCIÓN DEL COMPONENTE:
function SearchCountry() {
    //* data ==> estado que almacena los datos de los paises.
    const [data, setData] = useState([]);
    //* filterData ==> estado que almacena los datos filtrados de la búsqueda.
    const [filteredData, setFilteredData] = useState([]);
    //* searchTerm ==> estado para almacenar el termino de búsqueda.
    const [searchTerm, setSearchTerm] = useState('');
    //* selectedCountry ==> estado para almacenar el pais seleccionado.
    const [selectedCountry, setSelectedCountry] = useState(null);
    //TODO: Define los estados iniciales del componente.

    //! CARGA DE DATOS INICIALES: 
    useEffect(() => {
        //* async(), define a fetchData como asíncrono, y su función es hacer la solicitud.
        const fetchData = async () => {
            //* la sintaxis "TRY | CATCH" permite manejar posibles errores durante la ejecucion de "fetchData" y se mostraria en consola usando "console.error"; su uso requiere "ASYNC | AWAIT"; tambien otorga robustez al codigo.
            try {
                //* Utilizando lib. "AXIOS" se realiza la solicitud "GET" y con "AWAIT" se espera la respuesta antes de continuar.
                const response = await axios.get('https://restcountries.com/v3.1/all');
                //* Recibida la respuesta, los datos (response.data) son almacenados en "data" usando "setData".
                setData(response.data);
                //* Se alamcenan los mismos datos (response.data) en "filteredData" teniendo una copia sin filtrar que se utiliza en la busqueda.
                setFilteredData(response.data);
                //* Captura errores 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        //* Inicia la obtención de datos cuando el componente se monte por primera vez.
        fetchData();
    }, []);
    //TODO: Se utiliza axios para hacer la solicitud "GET" y con la respuesta se almacena en "data" y "filteredData"

    //! FUNCIONES DE EVENTOS:
    //*La función recibe como parametro "event", que es entregado por el evento de cambio (onChange), contiene información como el objetivo del evento (campo de busqueda) y el valor actual que contiene.
    const handleSearch = (event) => {
        //* Actualiza el estado del término de búsqueda, obteniendo el valor actual usando la propiedad "target", y su valor "value"; obtenemos la palabra que se escriba en la busqueda.
        const searchTerm = event.target.value;
        //* Actualiza el estado "searchTerm" con el valor de la busqueda ("event.target.value"), reflejando el valor actual del término de búsqueda.
        setSearchTerm(searchTerm);
        //* Filtra los datos (estado "data" que trae "response.data") usando el término de búsqueda.
        const filtered = data.filter(item =>
            //* "item.name.common.toLowerCase()" accedo al nombre del pais del estado "data", convirtiendolo en minusculas, quitando la sensibilidad de mayus/minus
            //* ".includes(searchTerm.toLowerCase()" usando el metodo "includes()" en el resultado (nombre del pais en minus) se compara con el termino de busqueda ("searchTerm") tambien en minusculas ("toLowerCase()"), determinando si se encuentra el elemento buscado.
            item.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
        //* Actualiza el estado "filteredData" con los datos filtrados, mostrando los resultados de la busqueda.
        setFilteredData(filtered);
        //* Reset del estado "selectedCountry", haciendo que no haya ningun pais seleccionado al hacer una nueva busqueda.
        setSelectedCountry(null);
    };
    //TODO: Ejecución: cuando se escribe en la busqueda y filtra los datos.

    //* similar al anterior recibe como parametro "event" entregado por "onChange", en este caso ocurre cuando se hace la selección en una opción de "select"
    const handleCountrySelect = (event) => {
        //* "event.target.value" hace referencia al elemento "select" y "value" retorna el valor seleccionado, y es almacenado en "countryCode".
        const countryCode = event.target.value;
        //* "filterData" (estado) es un array que contiene los paises filtrados usando el termino de busqueda; "find()" es el metodo para buscar un pais en el estado (filterData) su nombre tiene que coincidir exactamente con el pais seleccionado en "countryCode"; "(item => item.name.common === countryCode)" esta probando para revisar si existe un pais con el nombre igual a "countryCode", si lo encuentra lo asigna a "country"
        const country = filteredData.find(item => item.name.common === countryCode);
        //* se utiliza "setSelectedCountry()" para actualizar el estado de selectedCountry y asi renderizar la información del pais seleccionado.
        setSelectedCountry(country);
    };
    //TODO: Ejecución: cuando se usa el desplegable y actualiza "selectedCountry" con el país.
    //! EN AMBOS CASOS "item" es la forma de apuntar a cada elemento del array "data" (seria un comportamiento similar a for of)

    //* igual recibe "event" entregado por onKeyDown, que es un evento del teclado.
    const handleKeyDown = (event) => {
        //* Esto verifica si la tecla precionada es "Enter"; "event.key" tiene la información de la tecla presionada.
        if (event.key === 'Enter') {
            //* verifica que exista un pais que cumple con la búsqueda.
            if (filteredData.length === 1) {
                //* cumplido lo anterior actualiza "selectedCountry" con el valor de "filteredData[0]"
                setSelectedCountry(filteredData[0]);
            }
        }
    };
    //TODO: Ejecución: cuando se presiona enter y existe un resultado.
    //! LA FINALIDAD DE LOS TRES EVENTOS ES ACTUALIZAR "setSelectedCountry"


    //! RENDERIZADO:
    return (
        <div className='search__container'>
            <input className='search'
                type="text"
                placeholder="Busca un pais..."
                value={searchTerm}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
            />
            <select className='list' onChange={handleCountrySelect}>
                <option value="">Select a country</option>
                {filteredData.map(item => (
                    <option key={item.name.common} value={item.name.common}>
                        {item.name.common}
                    </option>
                ))}
            </select>
            {selectedCountry && (
                <div className='country'>
                    <img className='flag' src={selectedCountry.flags.png} alt={selectedCountry.flags.alt} />
                    <div className='country__txt'>
                        <h2>{selectedCountry.name.common}</h2>
                        <p>Capital: {selectedCountry.capital}</p>
                        <p>Población: {selectedCountry.population}</p>
                        <p>Continente: {selectedCountry.continents[0]}</p>
                    </div>
                </div>
            )}
        </div>
    );
}


//! EXPORTACIÓN:
export default SearchCountry;