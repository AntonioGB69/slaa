const diceDisplay = document.getElementById('diceDisplay');
const diceValue = document.getElementById('diceValue');
const historyList = document.getElementById('historyList');

function roll(sides) {
    // 1. Efeito visual de início
    diceDisplay.classList.add('rolling');
    diceValue.style.opacity = '0.3';
    
    // 2. Simulação de tempo de rolagem
    setTimeout(() => {
        const result = Math.floor(Math.random() * sides) + 1;
        
        // 3. Atualiza valor e remove animação
        diceDisplay.classList.remove('rolling');
        diceValue.innerText = result;
        diceValue.style.opacity = '1';
        
        // 4. Feedback de Crítico (Dourado para valor máximo)
        if (result === sides) {
            diceDisplay.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
            triggerShakeEffect();
        } else {
            diceDisplay.style.background = 'linear-gradient(135deg, #6366f1, #4338ca)';
        }

        addToHistory(sides, result);
    }, 600);
}

function addToHistory(sides, result) {
    const li = document.createElement('li');
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    li.innerHTML = `<span>D${sides}: <strong>${result}</strong></span> <small>${time}</small>`;
    historyList.prepend(li); // Adiciona no topo
}

function clearHistory() {
    historyList.innerHTML = '';
}

function triggerShakeEffect() {
    diceDisplay.style.transform = 'scale(1.2)';
    setTimeout(() => diceDisplay.style.transform = 'scale(1)', 200);
}
