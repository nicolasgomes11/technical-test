# Technical Test

Projeto de testes automatizados desenvolvido com [Cypress](https://www.cypress.io/) cobrindo cenários **Web** (Blog do Agi) e **API** (Dog CEO API).

---

## Sumário

- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Suítes de teste](#suítes-de-teste)
- [Execução dos testes](#execução-dos-testes)
- [CI/CD](#cicd)
- [Relatório de testes](#relatório-de-testes)

---

## Tecnologias

| Ferramenta | Versão | Finalidade |
|---|---|---|
| [Cypress](https://www.cypress.io/) | ^14.5.4 | Framework de testes E2E |
| [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter) | ^4.0.2 | Geração de relatórios HTML |
| Node.js | >=18 | Ambiente de execução |

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** versão 18 ou superior — [download](https://nodejs.org/)
- **npm** versão 9 ou superior (já incluído com o Node.js)
- **Google Chrome** instalado (os scripts utilizam `--browser chrome` por padrão)

Para verificar as versões instaladas:

```bash
node --version
npm --version
```

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/nicolasgomes11/technical-test.git
cd technical-test
```

2. Instale as dependências:

```bash
npm install
```

> O Cypress e todos os plugins serão instalados automaticamente.

---

## Estrutura do projeto

```
cypress/
├── actions/                        # Custom commands (lógica reutilizável)
│   ├── searchWithResultsActions.js
│   └── searchWithoutResultsActions.js
│
├── data/                           # Massa de dados dos testes
│   └── searchData.js
│
├── e2e/                            # Specs de teste
│   ├── api/
│   │   ├── breedImages.cy.js       # GET /breed/{breed}/images
│   │   ├── listAllBreeds.cy.js     # GET /breeds/list/all
│   │   └── randomImage.cy.js      # GET /breeds/image/random
│   └── web/
│       ├── searchWithResults.cy.js
│       └── searchWithoutResults.cy.js
│
├── elements/                       # Seletores de elementos da UI
│   └── searchElements.js
│
├── fixtures/                       # Dados externos / configurações de API
│   └── dogApi.json
│
└── support/
    └── e2e.js                      # Importações globais e configurações de suporte
```

---

## Suítes de teste

### Web — Blog do Agi (`https://blogdoagi.com.br`)

| Spec | Cenário |
|---|---|
| `searchWithResults.cy.js` | Busca por termo válido ("Empréstimo") e verifica exibição de resultados |
| `searchWithoutResults.cy.js` | Busca por termo inválido e verifica exibição de mensagem de "nenhum resultado" |

### API — Dog CEO (`https://dog.ceo/api`)

| Spec | Endpoint | Cenários cobertos |
|---|---|---|
| `listAllBreeds.cy.js` | `GET /breeds/list/all` | Status 200, status "success", objeto de raças não vazio, sub-raças como array, presença da raça "hound" |
| `randomImage.cy.js` | `GET /breeds/image/random` | Status 200, status "success", URL de imagem válida, variação entre chamadas consecutivas |
| `breedImages.cy.js` | `GET /breed/{breed}/images` | Status 200 para raça válida, status "success", array de imagens não vazio, formato de URL válido, status 404 para raça inválida |

---

## Execução dos testes

### Abrir o Cypress em modo interativo (GUI)

```bash
npm run cy:open
```

### Executar todos os testes em modo headless

```bash
npm test
```

### Executar apenas os testes de API

```bash
npm run cy:run:api
```

### Executar apenas os testes Web

```bash
npm run cy:run:web
```

### Executar em modo headed (browser visível)

```bash
npm run cy:run:headed
```

---

## CI/CD

O projeto utiliza **GitHub Actions** para execução automatizada dos testes.

### Agendamento

Os testes rodam automaticamente **4 vezes por dia**, nos seguintes horários (UTC):

| Horário UTC | Horário BRT (UTC-3) |
|---|---|
| 00:00 | 21:00 (dia anterior) |
| 06:00 | 03:00 |
| 12:00 | 09:00 |
| 18:00 | 15:00 |

### Triggers

Além do agendamento, o pipeline também é disparado em:

- **Push** na branch `main`
- **Pull Request** para a branch `main`

### Artefatos gerados

Após cada execução, os seguintes artefatos ficam disponíveis na aba **Actions** do repositório por 7 dias:

- **`cypress-report-{n}`** — relatório HTML completo (sempre gerado)
- **`cypress-screenshots-{n}`** — screenshots dos testes que falharam (apenas em falha)

---

## Relatório de testes

Após cada execução em modo headless, um relatório HTML é gerado automaticamente em:

```
cypress/reports/
```

O relatório é gerado pelo **cypress-mochawesome-reporter** e inclui:

- Resultado de cada teste (passou / falhou)
- Screenshots embutidas em caso de falha
- Gráficos de resultado por suíte
- Logs de requisições e comandos Cypress

Para visualizar, abra o arquivo `cypress/reports/index.html` em qualquer navegador.
