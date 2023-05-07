const form = document.querySelector(".content");
const time = document.querySelector(".timer");
const finished = document.querySelector(".finished");
const start = document.querySelector(".start--btn");
const acao = document.getElementById("iacao");
const Pausa = document.getElementById("ipausa");
const Sessoes = document.getElementById("isection");
let segundos;

const play = document.querySelector("#play");
const lofi = document.querySelector("#lofi");
const pause = document.querySelector("#pause");

const bell = new Audio("/assets/audio/bell.mp3");
const volta = new Audio("/assets/audio/volta.mp3");
const final = new Audio("/assets/audio/final.mp3");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    iniciar();
});

pause.addEventListener("click", () => {
    lofi.pause();
    play.classList.remove("hiden");
    pause.classList.add("hiden");
});

play.addEventListener("click", () => {
    lofi.play();
    play.classList.add("hiden");
    pause.classList.remove("hiden");
});

const iniciar = () => {
    if (!acao.value) {
        document.getElementById("erro--acao");
        acao.focus();
    } else if (!Pausa.value) {
        document.getElementById("erro--Pausa");
        Pausa.focus();
    } else if (!Sessoes.value) {
        document.getElementById("erro--Sessoes");
        Sessoes.focus();
    } else {
        lofi.play();
        pause.classList.remove("hiden");

        localStorage.setItem("acao", String(acao.value));
        localStorage.setItem("pausa", String(Pausa.value));
        localStorage.setItem("sessoes", String(Sessoes.value));

        form.classList.add("hiden");
        time.classList.remove("hiden");
        momentoAcao();
    }
};

const momentoAcao = () => {
    let sessoes_valor = localStorage.getItem("sessoes");

    if (sessoes_valor != "1") {
        document.querySelector("#section").innerHTML = sessoes_valor;
    } else {
        document.querySelector("#section").innerHTML = sessoes_valor;
    }

    let title = document.querySelector(".title");
    title.innerHTML = "Ação";
    title.style.color = "hsl(123, 63%, 32%)";

    let min = Number(localStorage.getItem("acao"));
    min = min - 1;
    segundos = 59;

    document.querySelector(".minutes").innerHTML = min;
    document.querySelector(".second").innerHTML = segundos;

    const minInterval = setInterval(MinTimer, 60000);
    const segInterval = setInterval(segTimer, 1000);

    function MinTimer() {
        min = min - 1;
        document.querySelector(".minutes").innerHTML = min;
    }

    function segTimer() {
        segundos = segundos - 1;
        document.querySelector(".second").innerHTML = segundos;

        if (segundos <= 0) {
            if (min <= 0) {
                clearInterval(minInterval);
                clearInterval(segInterval);

                bell.play();
                momentoPausa();
            }
            segundos = 60;
        }
    }
};

const momentoPausa = () => {
    let title = document.querySelector(".title");
    title.innerHTML = "Pausa";
    title.style.color = "red";

    let minPausa = Number(localStorage.getItem("pausa"));
    minPausa = minPausa - 1;
    segundos = 59;

    document.querySelector(".minutes").innerHTML = minPausa;
    document.querySelector(".second").innerHTML = segundos;

    const minInterval = setInterval(MinTimer, 60000);
    const segInterval = setInterval(segTimer, 1000);

    function MinTimer() {
        minPausa = minPausa - 1;
        document.querySelector(".minutes").innerHTML = minPausa;
    }

    function segTimer() {
        segundos = segundos - 1;
        document.querySelector(".second").innerHTML = segundos;

        if (segundos <= 0) {
            if (minPausa <= 0) {
                var ses = Number(localStorage.getItem("sessoes"));
                ses = ses - 1;
                localStorage.setItem("sessoes", String(ses));
                clearInterval(minInterval);
                clearInterval(segInterval);

                if (ses <= 0) {
                    final.play();
                    localStorage.clear();
                    form.classList.add("hiden");
                    time.classList.add("hiden");
                    finished.classList.remove("hiden");
                } else {
                    volta.play;
                    momentoAcao();
                }
            }

            segundos = 60;
        }
    }
};
