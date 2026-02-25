export const vObserve = {
    mounted: (el) => {
        el.style.opacity = '0'
        el.style.transform = 'translateY(150px)'
        el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        el.style.opacity = '1'
                        el.style.transform = 'translateY(0)'
                        observer.unobserve(el)
                    }
                })
            },
            {
                threshold: 0.1,
            },
        )

        observer.observe(el)
    },
}
