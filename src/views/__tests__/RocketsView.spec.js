import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import RocketsView from '../RocketsView.vue'

describe('RocketsView.vue', () => {
    const createWrapper = () => {
        return mount(RocketsView, {
            global: {
                plugins: [createTestingPinia({ stubActions: false })],
                stubs: {
                    'font-awesome-icon': true,
                    RocketCard: true,
                    RocketSkeleton: true,
                },
            },
        })
    }

    it('se monta correctamente sin errores de Store', () => {
        const wrapper = createWrapper()

        expect(wrapper.text()).toContain('Flota SpaceX')
    })
})
