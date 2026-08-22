
//CONFIGURAÇÃO DA PAGINA DE MEDICAMENTOS: INÍCIO
document.addEventListener("DOMContentLoaded", function () {


    const modalMedicamento = document.getElementById("modalMedicamento");
    const abrirModal = document.querySelector(".btn-novo");
    const fecharModal = document.getElementById("fecharModal");
    const cancelarMedicamento = document.getElementById("cancelarMedicamento");
    const fecharDetalhes = document.getElementById("fecharDetalhes");
    let medicamentoEditando = null;

    if (abrirModal && modalMedicamento) {
        abrirModal.addEventListener("click", function () {

            modalMedicamento.style.display = "flex";

        });
    }

    if (fecharModal) {
        fecharModal.addEventListener("click", function () {

            modalMedicamento.style.display = "none";

        });
    }

    if (cancelarMedicamento) {
        cancelarMedicamento.addEventListener("click", function () {

            modalMedicamento.style.display = "none";

        });
    }

    if (modalMedicamento) {
        modalMedicamento.addEventListener("click", function (evento) {

            if (evento.target === modalMedicamento) {

                modalMedicamento.style.display = "none";

            }
        });
    }





    const modalDetalhes = document.getElementById("modalDetalhes");
    const detalheNome = document.getElementById("detalheNome");
    const detalheDosagem = document.getElementById("detalheDosagem");
    const detalheQuantidade = document.getElementById("detalheQuantidade");
    const detalheForma = document.getElementById("detalheForma");
    const detalheFrequencia = document.getElementById("detalheFrequencia");
    const detalheHorario = document.getElementById("detalheHorario");
    const modalEditar = document.getElementById("modalEditar");
    const fecharEditar = document.getElementById("fecharEditar");
    const cancelarEditar = document.getElementById("cancelarEditar");
    const novaDosagem = document.getElementById("novaDosagem");
    const salvarEdicao = document.getElementById("salvarEdicao");

    if (cancelarEditar) {
        cancelarEditar.addEventListener("click", function () {

            modalEditar.style.display = "none";

        });
    }
    if (modalDetalhes) {
        modalDetalhes.addEventListener("click", function (evento) {

            if (evento.target === modalDetalhes) {

                modalDetalhes.style.display = "none";

            }

        });
    }

    if (fecharDetalhes) {
        fecharDetalhes.addEventListener("click", function () {

            modalDetalhes.style.display = "none";

        });
    }
    if (salvarEdicao) {

        salvarEdicao.addEventListener("click", function () {

            const dosagemAtualizada = novaDosagem.value.trim();

            if (dosagemAtualizada === "") {
                return;
            }

            medicamentoEditando.dosagem = dosagemAtualizada;

            let medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];

            const indice = medicamentos.findIndex(function (medicamento) {

                return medicamento.nome === medicamentoEditando.nome;

            });

            if (indice !== -1) {

                medicamentos[indice].dosagem = dosagemAtualizada;

                localStorage.setItem(
                    "medicamentos",
                    JSON.stringify(medicamentos)
                );

            }

            const card = [...listaMedicamentos.children].find(function (card) {

                return card.querySelector(".medicamento-info h3").textContent ===
                    medicamentoEditando.nome;

            });

            if (card) {

                card.querySelector(".medicamento-info p").textContent =
                    medicamentoEditando.dosagem;

            }

            modalEditar.style.display = "none";

        });
    }


});



// ============================================================
// CADASTRO DE MEDICAMENTO
// ============================================================

const formMedicamento = document.getElementById("formMedicamento");
const listaMedicamentos = document.getElementById("listaMedicamentos");
const contadorMedicamentos = document.getElementById("contadorMedicamentos");


