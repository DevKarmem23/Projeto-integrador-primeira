document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("form-login");

  if (formLogin) {
    formLogin.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      const pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

      const usuario = pessoas.find(p => p.email === email && p.senha === senha);

      if (usuario) {
        alert("Login bem-sucedido!");
        window.location.href = "listagem.html";
      } else {
        alert("Email ou senha incorretos.");
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const formCadastro = document.getElementById("form-cadastro");

  if (formCadastro) {
    formCadastro.addEventListener("submit", function (event) {
      event.preventDefault();

      const nome = document.getElementById("nome").value;
      const cpf = document.getElementById("cpf").value;
      const email = document.getElementById("email").value;
      const telefone = document.getElementById("telefone").value;
      const dataNascimento = document.getElementById("dataNascimento").value;
      const senha = document.getElementById("senha").value;

      const novaPessoa = {
        id: Date.now(), 
        nome: nome,
        cpf: cpf,
        email: email,
        telefone: telefone,
        dataNascimento: dataNascimento,
        senha: senha
      };

      
      let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

      
      pessoas.push(novaPessoa);

      
      localStorage.setItem("pessoas", JSON.stringify(pessoas));

      alert("Pessoa cadastrada com sucesso!");
      window.location.href = "index.html";
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
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
          <a href="editar.html?id=${pessoa.id}">Editar</a>
        </td>
      `;

      tabela.appendChild(linha);
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const formEditar = document.getElementById("form-editar");

  if (formEditar) {
    // Pegar o ID da pessoa da URL (?id=123)
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

    // Encontrar a pessoa pelo id
    const pessoa = pessoas.find(p => p.id == id);

    if (!pessoa) {
      alert("Pessoa não encontrada!");
      window.location.href = "listagem.html";
      return;
    }

    // Preencher o formulário com os dados atuais
    document.getElementById("nome").value = pessoa.nome;
    document.getElementById("cpf").value = pessoa.cpf;
    document.getElementById("email").value = pessoa.email;
    document.getElementById("telefone").value = pessoa.telefone;
    document.getElementById("datadeNascimento").value = pessoa.dataNascimento;
    document.getElementById("senha").value = pessoa.senha;

    formEditar.addEventListener("submit", function(event) {
      event.preventDefault();
      pessoa.nome = document.getElementById("nome").value;
      pessoa.cpf = document.getElementById("cpf").value;
      pessoa.email = document.getElementById("email").value;
      pessoa.telefone = document.getElementById("telefone").value;
      pessoa.dataNascimento = document.getElementById("dataNascimento").value;
      pessoa.senha = document.getElementById("senha").value; 
      localStorage.setItem("pessoas", JSON.stringify(pessoas));

      alert("Dados atualizados com sucesso!");
      window.location.href = "listagem.html";
    });
  }
});


