async function generarXLSX(){
    console.log("GENERANDO XLSX");
    await http.get("http://localhost:3001/solicitudes")
    .then(async(solicitudes) => {
        solicitudes.map(async(solicitud) => {
            await http.get(`http://localhost:3001/personaid?id=${solicitud.id_persona}`)
            .then(persona => {
                console.log(solicitud);
                console.log(persona);
            });
        });        
    })
}