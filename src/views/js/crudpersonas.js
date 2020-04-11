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
