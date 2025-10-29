const periods = document.querySelectorAll('.period');
const timeline = document.querySelector('.timeline');

const data = {
    "1": {
        title: "Les débuts de l'informatique",
        period: "(1900–1945)",
        description: "L'informatique naît avec les premières machines mécaniques et électromécaniques, comme la machine de Turing ou l'ENIAC. Ces inventions posent les bases du calcul automatisé et ouvrent la voie à l'ère numérique. Les pionniers comme Alan Turing développent les concepts fondamentaux qui définiront l'informatique moderne."
    },
    "2": {
        title: "L'émergence des réseaux",
        period: "(1958–1990)",
        description: "Les ordinateurs deviennent interconnectés. ARPANET marque la naissance d'Internet et révolutionne la communication entre machines. Les protocoles TCP/IP sont créés, permettant l'échange de données à l'échelle mondiale. C'est le début d'une nouvelle ère de connectivité."
    },
    "3": {
        title: "L'ère du Web",
        period: "(1990–2020)",
        description: "Le Web transforme la communication et l'accès à l'information à l'échelle mondiale. Tim Berners-Lee invente le World Wide Web, démocratisant l'accès à Internet. Les réseaux sociaux, le e-commerce et les services en ligne deviennent omniprésents dans notre quotidien."
    },
    "4": {
        title: "L'intelligence artificielle",
        period: "(2020–...)",
        description: "L'intelligence artificielle révolutionne les domaines de la santé, de l'éducation et de la créativité. Les modèles de deep learning et les transformers ouvrent des possibilités infinies. L'IA devient un assistant quotidien, capable de comprendre, créer et résoudre des problèmes complexes."
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
    }
    });
}, observerOptions);
observer.observe(videoContent);
