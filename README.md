# revisao-sistematica-eng-civil-2026-5

## Estratégia de busca na base Scopus

A estratégia de busca foi construída de forma progressiva, com refinamentos sucessivos das expressões utilizadas na base Scopus. As buscas foram aplicadas aos campos de título, resumo e palavras-chave por meio do operador `TITLE-ABS-KEY`.

A primeira string combinou termos relacionados à engenharia civil e ao ambiente construído com termos associados à Inteligência Artificial e às principais técnicas computacionais consideradas no escopo da revisão. Essa busca retornou **290.062 registros**.

```text
TITLE-ABS-KEY (
  (
    "civil engineering" OR "construction industry" OR "construction engineering" OR
    "civil construction" OR "built environment" OR "structural engineering" OR
    "geotechnical engineering" OR "construction management" OR
    infrastructure OR "construction materials" OR concrete OR
    bridge* OR pavement* OR building* OR BIM OR
    "engenharia civil" OR "construção civil" OR estruturas OR geotecnia OR
    infraestrutura OR "materiais de construção" OR transportes
  )
  AND
  (
    "artificial intelligence" OR "machine learning" OR "deep learning" OR
    "data mining" OR "predictive model*" OR "hybrid model*" OR
    "artificial neural network*" OR "neural network*" OR
    "optimization algorithm*" OR "genetic algorithm*" OR
    "evolutionary algorithm*" OR "support vector machine*" OR
    "random forest" OR "gradient boosting" OR XGBoost OR
    "computer vision" OR "reinforcement learning" OR
    "inteligência artificial" OR "aprendizado de máquina" OR
    "mineração de dados" OR "modelos preditivos" OR
    "modelos híbridos" OR "redes neurais artificiais" OR
    "algoritmos de otimização"
  )
)
```

Em função da amplitude do resultado, foi realizada uma segunda busca. Nessa etapa, foram mantidos os grupos de termos relacionados à engenharia civil e à Inteligência Artificial, acrescentando-se um terceiro conjunto associado às finalidades das aplicações, como previsão, classificação, otimização, monitoramento, apoio à tomada de decisão, automação, manutenção, sustentabilidade, produtividade e mitigação de riscos.

A segunda string retornou **200.498 registros**.

```text
TITLE-ABS-KEY (
  (
    "civil engineering" OR "construction industry" OR "construction engineering" OR
    "civil construction" OR "built environment" OR "structural engineering" OR
    "geotechnical engineering" OR "construction management" OR
    infrastructure OR "construction materials" OR concrete OR
    bridge* OR pavement* OR building* OR BIM OR
    "engenharia civil" OR "construção civil" OR estruturas OR geotecnia OR
    infraestrutura OR "materiais de construção" OR transportes
  )
  AND
  (
    "artificial intelligence" OR "machine learning" OR "deep learning" OR
    "data mining" OR "predictive model*" OR "hybrid model*" OR
    "artificial neural network*" OR "neural network*" OR
    "optimization algorithm*" OR "genetic algorithm*" OR
    "evolutionary algorithm*" OR "support vector machine*" OR
    "random forest" OR "gradient boosting" OR XGBoost OR
    "computer vision" OR "reinforcement learning" OR
    "inteligência artificial" OR "aprendizado de máquina" OR
    "mineração de dados" OR "modelos preditivos" OR
    "modelos híbridos" OR "redes neurais artificiais" OR
    "algoritmos de otimização"
  )
  AND
  (
    prediction OR forecasting OR classification OR optimization OR
    monitoring OR assessment OR detection OR estimation OR
    "decision support" OR automation OR maintenance OR
    sustainability OR productivity OR "risk mitigation" OR
    "cost reduction" OR "performance prediction"
  )
)
```

Como o conjunto recuperado ainda permanecia amplo em relação ao objetivo da revisão, foi realizada uma terceira etapa de refinamento. Nessa etapa, a string passou a combinar quatro grupos de termos: áreas da engenharia civil, técnicas de Inteligência Artificial, abordagens convencionais ou tradicionais e contribuições associadas às aplicações analisadas.

A terceira string retornou **241 registros**, que constituíram o conjunto inicial utilizado nas etapas de elegibilidade e triagem da revisão.

```text
TITLE-ABS-KEY (
  (
    "construção civil" OR "civil construction" OR "engenharia civil" OR
    "civil engineering" OR structures OR estruturas OR geotechnics OR
    geotecnia OR "construction management" OR "gestão de obras" OR
    infrastructure OR infraestrutura OR "construction materials" OR
    "materiais de construção" OR sustainability OR sustentabilidade OR
    transportation OR transportes
  )
  AND
  (
    "optimization algorithms" OR "algoritmos de otimização" OR
    "machine learning" OR "aprendizado de máquina" OR "deep learning" OR
    "artificial intelligence" OR "inteligência artificial" OR
    "data mining" OR "mineração de dados" OR "hybrid models" OR
    "modelos híbridos" OR "predictive models" OR "modelos preditivos" OR
    "artificial neural networks" OR "redes neurais artificiais"
  )
  AND
  (
    "manual approaches" OR "abordagens manuais" OR
    "conventional statistical models" OR "modelos estatísticos convencionais" OR
    "empirical methods" OR "métodos empíricos" OR
    "traditional methods" OR "métodos tradicionais" OR
    "conventional engineering practices" OR
    "práticas convencionais de engenharia"
  )
  AND
  (
    "decision support" OR "apoio à tomada de decisão" OR
    "productivity improvement" OR "aumento da produtividade" OR
    "process automation" OR "automação de processos" OR
    "sustainability improvement" OR "melhoria da sustentabilidade" OR
    "risk mitigation" OR "mitigação de riscos" OR
    "design optimization" OR "otimização de projetos" OR
    "performance prediction" OR "previsão de desempenho" OR
    "cost reduction" OR "redução de custos"
  )
)
```

O conjunto de **241 registros** mencionado no capítulo corresponde, portanto, ao resultado da terceira string de busca, obtida após o refinamento das duas expressões anteriores. O detalhamento das strings é mantido neste repositório para preservar a rastreabilidade e a possibilidade de reprodução do procedimento, sem ampliar a extensão do texto principal do capítulo.
