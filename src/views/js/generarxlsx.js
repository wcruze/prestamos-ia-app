async function generarXLSX(){
    console.log("GENERANDO XLSX");
    await http.get("http://localhost:3001/solicitudes")
    .then(async(solicitudes) => {
        solicitudes.map(async(solicitud) => {
            await http.get(`http://localhost:3001/personaid?id=${solicitud.id_persona}`)
            .then(persona => {
                console.log(solicitud);
                console.log(persona);
                
                const id_credito= solicitud.id_credito;
                const credito_observaciones = solicitud.credito_observaciones;
                const credito_monto = solicitud.credito_monto;
                const credito_fecha_inicio = solicitud.credito_fecha_inicio;
                const credito_cuotas = solicitud.credito_cuotas;
                
                const id_persona = persona.id_persona;
                const persona_primer_nombre = persona.persona_primer_nombre;
                const persona_segundo_nombre = persona.persona_segundo_nombre;
                const persona_primer_apellido = persona.persona_primer_apellido;
                const persona_segundo_apellido = persona.persona_segundo_apellido;
                const persona_fecha_nacimiento = persona.persona_fecha_nacimiento;
                const persona_dpi = persona.persona_dpi;
                const persona_trabaja = persona.persona_trabaja;
                const persona_casado = persona.persona_casado;
                const persona_empresa_trabaja = persona.persona_empresa_trabaja;
                const persona_ingresos = persona.persona_ingresos;
                const persona_email = persona.persona_email;
                const persona_direccion_residencia = persona.persona_direccion_residencia;
                const persona_telefono = persona.persona_telefono;
                
                console.log(`${id_credito}|${credito_observaciones}|${credito_monto}|${credito_fecha_inicio}|${credito_cuotas}|`);
                console.log(`${id_persona}|${persona_primer_nombre}|${persona_segundo_nombre}|${persona_segundo_nombre}|${persona_primer_apellido}|${persona_segundo_apellido}|
                ${persona_fecha_nacimiento}|${persona_dpi}|
                ${persona_trabaja}|${persona_casado}|${persona_empresa_trabaja}|${persona_ingresos}|${persona_email}|${persona_direccion_residencia}|${persona_telefono}`);


            });
        });        
    })
}