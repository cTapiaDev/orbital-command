import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { spacexService } from '@/services/spacexServices'

export const useCompanyStore = defineStore('company', () => {
    const companyInfo = ref(null)
    const isLoading = ref(false)
    const isError = ref(false)

    const totalValuation = computed(() => {
        return companyInfo.value?.valuation || 0
    })

    const fetchCompanyData = async () => {
        if (companyInfo.value) return

        isLoading.value = true
        isError.value = false

        try {
            const response = await spacexService.getCompanyInfo()
            companyInfo.value = response
        } catch (error) {
            isError.value = true
        } finally {
            isLoading.value = false
        }
    }

    return {
        companyInfo,
        isLoading,
        isError,
        totalValuation,
        fetchCompanyData,
    }
})
