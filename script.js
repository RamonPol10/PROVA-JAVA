// Classe base Pessoa
class Pessoa {
    constructor(id, nome, endereco, cidade, estado, telefone) {
      this.id = id;
      this.nome = nome;
      this.endereco = endereco;
      this.cidade = cidade;
      this.estado = estado;
      this.telefone = telefone;
    }
  }
  
  // Classe Pessoa Física
  class Fisica extends Pessoa {
    constructor(id, nome, endereco, cidade, estado, telefone, cpf, rg, celular) {
      super(id, nome, endereco, cidade, estado, telefone);
      this.cpf = cpf;
      this.rg = rg;
      this.celular = celular;
    }
  
    validarCPF() {
      const cpf = this.cpf.replace(/\D/g, '');
  
      if (cpf.length !== 11) {
        return false;
      }
  
      let soma = 0;
      let resto;
  
      for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      }
  
      resto = (soma * 10) % 11;
  
      if ((resto === 10) || (resto === 11)) {
        resto = 0;
      }
  
      if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
      }
  
      soma = 0;
  
      for (let i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      }
  
      resto = (soma * 10) % 11;
  
      if ((resto === 10) || (resto === 11)) {
        resto = 0;
      }
  
      if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
      }
  
      return true;
    }
  }
  
  // Classe Pessoa Jurídica
  class Juridica extends Pessoa {
    constructor(id, nome, endereco, cidade, estado, telefone, cnpj, razaoSocial) {
      super(id, nome, endereco, cidade, estado, telefone);
      this.cnpj = cnpj;
      this.razaoSocial = razaoSocial;
    }
  
    validarCNPJ() {
      const cnpj = this.cnpj.replace(/\D/g, '');
  
      if (cnpj.length !== 14) {
        return false;
      }
  
      let tamanho = cnpj.length - 2;
      let numeros = cnpj.substring(0, tamanho);
      let digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
  
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
          pos = 9;
        }
      }
  
      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  
      if (resultado !== parseInt(digitos.charAt(0))) {
        return false;
      }
  
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
  
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
          pos = 9;
        }
      }
  
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  
      if (resultado !== parseInt(digitos.charAt(1))) {
        return false;
      }
  
      return true;
    }
  
    calcularImposto(faturamento, aliquota) {
      if (faturamento <= 0 || aliquota <= 0) {
        return "Valores inválidos.";
      }
      const imposto = faturamento * (aliquota / 100);
      return imposto;
    }
  }
  
  // Instanciando objetos
  const cliente1 = new Fisica(
    1, "Ramon", "Rua Hideo Gunji", "Londrina", "PR", "(43) 99991-1393",
    "125.357.519-33", "99991-1393"
  );
  
  const empresa1 = new Juridica(
    2, "Empresa OM E FILHOS", "Rua Itaipu 39", "Londrina", "PR", "3315-5212",
    "76.260.504/0001-02", "OM DISTRIBUIDORA DE ALTO PEÇAS ELÉTRICAS LTDA"
  );
  
  // Exibindo os dados no console
  console.log("Dados do Cliente 1:");
  console.log("Nome:", cliente1.nome);
  console.log("CPF válido:", cliente1.validarCPF());
  
  console.log("\nDados da Empresa 1:");
  console.log("Razão Social:", empresa1.razaoSocial);
  console.log("CNPJ válido:", empresa1.validarCNPJ());
  console.log("Imposto a pagar:", empresa1.calcularImposto(100000, 15));