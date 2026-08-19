// ============================================================
// Trilha de Fundamentos da Web — progresso do aluno.
// Guarda as etapas concluídas em localStorage e atualiza a
// timeline, a barra de progresso e os botões de conclusão.
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'tbTrilhaFundamentosDone';
    const steps = Array.from(document.querySelectorAll('.timeline-item[data-section]'));
    if (!steps.length) return;

    const stepIds = steps.map(s => s.dataset.section);
    const progressBar = document.getElementById('trProgressBar');
    const progressText = document.getElementById('trProgressText');

    const loadDone = () => {
        try {
            const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            return Array.isArray(raw) ? raw.filter(id => stepIds.includes(id)) : [];
        } catch (e) {
            return [];
        }
    };

    const saveDone = (done) => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(done)); } catch (e) { /* ignore */ }
    };

    const setStatusLabel = (item, kind) => {
        const label = item.querySelector('.tl-status');
        if (!label) return;
        label.classList.remove('is-next', 'is-current', 'is-done');
        if (kind === 'done') {
            label.classList.add('is-done');
            label.innerHTML = '&#10003; Concluído';
        } else if (kind === 'current') {
            label.classList.add('is-current');
            label.innerHTML = '&#9679; Atual';
        } else {
            label.classList.add('is-next');
            label.innerHTML = '&#9675; Próximo';
        }
    };

    const render = () => {
        const done = loadDone();
        const currentId = stepIds.find(id => !done.includes(id)) || stepIds[stepIds.length - 1];

        steps.forEach(item => {
            const id = item.dataset.section;
            const isDone = done.includes(id);
            item.classList.toggle('done', isDone);
            setStatusLabel(item, isDone ? 'done' : (id === currentId ? 'current' : 'next'));
        });

        document.querySelectorAll('[data-complete-step]').forEach(btn => {
            const isDone = done.includes(btn.dataset.completeStep);
            btn.disabled = isDone;
            btn.classList.toggle('btn-success', isDone);
            btn.classList.toggle('btn-primary', !isDone);
            btn.innerHTML = isDone
                ? '<i class="fa-solid fa-check me-1"></i>Etapa concluída'
                : '<i class="fa-solid fa-circle-check me-1"></i>Concluir etapa';
        });

        if (progressBar) progressBar.style.width = `${(done.length / stepIds.length) * 100}%`;
        if (progressText) {
            const pct = Math.round((done.length / stepIds.length) * 100);
            progressText.textContent = `${done.length} de ${stepIds.length} etapas concluídas (${pct}%)`;
        }

        return { done, currentId };
    };

    // Avança para a próxima seção não concluída (ativa a aba e rola até ela)
    const goToStep = (id) => {
        const item = steps.find(s => s.dataset.section === id);
        if (!item) return;
        item.click();
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Marca a etapa atual como concluída e avança
    document.querySelectorAll('[data-complete-step]').forEach(btn => {
        btn.addEventListener('click', () => {
            const done = loadDone();
            const id = btn.dataset.completeStep;
            if (!done.includes(id)) done.push(id);
            saveDone(done);
            const { currentId } = render();
            const nextId = stepIds.find(s => !done.includes(s)) || currentId;
            goToStep(nextId);
        });
    });

    // "Começar trilha": rola até a primeira etapa não concluída
    const startBtn = document.getElementById('trStart');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            const done = loadDone();
            const id = stepIds.find(s => !done.includes(s)) || stepIds[0];
            goToStep(id);
        });
    }

    // Reinicia o progresso
    const resetBtn = document.getElementById('trReset');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
            render();
            goToStep(stepIds[0]);
        });
    }

    render();
});