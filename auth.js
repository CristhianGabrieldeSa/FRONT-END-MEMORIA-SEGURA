/* =========================================================
   AUTENTICAÇÃO - FRONT-END
   Sistema de Apoio
   ========================================================= */

/* =========================================================
USUÁRIO DE DEMONSTRAÇÃO
========================================================= */

const usuarioDemo = {
    id: 1,
    nome: "Usuário Demonstração",
    email: "admin@memoriasegura.com", // EMAIL PARA TESTE
    senha: "123456" // SENHA PARA TESTE
};

const usuariosSalvos =
    JSON.parse(localStorage.getItem("usuarios")) || [];

const usuarioDemoExiste = usuariosSalvos.some(function (usuario) {
    return usuario.email === usuarioDemo.email;
});

if (!usuarioDemoExiste) {

    usuariosSalvos.push(usuarioDemo);

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuariosSalvos)
    );
}

/* =========================================================
   CADASTRO
   ========================================================= */

const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {

    formCadastro.addEventListener("submit", function (event) {

        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("emailCadastro").value.trim().toLowerCase();
        const senha = document.getElementById("senhaCadastro").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;

        const mensagem = document.getElementById("mensagemCadastro");


        /* LIMPA MENSAGEM */

        mensagem.className = "auth-mensagem";
        mensagem.textContent = "";


        /* VALIDAÇÃO DOS CAMPOS */

        if (!nome || !email || !senha || !confirmarSenha) {

            mensagem.textContent = "Preencha todos os campos.";
            mensagem.classList.add("erro");

            return;
        }


        /* CONFIRMAÇÃO DA SENHA */

        if (senha !== confirmarSenha) {

            mensagem.textContent = "As senhas não coincidem.";
            mensagem.classList.add("erro");

            return;
        }


        /* TAMANHO DA SENHA */

        if (senha.length < 6) {

            mensagem.textContent =
                "A senha deve possuir pelo menos 6 caracteres.";

            mensagem.classList.add("erro");

            return;
        }


        /* =====================================================
           BUSCA USUÁRIOS JÁ CADASTRADOS
           ===================================================== */

        const usuarios =
            JSON.parse(localStorage.getItem("usuarios")) || [];


        /* VERIFICA SE O E-MAIL JÁ EXISTE */

        const usuarioExiste = usuarios.some(function (usuario) {

            return usuario.email === email;

        });


        if (usuarioExiste) {

            mensagem.textContent =
                "Este e-mail já está cadastrado.";

            mensagem.classList.add("erro");

            return;
        }


        /* =====================================================
           CRIA NOVO USUÁRIO
           ===================================================== */

        const novoUsuario = {

            id: Date.now(),

            nome: nome,

            email: email,

            senha: senha

        };


        usuarios.push(novoUsuario);


        /* SALVA OS USUÁRIOS */

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );


        /* MENSAGEM DE SUCESSO */

        mensagem.textContent =
            "Cadastro realizado com sucesso!";

        mensagem.classList.add("sucesso");


        /* =====================================================
           REDIRECIONA PARA O LOGIN
           ===================================================== */

        setTimeout(function () {

            window.location.href = "login.html";

        }, 1000);

    });

}


/* =========================================================
   LOGIN
   ========================================================= */

const formLogin = document.getElementById("formLogin");

if (formLogin) {

    formLogin.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("email").value.trim().toLowerCase();

        const senha =
            document.getElementById("senha").value;


        const mensagem =
            document.getElementById("mensagemLogin");


        /* LIMPA MENSAGEM */

        mensagem.className = "mensagem-login";
        mensagem.textContent = "";


        /* VALIDAÇÃO */

        if (!email || !senha) {

            mensagem.textContent =
                "Preencha todos os campos.";

            mensagem.classList.add("erro");

            return;
        }


        /* =====================================================
           BUSCA USUÁRIOS
           ===================================================== */

        const usuarios =
            JSON.parse(localStorage.getItem("usuarios")) || [];


        /* PROCURA O USUÁRIO */

        const usuario = usuarios.find(function (usuario) {

            return (
                usuario.email === email &&
                usuario.senha === senha
            );

        });


        /* =====================================================
           LOGIN INCORRETO
           ===================================================== */

        if (!usuario) {

            mensagem.textContent =
                "E-mail ou senha incorretos.";

            mensagem.classList.add("erro");

            return;
        }


        /* =====================================================
           CRIA SESSÃO
           ===================================================== */

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify({

                id: usuario.id,

                nome: usuario.nome,

                email: usuario.email

            })
        );


        /* =====================================================
           LOGIN REALIZADO
           ===================================================== */

        mensagem.textContent =
            "Login realizado com sucesso!";

        mensagem.classList.add("sucesso");


        /* =====================================================
           REDIRECIONAMENTO
           ===================================================== */

        setTimeout(function () {

            window.location.href = "index/index.html";

        }, 700);

    });

}


/* =========================================================
   MOSTRAR / OCULTAR SENHA
   ========================================================= */

const mostrarSenha =
    document.getElementById("mostrarSenha");

if (mostrarSenha) {

    mostrarSenha.addEventListener("click", function () {

        const campoSenha =
            document.getElementById("senha");

        const icone =
            mostrarSenha.querySelector("i");


        if (campoSenha.type === "password") {

            campoSenha.type = "text";

            icone.classList.remove("fa-eye");

            icone.classList.add("fa-eye-slash");

            mostrarSenha.setAttribute(
                "aria-label",
                "Ocultar senha"
            );

        } else {

            campoSenha.type = "password";

            icone.classList.remove("fa-eye-slash");

            icone.classList.add("fa-eye");

            mostrarSenha.setAttribute(
                "aria-label",
                "Mostrar senha"
            );

        }

    });

}


/* =========================================================
   LINK PARA CADASTRO
   ========================================================= */

const linkCadastro =
    document.getElementById("linkCadastro");

if (linkCadastro) {

    linkCadastro.addEventListener("click", function (event) {

        event.preventDefault();

        window.location.href = "cadastro.html";

    });

}