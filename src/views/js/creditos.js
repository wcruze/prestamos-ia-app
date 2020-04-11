const bootbox = require('bootbox');
var bootstrap = require('bootstrap');

const http = require('../app/utils/httpControllerHolder');

const main_persona = document.getElementById("main-persona")
const main_credito = document.getElementById("main-credito")
const form = document.getElementById("formCreditos");

const cuotas = document.getElementById("cuotas");
const monto = document.getElementById("monto");
const dpi = document.getElementById("dpi");
const observaciones = document.getElementById("observaciones");
const infoPersona = document.getElementById("infoPersona");
const listaSolicitudes = document.getElementById("lsSolicitudes");



const dpi_np = document.getElementById("dpi_np");
const n1_np = document.getElementById("nombre1_np");
const n2_np = document.getElementById("nombre2_np");
const ap1_np = document.getElementById("apellido1_np");
const ap2_np = document.getElementById("apellido2_np");
const fn_np = document.getElementById("fnacimiento_np");
const tbj_np = document.getElementById("trabaja_np");
const emp_np = document.getElementById("nombreep_np");
const cdo_np = document.getElementById("casado_np");
const sl_np = document.getElementById("salario_np");
const coe_np = document.getElementById("correoe_np");
const dir_np = document.getElementById("dir_np");
const tel_np = document.getElementById("tel_np");

const form_np = document.getElementById("formPersonas");
const btsActualizar = document.getElementById("btsActualizar");
const btsCrear = document.getElementById("btsCrear");



//----------------------------------------------------------------------------------------
window.onload = async () =>{
    renderSolicitudes();
};


form.addEventListener('submit',async(event) => {
    event.preventDefault();
    const body = {
        cuotas: cuotas.value,
        monto: monto.value,
        observaciones: observaciones.value,
        dpi: dpi.value
    }
    const solicitud = await http.post(`http://localhost:3001/solicitud`,{},body);
    form.reset();
    infoPersona.textContent = "";
    console.log(solicitud);
    renderSolicitudes();
});

async function buscarPersona(){
    const persona = await http.get(`http://localhost:3001/persona?dpi=${dpi.value}`);
    if(persona.length > 0){
        const nombre = `${persona[0].persona_primer_nombre} ${persona[0].persona_segundo_apellido}`;
        const dpi_ = `${persona[0].persona_dpi}`;
        const tel = `${persona[0].persona_telefono}`;
        const tbj = `${persona[0].persona_trabaja}`;
        const sll = `${persona[0].persona_ingresos}`
        infoPersona.textContent = `${nombre} | DPI: ${dpi_} | Tel: ${tel} | Trabaja: ${tbj} | Ingresos: Q${sll}`
    }else{
        infoPersona.textContent = "No existe";
    }
}

async function agregarPersona(){
    main_persona.style.display ="inline";
    main_credito.style.display = "none";
}

async function cancelarPersona(){
    main_persona.style.display ="none";
    main_credito.style.display = "inline";
}



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
//---------------------- NUEVAPERSONA    

form_np.addEventListener('submit',async(event) => {
    event.preventDefault();
    const body = {
        id_persona: 0,
        persona_dpi: dpi_np.value,
        persona_primer_nombre: n1_np.value,
        persona_segundo_nombre: n2_np.value,
        persona_primer_apellido: ap1_np.value,
        persona_segundo_apellido: ap2_np.value,
        persona_fecha_nacimiento: fn_np.value,
        persona_trabaja: tbj_np.value,
        persona_empresa_trabaja: emp_np.value,
        persona_casado: cdo_np.value,
        persona_ingresos: sl_np.value,
        persona_email: coe_np.value,
        persona_direccion_residencia: dir_np.value,
        persona_telefono: tel_np.value
    } 
    
    await http.post(`http://localhost:3001/persona`,{},body);
    dpi.value = dpi_np.value;
    form_np.reset();
    infoPersona.textContent = "";
    main_persona.style.display ="none";
    main_credito.style.display = "inline";
});


const renderSolicitudes = async() =>{
    listaSolicitudes.innerHTML = '';
    await http.get("http://localhost:3001/solicitudes")
    .then(async(result) => {
        result.map(async(ele) => {
            await http.get(`http://localhost:3001/personaid?id=${ele.id_persona}`)
            .then(persona => {
                listaSolicitudes.innerHTML += 
                `
                    <div class="card card-body my-2 animated fadeInLeft p-5">
                        <h4>Solicitante: ${persona.persona_primer_nombre} ${persona.persona_primer_apellido}</h4>
                        <h5>DPI: ${persona.persona_dpi}</h5>
                        <p>Observacion: ${ele.credito_observaciones}</p>
                        <p>Fecha: ${ele.credito_fecha_inicio}</p>
                        <h3>Q${ele.credito_monto}</h3>
                        <p>
                        <button class="btn btn-danger btn-sm" onclick="deleteSolicitud('${ele.id_credito}')">
                        ELIMINAR
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="editSolicitud('${ele.id_credito}')">
                        EDITAR 
                        </button>
                        </p> 
                    </div>
                `
            });
        });        
    })
}
