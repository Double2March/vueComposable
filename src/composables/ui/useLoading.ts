import { reactive } from 'vue'
import type { Loading, LoadingType } from '@/types/ui'

const loadingState = reactive<{
  loadings: Loading[]
  nextId: number
}>({
  loadings: [],
  nextId: 1
})

export function useLoading() {
  const showLoading = (
    message: string = '처리 중...',
    type: LoadingType = 'circle',
    showProgress: boolean = false
  ): number => {
    const loading: Loading = {
      id: loadingState.nextId++,
      message,
      type,
      showProgress,
      progress: 0,
      createdAt: Date.now()
    }
    
    loadingState.loadings.push(loading)
    return loading.id
  }
  
  const hideLoading = (id?: number): void => {
    if (id) {
      // 특정 로딩 제거
      const index = loadingState.loadings.findIndex(l => l.id === id)
      if (index !== -1) {
        loadingState.loadings.splice(index, 1)
      }
    } else {
      // 가장 최근 로딩 제거
      if (loadingState.loadings.length > 0) {
        loadingState.loadings.pop()
      }
    }
  }
  
  const hideAllLoading = (): void => {
    loadingState.loadings.length = 0
  }
  
  //progress Bar
  const updateProgress = (id: number, progress: number): void => {
    const loading = loadingState.loadings.find(l => l.id === id)
    if (loading) {
      loading.progress = Math.max(0, Math.min(100, progress))
    }
  }
  
  return {
    loadings: loadingState.loadings,
    showLoading,
    hideLoading,
    hideAllLoading,
    updateProgress
  }
}