// SALVAR MEDICAMENTO
function criarCardMedicamento(medicamento) {

    const medicamentoCard = document.createElement("div");

    medicamentoCard.classList.add("medicamento-card");



    medicamentoCard.innerHTML = `

        <div class="medicamento-icon">
            <i class="fa-solid fa-pills"></i>
        </div>

        <div class="medicamento-info">

            <h3>${medicamento.nome}</h3>

            <p>${medicamento.dosagem}</p>

        </div>

        <div class="medicamento-frequencia">

            <strong>
                <i class="fa-regular fa-clock"></i>
                ${medicamento.quantidade} ${medicamento.forma}
            </strong>

            <p>${medicamento.frequencia}</p>

        </div>

        <div class="proxima-dose">

            <span>Próxima dose</span>

            <strong>${medicamento.horario}</strong>

        </div>

        <span class="status">
    Ativo
</span>

<button class="medicamento-excluir">

    <i class="fa-solid fa-trash"></i>

</button>

<button class="medicamento-editar">

    <i class="fa-solid fa-pen"></i>

</button>

<button class="medicamento-detalhes">

    <i class="fa-solid fa-chevron-right"></i>

</button>

    `;


    // BOTÃO DE DETALHES

    const botaoDetalhes = medicamentoCard.querySelector(".medicamento-detalhes");
    const botaoExcluir = medicamentoCard.querySelector(".medicamento-excluir");
    const botaoEditar = medicamentoCard.querySelector(".medicamento-editar")

    botaoEditar.addEventListener("click", function () {

        medicamentoEditando = medicamento;

        novaDosagem.value = medicamento.dosagem;

        modalEditar.style.display = "flex";

    });

    botaoExcluir.addEventListener("click", function () {

        medicamentoCard.remove();

        let medicamentos =
            JSON.parse(localStorage.getItem("medicamentos")) || [];

        medicamentos = medicamentos.filter(function (item) {

            return item.nome !== medicamento.nome;

        });

        localStorage.setItem(
            "medicamentos",
            JSON.stringify(medicamentos)
        );

    });

    botaoDetalhes.addEventListener("click", function () {

        detalheNome.textContent = medicamento.nome;
        detalheDosagem.textContent = medicamento.dosagem;
        detalheQuantidade.textContent = medicamento.quantidade;
        detalheForma.textContent = medicamento.forma;
        detalheFrequencia.textContent = medicamento.frequencia;
        detalheHorario.textContent = medicamento.horario;

        console.log("VOU ABRIR O MODAL:", modalDetalhes);

        modalDetalhes.style.display = "flex";

    });


    listaMedicamentos.appendChild(medicamentoCard);

}


function carregarMedicamentos() {

    const medicamentos =
        JSON.parse(localStorage.getItem("medicamentos")) || [];

    listaMedicamentos.innerHTML = "";

    medicamentos.forEach(function (medicamento) {

        criarCardMedicamento(medicamento);

    });

    const quantidadeMedicamentos =
        listaMedicamentos.children.length;

    contadorMedicamentos.textContent =
        quantidadeMedicamentos +
        (quantidadeMedicamentos === 1
            ? " medicamento cadastrado"
            : " medicamentos cadastrados");
}


if (formMedicamento) {

    formMedicamento.addEventListener("submit", function (evento) {

        // Impede o navegador de recarregar a página
        evento.preventDefault();


        // PEGAR OS VALORES DO FORMULÁRIO

        const nome = document.getElementById("nomeMedicamento").value;
        const dosagem = document.getElementById("dosagem").value;
        const forma = document.getElementById("formaMedicamento").value;
        const quantidade = document.getElementById("quantidade").value;
        const frequencia = document.getElementById("frequencia").value;
        const horario = document.getElementById("horario").value;

        // CRIAR OBJETO DO MEDICAMENTO

        const medicamento = {
            nome: nome,
            dosagem: dosagem,
            forma: forma,
            quantidade: quantidade,
            frequencia: frequencia,
            horario: horario
        };

        // PEGAR MEDICAMENTOS JÁ SALVOS

        let medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];


        // ADICIONAR O NOVO MEDICAMENTO

        medicamentos.push(medicamento);


        // SALVAR NOVAMENTE

        localStorage.setItem("medicamentos", JSON.stringify(medicamentos));

        // CRIAR O CARD

        criarCardMedicamento(medicamento);

        // ATUALIZAR CONTADOR
        const quantidadeMedicamentos =
            listaMedicamentos.children.length;

        contadorMedicamentos.textContent =
            quantidadeMedicamentos +
            (quantidadeMedicamentos === 1
                ? " medicamento cadastrado"
                : " medicamentos cadastrados");


        // FECHAR MODAL

        modalMedicamento.style.display = "none";


        // LIMPAR FORMULÁRIO

        formMedicamento.reset();

    });
}




// COLOCAR O CARD NA LISTA
if (listaMedicamentos) {
    carregarMedicamentos();
}

//STORAGE MANTENDO OS ARQUIVOS SALVOS

//CONFIGURAÇÃO DA PAGINA DE MEDICAMENTOS: FIM



