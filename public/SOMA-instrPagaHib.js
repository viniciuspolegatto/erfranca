const endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiCredenciamentoSomaSebraeSP/main/SebraeSpSomaConsultorias.json';
const tabelaProdutos = document.getElementById('tabela_produtos').querySelector('tbody');
const dropdownToggle = document.getElementById('dropdownToggle');
const dropdownMenu = document.getElementById('dropdownMenu');
const dropdownTogglePublicoAlvo = document.getElementById('dropdownToggleSetor');
const dropdownMenuPublicoAlvo = document.getElementById('dropdownMenuSetor');
let produtos = [];

document.addEventListener('DOMContentLoaded', buscarProdutos);

async function buscarProdutos() {
    try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error('Erro ao buscar dados da API.');
        
        produtos = await res.json();
        preencherFiltros(produtos);
        exibirProdutosNaTela();
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

function preencherFiltros(produtos) {
    //const areas = [...new Set(produtos.map(p => p.Area).filter(area => area && area !== 'Educação' && area !== 'Desenvolvimento Territorial'))];
    const areas = [...new Set(produtos.map(p => p.Area).filter(area => area))];
    const publicosAlvo = [...new Set(produtos.map(p => p.PublicoAlvo).filter(publico => publico))];

    preencherDropdownAreas(areas);
    preencherDropdownPublicosAlvo(publicosAlvo);
}

function preencherDropdownAreas(areas) {
    dropdownMenu.innerHTML = '';
    
    areas.forEach(area => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = area;
        checkbox.addEventListener('change', exibirProdutosNaTela);
        
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' ' + area));
        dropdownMenu.appendChild(label);
    });
    
    dropdownToggle.addEventListener('click', () => {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
    
    document.addEventListener('click', (event) => {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
}

function preencherDropdownPublicosAlvo(publicosAlvo) {
    dropdownMenuPublicoAlvo.innerHTML = '';
    
    publicosAlvo.forEach(publico => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = publico;
        checkbox.addEventListener('change', exibirProdutosNaTela);
        
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' ' + publico));
        dropdownMenuPublicoAlvo.appendChild(label);
    });
    
    dropdownTogglePublicoAlvo.addEventListener('click', () => {
        dropdownMenuPublicoAlvo.style.display = dropdownMenuPublicoAlvo.style.display === 'block' ? 'none' : 'block';
    });
    
    document.addEventListener('click', (event) => {
        if (!dropdownTogglePublicoAlvo.contains(event.target) && !dropdownMenuPublicoAlvo.contains(event.target)) {
            dropdownMenuPublicoAlvo.style.display = 'none';
        }
    });
}

function getSelectedAreas() {
    return Array.from(dropdownMenu.querySelectorAll('input:checked')).map(checkbox => checkbox.value);
}

function getSelectedPublicosAlvo() {
    return Array.from(dropdownMenuPublicoAlvo.querySelectorAll('input:checked')).map(checkbox => checkbox.value);
}

function exibirProdutosNaTela() {
    tabelaProdutos.innerHTML = '';
    
    const selectedAreas = getSelectedAreas();
    const selectedPublicosAlvo = getSelectedPublicosAlvo();
    
    const produtosFiltrados = produtos.filter(produto =>
        produto.Modalidade === 'Híbrido' &&
        produto.Pago === 'Sim' &&
        produto.Natureza === 'Instrutoria / Oficina / Curso / Palestra'
        && produto.EmpresasHabilitadas !== 'xx'
        && (selectedAreas.length === 0 || selectedAreas.includes(produto.Area))
        && (selectedPublicosAlvo.length === 0 || selectedPublicosAlvo.includes(produto.PublicoAlvo))
    );
    
    // Ordena por carga horária crescente, mantendo "xx" no campo EmpresasHabilitadas no final
    const produtosOrdenados = produtosFiltrados.sort((a, b) => {
        if (a.EmpresasHabilitadas === 'xx' && b.EmpresasHabilitadas !== 'xx') return 1;
        if (a.EmpresasHabilitadas !== 'xx' && b.EmpresasHabilitadas === 'xx') return -1;
        return a.CargaHoraria - b.CargaHoraria;
    });
    
    produtosOrdenados.forEach(produto => {
        const custoCredenciado = Number(produto.Soma_Precificacao).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        const linha = `
            <tr>
                <td>${produto.EmpresasHabilitadas}</td>
                <td>${produto.Subarea}</td>
                <td>${produto.Area}</td>
                <td><a href="SOMA-detalhesInst.html?id=${produto.ID_Produto}">${produto.NomeProduto}</a></td>
                <td>${produto.Natureza}</td>
                <td>${produto.Modalidade}</td>
                <td>${produto.CargaHoraria}</td>
                <td>${produto.Setor}</td>
                <td>${produto.PublicoAlvo}</td>
                <td>${custoCredenciado}</td>
                <td>${produto.Aplicador}</td>
                <td>${produto.DescricaoProduto}</td>
            </tr>
        `;
        tabelaProdutos.innerHTML += linha;
    });
}
