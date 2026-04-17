// scriptServAero.js - Lógica específica para Traslado Aeropuerto

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del modal
    const abrirFormularioBtn = document.getElementById('abrirFormulario');
    const cerrarModalBtn = document.getElementById('cerrarModal');
    const cancelarBtn = document.getElementById('cancelarForm');
    const modalOverlay = document.getElementById('modalOverlay');
    const formulario = document.getElementById('formularioServicio');
    const aeropuertoSelect = document.getElementById('aeropuerto');
    const otroAeropuertoGroup = document.getElementById('otro-aeropuerto-group');

    // Mostrar campo "otro aeropuerto" si se selecciona "Otro"
    if (aeropuertoSelect && otroAeropuertoGroup) {
        aeropuertoSelect.addEventListener('change', function() {
            if (this.value === 'otro') {
                otroAeropuertoGroup.style.display = 'block';
            } else {
                otroAeropuertoGroup.style.display = 'none';
            }
        });
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

    // Enviar formulario
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validación
            const camposRequeridos = formulario.querySelectorAll('[required]');
            let valido = true;
            
            camposRequeridos.forEach(campo => {
                if (campo.type !== 'checkbox' && !campo.value.trim()) {
                    campo.style.borderColor = '#e74c3c';
                    valido = false;
                } else if (campo.type === 'checkbox' && !campo.checked) {
                    campo.closest('.checkbox-label').style.color = '#e74c3c';
                    valido = false;
                } else {
                    campo.style.borderColor = '#ccc';
                    if (campo.closest('.checkbox-label')) {
                        campo.closest('.checkbox-label').style.color = '';
                    }
                }
            });

            // Validar "otro aeropuerto" si aplica
            if (aeropuertoSelect && aeropuertoSelect.value === 'otro') {
                const otroInput = document.getElementById('otro-aeropuerto');
                if (!otroInput.value.trim()) {
                    otroInput.style.borderColor = '#e74c3c';
                    alert('Por favor, especifique el aeropuerto');
                    valido = false;
                }
            }

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
            const datos = {
                servicio: 'Traslado Aeropuerto',
                fechaSolicitud: new Date().toLocaleDateString()
            };
            
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

            // Procesar aeropuerto seleccionado
            let aeropuertoTexto = '';
            switch(aeropuertoSelect.value) {
                case 'vlc': aeropuertoTexto = 'Valencia (VLC)'; break;
                case 'cdt': aeropuertoTexto = 'Castellon (CDT)'; break;
                case 'alc': aeropuertoTexto = 'Alicante (ALC)'; break;
                case 'mad': aeropuertoTexto = 'Madrid-Barajas (MAD)'; break;
                case 'bcn': aeropuertoTexto = 'Barcelona-El Prat (BCN)'; break;
                case 'otro': aeropuertoTexto = document.getElementById('otro-aeropuerto').value; break;
                default: aeropuertoTexto = 'No especificado';
            }

            console.log('Solicitud Aeropuerto:', datos);

            setTimeout(() => {
                alert(`✅ Solicitud enviada correctamente para traslado aeropuerto:\n\n• Aeropuerto: ${aeropuertoTexto}\n• Tipo: ${datos['tipo-traslado']}\n• Fecha: ${datos.fecha} a las ${datos.hora}\n\nNos pondremos en contacto en menos de 24 horas.`);
                
                formulario.reset();
                
                // Restaurar fecha
                const fechaInput = document.getElementById('fecha');
                if (fechaInput) {
                    const hoy = new Date();
                    const manana = new Date(hoy);
                    manana.setDate(hoy.getDate() + 1);
                    fechaInput.value = manana.toISOString().split('T')[0];
                }
                
                // Restaurar hora
                const horaInput = document.getElementById('hora');
                if (horaInput) {
                    horaInput.value = '10:00';
                }
                
                // Ocultar campo "otro aeropuerto" si estaba visible
                if (otroAeropuertoGroup) {
                    otroAeropuertoGroup.style.display = 'none';
                }
                
                botonEnviar.innerHTML = textoOriginal;
                botonEnviar.disabled = false;
                cerrarModal();
            }, 1500);
        });
    }

    // Configurar fecha por defecto (mañana)
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        const hoy = new Date();
        const manana = new Date(hoy);
        manana.setDate(hoy.getDate() + 1);
        fechaInput.min = manana.toISOString().split('T')[0];
        fechaInput.value = manana.toISOString().split('T')[0];
    }

    // Poner hora por defecto
    const horaInput = document.getElementById('hora');
    if (horaInput) {
        horaInput.value = '10:00';
    }
});