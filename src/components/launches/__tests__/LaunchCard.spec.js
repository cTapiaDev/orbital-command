import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import LaunchCard from '../LaunchCard.vue'

// Mock de datos
const mockLaunch = {
    id: '5efasdgbase676342321bedf2',
    name: 'FalconSat',
    success: false,
    details: 'Falla en la primera etapa',
}

describe('LaunchCard.vue', () => {
    const createWrapper = () => {
        return mount(LaunchCard, {
            props: {
                launch: mockLaunch,
                formattedDate: '06 de marzo de 2026',
            },
            global: {
                stubs: {
                    'font-awesome-icon': true,
                    AppBadge: true,
                },
            },
        })
    }

    it('renderiza el nombre y los detalles de la misión correctamente', () => {
        const wrapper = createWrapper()

        expect(wrapper.text()).toContain('FalconSat')
        expect(wrapper.text()).toContain('06 de marzo de 2026')
        expect(wrapper.text()).toContain('Falla en la primera etapa')
    })

    it('emite el evento "view-details" con el objeto launch al hacer clic en el botón', async () => {
        const wrapper = createWrapper()

        const button = wrapper.find('button')
        await button.trigger('click')

        expect(wrapper.emitted()).toHaveProperty('view-details')

        const eventPayload = wrapper.emitted('view-details')[0]
        expect(eventPayload[0]).toEqual(mockLaunch)
    })
})
