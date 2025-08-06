document.addEventListener("DOMContentLoaded", () => {
  // Login
  const formLogin = document.getElementById("form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      const pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
      const achou = pessoas.find(p => p.email === email && p.senha === senha);

      if (achou) {
        alert("Login feito com sucesso");
        window.location.href = "listagem.html";
      } else {
        alert("Login errado, tenta de novo");
      }
    });
  }

  // Cadastro
  const formCadastro = document.getElementById("form-cadastro");
  if (formCadastro) {
    formCadastro.addEventListener("submit", function (e) {
      e.preventDefault();

      const novaPessoa = {
        id: Date.now(),
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        dataNascimento: document.getElementById("dataNascimento").value,
        senha: document.getElementById("senha").value
      };

      let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
      pessoas.push(novaPessoa);
      localStorage.setItem("pessoas", JSON.stringify(pessoas));

      alert("Pessoa cadastrada com sucesso");
      window.location.href = "index.html";
    });
  }

  // Listagem
  const tabela = document.getElementById("tabela-pessoas");
  if (tabela) {
    const pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

    pessoas.forEach(pessoa => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${pessoa.nome}</td>
        <td>${pessoa.cpf}</td>
        <td>${pessoa.email}</td>
        <td>${pessoa.telefone}</td>
        <td>${pessoa.dataNascimento}</td>
        <td>
          <a href="editar.html?id=${pessoa.id}">Editar</a> |
          <button onclick="excluirPessoa(${pessoa.id})">Excluir</button>
        </td>
      `;
      tabela.appendChild(linha);
    });
  }

  // Editar
  const formEditar = document.getElementById("form-editar");
  if (formEditar) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
    const pessoa = pessoas.find(p => p.id == id);

    if (!pessoa) {
      alert("Pessoa não achada");
      window.location.href = "listagem.html";
    }

    document.getElementById("nome").value = pessoa.nome;
    document.getElementById("cpf").value = pessoa.cpf;
    document.getElementById("email").value = pessoa.email;
    document.getElementById("telefone").value = pessoa.telefone;
    document.getElementById("dataNascimento").value = pessoa.dataNascimento;
    document.getElementById("senha").value = pessoa.senha;

    formEditar.addEventListener("submit", function (e) {
      e.preventDefault();

      pessoa.nome = document.getElementById("nome").value;
      pessoa.cpf = document.getElementById("cpf").value;
      pessoa.email = document.getElementById("email").value;
      pessoa.telefone = document.getElementById("telefone").value;
      pessoa.dataNascimento = document.getElementById("dataNascimento").value;
      pessoa.senha = document.getElementById("senha").value;

      localStorage.setItem("pessoas", JSON.stringify(pessoas));
      alert("Atualizado com sucesso");
      window.location.href = "listagem.html";
    });
  }
});

function excluirPessoa(id) {
  if (confirm("Tem certeza que quer excluir?")) {
    let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
    pessoas = pessoas.filter(p => p.id !== id);
    localStorage.setItem("pessoas", JSON.stringify(pessoas));
    location.reload();
  }
}
