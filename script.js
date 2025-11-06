const periods = document.querySelectorAll('.period');
const timeline = document.querySelector('.timeline');

const data = {
    "1": {
        title: "Les débuts de l'informatique",
        period: "(1941)",
        game: "binary",
        info: "Le Z3, créé par Konrad Zuse en 1941, était le premier ordinateur programmable au monde. Il utilisait des relais électromécaniques et le système binaire (0 et 1) pour effectuer des calculs. C'est ce même système binaire que tu viens d'utiliser dans le jeu ! Le Z3 pesait plus d'une tonne et pouvait effectuer une addition en 0,8 seconde. Aujourd'hui, nos ordinateurs peuvent faire des milliards d'opérations par seconde !"
    },
    "2": {
        title: "L'émergence des réseaux",
        period: "(1958–1990)",
        game: "network",
        info: "En 1989, Tim Berners-Lee a inventé le World Wide Web au CERN. Grâce au HTML (langage des pages web), au protocole HTTP (pour communiquer) et aux URL (adresses des sites), les ordinateurs du monde entier ont pu se connecter entre eux. Comme tu viens de le faire dans le jeu, connecter les bons nœuds dans le bon ordre est essentiel ! Le premier site web a été mis en ligne le 6 août 1991 et expliquait... ce qu'était le Web !"
    },
    "3": {
        title: "Edward Snowden et la surveillance",
        period: "(2013)",
        game: "encryption",
        info: "En 2013, Edward Snowden, ancien consultant de la NSA (Agence de sécurité nationale américaine), a révélé l'existence de programmes de surveillance massive. Il a montré que nos communications étaient interceptées à grande échelle. Le chiffrement que tu viens d'utiliser (chiffre de César) est une technique vieille de 2000 ans ! Aujourd'hui, nous utilisons des algorithmes bien plus complexes comme AES-256 pour protéger nos données. Le chiffrement est devenu indispensable pour protéger notre vie privée en ligne."
    },
    "4": {
        title: "L'intelligence artificielle",
        period: "(2020–2025)",
        game: "ai",
        info: "Entre 2020 et 2025, l'intelligence artificielle a révolutionné notre quotidien. OpenAI a lancé GPT-3 en 2020 (175 milliards de paramètres !), puis ChatGPT en novembre 2022 qui a atteint 100 millions d'utilisateurs en seulement 2 mois, un record absolu. Ces modèles utilisent le 'Transformer', une architecture qui leur permet de comprendre et générer du texte de manière impressionnante. L'IA peut aujourd'hui écrire, coder, créer des images, et même composer de la musique !"
    }
};

const anecdotes = {
    binary: [
        "💡 Le mot 'bit' vient de 'binary digit' (chiffre binaire)",
        "💡 Un octet (byte) = 8 bits, soit 256 combinaisons possibles",
        "💡 Les premiers ordinateurs utilisaient des cartes perforées pour programmer",
        "💡 Le système binaire a été inventé par Gottfried Leibniz en 1679",
        "💡 Ton smartphone contient des milliards de transistors qui ne comprennent que le 0 et 1"
    ],
    ai: [
        "💡 ChatGPT peut comprendre et parler plus de 50 langues différentes",
        "💡 L'entraînement de GPT-3 a coûté environ 12 millions de dollars",
        "💡 Les IAs modernes apprennent sur des milliards de pages web"
    ]
};

const games = {
    binary: {
        title: "🎮 Décodeur Binaire",
        instruction: "Convertis ce nombre binaire en décimal :",
        generateQuestion: () => {
            const decimal = Math.floor(Math.random() * 16);
            const binary = decimal.toString(2).padStart(4, '0');
            return { question: binary, answer: decimal.toString() };
        }
    },
    network: {
        title: "🎮 Connecte les Réseaux",
        instruction: "Clique sur les nœuds dans le bon ordre (0 → 3) pour créer une connexion !",
        nodes: 4
    },
    encryption: {
        title: "🎮 Message Crypté",
        instruction: "Décrypte ce message (chiffre de César, décalage de 3) :",
        generateQuestion: () => {
            const messages = ["NSA", "SPY", "CODE", "KEY", "WEB"];
            const msg = messages[Math.floor(Math.random() * messages.length)];
            const encrypted = msg.split('').map(c => 
                String.fromCharCode(((c.charCodeAt(0) - 65 + 3) % 26) + 65)
            ).join('');
            return { question: encrypted, answer: msg };
        }
    },
    ai: {
        title: "🎮 Quiz IA",
        instruction: "Réponds correctement à toutes les questions !",
        questions: [
            { q: "Qui a créé ChatGPT ?", options: ["Google", "OpenAI", "Meta"], answer: 1 },
            { q: "GPT signifie ?", options: ["General Purpose Tech", "Generative Pre-trained Transformer", "Global Processing Tool"], answer: 1 },
            { q: "Quelle année GPT-3 a-t-il été lancé ?", options: ["2018", "2020", "2022"], answer: 1 }
        ]
    }
};