// =========================================================
// CONFIGURAÇÃO DA PÁGINA DE ROTINA
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    // =========================================================
    // ELEMENTOS DA PÁGINA
    // =========================================================

    const modalAtividade = document.getElementById("modalAtividade");
    const fecharModalAtividade = document.getElementById("fecharModalAtividade");
    const cancelarAtividade = document.getElementById("cancelarAtividade");
    const formAtividade = document.getElementById("formAtividade");
    const btnNovaAtividade = document.querySelector(".btn-novo");

    const listaRotina = document.getElementById("listaRotina");

    // Resumo
    const proximaAtividade = document.getElementById("proximaAtividade");
    const atividadesConcluidas = document.getElementById("atividadesConcluidas");
    const totalAtividades = document.getElementById("totalAtividades");

    // Modal de atividade
    const modalTitulo = document.getElementById("modalTitulo");
    const modalDescricao = document.getElementById("modalDescricao");

    // Modal de confirmação
    const modalConfirmacao = document.getElementById("modalConfirmacao");
    const cancelarExclusao = document.getElementById("cancelarExclusao");
    const confirmarExclusao = document.getElementById("confirmarExclusao");
    const textoConfirmacao = document.getElementById("textoConfirmacao");


    // =========================================================
    // VERIFICAR SE ESTAMOS NA PÁGINA ROTINA
    // =========================================================

    if (!modalAtividade || !formAtividade || !listaRotina) {
        return;
    }


    // =========================================================
    // VARIÁVEIS
    // =========================================================

    let atividades = JSON.parse(
        localStorage.getItem("atividades")
    ) || [];

    let atividadeParaExcluir = null;


    // =========================================================
    // ABRIR MODAL - NOVA ATIVIDADE
    // =========================================================

    btnNovaAtividade.addEventListener("click", function () {

        delete formAtividade.dataset.editando;

        formAtividade.reset();

        modalTitulo.textContent = "Nova atividade";

        modalDescricao.textContent =
            "Adicione uma atividade à rotina.";

        modalAtividade.style.display = "flex";

    });


    // =========================================================
    // FECHAR MODAL - BOTÃO X
    // =========================================================

    fecharModalAtividade.addEventListener("click", function () {

        modalAtividade.style.display = "none";

        formAtividade.reset();

        delete formAtividade.dataset.editando;

    });


    // =========================================================
    // CANCELAR NOVA ATIVIDADE
    // =========================================================

    cancelarAtividade.addEventListener("click", function () {

        modalAtividade.style.display = "none";

        formAtividade.reset();

        delete formAtividade.dataset.editando;

    });


    // =========================================================
    // FECHAR MODAL CLICANDO FORA
    // =========================================================

    modalAtividade.addEventListener("click", function (event) {

        if (event.target === modalAtividade) {

            modalAtividade.style.display = "none";

            formAtividade.reset();

            delete formAtividade.dataset.editando;

        }

    });


    // =========================================================
    // CRIAR CARD DA ATIVIDADE
    // =========================================================

    function criarCardAtividade(atividade) {

        const card = document.createElement("div");

        card.classList.add("atividade-card");


        // -----------------------------------------------------
        // CONTEÚDO DO CARD
        // -----------------------------------------------------

        card.innerHTML = `

            <div class="atividade-horario">
                <strong>${atividade.horario}</strong>
            </div>


            <div class="atividade-info">

                <h3>${atividade.nome}</h3>

                <span>
                    <i class="fa-solid fa-list"></i>
                    ${atividade.tipo}
                </span>

            </div>


            <div class="atividade-status ${atividade.concluida ? "concluida" : "pendente"}">

                <i class="${atividade.concluida
                ? "fa-solid fa-circle-check"
                : "fa-regular fa-circle"}"></i>

                ${atividade.concluida ? "Concluída" : "Pendente"}

            </div>


            <div class="atividade-acoes">

                <button
                    class="btn-concluir"
                    title="${atividade.concluida
                ? "Desmarcar atividade"
                : "Marcar como concluída"}">

                    <i class="${atividade.concluida
                ? "fa-solid fa-rotate-left"
                : "fa-solid fa-check"}"></i>

                </button>


                <button
                    class="btn-editar"
                    title="Editar atividade">

                    <i class="fa-solid fa-pen"></i>

                </button>


                <button
                    class="btn-atividade"
                    title="Excluir atividade">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        `;


        // =====================================================
        // BOTÃO CONCLUIR
        // =====================================================

        const btnConcluir =
            card.querySelector(".btn-concluir");


        btnConcluir.addEventListener("click", function () {

            atividade.concluida =
                !atividade.concluida;


            localStorage.setItem(
                "atividades",
                JSON.stringify(atividades)
            );


            renderizarAtividades();

        });


        // =====================================================
        // BOTÃO EDITAR
        // =====================================================

        const btnEditar =
            card.querySelector(".btn-editar");


        btnEditar.addEventListener("click", function () {

            document.getElementById("nomeAtividade").value =
                atividade.nome;


            document.getElementById("horarioAtividade").value =
                atividade.horario;


            document.getElementById("tipoAtividade").value =
                atividade.tipo;


            formAtividade.dataset.editando =
                atividade.id;


            modalTitulo.textContent =
                "Editar atividade";


            modalDescricao.textContent =
                "Altere as informações da atividade.";


            modalAtividade.style.display =
                "flex";

        });


        // =====================================================
        // BOTÃO EXCLUIR
        // =====================================================

        const btnExcluir =
            card.querySelector(".btn-atividade");


        btnExcluir.addEventListener("click", function () {

            atividadeParaExcluir = atividade;


            textoConfirmacao.textContent =
                `Tem certeza que deseja excluir "${atividade.nome}"?`;


            modalConfirmacao.style.display =
                "flex";

        });


        // =====================================================
        // ADICIONAR CARD NA LISTA
        // =====================================================

        listaRotina.appendChild(card);

    }


    // =========================================================
    // CANCELAR EXCLUSÃO
    // =========================================================

    cancelarExclusao.addEventListener("click", function () {

        atividadeParaExcluir = null;

        modalConfirmacao.style.display = "none";

    });


    // =========================================================
    // CONFIRMAR EXCLUSÃO
    // =========================================================

    confirmarExclusao.addEventListener("click", function () {

        if (!atividadeParaExcluir) {
            return;
        }


        atividades = atividades.filter(function (item) {

            return item.id !== atividadeParaExcluir.id;

        });


        localStorage.setItem(
            "atividades",
            JSON.stringify(atividades)
        );


        atividadeParaExcluir = null;

        modalConfirmacao.style.display =
            "none";


        renderizarAtividades();

    });


    // =========================================================
    // FECHAR MODAL DE EXCLUSÃO CLICANDO FORA
    // =========================================================

    modalConfirmacao.addEventListener("click", function (event) {

        if (event.target === modalConfirmacao) {

            atividadeParaExcluir = null;

            modalConfirmacao.style.display =
                "none";

        }

    });


    // =========================================================
    // ATUALIZAR RESUMO
    // =========================================================

    function atualizarResumo() {

        // -----------------------------------------------------
        // TOTAL DE ATIVIDADES
        // -----------------------------------------------------

        totalAtividades.textContent =
            atividades.length;


        // -----------------------------------------------------
        // ATIVIDADES CONCLUÍDAS
        // -----------------------------------------------------

        const concluidas =
            atividades.filter(function (atividade) {

                return atividade.concluida === true;

            });


        atividadesConcluidas.textContent =
            concluidas.length;


        // -----------------------------------------------------
        // PRÓXIMA ATIVIDADE
        // -----------------------------------------------------

        const pendentes =
            atividades
                .filter(function (atividade) {

                    return atividade.concluida === false;

                })
                .sort(function (a, b) {

                    return a.horario.localeCompare(
                        b.horario
                    );

                });


        if (pendentes.length > 0) {

            proximaAtividade.textContent =
                pendentes[0].horario;

        } else {

            proximaAtividade.textContent =
                "--:--";

        }

    }


    // =========================================================
    // RENDERIZAR ATIVIDADES
    // =========================================================

    function renderizarAtividades() {

        // Limpa a lista antes de recriar os cards
        listaRotina.innerHTML = "";


        // Ordena por horário
        atividades.sort(function (a, b) {

            return a.horario.localeCompare(
                b.horario
            );

        });


        // Cria cada card
        atividades.forEach(function (atividade) {

            criarCardAtividade(atividade);

        });


        // Atualiza o resumo
        atualizarResumo();

    }


    // =========================================================
    // FORMULÁRIO - ADICIONAR / EDITAR
    // =========================================================

    formAtividade.addEventListener("submit", function (event) {

        event.preventDefault();


        // -----------------------------------------------------
        // PEGAR VALORES DO FORMULÁRIO
        // -----------------------------------------------------

        const nome =
            document
                .getElementById("nomeAtividade")
                .value
                .trim();


        const horario =
            document
                .getElementById("horarioAtividade")
                .value;


        const tipo =
            document
                .getElementById("tipoAtividade")
                .value;


        // -----------------------------------------------------
        // VERIFICAR SE ESTÁ EDITANDO
        // -----------------------------------------------------

        const idEditando =
            formAtividade.dataset.editando;


        if (idEditando) {

            // -------------------------------------------------
            // EDITAR ATIVIDADE EXISTENTE
            // -------------------------------------------------

            const atividade =
                atividades.find(function (item) {

                    return item.id == idEditando;

                });


            if (atividade) {

                atividade.nome = nome;

                atividade.horario = horario;

                atividade.tipo = tipo;

            }


            delete formAtividade.dataset.editando;


        } else {

            // -------------------------------------------------
            // CRIAR NOVA ATIVIDADE
            // -------------------------------------------------

            const novaAtividade = {

                id: Date.now(),

                nome: nome,

                horario: horario,

                tipo: tipo,

                concluida: false

            };


            atividades.push(novaAtividade);

        }


        // -----------------------------------------------------
        // SALVAR NO LOCALSTORAGE
        // -----------------------------------------------------

        localStorage.setItem(
            "atividades",
            JSON.stringify(atividades)
        );


        // -----------------------------------------------------
        // ATUALIZAR TELA
        // -----------------------------------------------------

        renderizarAtividades();


        // -----------------------------------------------------
        // FECHAR MODAL
        // -----------------------------------------------------

        modalAtividade.style.display =
            "none";


        // -----------------------------------------------------
        // LIMPAR FORMULÁRIO
        // -----------------------------------------------------

        formAtividade.reset();

    });


    // =========================================================
    // CARREGAR ATIVIDADES AO ABRIR A PÁGINA
    // =========================================================

    renderizarAtividades();

});

