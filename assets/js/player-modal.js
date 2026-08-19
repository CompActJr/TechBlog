// Componente YouTube: um bloco HTML com data-* carrega os links a partir
// de window.RESOURCES (assets/data/resources.js) ou de um data-videos inline.
// Requer: Bootstrap bundle (modal) e Font Awesome (ícone) já carregados.
document.addEventListener('DOMContentLoaded', () => {
    const comps = document.querySelectorAll('[data-yt-comp]');
    if (!comps.length) return;

    const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));

    // Converte a URL para um embed reproduzível, ou null se for link externo
    const buildEmbedUrl = (raw) => {
        let url;
        try { url = new URL(raw); } catch (e) { return null; }
        const host = url.hostname.replace(/^www\./, '');

        if (host === 'youtu.be') {
            const id = url.pathname.split('/').filter(Boolean)[0];
            return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1` : null;
        }
        if (host.endsWith('youtube.com')) {
            if (url.pathname.startsWith('/playlist')) {
                const list = url.searchParams.get('list');
                return list ? `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(list)}` : null;
            }
            const v = url.searchParams.get('v');
            if (v) return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(v)}?autoplay=1`;
        }
        if (host === 'vimeo.com') {
            const id = url.pathname.split('/').filter(Boolean)[0];
            return id ? `https://player.vimeo.com/video/${encodeURIComponent(id)}` : null;
        }
        return null;
    };

    // Miniatura: YouTube usa i.ytimg.com; caso contrário um ícone genérico
    const getThumb = (item) => {
        let url;
        try { url = new URL(item.url); } catch (e) { return null; }
        const host = url.hostname.replace(/^www\./, '');
        if (host === 'youtu.be') {
            const id = url.pathname.split('/').filter(Boolean)[0];
            return id ? `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg` : null;
        }
        if (host.endsWith('youtube.com')) {
            const v = url.searchParams.get('v');
            if (v) return `https://i.ytimg.com/vi/${encodeURIComponent(v)}/hqdefault.jpg`;
        }
        return null;
    };

    // Cria o modal compartilhado uma única vez
    const modalId = 'ytPlayerModal';
    let modalEl = document.getElementById(modalId);
    if (!modalEl) {
        modalEl = document.createElement('div');
        modalEl.className = 'modal fade';
        modalEl.id = modalId;
        modalEl.tabIndex = -1;
        modalEl.setAttribute('aria-hidden', 'true');
        modalEl.innerHTML = `
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ytPlayerModalTitle">Materiais</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div class="modal-body">
                        <div class="yt-player-wrap d-none">
                            <iframe data-yt-iframe width="100%" height="400"
                                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                                allowfullscreen></iframe>
                        </div>
                        <div class="yt-list" data-yt-list></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>`;
        document.body.appendChild(modalEl);

        // Ao fechar, pausa o vídeo removendo o iframe
        modalEl.addEventListener('hidden.bs.modal', () => {
            const iframe = modalEl.querySelector('[data-yt-iframe]');
            const wrap = modalEl.querySelector('.yt-player-wrap');
            if (iframe) { iframe.src = ''; wrap.classList.add('d-none'); }
        });
    }

    const listEl = modalEl.querySelector('[data-yt-list]');
    const wrapEl = modalEl.querySelector('.yt-player-wrap');
    const iframeEl = modalEl.querySelector('[data-yt-iframe]');
    const titleEl = modalEl.querySelector('#ytPlayerModalTitle');

    const getItems = (comp) => {
        // 1) JSON central (data-key aponta para window.RESOURCES)
        if (comp.dataset.key) {
            const section = (window.RESOURCES || {})[comp.dataset.key];
            if (section && Array.isArray(section.items)) return { items: section.items, title: section.title || comp.dataset.title };
        }
        // 2) Fallback: data-videos inline
        try {
            const inline = JSON.parse(comp.dataset.videos || '[]');
            if (inline.length) return { items: inline, title: comp.dataset.title };
        } catch (e) { /* ignore */ }
        return { items: [], title: comp.dataset.title || 'Materiais' };
    };

    comps.forEach((comp) => {
        const { items, title } = getItems(comp);
        const count = comp.querySelector('[data-yt-count]');
        if (count) count.textContent = items.length;
        if (comp.dataset.title && !comp.dataset.key) {
            const h = comp.querySelector('.yt-card-title');
            if (h) h.textContent = title;
        }

        comp.addEventListener('click', () => {
            if (!items.length) return;
            titleEl.textContent = title;
            iframeEl.src = '';
            wrapEl.classList.add('d-none');

            listEl.innerHTML = items.map((item, i) => {
                const thumb = getThumb(item);
                const external = item.external || !buildEmbedUrl(item.url);
                const thumbHtml = thumb
                    ? `<img class="yt-thumb" src="${thumb}" alt="Miniatura de ${escapeHtml(item.title)}" loading="lazy">`
                    : `<div class="yt-thumb yt-thumb-fallback"><i class="fa-brands ${external ? 'fa-internet-explorer' : 'fa-play-circle'}"></i></div>`;
                return `
                    <button type="button" class="yt-item" data-index="${i}">
                        ${thumbHtml}
                        <span class="yt-item-title">${escapeHtml(item.title)}</span>
                        ${item.desc ? `<span class="yt-item-desc">${escapeHtml(item.desc)}</span>` : ''}
                    </button>`;
            }).join('');

            listEl.querySelectorAll('.yt-item').forEach((btn) => {
                btn.addEventListener('click', () => {
                    const item = items[Number(btn.dataset.index)];
                    if (!item) return;
                    const embed = buildEmbedUrl(item.url);
                    if (embed) {
                        iframeEl.src = embed;
                        wrapEl.classList.remove('d-none');
                        wrapEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    } else {
                        window.open(item.url, '_blank', 'noopener');
                    }
                });
            });

            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
        });
    });
});