// Gestion de la timeline
periods.forEach(period => {
    const dot = period.querySelector('.dot');
    const id = period.getAttribute('data-id');
    
    period.addEventListener('click', () => {
        const active = document.querySelector('.period.active');
        
        if (active && active !== period) {
            active.classList.remove('active');
            const oldContent = active.querySelector('.dot-content');
            if (oldContent) oldContent.remove();
        }
        
        const isActive = period.classList.contains('active');
        
        if (isActive) {
            period.classList.remove('active');
            const oldContent = period.querySelector('.dot-content');
            if (oldContent) oldContent.remove();
            timeline.classList.remove('expanded');
        } else {
            period.classList.add('active');
            timeline.classList.add('expanded');
            
            const info = document.createElement('div');
            info.classList.add('dot-content');
            
            const title = document.createElement('h3');
            title.textContent = data[id].title;
            
            const periodLabel = document.createElement('div');
            periodLabel.classList.add('period-label');
            periodLabel.textContent = data[id].period;
            
            const description = document.createElement('p');
            description.textContent = "Clique sur le bouton ci-dessous pour jouer et découvrir l'histoire de cette période !";
            description.style.fontStyle = 'italic';
            description.style.opacity = '0.9';
            
            const gameBtn = document.createElement('button');
            gameBtn.classList.add('game-btn');
            gameBtn.textContent = '🎮 Jouer au mini-jeu';
            gameBtn.onclick = (e) => {
                e.stopPropagation();
                launchGame(data[id].game, id);
            };
            
            info.appendChild(title);
            info.appendChild(periodLabel);
            info.appendChild(description);
            info.appendChild(gameBtn);
            
            dot.appendChild(info);
        }
    });
});

// Observer pour la vidéo
const videoContent = document.querySelector('.video-content');
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

observer.observe(videoContent);

function launchGame(gameType, periodId) {
    const overlay = document.createElement('div');
    overlay.classList.add('game-overlay');
    
    const gameContainer = document.createElement('div');
    gameContainer.classList.add('game-container');
    gameContainer.dataset.periodId = periodId;
    
    // Fonction de fermeture globale
    const closeGame = () => {
        overlay.remove();
    };
    
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('game-close');
    closeBtn.innerHTML = '✕';
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeGame();
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeGame();
        }
    });
    
    gameContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    gameContainer.appendChild(closeBtn);
    
    if (gameType === 'binary') {
        createBinaryGame(gameContainer, closeBtn, closeGame);
    } else if (gameType === 'network') {
        createNetworkGame(gameContainer, closeBtn, closeGame);
    } else if (gameType === 'encryption') {
        createEncryptionGame(gameContainer, closeBtn, closeGame);
    } else if (gameType === 'ai') {
        createAIGame(gameContainer, closeBtn, closeGame);
    }
    
    overlay.appendChild(gameContainer);
    document.body.appendChild(overlay);
}

function createBinaryGame(container, closeBtn, closeGame) {
    const game = games.binary;
    const periodId = container.dataset.periodId || "1";
    let attempts = 0;
    let score = 0;
    let totalQuestions = 5;
    let currentQuestion = 1;
    let q = game.generateQuestion();
    
    const content = `
        <h3>${game.title}</h3>
        <div class="game-score">Question ${currentQuestion}/${totalQuestions} | Score: ${score}</div>
        <p class="game-instruction">${game.instruction}</p>
        <div class="game-question">${q.question}</div>
        <div class="binary-helper">💡 Astuce: 1101 = 8+4+0+1 = 13</div>
        <div class="anecdote-box">${anecdotes.binary[0]}</div>
        <input type="number" class="game-input" placeholder="Votre réponse..." autocomplete="off">
        <button class="game-submit">Vérifier</button>
        <div class="game-result"></div>
    `;
    
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = content;
    container.appendChild(contentDiv);
    
    const input = container.querySelector('.game-input');
    const submit = container.querySelector('.game-submit');
    const result = container.querySelector('.game-result');
    const questionDisplay = container.querySelector('.game-question');
    const scoreDisplay = container.querySelector('.game-score');
    const anecdoteBox = container.querySelector('.anecdote-box');
    
    input.focus();
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submit.click();
    });
    
    function showFinalInfo() {
        contentDiv.innerHTML = `
            <h3>🎉 Félicitations !</h3>
            <div class="final-score">Score final: ${score}/${totalQuestions}</div>
            <div class="final-info">
                <h4>${data[periodId].title}</h4>
                <p>${data[periodId].info}</p>
            </div>
            <button class="game-btn" onclick="this.closest('.game-overlay').remove()">Fermer</button>
        `;
    }
    
    function nextQuestion() {
        currentQuestion++;
        if (currentQuestion <= totalQuestions) {
            q = game.generateQuestion();
            questionDisplay.textContent = q.question;
            scoreDisplay.textContent = `Question ${currentQuestion}/${totalQuestions} | Score: ${score}`;
            anecdoteBox.textContent = anecdotes.binary[currentQuestion - 1] || anecdotes.binary[anecdotes.binary.length - 1];
            input.value = '';
            result.innerHTML = '';
            input.focus();
            attempts = 0;
        } else {
            showFinalInfo();
        }
    }
    
    submit.onclick = () => {
        if (input.value === q.answer) {
            score++;
            result.innerHTML = '✅ Correct ! Bravo !';
            result.style.color = '#00ff00';
            setTimeout(nextQuestion, 1000);
        } else {
            attempts++;
            if (attempts >= 2) {
                result.innerHTML = `❌ La réponse était ${q.answer}. On passe à la suivante !`;
                result.style.color = '#ff4444';
                attempts = 0;
                setTimeout(nextQuestion, 2000);
            } else {
                result.innerHTML = `❌ Faux ! Réessaie (Indice: pense en puissances de 2)`;
                result.style.color = '#ff8800';
            }
        }
    };
}

