async function deleteSolicitud(id){
    bootbox.confirm({
            title: "<strong>ELIMINAR SOLICITUD DE CREDITO</strong>",
            message: "Estas seguro que quieres eliminar esta solicitud? Puedes cancelar pulsando el boton de <strong>CANCELAR</strong>.",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> CANCELAR'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> ELIMINAR'
                }
            },
            callback: async(result) => {
                if(result){ 
                    await http.delete(`http://localhost:3001/solicitud?id=${id}`)
                    .then( solicitudEliminada =>{                        
                        console.log("Eliminarrr: " + solicitudEliminada);    
                        renderSolicitudes();  
                    });          
                }else{
                    console.log("Cancelar: " + result)
                }
            }
        }
    );
    console.log(id);
}

let solicitudEdit = {};
let dpiEdit = {};
async function editSolicitud(id){
    await http.get(`http://localhost:3001/solicitud?id=${id}`)
    .then(rSolicitud =>{
        solicitudEdit = rSolicitud;
    });
    await http.get(`http://localhost:3001/personaid?id=${solicitudEdit.id_persona}`)
        .then(rPersona =>{
            dpiEdit = rPersona;
        });

    cuotas.value = solicitudEdit.credito_cuotas;
    monto.value = solicitudEdit.credito_monto;
    observaciones.value = solicitudEdit.credito_observaciones;
    dpi.value = dpiEdit.persona_dpi;

    btsCrear.style.display ="none";
    btsActualizar.style.display = "inline";
    infoPersona.textContent = `${dpiEdit.persona_primer_nombre} ${dpiEdit.persona_segundo_apellido} | DPI: ${dpiEdit.persona_dpi} | Tel: ${dpiEdit.persona_telefono} | Trabaja: ${dpiEdit.persona_trabaja} | Ingresos: Q${dpiEdit.persona_ingresos}`;
}

function canActualizar(){  
    solicitudEdit = {};
    dpiEdit = {};
    form.reset();
    infoPersona.textContent = "";    
    btsCrear.style.display ="inline";
    btsActualizar.style.display = "none";
}

async function Actualizar(){  

    const body = {
        id_credito: solicitudEdit.id_credito,
        credito_cuotas: cuotas.value,
        credito_monto: monto.value,
        credito_observaciones: observaciones.value,
        id_persona: dpi.value
    }

    btsCrear.style.display ="inline";
    btsActualizar.style.display = "none";

    await http.put(`http://localhost:3001/solicitud`,{},body);
    form.reset();
    infoPersona.textContent = "";
    solicitudEdit = {};
    dpiEdit = {};
    renderSolicitudes();
}