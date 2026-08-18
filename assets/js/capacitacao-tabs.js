document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.timeline-item[data-section]');
    const sections = document.querySelectorAll('.cap-section');

    const activate = (sectionId, { scroll = false } = {}) => {
        if (!sectionId) return;
        items.forEach(it => it.classList.toggle('active', it.dataset.section === sectionId));
        sections.forEach(sec => sec.classList.toggle('active', sec.id === sectionId));
        if (scroll) {
            const target = document.getElementById(sectionId);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    items.forEach(item => {
        item.addEventListener('click', () => activate(item.dataset.section, { scroll: true }));
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activate(item.dataset.section, { scroll: true });
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        const id = link.getAttribute('href').slice(1);
        if (document.getElementById(id) && document.getElementById(id).classList.contains('cap-section')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                activate(id, { scroll: true });
            });
        }
    });
});