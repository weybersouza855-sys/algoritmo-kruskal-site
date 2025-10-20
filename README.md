# Algoritmo de Kruskal - Site Interativo

Este é um site educacional interativo que demonstra o **Algoritmo de Kruskal** para encontrar a Árvore Geradora Mínima (MST) em um grafo ponderado.

## 📋 Conteúdo

- **Explicação Teórica**: Descrição detalhada do algoritmo e como funciona
- **Pseudocódigo**: Implementação em pseudocódigo do algoritmo
- **Visualização Interativa**: Demonstração visual do algoritmo em ação com controles para:
  - Reiniciar a visualização
  - Avançar passo a passo
  - Executar o algoritmo completo
  - Ajustar a velocidade da animação
- **Exemplo Prático Detalhado**: Passo a passo completo da execução do algoritmo em um grafo específico

## 🚀 Como Acessar

### Opção 1: GitHub Pages (Recomendado)
O site está hospedado no GitHub Pages e pode ser acessado em:
```
https://weybersouza855-sys.github.io/algoritmo-kruskal-site/
```

### Opção 2: Localmente
1. Clone o repositório:
   ```bash
   git clone https://github.com/weybersouza855-sys/algoritmo-kruskal-site.git
   ```
2. Abra o arquivo `index.html` em seu navegador de internet.

## 📁 Estrutura do Projeto

```
algoritmo-kruskal-site/
├── index.html                    # Página principal do site
├── style.css                     # Estilos CSS
├── kruskal-visualization.js      # Lógica da visualização interativa
├── .nojekyll                     # Arquivo para GitHub Pages
├── README.md                     # Este arquivo
└── kruskal_wikipedia.md          # Documentação adicional
```

## 🎯 Funcionalidades

- **Visualização Gráfica**: Canvas interativo mostrando o grafo e as arestas sendo processadas
- **Cores Dinâmicas**: 
  - Verde: Arestas adicionadas à MST
  - Vermelho: Arestas rejeitadas (formam ciclos)
  - Amarelo: Aresta atual sendo considerada
  - Cinza: Arestas não processadas
- **Controle de Velocidade**: Ajuste a velocidade da animação com um slider
- **Estados dos Vértices**: Cores diferentes para representar componentes conectados

## 💡 Conceitos Principais

O Algoritmo de Kruskal é um algoritmo guloso que:
1. Ordena todas as arestas por peso crescente
2. Inicializa cada vértice como um componente separado
3. Processa as arestas em ordem, adicionando-as à MST se não formarem ciclos
4. Utiliza a estrutura de dados **Union-Find** para detecção eficiente de ciclos

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura da página
- **CSS3**: Estilização e responsividade
- **JavaScript (ES6+)**: Lógica da visualização e algoritmo
- **Canvas API**: Renderização gráfica

## 📚 Referências

- [Wikipedia - Algoritmo de Kruskal](https://en.wikipedia.org/wiki/Kruskal%27s_algorithm)
- [GeeksforGeeks - Kruskal's Algorithm](https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/)

## 👨‍💻 Autor

Criado como um projeto educacional para demonstração do Algoritmo de Kruskal.

## 📝 Licença

Este projeto é de código aberto e pode ser usado livremente para fins educacionais.
