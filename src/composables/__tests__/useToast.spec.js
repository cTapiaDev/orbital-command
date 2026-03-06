import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useToast } from '../useToast'

describe('useToast Composable', () => {
    beforeEach(() => {
        const { toasts } = useToast()
        toasts.value = []

        vi.useFakeTimers()
    })

    it('añade un nuevo toast al arreglo con el formato correcto', () => {
        const { toasts, addToast } = useToast()

        addToast('Conexión exitosa', 'success')

        expect(toasts.value.length).toBe(1)
        expect(toasts.value[0].message).toBe('Conexión exitosa')
        expect(toasts.value[0].type).toBe('success')
        expect(toasts.value[0].id).toBeDefined()
    })

    it('elimina un toast específico mediante su ID', () => {
        const { toasts, addToast, removeToast } = useToast()

        addToast('Error crítico', 'error')
        const toastId = toasts.value[0].id

        removeToast(toastId)

        expect(toasts.value.length).toBe(0)
    })

    it('elimina el toast automáticamente después de 3 segundos', () => {
        const { toasts, addToast } = useToast()

        addToast('Mensaje temporal', 'info')
        expect(toasts.value.length).toBe(1)

        vi.advanceTimersByTime(3000)

        expect(toasts.value.length).toBe(0)
        vi.useRealTimers()
    })
})
