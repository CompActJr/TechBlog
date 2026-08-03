// Search feature stub - Prepared for future implementation of posts indexing and search suggestions dropdown.
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const searchBtn = document.getElementById('searchBtn');

    if (!searchInput || !searchSuggestions || !searchBtn) return;

    // Placeholder data representing future posts
    const mockPosts = [
        { title: 'Fundamentos de HTML e CSS', url: '/trilhas/programacao-web/capacitacoes/fundamentos.html' },
        { title: 'Primeiros passos no Git e GitHub', url: '/trilhas/devops-infra/capacitacoes/git.html' },
        { title: 'Introdução ao Desenvolvimento Backend', url: '/trilhas/desenvolvimento-backend/capacitacoes/fundamentos.html' },
        { title: 'Modelos de IA e Análise de Dados', url: '/trilhas/ia-analise/capacitacoes/fundamentos.html' }
    ];

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            searchSuggestions.style.display = 'none';
            return;
        }

        const filtered = mockPosts.filter(post => post.title.toLowerCase().includes(query));
        
        if (filtered.length > 0) {
            searchSuggestions.innerHTML = filtered.map(post => `
                <li><a class="dropdown-item" href="${post.url}"><i class="bi bi-file-earmark-text me-2"></i>${post.title}</a></li>
            `).join('');
            searchSuggestions.style.display = 'block';
        } else {
            searchSuggestions.innerHTML = `<li><span class="dropdown-item-text text-muted">Nenhum post encontrado</span></li>`;
            searchSuggestions.style.display = 'block';
        }
    });

    // Close dropdown on click outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
            searchSuggestions.style.display = 'none';
        }
    });

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            alert(`Pesquisa por: "${query}" (Funcionalidade de busca sendo encaminhada!)`);
        }
    });
});
