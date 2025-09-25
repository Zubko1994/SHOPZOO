import { ref } from 'vue'

// Глобальное хранилище для выбранного животного
export const useAnimalStore = () => {
    const selectedAnimal = ref(null)

    const setSelectedAnimal = (animalId) => {
        selectedAnimal.value = animalId
        console.log('Animal selected in store:', animalId)
        // Также сохраняем в localStorage для persistence
        if (animalId) {
            localStorage.setItem('selectedAnimal', animalId.toString())
        } else {
            localStorage.removeItem('selectedAnimal')
        }
    }

    const getSelectedAnimal = () => {
        // Сначала проверяем store, потом localStorage
        if (selectedAnimal.value) {
            return selectedAnimal.value
        }
        const storedAnimal = localStorage.getItem('selectedAnimal')
        if (storedAnimal) {
            selectedAnimal.value = parseInt(storedAnimal)
            return selectedAnimal.value
        }
        return null
    }

    const clearSelectedAnimal = () => {
        selectedAnimal.value = null
        localStorage.removeItem('selectedAnimal')
    }

    return {
        selectedAnimal,
        setSelectedAnimal,
        getSelectedAnimal,
        clearSelectedAnimal
    }
}