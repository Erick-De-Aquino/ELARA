// scriptContacto.js - Lógica para página de contacto

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formularioContacto');

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

            if (!valido) {
                alert('Por favor, complete todos los campos obligatorios (*)');
                return;
            }

            // Simulación de envío
            const botonEnviar = formulario.querySelector('button[type="submit"]');
            const textoOriginal = botonEnviar.innerHTML;
            botonEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            botonEnviar.disabled = true;

            // Recoger datos
            const datos = {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                asunto: document.getElementById('asunto').value,
                mensaje: document.getElementById('mensaje').value
            };

            console.log('Mensaje de contacto:', datos);

            setTimeout(() => {
                alert('✅ Mensaje enviado correctamente. Te responderemos en menos de 24 horas.');
                formulario.reset();
                botonEnviar.innerHTML = textoOriginal;
                botonEnviar.disabled = false;
            }, 1500);
        });
    }
});