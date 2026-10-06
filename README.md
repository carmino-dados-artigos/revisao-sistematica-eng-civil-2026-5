# Aplicações da IA na Engenharia Civil — revisão sistemática exploratória

Aplicação estática em **React + TypeScript + Vite** para disponibilizar a rastreabilidade, os resultados e as redes analíticas da revisão sistemática exploratória.

## O que o app contém

- três strings de busca Scopus e seus resultados (290.062 → 200.498 → 241);
- fluxo metodológico completo;
- rota dos 241 registros;
- triagem dos 36 resumos;
- conjunto de 34 registros após a decisão final;
- 28 candidatos primários que chegaram à avaliação metodológica;
- 27 estudos primários finais;
- 1 exclusão metodológica explicitamente rastreável;
- 6 revisões secundárias de apoio;
- avaliação metodológica por 7 critérios;
- gráficos de anos, áreas, técnicas e termos-chave;
- redes interativas com Cytoscape.js;
- acesso aos artigos por DOI, sem armazenar PDFs no repositório.

## Dados

Os dados utilizados pelo front-end estão em:

`src/data/review-data.json`

O arquivo foi gerado a partir da planilha final consolidada. Os 28 PDFs foram usados apenas como material de conferência e **não são necessários para executar o app**.

## Execução local

```bash
npm install
npm run dev
```

Acesse o endereço informado pelo Vite, normalmente `http://localhost:5173`.

## Build

```bash
npm run build
```

O conteúdo estático será criado em `dist/`.

## GitHub Pages

O projeto utiliza `base: './'`, portanto funciona em repositórios de projeto do GitHub Pages sem precisar informar manualmente o nome do repositório.

Um workflow está incluído em `.github/workflows/deploy.yml`.

1. Envie o projeto para a branch `main`.
2. Em **Settings → Pages**, selecione **GitHub Actions** como fonte.
3. O workflow fará `npm ci`, `npm run build` e publicará `dist/`.

## DOI em vez de PDFs

Os botões dos estudos usam `https://doi.org/<DOI>`. Essa opção reduz o tamanho do repositório e preserva a identificação persistente da publicação. O DOI não garante, por si só, que o texto completo seja gratuito; por isso, a planilha de rastreabilidade deve permanecer arquivada no repositório de pesquisa.

## Observação metodológica

O estudo *Strain Decay Monitoring and Analytical Prediction of RC Columns Using Brillouin Optical Technology and Time-Dependent Deterioration Factor* permanece visível entre os 28 candidatos porque chegou à avaliação metodológica, mas está marcado como excluído do corpus final por não aplicar efetivamente IA no método principal.

## Atualização de rastreabilidade e redes

Esta versão acrescenta:

- modal de rastreabilidade por registro nas telas de triagem e elegibilidade;
- linha de decisão por etapa, com justificativa e proveniência;
- identificador interno persistente exibido ao longo das etapas;
- histórico de decisão quando um registro muda de estado, preservando o caso excluído na avaliação metodológica;
- cards para as seis revisões secundárias, seguindo o padrão visual do corpus;
- modal detalhado da avaliação metodológica, com pontuação e justificativa de cada um dos sete critérios;
- grafos de autores e artigos × palavras-chave com layout mais compacto;
- abertura de todos os grafos em visualização ampliada;
- exportação de todos os grafos em PNG.

Os dados continuam sendo lidos de `src/data/review-data.json`, derivado da planilha final consolidada. Os PDFs não são distribuídos pelo aplicativo; os links bibliográficos usam DOI.

Todos os ícones funcionais da interface utilizam **Lucide React**. O componente `src/components/Icon.tsx` centraliza o mapeamento dos ícones para manter consistência visual.

## Revisões secundárias

Os seis cards de revisões secundárias adotam o mesmo comportamento de interação dos estudos primários: ao clicar no card, abre-se um painel lateral com identificação, autores, ano, DOI, resumo, palavras-chave/termos documentados, uso metodológico e proveniência do registro.
