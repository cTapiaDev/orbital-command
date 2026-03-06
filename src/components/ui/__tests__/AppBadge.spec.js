import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AppBadge from '../AppBadge.vue'

describe('AppBadge.vue', () => {
    it('renderiza correctamente cuando el prop active es true', () => {
        // Montamos el componente e inyectamos el prop
        const wrapper = mount(AppBadge, {
            props: {
                active: true,
            },
        })

        // Comprobar el contenido
        expect(wrapper.text()).toContain('Activo')

        // Comprobar las clases del span
        const spanElement = wrapper.find('span')
        expect(spanElement.classes()).toContain('bg-emerald-500/10')
        expect(spanElement.classes()).toContain('text-emerald-400')
    })

    it('renderiza correctamente cuando el prop active es false', () => {
        // Montamos el componente e inyectamos el prop
        const wrapper = mount(AppBadge, {
            props: {
                active: false,
            },
        })

        // Comprobar el contenido
        expect(wrapper.text()).toContain('Retirado')

        // Comprobar las clases del span
        const spanElement = wrapper.find('span')
        expect(spanElement.classes()).toContain('bg-rose-500/10')
        expect(spanElement.classes()).toContain('text-rose-400')
    })
})
