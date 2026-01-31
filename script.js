// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {

    // ===== CRONÓMETRO DE CUENTA REGRESIVA =====
    const weddingDate = new Date('April 25, 2026 19:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        // Calcular días, horas, minutos y segundos
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Actualizar el HTML
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        // Si la cuenta regresiva termina
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-title').textContent = '¡Es hoy!';
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }

    // Actualizar cada segundo
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // ===== BOTÓN DE CONFIRMACIÓN =====
    const confirmBtn = document.getElementById('confirmBtn');

    confirmBtn.addEventListener('click', function() {
        // Efecto de click
        this.style.transform = 'scale(0.95)';

        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);

        // Mostrar mensaje de confirmación
        showConfirmationMessage();
    });

    // Función para mostrar mensaje de confirmación
    function showConfirmationMessage() {
        // Crear elemento de mensaje
        const message = document.createElement('div');
        message.className = 'confirmation-message';
        message.innerHTML = `
            <div class="message-content">
                <span class="message-icon">✓</span>
                <p>¡Gracias por confirmar!</p>
                <p class="message-subtitle">Cristian y Adriana se alegran de contar contigo</p>
            </div>
        `;

        // Añadir estilos al mensaje
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: linear-gradient(135deg, #1976d2, #0d47a1);
            color: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            text-align: center;
            animation: popIn 0.5s ease-out forwards;
        `;

        // Añadir estilos al contenido del mensaje
        const style = document.createElement('style');
        style.textContent = `
            @keyframes popIn {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 0;
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.1);
                }
                100% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
            }
            
            .confirmation-message .message-content {
                position: relative;
            }
            
            .confirmation-message .message-icon {
                font-size: 4em;
                display: block;
                margin-bottom: 20px;
                animation: checkmark 0.8s ease-out 0.3s both;
            }
            
            @keyframes checkmark {
                0% {
                    transform: scale(0) rotate(0deg);
                }
                50% {
                    transform: scale(1.2) rotate(180deg);
                }
                100% {
                    transform: scale(1) rotate(360deg);
                }
            }
            
            .confirmation-message p {
                font-size: 1.5em;
                margin: 10px 0;
            }
            
            .confirmation-message .message-subtitle {
                font-size: 1em;
                opacity: 0.9;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(message);

        // Eliminar el mensaje después de 3 segundos
        setTimeout(() => {
            message.style.animation = 'popIn 0.3s ease-in reverse';
            setTimeout(() => {
                document.body.removeChild(message);
            }, 300);
        }, 3000);

        // Crear confeti
        createConfetti();
    }

    // Función para crear efecto de confeti
    function createConfetti() {
        const colors = ['#1976d2', '#0d47a1', '#90caf9', '#64b5f6', '#42a5f5'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    top: -10px;
                    left: ${Math.random() * 100}%;
                    opacity: 1;
                    transform: rotate(${Math.random() * 360}deg);
                    z-index: 999;
                    pointer-events: none;
                    animation: confettiFall ${2 + Math.random() * 2}s ease-out forwards;
                `;

                document.body.appendChild(confetti);

                // Eliminar confeti después de la animación
                setTimeout(() => {
                    document.body.removeChild(confetti);
                }, 4000);
            }, i * 30);
        }

        // Añadir animación de confeti
        if (!document.getElementById('confetti-style')) {
            const confettiStyle = document.createElement('style');
            confettiStyle.id = 'confetti-style';
            confettiStyle.textContent = `
                @keyframes confettiFall {
                    0% {
                        top: -10px;
                        opacity: 1;
                    }
                    100% {
                        top: 100vh;
                        opacity: 0;
                        transform: rotate(${720 + Math.random() * 360}deg);
                    }
                }
            `;
            document.head.appendChild(confettiStyle);
        }
    }

    // Añadir más flores dinámicamente
    function addDynamicFlowers() {
        const flowerContainer = document.querySelector('.flower-container');

        setInterval(() => {
            const flower = document.createElement('div');
            flower.className = 'dynamic-flower';
            flower.style.cssText = `
                position: absolute;
                width: 30px;
                height: 30px;
                background: radial-gradient(circle, #fff 0%, #64b5f6 100%);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0;
                animation: fadeInOut 4s ease-in-out;
            `;

            flowerContainer.appendChild(flower);

            setTimeout(() => {
                flowerContainer.removeChild(flower);
            }, 4000);
        }, 3000);

        // Añadir animación fadeInOut
        if (!document.getElementById('dynamic-flower-style')) {
            const style = document.createElement('style');
            style.id = 'dynamic-flower-style';
            style.textContent = `
                @keyframes fadeInOut {
                    0%, 100% { opacity: 0; transform: scale(0); }
                    50% { opacity: 0.6; transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Iniciar flores dinámicas
    addDynamicFlowers();

    // Efecto parallax suave en el mouse
    document.addEventListener('mousemove', function(e) {
        const flowers = document.querySelectorAll('.flower');
        const lights = document.querySelectorAll('.light');

        const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 20;

        flowers.forEach((flower, index) => {
            const speed = (index + 1) * 0.5;
            flower.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });

        lights.forEach((light, index) => {
            const speed = (index + 1) * 0.3;
            light.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
    });

    // Agregar más lucecitas intermitentes
    function addMoreLights() {
        const lightsContainer = document.querySelector('.lights-container');

        for (let i = 0; i < 10; i++) {
            const light = document.createElement('div');
            light.className = 'extra-light';
            light.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: #fff;
                border-radius: 50%;
                box-shadow: 0 0 15px #fff, 0 0 30px #64b5f6, 0 0 45px #64b5f6;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: twinkle ${1 + Math.random() * 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            lightsContainer.appendChild(light);
        }
    }

    addMoreLights();

    console.log('✨ Invitación de boda cargada con éxito ✨');
    console.log('💑 Cristian & Adriana - 25 de Abril de 2026 💑');
});