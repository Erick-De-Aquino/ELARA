// scriptServMascotas.js - Lógica específica para Traslado de Mascotas

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del modal
    const abrirFormularioBtn = document.getElementById('abrirFormulario');
    const cerrarModalBtn = document.getElementById('cerrarModal');
    const cancelarBtn = document.getElementById('cancelarForm');
    const modalOverlay = document.getElementById('modalOverlay');
    const formulario = document.getElementById('formularioServicio');
    const zonaSelect = document.getElementById('zona');
    const distanciaGroup = document.getElementById('distancia-group');
    const distanciaInput = document.getElementById('distancia');
    const precioEstimado = document.getElementById('precio-estimado');
    const tipoMascota = document.getElementById('tipo-mascota');
    const otroMascotaGroup = document.getElementById('otro-mascota-group');

    // Mostrar campo de distancia si se selecciona larga distancia
    if (zonaSelect && distanciaGroup) {
        zonaSelect.addEventListener('change', function() {
            if (this.value === 'larga') {
                distanciaGroup.style.display = 'block';
            } else {
                distanciaGroup.style.display = 'none';
            }
            actualizarPrecioEstimado();
        });
    }

    // Calcular precio estimado
    function actualizarPrecioEstimado() {
        if (zonaSelect.value === 'larga' && distanciaInput && distanciaInput.value) {
            const km = parseFloat(distanciaInput.value);
            if (!isNaN(km) && km > 0) {
                const precio = km * 0.75;
                precioEstimado.textContent = precio.toFixed(2);
            } else {
                precioEstimado.textContent = '0';
            }
        } else if (zonaSelect.value === 'valencia') {
            precioEstimado.textContent = '20';
        } else if (zonaSelect.value === 'alrededores') {
            precioEstimado.textContent = '30';
        } else {
            precioEstimado.textContent = '0';
        }
    }

    if (distanciaInput) {
        distanciaInput.addEventListener('input', actualizarPrecioEstimado);
    }

    // Mostrar campo "otro tipo de mascota"
    if (tipoMascota && otroMascotaGroup) {
        tipoMascota.addEventListener('change', function() {
            otroMascotaGroup.style.display = this.value === 'otro' ? 'block' : 'none';
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

            // Validar otro tipo de mascota
            if (tipoMascota && tipoMascota.value === 'otro') {
                const otroInput = document.getElementById('otro-mascota');
                if (!otroInput.value.trim()) {
                    otroInput.style.borderColor = '#e74c3c';
                    alert('Por favor, especifique el tipo de mascota');
                    valido = false;
                }
            }

            // Validar distancia si es larga distancia
            if (zonaSelect && zonaSelect.value === 'larga') {
                if (!distanciaInput.value || parseFloat(distanciaInput.value) <= 0) {
                    distanciaInput.style.borderColor = '#e74c3c';
                    alert('Por favor, indique la distancia aproximada para larga distancia');
                    valido = false;
                }
            }

            if (!valido) {
                alert('Por favor, complete todos los campos obligatorios (*)');
                return;
            }

            // Calcular precio final
            let precioFinal = 0;
            if (zonaSelect.value === 'valencia') precioFinal = 20;
            else if (zonaSelect.value === 'alrededores') precioFinal = 30;
            else if (zonaSelect.value === 'larga' && distanciaInput.value) {
                precioFinal = parseFloat(distanciaInput.value) * 0.75;
            }

            // Simulación de envío
            const botonEnviar = formulario.querySelector('.btn-enviar');
            const textoOriginal = botonEnviar.innerHTML;
            botonEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            botonEnviar.disabled = true;

            // Recoger datos
            const datos = {
                servicio: 'Traslado de Mascotas',
                fechaSolicitud: new Date().toLocaleDateString(),
                precioEstimado: `${precioFinal.toFixed(2)}€`
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

            let zonaTexto = '';
            switch(zonaSelect.value) {
                case 'valencia': zonaTexto = 'Valencia ciudad (20€)'; break;
                case 'alrededores': zonaTexto = 'Pueblos alrededores (30€)'; break;
                case 'larga': zonaTexto = `Larga distancia (${distanciaInput.value} km → ${precioFinal.toFixed(2)}€)`;
            }

            setTimeout(() => {
                alert(`✅ Solicitud enviada correctamente para Traslado de Mascotas:\n\n• Zona: ${zonaTexto}\n• Tipo: ${datos['tipo-mascota']} (${datos.tamano})\n• Fecha: ${datos.fecha}\n\nNos pondremos en contacto en menos de 24 horas para confirmar disponibilidad.`);
                
                formulario.reset();
                
                // Restaurar fecha
                const fechaInput = document.getElementById('fecha');
                if (fechaInput) {
                    const hoy = new Date();
                    const manana = new Date(hoy);
                    manana.setDate(hoy.getDate() + 1);
                    fechaInput.value = manana.toISOString().split('T')[0];
                }
                
                // Restaurar zona y ocultar distancia
                if (zonaSelect) zonaSelect.value = '';
                if (distanciaGroup) distanciaGroup.style.display = 'none';
                if (otroMascotaGroup) otroMascotaGroup.style.display = 'none';
                
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