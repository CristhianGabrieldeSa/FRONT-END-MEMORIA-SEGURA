/* =========================================================
   PROTEÇÃO DAS PÁGINAS
   Sistema de Apoio
   ========================================================= */

const usuarioLogado =
    localStorage.getItem("usuarioLogado");


if (!usuarioLogado) {

    const caminhoAtual = window.location.pathname;

    if (caminhoAtual.includes("/paginas/")) {

        window.location.href = "../../login.html";

    } else {

        window.location.href = "../login.html";

    }

}