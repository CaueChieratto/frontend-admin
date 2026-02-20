# Frontend Admin

O **Frontend Admin** é um painel de administração desenvolvido à medida para gerir um catálogo de produtos. Esta plataforma permite aos administradores controlar de forma centralizada todas as linhas de produtos, especificações técnicas, imagens e documentos associados (como PDFs).

🔗 **Backend da aplicação (API RESTful):**
[https://github.com/CaueChieratto/backend-admin](https://github.com/CaueChieratto/backend-admin)

Este frontend consome a API do repositório acima, que é responsável por:

* Persistência de dados no MongoDB
* Regras de negócio
* Controle de Soft Delete e exclusões físicas
* Estrutura hierárquica (Linhas → Produtos → Tabelas → Dados Técnicos)

A comunicação entre frontend e backend ocorre através de um cliente HTTP customizado, garantindo integração tipada e segura.

---

## 🎯 Funcionalidades Principais

Com base na estrutura do sistema, o painel oferece as seguintes capacidades:

### 📂 Gestão de Catálogo (`features/Catalogo`)

* **Linhas de Produtos:** Criação, edição e visualização de diferentes linhas de produtos (ex: injetados, anéis de vedação, etc.).
* **Produtos:** Gestão detalhada de cada produto pertencente a uma linha.
* **Editor de Tabelas e Dados:** Editor avançado (`TabelaEditor`) para gerir especificações técnicas, Part Numbers (PN) e outras informações tabulares associadas aos produtos.

---

### 🖼 Gestão de Mídia

* **Upload de Imagens:** Integração direta com o **Cloudinary** para upload, otimização e armazenamento de imagens (`services/upload/cloudinary`).
* **Gestão de Documentos:** Suporte para visualização e gestão de ficheiros PDF associados aos produtos (`components/ButtonsPDF`).

---

### ⚡ Interface de Utilizador Interativa

* Edição de texto em linha (Inline Text Edit)
* Sistema robusto de Modais (`providers/ModalProvider`)
* Loaders personalizados e feedback visual intuitivo
* Paginação e navegação otimizada

---

## 🛠 Tecnologias e Ecossistema

O projeto utiliza um conjunto de tecnologias modernas para garantir alta performance:

* **Core:** React (v19) com TypeScript
* **Build Tool:** Vite (HMR quase instantâneo)
* **Estilização:** `styled-components` + CSS Modules (`.module.css`)
* **Ícones:** `react-icons`
* **Qualidade de Código:** ESLint (v9)
* **Serviços HTTP:** Cliente HTTP customizado (`services/http/httpClient.ts`)
* **Integração Backend:** API Node.js + Express + MongoDB

---

## 🏗 Arquitetura do Projeto

O projeto segue uma abordagem **Feature-Driven Architecture**, facilitando escalabilidade e manutenção:

```text
src/
├── assets/           # Ficheiros estáticos (imagens, logótipos, PDFs padrão)
├── components/       # Componentes globais reutilizáveis
├── config/           # Configurações globais (API, Cloudinary, ENV)
├── features/         # Domínios principais da aplicação
│   └── Catalogo/     # Módulo completo do catálogo
├── providers/        # Contextos globais (ModalProvider, etc.)
├── services/         # Integrações externas (HTTP, Uploads)
├── ui/               # Biblioteca base de componentes visuais
└── utils/            # Funções utilitárias e formatadores
```

---

## 🔄 Integração com o Backend

A aplicação depende diretamente do backend disponível em:

👉 [https://github.com/CaueChieratto/backend-admin](https://github.com/CaueChieratto/backend-admin)

Para funcionamento completo:

* O backend deve estar em execução
* A variável `VITE_API_BASE_URL` deve apontar para a URL correta da API
* As rotas seguem o padrão `/catalogo/...`

---

## 📋 Pré-requisitos

Antes de iniciar:

* Node.js (versão LTS recomendada)
* Um gestor de pacotes (`npm`, `yarn` ou `pnpm`)
* Backend em execução (ver repositório backend-admin)

---

## ⚙️ Instalação e Configuração

### 1️⃣ Clone o repositório

```bash
git clone <url-do-repositorio>
cd frontend-admin
```

---

### 2️⃣ Instale as dependências

```bash
npm install
```

---

### 3️⃣ Configure as variáveis de ambiente

Crie um ficheiro `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Preencha as variáveis essenciais:

* `VITE_API_BASE_URL` → URL base da API backend
* `VITE_CLOUDINARY_CLOUD_NAME`
* `VITE_CLOUDINARY_UPLOAD_PRESET`

---

## 🚀 Scripts Disponíveis

* `npm run dev` → Inicia servidor de desenvolvimento
* `npm run build` → Valida TypeScript + build produção
* `npm run lint` → Analisa padrões e qualidade de código
* `npm run preview` → Simula ambiente de produção localmente