// =========================================================
// CONFIGURAÇÃO DA PÁGINA DE USUÁRIOS
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // ELEMENTOS DA PÁGINA
    // =====================================================

    const listaUsuarios =
        document.getElementById("listaUsuarios");

    const campoBusca =
        document.getElementById("buscarUsuario");


    // =====================================================
    // VERIFICAR SE ESTAMOS NA PÁGINA DE USUÁRIOS
    // =====================================================

    if (!listaUsuarios) {
        return;
    }


    // =====================================================
    // MODAL DE DETALHES
    // =====================================================

    const modalDetalhesUsuario =
        document.getElementById("modalDetalhesUsuario");

    const fecharDetalhesUsuario =
        document.getElementById("fecharDetalhesUsuario");

    const fecharModalUsuario =
        document.getElementById("fecharModalUsuario");

    const detalheUsuarioNome =
        document.getElementById("detalheUsuarioNome");

    const detalheUsuarioEmail =
        document.getElementById("detalheUsuarioEmail");

    const detalheUsuarioStatus =
        document.getElementById("detalheUsuarioStatus");

    const detalheUsuarioData =
        document.getElementById("detalheUsuarioData");


    // =====================================================
    // MODAL DE NOVO USUÁRIO
    // =====================================================

    const modalNovoUsuario =
        document.getElementById("modalNovoUsuario");

    const abrirNovoUsuario =
        document.querySelector(".btn-novo-usuario");

    const fecharNovoUsuario =
        document.getElementById("fecharNovoUsuario");

    const cancelarNovoUsuario =
        document.getElementById("cancelarNovoUsuario");

    const formulario =
        document.getElementById("formNovoUsuario");

    // =====================================================
    // MODAL DE EDIÇÃO
    // =====================================================

    const modalEditarUsuario =
        document.getElementById("modalEditarUsuario");

    const fecharEditarUsuario =
        document.getElementById("fecharEditarUsuario");

    const cancelarEditarUsuario =
        document.getElementById("cancelarEditarUsuario");

    const formEditarUsuario =
        document.getElementById("formEditarUsuario");

    const editarUsuarioNome =
        document.getElementById("editarUsuarioNome");

    const editarUsuarioEmail =
        document.getElementById("editarUsuarioEmail");

    const editarUsuarioStatus =
        document.getElementById("editarUsuarioStatus");

    let usuarioEditando = null;


    // =====================================================
    // CAMPOS DO FORMULÁRIO
    // =====================================================

    const nomeInput =
        document.getElementById("novoUsuarioNome");

    const emailInput =
        document.getElementById("novoUsuarioEmail");

    const statusInput =
        document.getElementById("novoUsuarioStatus");


    // =====================================================
    // CARREGAR USUÁRIOS DO LOCALSTORAGE
    // =====================================================

    let usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || [];


    // =====================================================
    // DATA ATUAL
    // =====================================================

    function obterDataAtual() {

        const hoje = new Date();

        const dia =
            String(hoje.getDate()).padStart(2, "0");

        const mes =
            String(hoje.getMonth() + 1).padStart(2, "0");

        const ano =
            hoje.getFullYear();

        return `${dia}/${mes}/${ano}`;
    }


    // =====================================================
    // SALVAR USUÁRIOS
    // =====================================================

    function salvarUsuarios() {

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );

    }


    // =====================================================
    // CRIAR CARD DO USUÁRIO
    // =====================================================

    function criarCardUsuario(usuario) {

        const card =
            document.createElement("div");

        card.classList.add("usuario-card");


        card.innerHTML = `

            <div class="usuario-avatar">

                <i class="fa-solid fa-user"></i>

            </div>


            <div class="usuario-info">

                <h3>${usuario.nome}</h3>

                <p>${usuario.email}</p>

            </div>


            <div class="usuario-status">

                <span class="${usuario.status === "Ativo"
                ? "status-ativo"
                : "status-inativo"}">

                    ${usuario.status}

                </span>

            </div>


            <div class="usuario-data">

                <span>Cadastro</span>

                <strong>${usuario.dataCadastro}</strong>

            </div>


            <div class="usuario-acoes">

    <button
        class="btn-editar-usuario"
        type="button"
        title="Editar usuário">

        <i class="fa-solid fa-pen"></i>

    </button>


    <button
        class="btn-excluir-usuario"
        type="button"
        title="Excluir usuário">

        <i class="fa-solid fa-trash"></i>

    </button>


    <button
        class="btn-detalhes-usuario"
        type="button">

        Detalhes

    </button>

    </div>
        `;


        // =================================================
        // BOTÃO DETALHES
        // =================================================

        const botaoEditar =
            card.querySelector(".btn-editar-usuario");

        const botaoDetalhes =
            card.querySelector(".btn-detalhes-usuario");

        const botaoExcluir =
            card.querySelector(".btn-excluir-usuario");

        // =================================================
        // BOTÃO EXCLUIR
        // =================================================

        botaoExcluir.addEventListener("click", function () {

            usuarioParaExcluir = usuario;

            textoExcluirUsuario.textContent =
                `Tem certeza que deseja excluir "${usuario.nome}"?`;

            modalExcluirUsuario.style.display =
                "flex";

        });

        // =================================================
        // BOTÃO EDITAR
        // =================================================

        botaoEditar.addEventListener("click", function () {

            usuarioEditando = usuario;

            editarUsuarioNome.value =
                usuario.nome;

            editarUsuarioEmail.value =
                usuario.email;

            editarUsuarioStatus.value =
                usuario.status;

            modalEditarUsuario.style.display =
                "flex";

        });


        botaoDetalhes.addEventListener("click", function () {

            detalheUsuarioNome.textContent =
                usuario.nome;

            detalheUsuarioEmail.textContent =
                usuario.email;

            detalheUsuarioStatus.textContent =
                usuario.status;

            detalheUsuarioStatus.className =
                usuario.status === "Ativo"
                    ? "status-ativo"
                    : "status-inativo";

            detalheUsuarioData.textContent =
                usuario.dataCadastro;


            modalDetalhesUsuario.style.display =
                "flex";

        });


        listaUsuarios.appendChild(card);

    }


    // =====================================================
    // ATUALIZAR CONTADORES
    // =====================================================

    function atualizarContadores() {

        const total =
            usuarios.length;


        const ativos =
            usuarios.filter(function (usuario) {

                return usuario.status === "Ativo";

            }).length;


        const inativos =
            usuarios.filter(function (usuario) {

                return usuario.status === "Inativo";

            }).length;


        const estatisticas =
            document.querySelectorAll(".stat-info strong");


        if (estatisticas[0]) {

            estatisticas[0].textContent =
                total;

        }


        if (estatisticas[1]) {

            estatisticas[1].textContent =
                ativos;

        }


        if (estatisticas[2]) {

            estatisticas[2].textContent =
                inativos;

        }

    }


    // =====================================================
    // RENDERIZAR USUÁRIOS
    // =====================================================

    function renderizarUsuarios(lista = usuarios) {

        listaUsuarios.innerHTML = "";


        lista.forEach(function (usuario) {

            criarCardUsuario(usuario);

        });


        atualizarContadores();

    }


    // =====================================================
    // ABRIR MODAL - NOVO USUÁRIO
    // =====================================================

    if (abrirNovoUsuario) {

        abrirNovoUsuario.addEventListener(
            "click",
            function () {

                formulario.reset();

                modalNovoUsuario.style.display =
                    "flex";

            }
        );

    }


    // =====================================================
    // FECHAR MODAL - NOVO USUÁRIO
    // =====================================================

    function fecharModalNovoUsuario() {

        modalNovoUsuario.style.display =
            "none";

        formulario.reset();

    }


    if (fecharNovoUsuario) {

        fecharNovoUsuario.addEventListener(
            "click",
            fecharModalNovoUsuario
        );

    }


    if (cancelarNovoUsuario) {

        cancelarNovoUsuario.addEventListener(
            "click",
            fecharModalNovoUsuario
        );

    }


    if (modalNovoUsuario) {

        modalNovoUsuario.addEventListener(
            "click",
            function (evento) {

                if (evento.target === modalNovoUsuario) {

                    fecharModalNovoUsuario();

                }

            }
        );

    }


    // =====================================================
    // CADASTRAR NOVO USUÁRIO
    // =====================================================

    if (formulario) {

        formulario.addEventListener(
            "submit",
            function (evento) {

                evento.preventDefault();


                const nome =
                    nomeInput.value.trim();

                const email =
                    emailInput.value.trim();

                const status =
                    statusInput.value;


                if (!nome || !email) {
                    return;
                }


                // -----------------------------------------
                // CRIAR OBJETO
                // -----------------------------------------

                const novoUsuario = {

                    id: Date.now(),

                    nome: nome,

                    email: email,

                    status: status,

                    dataCadastro: obterDataAtual()

                };


                // -----------------------------------------
                // ADICIONAR À LISTA
                // -----------------------------------------

                usuarios.push(novoUsuario);


                // -----------------------------------------
                // SALVAR
                // -----------------------------------------

                salvarUsuarios();


                // -----------------------------------------
                // ATUALIZAR TELA
                // -----------------------------------------

                renderizarUsuarios();


                // -----------------------------------------
                // FECHAR MODAL
                // -----------------------------------------

                fecharModalNovoUsuario();

            }
        );

    }

    // =====================================================
    // MODAL DE EXCLUSÃO
    // =====================================================

    const modalExcluirUsuario =
        document.getElementById("modalExcluirUsuario");

    const fecharExcluirUsuario =
        document.getElementById("fecharExcluirUsuario");

    const cancelarExcluirUsuario =
        document.getElementById("cancelarExcluirUsuario");

    const confirmarExcluirUsuario =
        document.getElementById("confirmarExcluirUsuario");

    const textoExcluirUsuario =
        document.getElementById("textoExcluirUsuario");

    let usuarioParaExcluir = null;


    // =====================================================
    // MODAL DE DETALHES - FECHAR
    // =====================================================

    function fecharModalDetalhes() {

        modalDetalhesUsuario.style.display =
            "none";

    }


    if (fecharDetalhesUsuario) {

        fecharDetalhesUsuario.addEventListener(
            "click",
            fecharModalDetalhes
        );

    }


    if (fecharModalUsuario) {

        fecharModalUsuario.addEventListener(
            "click",
            fecharModalDetalhes
        );

    }


    if (modalDetalhesUsuario) {

        modalDetalhesUsuario.addEventListener(
            "click",
            function (evento) {

                if (
                    evento.target ===
                    modalDetalhesUsuario
                ) {

                    fecharModalDetalhes();

                }

            }
        );

    }

    // =====================================================
    // FECHAR MODAL DE EDIÇÃO
    // =====================================================

    function fecharModalEditarUsuario() {

        modalEditarUsuario.style.display =
            "none";

        formEditarUsuario.reset();

        usuarioEditando = null;

    }


    if (fecharEditarUsuario) {

        fecharEditarUsuario.addEventListener(
            "click",
            fecharModalEditarUsuario
        );

    }


    if (cancelarEditarUsuario) {

        cancelarEditarUsuario.addEventListener(
            "click",
            fecharModalEditarUsuario
        );

    }


    if (modalEditarUsuario) {

        modalEditarUsuario.addEventListener(
            "click",
            function (evento) {

                if (evento.target === modalEditarUsuario) {

                    fecharModalEditarUsuario();

                }

            }
        );

    }

    // =====================================================
    // SALVAR EDIÇÃO DO USUÁRIO
    // =====================================================

    if (formEditarUsuario) {

        formEditarUsuario.addEventListener(
            "submit",
            function (evento) {

                evento.preventDefault();


                if (!usuarioEditando) {
                    return;
                }


                // ---------------------------------------------
                // ATUALIZAR DADOS
                // ---------------------------------------------

                usuarioEditando.nome =
                    editarUsuarioNome.value.trim();

                usuarioEditando.email =
                    editarUsuarioEmail.value.trim();

                usuarioEditando.status =
                    editarUsuarioStatus.value;


                // ---------------------------------------------
                // SALVAR NO LOCALSTORAGE
                // ---------------------------------------------

                salvarUsuarios();


                // ---------------------------------------------
                // ATUALIZAR LISTA
                // ---------------------------------------------

                renderizarUsuarios();


                // ---------------------------------------------
                // FECHAR MODAL
                // ---------------------------------------------

                modalEditarUsuario.style.display =
                    "none";


                usuarioEditando = null;

            }
        );

    }

    // =====================================================
    // CONFIRMAR EXCLUSÃO DO USUÁRIO
    // =====================================================

    if (confirmarExcluirUsuario) {

        confirmarExcluirUsuario.addEventListener(
            "click",
            function () {

                if (!usuarioParaExcluir) {
                    return;
                }


                // ---------------------------------------------
                // REMOVER DA LISTA
                // ---------------------------------------------

                usuarios = usuarios.filter(function (usuario) {

                    return usuario.id !== usuarioParaExcluir.id;

                });


                // ---------------------------------------------
                // SALVAR NOVA LISTA
                // ---------------------------------------------

                salvarUsuarios();


                // ---------------------------------------------
                // ATUALIZAR INTERFACE
                // ---------------------------------------------

                renderizarUsuarios();


                // ---------------------------------------------
                // FECHAR MODAL
                // ---------------------------------------------

                modalExcluirUsuario.style.display =
                    "none";

                usuarioParaExcluir = null;

            }
        );

    }

    // =====================================================
    // FECHAR MODAL DE EXCLUSÃO
    // =====================================================

    function fecharModalExcluirUsuario() {

        modalExcluirUsuario.style.display =
            "none";

        usuarioParaExcluir = null;

    }


    if (fecharExcluirUsuario) {

        fecharExcluirUsuario.addEventListener(
            "click",
            fecharModalExcluirUsuario
        );

    }


    if (cancelarExcluirUsuario) {

        cancelarExcluirUsuario.addEventListener(
            "click",
            fecharModalExcluirUsuario
        );

    }


    if (modalExcluirUsuario) {

        modalExcluirUsuario.addEventListener(
            "click",
            function (evento) {

                if (evento.target === modalExcluirUsuario) {

                    fecharModalExcluirUsuario();

                }

            }
        );

    }

    // =====================================================
    // BUSCA DE USUÁRIOS
    // =====================================================

    if (campoBusca) {

        campoBusca.addEventListener(
            "input",
            function () {

                const termo =
                    campoBusca.value
                        .toLowerCase()
                        .trim();


                const usuariosFiltrados =
                    usuarios.filter(function (usuario) {

                        const nome =
                            usuario.nome
                                .toLowerCase();

                        const email =
                            usuario.email
                                .toLowerCase();


                        return (
                            nome.includes(termo) ||
                            email.includes(termo)
                        );

                    });


                renderizarUsuarios(
                    usuariosFiltrados
                );


                // -------------------------------------
                // MENSAGEM SEM RESULTADOS
                // -------------------------------------

                const mensagemExistente =
                    document.getElementById(
                        "nenhumUsuario"
                    );


                if (
                    usuariosFiltrados.length === 0 &&
                    termo !== ""
                ) {

                    if (!mensagemExistente) {

                        const mensagem =
                            document.createElement("div");

                        mensagem.id =
                            "nenhumUsuario";

                        mensagem.className =
                            "nenhum-usuario";


                        mensagem.innerHTML = `

                            <i class="fa-solid fa-user-slash"></i>

                            <h3>
                                Nenhum usuário encontrado
                            </h3>

                            <p>
                                Verifique o nome ou e-mail informado.
                            </p>

                        `;


                        listaUsuarios.appendChild(
                            mensagem
                        );

                    }

                }

            }
        );

    }


    // =====================================================
    // CARREGAR USUÁRIOS AO ABRIR A PÁGINA
    // =====================================================

    renderizarUsuarios();

});

