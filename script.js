function gerarEquacao() {
    const a = Math.floor(Math.random() * 10) + 1; // Coeficiente a (não pode ser 0)
    const b = Math.floor(Math.random() * 20) - 10; // Coeficiente b (valor entre -10 e 10)
    const c = Math.floor(Math.random() * 20) - 10; // Coeficiente c (valor entre -10 e 10)

    const pergunta = `${a}x² + ${b}x + ${c} = 0`;
    return { a, b, c, pergunta };
}

function calcularRaizes(a, b, c) {
    const delta = Math.pow(b, 2) - 4 * a * c;
    if (delta < 0) {
        return null; // Raízes imaginárias
    } else {
        const raiz1 = (-b + Math.sqrt(delta)) / (2 * a);
        const raiz2 = (-b - Math.sqrt(delta)) / (2 * a);
        return [raiz1, raiz2];
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const questionsContainer = document.getElementById('questionsContainer');
    const numQuestions = 3; // Número de perguntas

    let questions = [];
    for (let i = 0; i < numQuestions; i++) {
        const { a, b, c, pergunta } = gerarEquacao();
        questions.push({ a, b, c, pergunta });
        
        const div = document.createElement('div');
        div.classList.add('question');
        div.innerHTML = `
            <label for="q${i}">${pergunta}</label>
            <input type="text" id="q${i}" placeholder="Respostas (separadas por vírgula)">
        `;
        questionsContainer.appendChild(div);
    }

    document.getElementById('quizForm').addEventListener('submit', function (event) {
        event.preventDefault();
        
        let score = 0;
        let resultHtml = '';

        questions.forEach((question, index) => {
            const input = document.getElementById(`q${index}`).value.trim();
            const respostas = input.split(',').map(r => parseFloat(r.trim()));

            const raizes = calcularRaizes(question.a, question.b, question.c);

            if (raizes) {
                const sortedRaizes = raizes.sort((a, b) => a - b);
                if (JSON.stringify(respostas.sort((a, b) => a - b)) === JSON.stringify(sortedRaizes)) {
                    score++;
                } else {
                    resultHtml += `<p>Questão ${index + 1}: Resposta errada. As raízes corretas são ${raizes[0].toFixed(2)} e ${raizes[1].toFixed(2)}.</p>`;
                }
            } else {
                resultHtml += `<p>Questão ${index + 1}: A equação não tem raízes reais.</p>`;
            }
        });

        resultHtml = `<h2>Sara, você acertou ${score} de ${numQuestions} perguntas!</h2>` + resultHtml;
        document.getElementById('result').innerHTML = resultHtml;
    });
});
