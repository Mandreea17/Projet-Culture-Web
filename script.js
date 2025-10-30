const periods = document.querySelectorAll('.period');
const timeline = document.querySelector('.timeline');

const data = {
    "1": {
        title: "Les débuts de l'informatique",
        period: "(1941)",
        description: "Créé par Konrad Zuse, le Z3 est le premier ordinateur programmable. Basé sur des relais électromécaniques et le langage binaire, il marque le point de départ de l’informatique moderne."
    },
    "2": {
        title: "L'émergence des réseaux",
        period: "(1958–1990)",
        description: "En 1989, Tim Berners-Lee invente le World Wide Web. Grâce au HTML, au protocole HTTP et aux URL, les pages deviennent reliées entre elles et l’information circule à l’échelle mondiale."
    },
    "3": {
        title: "Edward Snowden et la surveillance",
        period: "(2013)",
        description: "Edward Snowden révèle l’existence de programmes de surveillance mondiale de la NSA. Ses révélations éveillent la conscience publique sur la vie privée et popularisent le chiffrement des données."
    },
    "4": {
        title: "L'intelligence artificielle",
        period: "(2020–2025)",
        description: "Entre 2020 et 2025, l’IA s’impose dans le quotidien. OpenAI lance GPT-3, puis ChatGPT révolutionne l’usage du numérique. GPT-5 marque une nouvelle ère d’intelligence créative et collaborative."
    }
};

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
            description.textContent = data[id].description;
            
            info.appendChild(title);
            info.appendChild(periodLabel);
            info.appendChild(description);
            
            dot.appendChild(info);
        }
    });
});

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