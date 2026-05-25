function rollDice(type) {
    const dice = document.getElementById('dice');
    const resultText = document.getElementById('resultText');
    
    // Inicia animação visual de rotação infinita
    dice.classList.add('animate');
    resultText.innerText = "Rolando...";

    setTimeout(() => {
        // Gera o número aleatório
        const result = Math.floor(Math.random() * type) + 1;
        
        // Remove animação de rotação infinita
        dice.classList.remove('animate');
        
        // Define a rotação final baseada no resultado (Exemplo para D6)
        // Nota: Para simplificar, usamos rotações fixas para o D6 visual
        if (type === 6) {
            applyD6Rotation(result);
        }

        resultText.innerText = `Resultado: ${result}`;
        
        // Efeito especial se tirar o valor máximo (Crítico)
        if (result === type) {
            resultText.style.color = "#f9d423"; // Dourado
            resultText.innerText += " - CRÍTICO!";
        } else {
            resultText.style.color = "#4ecca3";
        }

    }, 1000); // Tempo da "rolagem"
}

function applyD6Rotation(number) {
    const dice = document.getElementById('dice');
    const rotations = {
        1: 'rotateX(0deg) rotateY(0deg)',
        6: 'rotateX(180deg) rotateY(0deg)',
        2: 'rotateX(0deg) rotateY(-90deg)',
        5: 'rotateX(0deg) rotateY(90deg)',
        3: 'rotateX(-90deg) rotateY(0deg)',
        4: 'rotateX(90deg) rotateY(0deg)'
    };
    dice.style.transform = rotations[number];
}