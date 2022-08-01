const formverificarcl = document.getElementById("button01");
const formverificarpd = document.getElementById("button02");
const formcadastrar = document.getElementById("button03");
const clienteid = document.getElementById("cliente-id");
const clientemome = document.getElementById("nome-cliente");
const clienteendereco = document.getElementById("cliente-endereco");
const clientetelefone = document.getElementById("cliente-telefone");
const pedidonumero = document.getElementById("pedido-numero");
const pedidodata = document.getElementById("pedido-data");
const pedidovalor = document.getElementById("pedido-valor");
const pedidodescricao = document.getElementById("pedido-descricao");

formcadastrar.addEventListener("click", (e) => {
  e.preventDefault();

  checkInputs();
});

formverificarpd.addEventListener("click", (e) => {
  e.preventDefault();

  checkInputsPd();
});

formverificarcl.addEventListener("click", (e) => {
  e.preventDefault();

  checkInputsCl();
});

function checkInputsCl() {
  const clienteidValue = clienteid.value;
  const clientemomeValue = clientemome.value;
  const clienteenderecoValue = clienteendereco.value;
  const clientetelefoneValue = clientetelefone.value;

  if (clienteidValue === "") {
    setErrorFor(clienteid, "O id é obrigatório.");
  } else {
    setSuccessFor(clienteid);
  }

  if (clientemomeValue === "") {
    setErrorFor(clientemome, "O nome é obrigatório.");
  } else {
    setSuccessFor(clientemome);
  }

  if (clienteenderecoValue === "") {
    setErrorFor(clienteendereco, "O endereço é obrigatório.");
  } else {
    setSuccessFor(clienteendereco);
  }

  if (clientetelefoneValue === "") {
    setErrorFor(clientetelefone, "O telefone é obrigatório.");
  } else {
    setSuccessFor(clientetelefone);
  }

  const formControls = form.querySelectorAll(".form-control");

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-control success";
  });

  if (formIsValid) {
    console.log("O busca está 100% válido!");
  }
}

function checkInputsPd() {
  const pedidonumeroValue = pedidonumero.value;
  const pedidovalorValue = pedidovalor.value;
  const pedidodataValue = pedidodata.value;


  if(pedidonumeroValue === ""){
    setErrorFor(pedidonumero, "O número do pedido é obrigatório.");
  } else{
    setSuccessFor(pedidonumero);
  }

  if(pedidodataValue === ""){
    setErrorFor(pedidodata, "A data é obrigatória.")
  }

  if(pedidovalorValue === ""){
    setErrorFor(pedidovalor, "O valor do pedido é obrigatório.")
  } else {
    setSuccessFor(pedidovalor)
  }

  // A descrição do pedido não passa por verificação

  const formControls = form.querySelectorAll(".form-control");

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-control success";
  });

  if (formIsValid) {
    console.log("A busca está valida!");
  }
}

function checkInputs() {
  const clienteidValue = clienteid.value;
  const clientemomeValue = clientemome.value;
  const clienteenderecoValue = clienteendereco.value;
  const clientetelefoneValue = clientetelefone.value;
  const pedidonumeroValue = pedidonumero.value;
  const pedidovalorValue = pedidovalor.value;
  const pedidodataValue = pedidodata.value;

  if (clienteidValue === "") {
    setErrorFor(clienteid, "O id é obrigatório.");
  } else {
    setSuccessFor(clienteid);
  }

  if (clientemomeValue === "") {
    setErrorFor(clientemome, "O nome é obrigatório.");
  } else {
    setSuccessFor(clientemome);
  }

  if (clienteenderecoValue === "") {
    setErrorFor(clienteendereco, "O endereço é obrigatório.");
  } else {
    setSuccessFor(clienteendereco);
  }

  if (clientetelefoneValue === "") {
    setErrorFor(clientetelefone, "O telefone é obrigatório.");
  } else {
    setSuccessFor(clientetelefone);
  }

  if(pedidonumeroValue === ""){
    setErrorFor(pedidonumero, "O número do pedido é obrigatório.");
  } else{
    setSuccessFor(pedidonumero);
  }

  if(pedidodataValue === ""){
    setErrorFor(pedidodata, "A data é obrigatória.")
  }

  if(pedidovalorValue === ""){
    setErrorFor(pedidovalor, "O valor do pedido é obrigatório.")
  } else {
    setSuccessFor(pedidovalor)
  }

  // A descrição do pedido não passa por verificação

  const formControls = form.querySelectorAll(".form-control");

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-control success";
  });

  if (formIsValid) {
    console.log("O cadastramento está válido!");
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  // Adiciona a mensagem de erro
  small.innerText = message;

  // Adiciona a classe de erro
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;

  // Adicionar a classe de sucesso
  formControl.className = "form-control success";
}