function createNetworkGame(container, closeBtn, closeGame) {
    const game = games.network;
    const periodId = container.dataset.periodId || "2";
    let clicks = 0;
    let startTime = Date.now();
    
    const content = `
        <h3>${game.title}</h3>
        <p class="game-instruction">${game.instruction}</p>
        <div class="network-progress">Nœuds connectés: <span id="progress">0/4</span></div>
        <div class="network-grid"></div>
        <button class="game-reset" style="display:none;">🔄 Recommencer</button>
        <div class="game-result"></div>
    `;
    
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = content;
    container.appendChild(contentDiv);
    
    const grid = container.querySelector('.network-grid');
    const result = container.querySelector('.game-result');
    const progress = container.querySelector('#progress');
    const resetBtn = container.querySelector('.game-reset');
    
    function showFinalInfo(time) {
        contentDiv.innerHTML = `
            <h3>🎉 Bravo !</h3>
            <div class="final-score">Temps: ${time}s</div>
            <div class="final-info">
                <h4>${data[periodId].title}</h4>
                <p>${data[periodId].info}</p>
            </div>
            <button class="game-btn" onclick="this.closest('.game-overlay').remove()">Fermer</button>
        `;
    }
    
    function createNodes() {
        grid.innerHTML = '';
        for (let i = 0; i < game.nodes; i++) {
            const node = document.createElement('div');
            node.classList.add('network-node');
            node.dataset.index = i;
            node.innerHTML = `<span class="node-number">${i}</span>`;
            
            node.onclick = () => {
                if (node.classList.contains('connected')) return;
                
                if (parseInt(node.dataset.index) === clicks) {
                    node.classList.add('connected');
                    clicks++;
                    progress.textContent = `${clicks}/4`;
                    
                    if (clicks === game.nodes) {
                        const time = ((Date.now() - startTime) / 1000).toFixed(1);
                        setTimeout(() => showFinalInfo(time), 1000);
                    }
                } else {
                    node.classList.add('error-shake');
                    setTimeout(() => node.classList.remove('error-shake'), 500);
                    result.innerHTML = '❌ Mauvais ordre ! Clique dans l\'ordre: 0 → 1 → 2 → 3';
                    result.style.color = '#ff4444';
                }
            };
            grid.appendChild(node);
        }
    }
    
    resetBtn.onclick = () => {
        clicks = 0;
        startTime = Date.now();
        progress.textContent = '0/4';
        result.innerHTML = '';
        resetBtn.style.display = 'none';
        createNodes();
    };
    
    createNodes();
}