function atualizarData() {
    const elementoData = document.getElementById("dataAtual");

    if (!elementoData) return;

    const hoje = new Date();

    const opcoes = {
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    let dataFormatada = hoje.toLocaleDateString("pt-BR", opcoes);

    dataFormatada =
        dataFormatada.charAt(0).toUpperCase() +
        dataFormatada.slice(1);

    elementoData.textContent = dataFormatada;
}

document.addEventListener("DOMContentLoaded", atualizarData);

/* =========================================================
   SISTEMA DE LOGIN
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const formLogin = document.getElementById("formLogin");
    const mostrarSenha = document.getElementById("mostrarSenha");
    const senha = document.getElementById("senha");
    const mensagemLogin = document.getElementById("mensagemLogin");
    const linkCadastro = document.getElementById("linkCadastro");


    /* =========================
       MOSTRAR / OCULTAR SENHA
       ========================= */

    if (mostrarSenha && senha) {

        mostrarSenha.addEventListener("click", function () {

            if (senha.type === "password") {

                senha.type = "text";

                mostrarSenha.innerHTML =
                    '<i class="fa-solid fa-eye-slash"></i>';

            } else {

                senha.type = "password";

                mostrarSenha.innerHTML =
                    '<i class="fa-solid fa-eye"></i>';

            }

        });

    }


    /* =========================
       LOGIN
       ========================= */

    if (formLogin) {

        formLogin.addEventListener("submit", function (event) {

            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const senhaValue = senha.value.trim();


            if (!email || !senhaValue) {

                mostrarMensagem("Preencha todos os campos.");

                return;
            }


            /*
             * =================================================
             * ÁREA RESERVADA PARA O BACK-END
             * =================================================
             *
             * Futuramente o Back-End poderá receber:
             *
             * email
             * senha
             *
             * e retornar:
             *
             * usuário autenticado
             * token
             * sessão
             * permissões
             *
             * =================================================
             */


            console.log("Dados preparados para autenticação:", {
                email: email
            });


            /*
             * TEMPORÁRIO:
             *
             * Enquanto o Back-End não estiver conectado,
             * vamos apenas mostrar uma mensagem.
             */

            mostrarMensagem(
                "O sistema de autenticação será conectado ao Back-End.",
                false
            );

        });

    }


    /* =========================
       CADASTRO
       ========================= */

    if (linkCadastro) {

        linkCadastro.addEventListener("click", function (event) {

            event.preventDefault();

            alert(
                "A tela de cadastro será conectada ao Back-End posteriormente."
            );

        });

    }


    /* =========================
       MENSAGEM
       ========================= */

    function mostrarMensagem(texto, erro = true) {

        if (!mensagemLogin) return;

        mensagemLogin.textContent = texto;

        mensagemLogin.classList.toggle("erro", erro);

        if (!erro) {

            mensagemLogin.style.display = "block";

            mensagemLogin.style.background = "#eff6ff";
            mensagemLogin.style.color = "#1d4ed8";
            mensagemLogin.style.border =
                "1px solid #bfdbfe";

        }

    }

});