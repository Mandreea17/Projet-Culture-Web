const periods = document.querySelectorAll('.period');
const timeline = document.querySelector('.timeline');

const data = {
  "1" : "L’informatique naît avec les premières machines mécaniques et électromécaniques, comme la machine de Turing ou l’ENIAC.",
  "2" : "Les ordinateurs deviennent interconnectés. ARPANET marque la naissance d’Internet.",
  "3" : "Le Web transforme la communication et l’accès à l’information à l’échelle mondiale.",
  "4" : "L’intelligence artificielle révolutionne les domaines de la santé, de l’éducation et de la créativité.",
}

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
      info.textContent = data[id];
      dot.appendChild(info);
    }
  });
});
