'use strict';

const btn = document.getElementById('themeButton');
const body = document.body;
const STORAGE_KEY = 'theme'; // 'dark' or 'light'

// safety: se botão ausente, log e return
if (!btn) {
  console.error('themeButton não encontrado no DOM. Verifique se o id está correto.');
} else {

  // aplica tema salvo (se houver)
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light') {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  } else {
    // default para dark se nada salvo (mantém classe inicial)
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
  }

  // atualiza texto e atributo aria do botão conforme tema atual
  function updateButton() {
    const isDark = body.classList.contains('dark-theme');
    // mostra o modo que será ativado ao clicar
    btn.textContent = isDark ? 'Ativar modo claro' : 'Ativar modo escuro';
    btn.setAttribute('aria-pressed', String(isDark));
  }

  // listener para alternar tema e salvar no localStorage
  btn.addEventListener('click', () => {
    const nowDark = body.classList.toggle('dark-theme'); // true se agora tem dark-theme
    if (nowDark) {
      body.classList.remove('light-theme');
      localStorage.setItem(STORAGE_KEY, 'dark');
    } else {
      body.classList.add('light-theme');
      localStorage.setItem(STORAGE_KEY, 'light');
    }
    updateButton();
  });

  // inicializa botão com o texto correto
  updateButton();
}