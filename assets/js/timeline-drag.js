// Draggable timeline with pointer-based drag scrolling and prev/next controls.
// NOTE: pointer capture is intentionally NOT used here — capturing the pointer
// retargets the following click to this container, which would swallow clicks
// on the clickable timeline items.
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-timeline]').forEach(container => {
        let isDown = false;
        let startX = 0;
        let startScroll = 0;
        let dragging = false;

        const onPointerDown = (e) => {
            if (e.button !== undefined && e.button !== 0 && e.pointerType === 'mouse') return;
            isDown = true;
            dragging = false;
            startX = e.pageX;
            startScroll = container.scrollLeft;
            container.classList.add('dragging');
        };

        const onPointerMove = (e) => {
            if (!isDown) return;
            const dx = e.pageX - startX;
            if (!dragging && Math.abs(dx) > 5) {
                dragging = true;
            }
            if (dragging) {
                e.preventDefault();
                container.scrollLeft = startScroll - dx;
            }
        };

        const stopDrag = () => {
            if (!isDown) return;
            isDown = false;
            container.classList.remove('dragging');
        };

        container.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', stopDrag);
        window.addEventListener('pointercancel', stopDrag);

        // Suppress the click that follows a real drag (capture phase, before
        // the click reaches any timeline item), so dragging never activates a card.
        container.addEventListener('click', (e) => {
            if (dragging) {
                e.preventDefault();
                e.stopPropagation();
                dragging = false;
            }
        }, true);
    });

    document.querySelectorAll('.timeline-nav').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.getElementById(btn.dataset.timelineControl);
            if (!target) return;
            const dir = btn.classList.contains('timeline-prev') ? -1 : 1;
            target.scrollBy({ left: dir * target.clientWidth * 0.85, behavior: 'smooth' });
        });
    });
});