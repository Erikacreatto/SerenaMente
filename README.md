# SerenaMente

Aplicativo mobile desenvolvido em React Native com Expo, voltado ao bem-estar e à prática de Yoga e Meditação.

O SerenaMente permite ao usuário visualizar diferentes práticas, organizadas por modalidades e subcategorias, consultar detalhes e acompanhar orientações passo a passo.


## Funcionalidades

- Visualização das modalidades de Yoga e Meditação.
- Organização das práticas por subcategorias.
- Exibição de cards das práticas.
- Visualização dos detalhes de cada prática.
- Informações sobre duração e nível.
- Orientações passo a passo.
- Imagens relacionadas às práticas.
- Frase do dia.
- Navegação entre as telas do aplicativo.
- Armazenamento local das práticas utilizando SQLite.

## Funcionamento do aplicativo

O fluxo principal funciona da seguinte maneira:

```text
Aplicativo
    ↓
Home
    ↓
Escolha da modalidade
    ↓
Yoga ou Meditação
    ↓
Categorias
    ↓
Lista de práticas
    ↓
Seleção de uma prática
    ↓
Detalhes da prática

```

## Estrutura do projeto

A estrutura principal do projeto está organizada de forma a separar telas, componentes, dados, imagens e banco de dados.
```text

SerenaMente/
│
├── assets/          # Imagens e recursos visuais
├── components/      # Componentes reutilizáveis
├── data/            # Dados e referências de imagens
├── database/        # Configuração e inicialização do SQLite
├── screens/         # Telas do aplicativo
│
├── App.tsx          # Componente principal
├── index.ts         # Entrada do aplicativo
├── metro.config.js  # Configuração do Metro
├── package.json     # Dependências e scripts
└── README.md        # Documentação do projeto
```

## Tecnologias utilizadas
- React Native
- Expo
- TypeScript
- SQLite
- Expo SQLite
- React Navigation
- Git
- GitHub

## Contexto acadêmico

Projeto acadêmico desenvolvido para aplicação prática dos conhecimentos adquiridos na disciplina de Programação para Dispositivos Móveis II.

Durante o desenvolvimento foram aplicados conceitos de:

- Desenvolvimento mobile
- React Native
- Componentização
- TypeScript
- Navegação entre telas
- Props
- Hooks
- Banco de dados SQLite
- Consultas SQL
- Organização de dados
- Interface e experiência do usuário

## Desenvolvimento

Projeto desenvolvido como parte da formação em Desenvolvimento de Software Multiplataforma.

## Licença

Projeto desenvolvido para fins acadêmicos.

