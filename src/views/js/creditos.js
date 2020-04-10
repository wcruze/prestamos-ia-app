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


window.onload = async () =>{
    renderSolicitudes();
};


const renderSolicitudes = async() =>{
    listaSolicitudes.innerHTML = '';
    await http.get("http://localhost:3001/solicitudes")
    .then(async(result) => {
        result.map(async(ele) => {
            const persona = await http.get(`http://localhost:3001/personaid?id=${ele.id_persona}`);
            console.log(ele);
            console.log(persona);
            listaSolicitudes.innerHTML += 
            `
                <div>
                ${ele.credito_monto}
                </div>
            `
        });        
    })
}

/*
id_credito: 1
id_persona: 73
credito_observaciones: "La persona no trabaja"
credito_monto: "5000.000"
credito_fecha_inicio: "03/30/2020"
credito_cuotas: 12
*/

form.addEventListener('submit',async(event) => {
    event.preventDefault();
    const body = {
        cuotas: cuotas.value,
        monto: monto.value,
        observaciones: observaciones.value,
        dpi: dpi.value
    }
    const solicitud = await http.post(`http://localhost:3001/solicitud`,{},body);
    console.log(solicitud);
});

async function buscarPersona(){
    const persona = await http.get(`http://localhost:3001/persona?dpi=${dpi.value}`);
    if(persona.length > 0){
        const nombre = `${persona[0].persona_primer_nombre} ${persona[0].persona_segundo_apellido} `;
        const dpi_ = `${persona[0].persona_dpi}`;
        const tel = `${persona[0].persona_telefono}`;
        infoPersona.textContent = `${nombre} | ${dpi_} | ${tel}`
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

//---------------------- NUEVAPERSONA    
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
    
    const persona__ = await http.post(`http://localhost:3001/persona`,{},body);
    dpi.value = dpi_np.value;
    form_np.reset();
    main_persona.style.display ="none";
    main_credito.style.display = "inline";
});
