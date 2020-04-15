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

const renderSolicitudes = async() =>{
    generarXLSX();
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
                        <h5>DPI: ${persona.persona_dpi} - ${persona.persona_trabaja === 'S' ? 'SI APLICA':'NO APLICA'}</h5>
                        <p>Observacion: ${ele.credito_observaciones} | Sus ingresos son ${persona.persona_ingresos}</p>
                        <p>Fecha Solicitud: ${ele.credito_fecha_inicio} | Cuotas: ${ele.credito_cuotas}</p>
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
