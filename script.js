fetch("http://localhost:8080/api/dashboard")
.then(res => res.json())
.then(data => {

    document.getElementById("medicamentos").innerText = data.medicamentos;
    document.getElementById("rotina").innerText = data.rotina;
    document.getElementById("ocorrencias").innerText = data.ocorrencias;
    document.getElementById("alertas").innerText = data.alertas;
    document.getElementById("mensagens").innerText = data.mensagens;
    document.getElementById("relatorio").innerText = data.relatorio;

});