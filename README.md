# Frontend Admin

O **Frontend Admin** é um painel de administração desenvolvido à medida para gerir um catálogo de produtos. Esta plataforma permite aos administradores controlar de forma centralizada todas as linhas de produtos, especificações técnicas, imagens e documentos associados (como PDFs).

O projeto foi construído com foco na escalabilidade, utilizando uma arquitetura modular que separa as funcionalidades por domínios (features), garantindo um código limpo e de fácil manutenção.

---

## 🎯 Funcionalidades Principais

Com base na estrutura do sistema, o painel oferece as seguintes capacidades:

* **Gestão de Catálogo (`features/Catalogo`):**
  * **Linhas de Produtos:** Criação, edição e visualização de diferentes linhas de produtos (ex: injetados, anéis de vedação, etc.).
  * **Produtos:** Gestão detalhada de cada produto pertencente a uma linha.
  * **Editor de Tabelas e Dados:** Um editor avançado (`TabelaEditor`) integrado para gerir especificações técnicas, Part Numbers (PN) e outras informações tabulares associadas aos produtos.
* **Gestão de Media:**
  * **Upload de Imagens:** Integração direta com o **Cloudinary** para o upload, otimização e armazenamento de imagens dos produtos (`services/upload/cloudinary`).
  * **Gestão de Documentos:** Suporte para visualização e gestão de ficheiros PDF (catálogos e manuais) associados aos produtos (`components/ButtonsPDF`).
* **Interface de Utilizador (UI) Interativa:**
  * Edição de texto em linha (Inline Text Edit) para atualizações rápidas.
  * Sistema robusto de Modais (`providers/ModalProvider`) para confirmações e formulários.
  * Loaders personalizados e feedback visual intuitivo.

---

## 🛠 Tecnologias e Ecossistema

O projeto utiliza um conjunto de tecnologias modernas para garantir alta performance:

* **Core:** React (v19) com TypeScript.
* **Build Tool:** Vite, garantindo um HMR (Hot Module Replacement) quase instantâneo.
* **Estilização:** `styled-components` para CSS-in-JS e CSS Modules clássicos (`.module.css`) para escopo local de componentes.
* **Ícones:** `react-icons`.
* **Qualidade de Código:** ESLint (v9) nativo para linting rigoroso.
* **Serviços HTTP:** Cliente HTTP customizado (`services/http/httpClient.ts`) para comunicação segura e tipada com a API backend.

---

## 📁 Arquitetura do Projeto

O projeto segue uma abordagem orientada a funcionalidades (Feature-Driven), o que facilita a escalabilidade:

```text
src/
├── assets/           # Ficheiros estáticos (imagens, logótipos, PDFs padrão)
├── components/       # Componentes partilhados globais (Paginação, Cards, Botões PDF)
├── config/           # Configurações globais (API, Cloudinary, Variáveis de Ambiente)
├── features/         # Módulos principais da aplicação (ex: Catalogo)
│   └── Catalogo/     # Tudo relacionado com o Catálogo (Componentes, Hooks, Serviços, Rotas)
├── providers/        # Contextos do React (ex: ModalProvider)
├── services/         # Lógica de integração externa (HTTP, Uploads Cloudinary)
├── ui/               # Biblioteca de componentes visuais base (Buttons, Modals, Loaders, Inputs)
└── utils/            # Funções utilitárias e formatadores (formatters.ts)

```

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de que tem instalado na sua máquina:

* [Node.js](https://nodejs.org/) (versão compatível com o ecossistema atual, recomenda-se a versão LTS)
* Um gestor de pacotes (`npm`, `yarn` ou `pnpm`)

---

## ⚙️ Instalação e Configuração

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd frontend-admin

```


2. **Instale as dependências:**
```bash
npm install

```


3. **Configure as variáveis de ambiente:**
Crie um ficheiro `.env` na raiz do projeto copiando o exemplo fornecido:
```bash
cp .env.example .env

```


Preencha as variáveis essenciais:
* `VITE_API_BASE_URL`: URL base da API backend.
* `VITE_CLOUDINARY_CLOUD_NAME`: Nome da Cloud configurada no Cloudinary.
* `VITE_CLOUDINARY_UPLOAD_PRESET`: Preset de segurança para upload direto no Cloudinary.



---

## 🚀 Scripts Disponíveis

* `npm run dev`: Inicia o servidor de desenvolvimento local.
* `npm run build`: Valida o TypeScript e compila o projeto para produção.
* `npm run lint`: Analisa o código em busca de problemas estruturais ou de formatação.
* `npm run preview`: Simula o servidor de produção localmente para testes.