function createEncryptionGame(container, closeBtn, closeGame) {
    const game = games.encryption;
    const periodId = container.dataset.periodId || "3";
    let attempts = 0;
    let hintsShown = 0;
    let q = game.generateQuestion();
    
    const content = `
        <h3>${game.title}</h3>
        <p class="game-instruction">${game.instruction}</p>
        <div class="game-question">${q.question}</div>
        <div class="cipher-helper">
            <div>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</div>
            <div>D E F G H I J K L M N O P Q R S T U V W X Y Z A B C</div>
        </div>
        <input type="text" class="game-input" placeholder="Message décrypté..." style="text-transform: uppercase;" maxlength="10" autocomplete="off">
        <button class="game-submit">Décrypter</button>
        <button class="game-hint">💡 Indice</button>
        <div class="game-result"></div>
    `;
    
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = content;
    container.appendChild(contentDiv);
    
    const input = container.querySelector('.game-input');
    const submit = container.querySelector('.game-submit');
    const hintBtn = container.querySelector('.game-hint');
    const result = container.querySelector('.game-result');
    
    input.focus();
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submit.click();
    });
    
    function showFinalInfo(points) {
        contentDiv.innerHTML = `
            <h3>🎉 Message décrypté !</h3>
            <div class="final-score">Score: ${points}/100</div>
            <div class="final-info">
                <h4>${data[periodId].title}</h4>
                <p>${data[periodId].info}</p>
            </div>
            <button class="game-btn" onclick="this.closest('.game-overlay').remove()">Fermer</button>
        `;
    }
    
    hintBtn.onclick = () => {
        hintsShown++;
        if (hintsShown === 1) {
            result.innerHTML = `💡 Première lettre: ${q.answer[0]}`;
            result.style.color = '#00bfff';
        } else if (hintsShown === 2) {
            result.innerHTML = `💡 Le mot complet est: ${q.answer}`;
            result.style.color = '#00bfff';
            hintBtn.disabled = true;
        }
    };
    
    submit.onclick = () => {
        const userAnswer = input.value.toUpperCase().trim();
        
        if (userAnswer === q.answer) {
            const penalty = hintsShown * 10;
            const points = Math.max(100 - penalty - (attempts * 10), 10);
            setTimeout(() => showFinalInfo(points), 1000);
        } else {
            attempts++;
            if (attempts >= 3) {
                result.innerHTML = `❌ La réponse était <strong>${q.answer}</strong>. Rappel: on recule de 3 lettres dans l'alphabet.`;
                result.style.color = '#ff4444';
                setTimeout(() => showFinalInfo(0), 2000);
            } else {
                result.innerHTML = `❌ Faux ! Réessaie (${3 - attempts} essai${3 - attempts > 1 ? 's' : ''} restant${3 - attempts > 1 ? 's' : ''})`;
                result.style.color = '#ff8800';
            }
        }
    };
}

function createAIGame(container, closeBtn, closeGame) {
    const game = games.ai;
    const periodId = container.dataset.periodId || "4";
    let currentQ = 0;
    let score = 0;
    let answered = false;
    
    function showFinalInfo() {
        const contentDiv = container.querySelector('.ai-content');
        contentDiv.innerHTML = `
            <h3>🎉 Quiz terminé !</h3>
            <div class="final-score">Score: ${score}/${game.questions.length}</div>
            <div class="final-info">
                <h4>${data[periodId].title}</h4>
                <p>${data[periodId].info}</p>
            </div>
            <button class="game-btn" onclick="this.closest('.game-overlay').remove()">Fermer</button>
        `;
    }
    
    function showQuestion() {
        answered = false;
        const q = game.questions[currentQ];
        
        const content = `
            <h3>${game.title}</h3>
            <div class="game-score">Question ${currentQ + 1}/${game.questions.length} | Score: ${score}</div>
            <p class="game-instruction">${game.instruction}</p>
            <div class="anecdote-box">${anecdotes.ai[currentQ] || anecdotes.ai[anecdotes.ai.length - 1]}</div>
            <div class="game-question" style="font-size: 1.2rem; letter-spacing: normal;">${q.q}</div>
            <div class="ai-options">
                ${q.options.map((opt, i) => `
                    <button class="ai-option" data-index="${i}">
                        <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                        ${opt}
                    </button>
                `).join('')}
            </div>
            <div class="game-result"></div>
        `;
        
        const existingContent = container.querySelector('.ai-content');
        if (existingContent) {
            existingContent.remove();
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'ai-content';
        contentDiv.innerHTML = content;
        container.appendChild(contentDiv);
        
        const result = container.querySelector('.game-result');
        container.querySelectorAll('.ai-option').forEach(btn => {
            btn.onclick = () => {
                if (answered) return;
                answered = true;
                
                const index = parseInt(btn.dataset.index);
                const allBtns = container.querySelectorAll('.ai-option');
                
                allBtns.forEach(b => b.disabled = true);
                
                if (index === q.answer) {
                    btn.classList.add('correct');
                    score++;
                    result.innerHTML = '✅ Exact ! Bonne réponse !';
                    result.style.color = '#00ff00';
                    
                    currentQ++;
                    if (currentQ < game.questions.length) {
                        setTimeout(showQuestion, 1500);
                    } else {
                        setTimeout(showFinalInfo, 1500);
                    }
                } else {
                    btn.classList.add('incorrect');
                    allBtns[q.answer].classList.add('correct');
                    result.innerHTML = `❌ Faux ! La bonne réponse était: ${q.options[q.answer]}`;
                    result.style.color = '#ff4444';
                    
                    currentQ++;
                    if (currentQ < game.questions.length) {
                        setTimeout(showQuestion, 2500);
                    } else {
                        setTimeout(showFinalInfo, 2500);
                    }
                }
            };
        });
    }
    
    showQuestion();
}