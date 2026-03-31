// scriptServPeriodico.js - Lógica específica para servicio Periódico

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del modal
    const abrirFormularioBtn = document.getElementById('abrirFormulario');
    const cerrarModalBtn = document.getElementById('cerrarModal');
    const cancelarBtn = document.getElementById('cancelarForm');
    const modalOverlay = document.getElementById('modalOverlay');
    const formulario = document.getElementById('formularioServicio');
    const tipoServicio = document.getElementById('tipo-servicio');
    const horaVuelta = document.getElementById('hora-vuelta');

    // Mostrar/ocultar hora de vuelta según tipo de servicio
    if (tipoServicio && horaVuelta) {
        function actualizarHoraVuelta() {
            if (tipoServicio.value === 'ida-vuelta' || tipoServicio.value === 'multiple') {
                horaVuelta.required = true;
                horaVuelta.closest('.form-group').style.display = 'block';
            } else {
                horaVuelta.required = false;
                horaVuelta.closest('.form-group').style.display = 'none';
            }
        }
        
        tipoServicio.addEventListener('change', actualizarHoraVuelta);
        actualizarHoraVuelta(); // Estado inicial
    }

    // Abrir modal
    if (abrirFormularioBtn) {
        abrirFormularioBtn.addEventListener('click', () => {
            modalOverlay.classList.add('activo');
            document.body.style.overflow = 'hidden';
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

            // Validación de días seleccionados si frecuencia es personalizada
            const frecuencia = document.getElementById('frecuencia');
            const diasCheckboxes = document.querySelectorAll('input[name="dias"]:checked');
            
            if (frecuencia.value === 'personalizado' && diasCheckboxes.length === 0) {
                alert('Para frecuencia personalizada, seleccione al menos un día de la semana');
                valido = false;
            }

            if (!valido) {
                alert('Por favor, complete todos los campos obligatorios (*) correctamente');
                return;
            }

            // Simulación de envío
            const botonEnviar = formulario.querySelector('.btn-enviar');
            const textoOriginal = botonEnviar.innerHTML;
            botonEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            botonEnviar.disabled = true;

            // Recoger datos
            const datos = {
                servicio: 'Periódico',
                fechaSolicitud: new Date().toLocaleDateString()
            };
            
            const elementos = formulario.elements;
            for (let elem of elementos) {
                if (elem.name && elem.type !== 'submit' && elem.type !== 'button') {
                    if (elem.type === 'checkbox') {
                        if (!datos[elem.name]) datos[elem.name] = [];
                        if (elem.checked) datos[elem.name].push(elem.value);
                    } else {
                        datos[elem.name] = elem.value;
                    }
                }
            }

            // Procesar días seleccionados
            if (datos.dias && Array.isArray(datos.dias)) {
                datos.dias = datos.dias.join(', ');
            }

            console.log('Solicitud Servicio Periódico:', datos);

            setTimeout(() => {
                const frecuenciaText = {
                    'diario': 'Diario (L-V)',
                    'lunes-viernes': 'Lunes a Viernes',
                    'fines-semana': 'Fines de semana',
                    'personalizado': 'Personalizado'
                }[datos.frecuencia] || datos.frecuencia;

                alert(`✅ Solicitud enviada correctamente para servicio periódico:\n\n• Frecuencia: ${frecuenciaText}\n• Horario: ${datos['hora-ida']}${datos['hora-vuelta'] ? ' - ' + datos['hora-vuelta'] : ''}\n• Ruta: ${datos.origen} → ${datos.destino}\n\nNos pondremos en contacto en menos de 24 horas para coordinar detalles y precio.`);
                
                formulario.reset();
                
                // Restaurar valores por defecto
                const inicioServicio = document.getElementById('inicio-servicio');
                if (inicioServicio) {
                    const hoy = new Date().toISOString().split('T')[0];
                    inicioServicio.value = hoy;
                }
                
                const horaIda = document.getElementById('hora-ida');
                if (horaIda) {
                    horaIda.value = '08:00';
                }
                
                // Resetear checkboxes
                document.querySelectorAll('input[name="dias"]').forEach(cb => cb.checked = false);
                
                botonEnviar.innerHTML = textoOriginal;
                botonEnviar.disabled = false;
                cerrarModal();
            }, 1500);
        });
    }

    // Configurar fechas por defecto
    const inicioServicio = document.getElementById('inicio-servicio');
    if (inicioServicio) {
        const hoy = new Date();
        const manana = new Date(hoy);
        manana.setDate(hoy.getDate() + 1);
        const mananaStr = manana.toISOString().split('T')[0];
        
        inicioServicio.min = mananaStr; // No permitir fechas anteriores a mañana
        inicioServicio.value = mananaStr;
    }

    const horaIda = document.getElementById('hora-ida');
    if (horaIda) {
        horaIda.value = '08:00'; // Hora por defecto para servicios periódicos
    }

    const horaVueltaInput = document.getElementById('hora-vuelta');
    if (horaVueltaInput) {
        horaVueltaInput.value = '18:00'; // Hora por defecto para vuelta
    }

    // Sugerir horarios comunes
    const sugerenciasHorarios = [
        '07:00', '07:30', '08:00', '08:30', '09:00',
        '17:00', '17:30', '18:00', '18:30', '19:00'
    ];

    if (horaIda) {
        // Podríamos añadir un datalist para sugerencias si quieres
    }
});