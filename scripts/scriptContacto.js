// scriptContacto.js - Enviar formulario con EmailJS

// Inicializar EmailJS con tu Public Key
(function() {
    emailjs.init("AQUI_TU_PUBLIC_KEY"); // ← PON AQUÍ TU CLAVE
})();

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

            // Preparar datos para EmailJS
            const templateParams = {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                asunto: document.getElementById('asunto').value,
                mensaje: document.getElementById('mensaje').value
            };

            // Enviar usando EmailJS
            const botonEnviar = formulario.querySelector('button[type="submit"]');
            const textoOriginal = botonEnviar.innerHTML;
            botonEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            botonEnviar.disabled = true;

            // AQUÍ TU SERVICE ID Y TEMPLATE ID
            emailjs.send('AQUI_TU_SERVICE_ID', 'AQUI_TU_TEMPLATE_ID', templateParams)
                .then(function(response) {
                    console.log('Email enviado:', response);
                    alert('✅ Mensaje enviado correctamente. Te responderemos en menos de 24 horas.');
                    formulario.reset();
                })
                .catch(function(error) {
                    console.error('Error al enviar:', error);
                    alert('❌ Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos directamente por WhatsApp.');
                })
                .finally(function() {
                    botonEnviar.innerHTML = textoOriginal;
                    botonEnviar.disabled = false;
                });
        });
    }
});