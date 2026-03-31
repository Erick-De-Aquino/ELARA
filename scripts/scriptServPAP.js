// servicio.js - Lógica para páginas de detalle de servicio

// Datos de todos los servicios
const todosServicios = [
    {
        id: 1,
        nombre: "Punto a punto",
        icono: "fa-map-marker-alt",
        enlace: "servicio-1.html",
        color: "#1C4D8D"
    },
    {
        id: 2,
        nombre: "Larga distancia",
        icono: "fa-road",
        enlace: "servicio-2.html",
        color: "#0C2C55"
    },
    {
        id: 3,
        nombre: "Servicio periódico",
        icono: "fa-calendar-day",
        enlace: "servicio-3.html",
        color: "#2A6BBF"
    },
    {
        id: 4,
        nombre: "Full day",
        icono: "fa-clock",
        enlace: "servicio-4.html",
        color: "#4D4D4D"
    },
    {
        id: 5,
        nombre: "Servicio turismo",
        icono: "fa-landmark",
        enlace: "servicio-5.html",
        color: "#ACBAC4"
    },
    {
        id: 6,
        nombre: "Traslado aeropuerto",
        icono: "fa-plane",
        enlace: "servicio-6.html",
        color: "#1C4D8D"
    }
];

// Configuración de campos específicos por servicio
const configFormularios = {
    "punto-a-punto": {
        camposEspecificos: [
            {
                id: "origen",
                tipo: "text",
                label: "Dirección de origen *",
                placeholder: "Ej: Calle Mayor, 123, Valencia",
                requerido: true
            },
            {
                id: "destino",
                tipo: "text",
                label: "Dirección de destino *",
                placeholder: "Ej: Centro Comercial ABC",
                requerido: true
            },
            {
                id: "paradas",
                tipo: "number",
                label: "Paradas intermedias",
                placeholder: "¿Cuántas paradas necesita? (0-3)",
                min: 0,
                max: 3
            }
        ]
    },
    "larga-distancia": {
        camposEspecificos: [
            {
                id: "ciudad-origen",
                tipo: "text",
                label: "Ciudad de origen *",
                placeholder: "Ej: Valencia",
                requerido: true
            },
            {
                id: "ciudad-destino",
                tipo: "text",
                label: "Ciudad de destino *",
                placeholder: "Ej: Madrid",
                requerido: true
            },
            {
                id: "equipaje",
                tipo: "select",
                label: "Cantidad de equipaje",
                opciones: [
                    { valor: "ligero", texto: "Equipaje ligero (maleta pequeña)" },
                    { valor: "moderado", texto: "Equipaje moderado (1-2 maletas)" },
                    { valor: "mucho", texto: "Mucho equipaje (3+ maletas)" }
                ]
            }
        ]
    },
    "servicio-periodico": {
        camposEspecificos: [
            {
                id: "frecuencia",
                tipo: "select",
                label: "Frecuencia *",
                requerido: true,
                opciones: [
                    { valor: "diario", texto: "Diario (Lunes a Viernes)" },
                    { valor: "lunes-viernes", texto: "Lunes a Viernes" },
                    { valor: "fines", texto: "Fines de semana" },
                    { valor: "personalizado", texto: "Personalizado" }
                ]
            },
            {
                id: "horario-fijo",
                tipo: "checkbox",
                label: "¿Horario fijo todos los días?",
                texto: "Sí, misma hora de recogida diariamente"
            },
            {
                id: "duracion-contrato",
                tipo: "select",
                label: "Duración estimada del servicio",
                opciones: [
                    { valor: "1mes", texto: "1 mes" },
                    { valor: "3meses", texto: "3 meses" },
                    { valor: "6meses", texto: "6 meses" },
                    { valor: "indefinido", texto: "Indefinido" }
                ]
            }
        ]
    },
    "full-day": {
        camposEspecificos: [
            {
                id: "horas-totales",
                tipo: "select",
                label: "Horas totales del servicio *",
                requerido: true,
                opciones: [
                    { valor: "4", texto: "4 horas" },
                    { valor: "6", texto: "6 horas" },
                    { valor: "8", texto: "8 horas" },
                    { valor: "10", texto: "10 horas" },
                    { valor: "12", texto: "12 horas" }
                ]
            },
            {
                id: "num-paradas",
                tipo: "number",
                label: "Número estimado de paradas",
                placeholder: "Ej: 3-5 paradas durante el día",
                min: 1,
                max: 10
            },
            {
                id: "tipo-actividad",
                tipo: "text",
                label: "Tipo de actividad principal",
                placeholder: "Ej: Reuniones de negocios, compras, turismo..."
            }
        ]
    },
    "servicio-turismo": {
        camposEspecificos: [
            {
                id: "tipo-tour",
                tipo: "select",
                label: "Tipo de tour *",
                requerido: true,
                opciones: [
                    { valor: "historico", texto: "Tour histórico/cultural" },
                    { valor: "gastronomico", texto: "Tour gastronómico" },
                    { valor: "moderno", texto: "Tour arquitectura moderna" },
                    { valor: "personalizado", texto: "Tour personalizado" }
                ]
            },
            {
                id: "idioma-guia",
                tipo: "select",
                label: "Idioma preferido para explicaciones",
                opciones: [
                    { valor: "es", texto: "Español" },
                    { valor: "en", texto: "Inglés" },
                    { valor: "fr", texto: "Francés" },
                    { valor: "de", texto: "Alemán" }
                ]
            },
            {
                id: "atracciones",
                tipo: "textarea",
                label: "Atracciones específicas a visitar",
                placeholder: "Ej: Ciudad de las Artes, Oceanográfico, Barrio del Carmen...",
                filas: 3
            }
        ]
    },
    "traslado-aeropuerto": {
        camposEspecificos: [
            {
                id: "aeropuerto",
                tipo: "select",
                label: "Aeropuerto *",
                requerido: true,
                opciones: [
                    { valor: "valencia", texto: "Aeropuerto de Valencia (VLC)" },
                    { valor: "alicante", texto: "Aeropuerto de Alicante (ALC)" },
                    { valor: "madrid", texto: "Madrid Barajas (MAD)" },
                    { valor: "barcelona", texto: "Barcelona El Prat (BCN)" }
                ]
            },
            {
                id: "tipo-traslado",
                tipo: "select",
                label: "Tipo de traslado *",
                requerido: true,
                opciones: [
                    { valor: "recogida", texto: "Recogida en aeropuerto" },
                    { valor: "llevada", texto: "Llevada al aeropuerto" },
                    { valor: "ida-vuelta", texto: "Ida y vuelta" }
                ]
            },
            {
                id: "vuelo",
                tipo: "text",
                label: "Número de vuelo (si aplica)",
                placeholder: "Ej: IB1234"
            },
            {
                id: "equipaje-aeropuerto",
                tipo: "select",
                label: "Equipaje estimado",
                opciones: [
                    { valor: "mano", texto: "Solo equipaje de mano" },
                    { valor: "1maleta", texto: "1 maleta facturada" },
                    { valor: "2maletas", texto: "2 maletas facturadas" },
                    { valor: "mucho", texto: "3+ maletas o equipaje especial" }
                ]
            }
        ]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Detectar qué servicio es actual
    const tituloServicio = document.querySelector('.servicio-info h1');
    let servicioActual = "punto-a-punto"; // default
    let servicioId = 1;
    
    if (tituloServicio) {
        const texto = tituloServicio.textContent.toLowerCase();
        if (texto.includes("larga distancia")) {
            servicioActual = "larga-distancia";
            servicioId = 2;
        }
        else if (texto.includes("periódico") || texto.includes("periodico")) {
            servicioActual = "servicio-periodico";
            servicioId = 3;
        }
        else if (texto.includes("full day") || texto.includes("full-day")) {
            servicioActual = "full-day";
            servicioId = 4;
        }
        else if (texto.includes("turismo")) {
            servicioActual = "servicio-turismo";
            servicioId = 5;
        }
        else if (texto.includes("aeropuerto")) {
            servicioActual = "traslado-aeropuerto";
            servicioId = 6;
        }
    }


    // ===== 2. FUNCIONALIDAD DEL MODAL =====
    
    // Elementos del modal
    const abrirFormularioBtn = document.getElementById('abrirFormulario');
    const cerrarModalBtn = document.getElementById('cerrarModal');
    const cancelarBtn = document.getElementById('cancelarForm');
    const modalOverlay = document.getElementById('modalOverlay');
    const formulario = document.getElementById('formularioServicio');

    // Generar campos específicos del servicio
function generarCamposEspecificos() {
    const config = configFormularios[servicioActual];
    if (!config || !formulario) return;

    // Limpiar campos existentes si los hay
    const existentes = formulario.querySelector('.campos-especificos');
    if (existentes) existentes.remove();

    const camposContainer = document.createElement('div');
    camposContainer.className = 'campos-especificos';
    camposContainer.innerHTML = '<h3>Detalles específicos del servicio</h3>';

    config.camposEspecificos.forEach(campo => {
        const div = document.createElement('div');
        div.className = 'form-group campo-especifico';

        const label = document.createElement('label');
        label.htmlFor = campo.id;
        label.textContent = campo.label;

        let input;
        
        if (campo.tipo === 'select') {
            input = document.createElement('select');
            input.id = campo.id;
            input.name = campo.id;
            if (campo.requerido) input.required = true;
            
            const opcionDefault = document.createElement('option');
            opcionDefault.value = "";
            opcionDefault.textContent = "-- Seleccione --";
            opcionDefault.disabled = true;
            opcionDefault.selected = true;
            input.appendChild(opcionDefault);
            
            campo.opciones.forEach(op => {
                const option = document.createElement('option');
                option.value = op.valor;
                option.textContent = op.texto;
                input.appendChild(option);
            });
        } 
        else if (campo.tipo === 'textarea') {
            input = document.createElement('textarea');
            input.id = campo.id;
            input.name = campo.id;
            input.rows = campo.filas || 3;
            if (campo.placeholder) input.placeholder = campo.placeholder;
            if (campo.requerido) input.required = true;
        }
        else if (campo.tipo === 'checkbox') {
            const labelCheck = document.createElement('label');
            labelCheck.className = 'checkbox-label';
            
            input = document.createElement('input');
            input.type = 'checkbox';
            input.id = campo.id;
            input.name = campo.id;
            
            const span = document.createElement('span');
            span.textContent = campo.texto || '';
            
            labelCheck.appendChild(input);
            labelCheck.appendChild(span);
            div.appendChild(labelCheck);
            camposContainer.appendChild(div);
            return;
        }
        else {
            input = document.createElement('input');
            input.type = campo.tipo;
            input.id = campo.id;
            input.name = campo.id;
            if (campo.placeholder) input.placeholder = campo.placeholder;
            if (campo.requerido) input.required = true;
            if (campo.min !== undefined) input.min = campo.min;
            if (campo.max !== undefined) input.max = campo.max;
        }

        div.appendChild(label);
        if (campo.tipo !== 'checkbox') div.appendChild(input);
        camposContainer.appendChild(div);
    });

    // 🔴 PARTE CORREGIDA: Buscar el checkbox en lugar del footer
    const checkboxGroup = formulario.querySelector('.checkbox-label')?.closest('.form-group');
    
    if (checkboxGroup) {
        // Insertar los campos específicos ANTES del checkbox
        formulario.insertBefore(camposContainer, checkboxGroup);
        console.log('Campos insertados antes del checkbox');
    } else {
        // Fallback: insertar antes del footer
        const formFooter = formulario.querySelector('.form-footer');
        if (formFooter) {
            formulario.insertBefore(camposContainer, formFooter);
            console.log('Campos insertados antes del footer (fallback)');
        }
    }
}

    // Abrir modal
    if (abrirFormularioBtn) {
        abrirFormularioBtn.addEventListener('click', () => {
            // Generar campos específicos antes de abrir
            generarCamposEspecificos();
            
            modalOverlay.classList.add('activo');
            document.body.style.overflow = 'hidden';
            
            // Actualizar título del modal
            const modalTitulo = document.querySelector('.modal-header h2');
            if (modalTitulo && tituloServicio) {
                modalTitulo.textContent = `Solicitar: ${tituloServicio.textContent}`;
            }
        });
    }

    // Cerrar modal
    function cerrarModal() {
        modalOverlay.classList.remove('activo');
        document.body.style.overflow = '';
    }

    if (cerrarModalBtn) cerrarModalBtn.addEventListener('click', cerrarModal);
    if (cancelarBtn) cancelarBtn.addEventListener('click', cerrarModal);

    // Cerrar al hacer clic fuera
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) cerrarModal();
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('activo')) {
            cerrarModal();
        }
    });

    // Enviar formulario (simulación)
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validación
            const camposRequeridos = formulario.querySelectorAll('[required]');
            let valido = true;
            
            camposRequeridos.forEach(campo => {
                if (!campo.value.trim()) {
                    campo.style.borderColor = '#e74c3c';
                    valido = false;
                } else {
                    campo.style.borderColor = '#ccc';
                }
            });

            if (!valido) {
                alert('Por favor, complete todos los campos obligatorios (*)');
                return;
            }

            // Simulación de envío
            const botonEnviar = formulario.querySelector('.btn-enviar');
            const textoOriginal = botonEnviar.innerHTML;
            botonEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            botonEnviar.disabled = true;

            // Recoger datos
            const datos = {};
            const elementos = formulario.elements;
            for (let elem of elementos) {
                if (elem.name && elem.type !== 'submit' && elem.type !== 'button') {
                    if (elem.type === 'checkbox') {
                        datos[elem.name] = elem.checked ? 'Sí' : 'No';
                    } else {
                        datos[elem.name] = elem.value;
                    }
                }
            }

            console.log('Datos del formulario:', datos);

            setTimeout(() => {
                alert('✅ Solicitud enviada correctamente. Nos pondremos en contacto en menos de 24 horas.');
                formulario.reset();
                
                // Restaurar fecha y hora
                const fechaInput = document.getElementById('fecha');
                if (fechaInput) {
                    const hoy = new Date().toISOString().split('T')[0];
                    fechaInput.value = hoy;
                }
                
                const horaInput = document.getElementById('hora');
                if (horaInput) {
                    const ahora = new Date();
                    const hora = ahora.getHours().toString().padStart(2, '0');
                    const minutos = ahora.getMinutes().toString().padStart(2, '0');
                    horaInput.value = `${hora}:${minutos}`;
                }
                
                botonEnviar.innerHTML = textoOriginal;
                botonEnviar.disabled = false;
                cerrarModal();
            }, 1500);
        });
    }

    // Configurar fecha y hora por defecto
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        const hoy = new Date().toISOString().split('T')[0];
        fechaInput.min = hoy;
        fechaInput.value = hoy;
    }

    const horaInput = document.getElementById('hora');
    if (horaInput) {
        const ahora = new Date();
        const hora = ahora.getHours().toString().padStart(2, '0');
        const minutos = ahora.getMinutes().toString().padStart(2, '0');
        horaInput.value = `${hora}:${minutos}`;
    }
});