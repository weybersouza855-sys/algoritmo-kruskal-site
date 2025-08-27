// Implementação completa da visualização do Algoritmo de Kruskal
class KruskalVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.vertices = [];
        this.edges = [];
        this.mstEdges = [];
        this.currentStep = 0;
        this.isRunning = false;
        this.unionFind = null;
        this.sortedEdges = [];
        this.animationSpeed = 1500;
        
        this.initializeGraph();
        this.draw();
    }

    // Classe Union-Find para detecção eficiente de ciclos
    createUnionFind(vertices) {
        const parent = {};
        const rank = {};
        
        // Inicializar cada vértice como seu próprio pai
        vertices.forEach(vertex => {
            parent[vertex.id] = vertex.id;
            rank[vertex.id] = 0;
        });

        return {
            find: function(x) {
                if (parent[x] !== x) {
                    parent[x] = this.find(parent[x]); // Compressão de caminho
                }
                return parent[x];
            },
            
            union: function(x, y) {
                const rootX = this.find(x);
                const rootY = this.find(y);
                
                if (rootX === rootY) return false; // Já estão no mesmo conjunto
                
                // União por rank
                if (rank[rootX] < rank[rootY]) {
                    parent[rootX] = rootY;
                } else if (rank[rootX] > rank[rootY]) {
                    parent[rootY] = rootX;
                } else {
                    parent[rootY] = rootX;
                    rank[rootX]++;
                }
                return true;
            },
            
            connected: function(x, y) {
                return this.find(x) === this.find(y);
            }
        };
    }

    // Inicializar o grafo com um exemplo diferente (seguindo a preferência do usuário)
    initializeGraph() {
        // Criar um grafo diferente do exemplo da Wikipedia
        this.vertices = [
            {id: 'S', x: 100, y: 150, color: '#3498db', component: 0},
            {id: 'T', x: 250, y: 80, color: '#3498db', component: 1},
            {id: 'U', x: 400, y: 120, color: '#3498db', component: 2},
            {id: 'V', x: 500, y: 250, color: '#3498db', component: 3},
            {id: 'W', x: 350, y: 320, color: '#3498db', component: 4},
            {id: 'X', x: 200, y: 280, color: '#3498db', component: 5},
            {id: 'Y', x: 150, y: 200, color: '#3498db', component: 6}
        ];

        this.edges = [
            {from: 'S', to: 'T', weight: 3, selected: false, inMST: false, rejected: false},
            {from: 'S', to: 'Y', weight: 5, selected: false, inMST: false, rejected: false},
            {from: 'T', to: 'U', weight: 6, selected: false, inMST: false, rejected: false},
            {from: 'T', to: 'Y', weight: 4, selected: false, inMST: false, rejected: false},
            {from: 'U', to: 'V', weight: 2, selected: false, inMST: false, rejected: false},
            {from: 'V', to: 'W', weight: 8, selected: false, inMST: false, rejected: false},
            {from: 'W', to: 'X', weight: 7, selected: false, inMST: false, rejected: false},
            {from: 'X', to: 'Y', weight: 1, selected: false, inMST: false, rejected: false},
            {from: 'S', to: 'X', weight: 9, selected: false, inMST: false, rejected: false},
            {from: 'U', to: 'W', weight: 4, selected: false, inMST: false, rejected: false}
        ];

        // Ordenar arestas por peso (essencial para Kruskal)
        this.sortedEdges = [...this.edges].sort((a, b) => a.weight - b.weight);
        
        this.reset();
    }

    reset() {
        this.mstEdges = [];
        this.currentStep = 0;
        this.isRunning = false;
        this.unionFind = this.createUnionFind(this.vertices);
        
        // Reset visual states
        this.edges.forEach(edge => {
            edge.selected = false;
            edge.inMST = false;
            edge.rejected = false;
        });
        
        this.vertices.forEach((vertex, index) => {
            vertex.color = '#3498db';
            vertex.component = index;
        });
        
        this.draw();
        this.updateStatus("Pronto para iniciar o Algoritmo de Kruskal");
    }

    // Função principal do algoritmo de Kruskal
    async runKruskal() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.updateStatus("Iniciando Algoritmo de Kruskal...");
        
        for (let i = 0; i < this.sortedEdges.length && this.mstEdges.length < this.vertices.length - 1; i++) {
            const edge = this.sortedEdges[i];
            
            // Destacar aresta atual
            edge.selected = true;
            this.draw();
            this.updateStatus(`Considerando aresta ${edge.from}-${edge.to} com peso ${edge.weight}`);
            
            await this.sleep(this.animationSpeed);
            
            // Verificar se a aresta criaria um ciclo
            if (!this.unionFind.connected(edge.from, edge.to)) {
                // Adicionar à MST
                edge.inMST = true;
                this.mstEdges.push(edge);
                this.unionFind.union(edge.from, edge.to);
                
                this.updateComponentColors();
                this.updateStatus(`Aresta ${edge.from}-${edge.to} adicionada à MST (${this.mstEdges.length}/${this.vertices.length - 1})`);
            } else {
                // Rejeitar aresta (criaria ciclo)
                edge.rejected = true;
                this.updateStatus(`Aresta ${edge.from}-${edge.to} rejeitada (criaria ciclo)`);
            }
            
            edge.selected = false;
            this.draw();
            await this.sleep(this.animationSpeed);
        }
        
        this.isRunning = false;
        const totalWeight = this.mstEdges.reduce((sum, edge) => sum + edge.weight, 0);
        this.updateStatus(`Algoritmo concluído! Peso total da MST: ${totalWeight}`);
    }

    // Executar um passo do algoritmo
    async stepForward() {
        if (this.isRunning || this.currentStep >= this.sortedEdges.length || this.mstEdges.length >= this.vertices.length - 1) {
            return;
        }
        
        const edge = this.sortedEdges[this.currentStep];
        
        // Destacar aresta atual
        edge.selected = true;
        this.draw();
        this.updateStatus(`Considerando aresta ${edge.from}-${edge.to} com peso ${edge.weight}`);
        
        await this.sleep(500);
        
        // Verificar se a aresta criaria um ciclo
        if (!this.unionFind.connected(edge.from, edge.to)) {
            edge.inMST = true;
            this.mstEdges.push(edge);
            this.unionFind.union(edge.from, edge.to);
            this.updateComponentColors();
            this.updateStatus(`Aresta ${edge.from}-${edge.to} adicionada à MST`);
        } else {
            edge.rejected = true;
            this.updateStatus(`Aresta ${edge.from}-${edge.to} rejeitada (criaria ciclo)`);
        }
        
        edge.selected = false;
        this.currentStep++;
        this.draw();
        
        if (this.mstEdges.length >= this.vertices.length - 1) {
            const totalWeight = this.mstEdges.reduce((sum, edge) => sum + edge.weight, 0);
            this.updateStatus(`Algoritmo concluído! Peso total da MST: ${totalWeight}`);
        }
    }

    // Atualizar cores dos componentes
    updateComponentColors() {
        const colors = ['#e74c3c', '#f39c12', '#27ae60', '#8e44ad', '#2980b9', '#d35400', '#16a085'];
        const componentMap = {};
        let colorIndex = 0;
        
        this.vertices.forEach(vertex => {
            const root = this.unionFind.find(vertex.id);
            if (!componentMap[root]) {
                componentMap[root] = colors[colorIndex % colors.length];
                colorIndex++;
            }
            vertex.color = componentMap[root];
        });
    }

    // Função para desenhar o grafo
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Desenhar arestas
        this.edges.forEach(edge => {
            const fromVertex = this.vertices.find(v => v.id === edge.from);
            const toVertex = this.vertices.find(v => v.id === edge.to);
            
            this.ctx.beginPath();
            this.ctx.moveTo(fromVertex.x, fromVertex.y);
            this.ctx.lineTo(toVertex.x, toVertex.y);
            
            if (edge.selected) {
                this.ctx.strokeStyle = '#f1c40f';
                this.ctx.lineWidth = 5;
            } else if (edge.inMST) {
                this.ctx.strokeStyle = '#27ae60';
                this.ctx.lineWidth = 4;
            } else if (edge.rejected) {
                this.ctx.strokeStyle = '#e74c3c';
                this.ctx.lineWidth = 2;
                this.ctx.setLineDash([5, 5]);
            } else {
                this.ctx.strokeStyle = '#bdc3c7';
                this.ctx.lineWidth = 2;
                this.ctx.setLineDash([]);
            }
            
            this.ctx.stroke();
            this.ctx.setLineDash([]);
            
            // Desenhar peso da aresta
            const midX = (fromVertex.x + toVertex.x) / 2;
            const midY = (fromVertex.y + toVertex.y) / 2;
            
            // Fundo do peso
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(midX - 15, midY - 12, 30, 24);
            this.ctx.strokeStyle = '#2c3e50';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(midX - 15, midY - 12, 30, 24);
            
            // Texto do peso
            this.ctx.fillStyle = edge.inMST ? '#27ae60' : (edge.rejected ? '#e74c3c' : '#2c3e50');
            this.ctx.font = 'bold 12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(edge.weight, midX, midY + 4);
        });
        
        // Desenhar vértices
        this.vertices.forEach(vertex => {
            this.ctx.beginPath();
            this.ctx.arc(vertex.x, vertex.y, 25, 0, 2 * Math.PI);
            this.ctx.fillStyle = vertex.color;
            this.ctx.fill();
            this.ctx.strokeStyle = '#2c3e50';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            
            // Rótulo do vértice
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(vertex.id, vertex.x, vertex.y + 5);
        });
        
        // Desenhar legenda
        this.drawLegend();
    }

    // Desenhar legenda
    drawLegend() {
        const legendX = 20;
        const legendY = this.canvas.height - 100;
        
        // Fundo da legenda
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.fillRect(legendX - 10, legendY - 10, 200, 80);
        this.ctx.strokeStyle = '#bdc3c7';
        this.ctx.strokeRect(legendX - 10, legendY - 10, 200, 80);
        
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'left';
        
        // Aresta na MST
        this.ctx.strokeStyle = '#27ae60';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(legendX, legendY);
        this.ctx.lineTo(legendX + 20, legendY);
        this.ctx.stroke();
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fillText('Na MST', legendX + 25, legendY + 4);
        
        // Aresta rejeitada
        this.ctx.strokeStyle = '#e74c3c';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        this.ctx.beginPath();
        this.ctx.moveTo(legendX, legendY + 20);
        this.ctx.lineTo(legendX + 20, legendY + 20);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        this.ctx.fillText('Rejeitada', legendX + 25, legendY + 24);
        
        // Aresta atual
        this.ctx.strokeStyle = '#f1c40f';
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.moveTo(legendX, legendY + 40);
        this.ctx.lineTo(legendX + 20, legendY + 40);
        this.ctx.stroke();
        this.ctx.fillText('Atual', legendX + 25, legendY + 44);
    }

    // Função auxiliar para pausas
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Atualizar status
    updateStatus(message) {
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.textContent = message;
        }
    }

    // Definir velocidade da animação
    setSpeed(speed) {
        this.animationSpeed = speed;
    }
}

// Variável global para o visualizador
let visualizer;

// Funções para os botões
function initializeVisualization() {
    visualizer = new KruskalVisualizer('graphCanvas');
}

function startVisualization() {
    if (visualizer) {
        visualizer.runKruskal();
    }
}

function resetVisualization() {
    if (visualizer) {
        visualizer.reset();
    }
}

function nextStep() {
    if (visualizer) {
        visualizer.stepForward();
    }
}

function setAnimationSpeed(speed) {
    if (visualizer) {
        visualizer.setSpeed(speed);
    }
}

// Inicializar quando a página carregar
window.addEventListener('load', function() {
    initializeVisualization();
});

