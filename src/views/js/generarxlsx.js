
// const moment = require('moment');    
var Excel = require('exceljs');
let DATOS = [];

async function generarXLSX(){
    console.log("GENERANDO XLSX");
    await http.get("http://localhost:3001/solicitudes")
    .then(async(solicitudes) => {        
        await solicitudes.map(async(solicitud) => {
            await http.get(`http://localhost:3001/personaid?id=${solicitud.id_persona}`)
            .then(persona => {
                DATOS.push({
                id_credito: solicitud.id_credito,
                credito_observaciones: solicitud.credito_observaciones,
                credito_monto: solicitud.credito_monto,
                credito_fecha_inicio: solicitud.credito_fecha_inicio,
                credito_cuotas: solicitud.credito_cuotas,                
                id_persona: persona.id_persona,
                persona_primer_nombre: persona.persona_primer_nombre,
                persona_segundo_nombre: persona.persona_segundo_nombre,
                persona_primer_apellido: persona.persona_primer_apellido,
                persona_segundo_apellido: persona.persona_segundo_apellido,
                persona_fecha_nacimiento: persona.persona_fecha_nacimiento,
                persona_dpi: persona.persona_dpi,
                persona_trabaja: persona.persona_trabaja,
                persona_casado: persona.persona_casado,
                persona_empresa_trabaja: persona.persona_empresa_trabaja,
                persona_ingresos: persona.persona_ingresos,
                persona_email: persona.persona_email,
                persona_direccion_residencia: persona.persona_direccion_residencia,
                persona_telefono: persona.persona_telefono
                });
            });
        });        
    })
}

async function crearNuevoArchivoExcel()
{
    var workbook = new Excel.Workbook();

    workbook.creator = 'Grupo No.N';

    var sheet = workbook.addWorksheet('REPORTE SOLICITUDES');
    
    sheet.columns = [        
            {header: 'CODIGO SOLICITUD',       key: 'id_credito' },
            {header: 'OBSERVACIONES',          key: 'credito_observaciones' },
            {header: 'MONTO' ,                 key: 'credito_monto' },
            {header: 'FECHA SOLICITUD',        key: 'credito_fecha' },
            {header: 'CUOTAS' ,                key: 'credito_cuotas' },                
            {header: 'CODIGO CLIENTE',         key: 'id_persona' },
            {header: 'NOMBRE',                 key: 'nombre' },
            {header: 'FECHA NACIMIENTO',       key: 'persona_fecha_nacimiento' },
            {header: 'DPI',                    key: 'persona_dpi' },
            {header: 'TRABAJA',                key: 'persona_trabaja' },
            {header: 'CASADO',                 key: 'persona_casado' },
            {header: 'EMPRESA TRABAJO',        key: 'persona_empresa_trabaja' },
            {header: 'INGRESOS',               key: 'persona_ingresos' },
            {header: 'CORREO-E',               key: 'persona_email' },
            {header: 'DIRECCION',              key: 'persona_direccion_residencia' },
            {header: 'TELEFONO',               key: 'persona_telefono' },
            {header: 'APLICA',                 key: 'aplica' }           
    ]

    DATOS.map(sp => {
        sheet.addRow({
            id_credito:                     `${sp.id_credito}`, 
            credito_observaciones:          `${sp.credito_observaciones}`,
            credito_monto:                  `${sp.credito_monto}`,
            credito_fecha:                  `${sp.credito_fecha_inicio}`,
            credito_cuotas:                 `${sp.credito_cuotas}`,
            id_persona:                     `${sp.id_persona}`,
            nombre:                         `${sp.persona_primer_nombre} ${sp.persona_segundo_nombre} ${sp.persona_primer_apellido} ${sp.persona_segundo_apellido}`,
            persona_fecha_nacimiento:       `${sp.persona_fecha_nacimiento}`,
            persona_dpi:                    `${sp.persona_dpi}`,
            persona_trabaja:                `${sp.persona_trabaja}`,
            persona_casado:                 `${sp.persona_casado}`,
            persona_empresa_trabaja:        `${sp.persona_empresa_trabaja}`,
            persona_ingresos:               `${sp.persona_ingresos}`,
            persona_email:                  `${sp.persona_email}`,
            persona_direccion_residencia:   `${sp.persona_direccion_residencia}`,
            persona_telefono:               `${sp.persona_telefono}`,
            aplica: sp.persona_trabaja === 'S'? 'SI APLICA' : 'NO APLICA'
        });
    });

    bootbox.confirm({
            title: "<strong>GUARDAR ARCHIVO DE EXCEL</strong>",
            message: "Deseas exportar el archivo? si no lo deseas presiona <strong>CANCELAR</strong>.",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> CANCELAR'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> EXPORTAR'
                }
            },
            callback: async(result) => {
                if(result){ 
                    workbook.xlsx.writeFile("Reporte solicitudes de creditos.xlsx")
                    .then(function() {
                        bootbox.alert("Archivo Guardado");
                    });     
                }else{
                    bootbox.alert("Archivo No Guardado");
                }
            }
        }
    );
    
}