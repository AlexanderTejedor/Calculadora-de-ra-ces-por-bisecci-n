const btnSend = document.getElementById('btn-send');
const solutionContent = document.getElementById('solution-content');

btnSend.addEventListener('click', () => {
    solutionContent.innerHTML = 'Agregando la respuesta...';
});