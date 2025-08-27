# Algoritmo de Kruskal

O **algoritmo de Kruskal** é um [algoritmo]() em [teoria dos grafos]() que busca uma [árvore geradora mínima]() para um [grafo]() [conexo]() com [pesos](). Isto significa que ele encontra um [subconjunto]() das [arestas]() que forma uma árvore que inclui todos os [vértices](), onde o peso total, dado pela soma dos pesos das arestas da árvore, é minimizado. Se o grafo não for conexo, então ele encontra uma _floresta geradora mínima_ (uma árvore geradora mínima para cada [componente conexo]() do grafo). O algoritmo de Kruskal é um exemplo de um [algoritmo guloso]() (também conhecido como ganancioso ou _greedy_).

Seu funcionamento é mostrado a seguir:

*   crie uma floresta _F_ (um conjunto de árvores), onde cada vértice no grafo é uma árvore separada
*   crie um conjunto _S_ contendo todas as arestas do grafo
*   enquanto _S_ for não-vazio, faça:
    *   remova uma aresta com peso mínimo de _S_
    *   se essa aresta conecta duas árvores diferentes, adicione-a à floresta, combinando duas árvores numa única árvore parcial
    *   do contrário, descarte a aresta

Ao fim do algoritmo, a floresta tem apenas um componente e forma uma árvore geradora mínima do grafo.

Com o uso de uma estrutura de dados eficiente, o algoritmo de Kruskal possui complexidade de tempo igual a O (m log n), onde m representa o número de arestas e n o número de vértices.

## Exemplo

Grafo original a ser computado o algoritmo de Kruskal. Os números representam o peso nas arestas, e no momento não existe aresta selecionada. |
 As arestas AD e CE são as mais leves do grafo e ambas podem ser selecionadas. É escolhido ao acaso AD. |
 Agora a aresta CE é a mais leve. Já que ele não forma um laço com AD ela é selecionada. |
 A próxima aresta é a DF com peso 6. Ela não forma um laço com as arestas já selecionadas então ela é selecionada. |
 Agora duas arestas com peso 7 podem ser selecionadas e uma é escolhida ao acaso. A aresta BD é marcada pois forma um laço com as outras arestas já selecionadas. |
 Agora a outra aresta de peso 7 é selecionada pois cobre todos os requisitos de seleção. Similarmente ao passo anterior, outras arestas são marcadas para não serem selecionadas, pois resultariam em um laço. |
 Para finalizar é selecionada a aresta EG com peso 9. FG é marcada. Já que agora todas as arestas disponíveis formariam um laço, chega-se ao final do algoritmo e a [árvore geradora mínima]() é encontrada.

## Ver também

*   [Joseph Kruskal]()
*   [Algoritmo de Prim]()

