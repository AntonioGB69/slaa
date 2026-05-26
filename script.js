const diceDisplay = document.getElementById('diceDisplay');
const diceValue = document.getElementById('diceValue');
const totalDisplay = document.getElementById('totalDisplay');
const historyList = document.getElementById('historyList');
const modifierInput = document.getElementById('modifier');

let isRolling = false;

function roll(sides) {
    if (isRolling) return; // Evita bugar clicando várias vezes
    isRolling = true;

    const modifier = parseInt(modifierInput.value) || 0;
    
    // Efeito visual e sonoro inicial
    diceDisplay.classList.add('rolling-fast');
    totalDisplay.innerText = "Calculando...";
    diceDisplay.style.background = 'var(--primary)';
    diceDisplay.style.boxShadow = '0 0 20px var(--primary-glow)';

    // Embaralha os números rapidamente antes de parar
    let shuffleInterval = setInterval(() => {
        diceValue.innerText = Math.floor(Math.random() * sides) + 1;
    }, 50);

    // Finaliza a rolagem após 800ms
    setTimeout(() => {
        clearInterval(shuffleInterval);
        diceDisplay.classList.remove('rolling-fast');
        
        const rollResult = Math.floor(Math.random() * sides) + 1;
        const total = rollResult + modifier;
        
        diceValue.innerText = rollResult;
        
        // Verifica se foi Crítico (Valor máximo no dado, independente do modificador)
        if (rollResult === sides) {
            diceDisplay.style.background = 'var(--critical)';
            diceDisplay.style.boxShadow = '0 0 40px rgba(251, 191, 36, 0.6)';
            totalDisplay.innerText = `Total: ${total} (CRÍTICO!)`;
            createParticles(); // Chama o efeito de confete
        } else if (rollResult === 1) {
            diceDisplay.style.background = '#ef4444'; // Vermelho para Falha Crítica
            diceDisplay.style.boxShadow = '0 0 40px rgba(239, 68, 68, 0.6)';
            totalDisplay.innerText = `Total: ${total} (FALHA CRÍTICA)`;
        } else {
            totalDisplay.innerText = `Total: ${total}`;
        }

        addToHistory(sides, rollResult, modifier, total);
        isRolling = false;
    }, 800);
}

function addToHistory(sides, rollResult, modifier, total) {
    const li = document.createElement('li');
    let modText = modifier >= 0 ? `+ ${modifier}` : `- ${Math.abs(modifier)}`;
    
    li.innerHTML = `
        <div class="history-result">Total: ${total}</div>
        <div class="history-math">1d${sides} (${rollResult}) ${modText}</div>
    `;
    historyList.prepend(li);
}

function clearHistory() {
    historyList.innerHTML = '';
}

// Sistema de Partículas para Acertos Críticos
function createParticles() {
    const rect = diceDisplay.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Cores aleatórias para o confete
        const colors = ['#fbbf24', '#f59e0b', '#fff', '#fb7185'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;

        // Direção aleatória da explosão
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        document.body.appendChild(particle);

        // Remove a partícula do DOM após a animação
        setTimeout(() => particle.remove(), 1000);
    }
}
