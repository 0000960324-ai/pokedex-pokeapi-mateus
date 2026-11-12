
const pokedex = document.getElementById('pokedex');
const coverFront = document.getElementById('cover-front');
const lens = document.getElementById('lens');
const hint = document.getElementById('hint');

function setPokedexOpen(isOpen) {
  pokedex.classList.toggle('is-open', isOpen);
  coverFront.setAttribute('aria-expanded', isOpen);


  coverFront.tabIndex = isOpen ? -1 : 0;
  lens.tabIndex = isOpen ? 0 : -1;

  hint.textContent = isOpen
    ? 'Clique na lente azul para fechar a Pokédex'
    : 'Clique na Pokédex acima para abri-la';
}

coverFront.addEventListener('click', () => setPokedexOpen(true));

lens.addEventListener('click', () => {
  if (pokedex.classList.contains('is-open')) {
    setPokedexOpen(false);
  }
});


[coverFront, lens].forEach((element) => {
  element.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      element.click();
    }
  });
});


const stage = document.querySelector('.stage');
let zoom = 1;


function getMaxZoom() {
  const baseUnit = Math.min(innerWidth * .42, innerHeight * .30, 280);  
  const fitUnit = Math.min(innerWidth * .95 / 2, innerHeight * .75 / 1.6);
  return Math.max(1, fitUnit / baseUnit);
}

function setZoom(value) {
  zoom = Math.min(Math.max(value, .5), getMaxZoom());
  document.documentElement.style.setProperty('--zoom', zoom);
}

stage.addEventListener('wheel', (event) => {
  if (event.ctrlKey) return;  
  event.preventDefault();     
  setZoom(zoom * Math.exp(-event.deltaY * .0015));
}, { passive: false });

addEventListener('resize', () => setZoom(zoom));

const helpDialog = document.getElementById('help-dialog');

document.getElementById('help-btn').addEventListener('click', () => helpDialog.showModal());
document.getElementById('help-close').addEventListener('click', () => helpDialog.close());
