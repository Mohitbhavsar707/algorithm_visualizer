// Helper function to create a delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to swap elements in array
async function swap(array, i, j, onCompare, delayMs, isPaused, isReset) {
    while (isPaused()) {
        await delay(100);
        if (isReset()) return false;
    }
    if (isReset()) return false;

    onCompare([...array], [i, j]);
    await delay(delayMs);

    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;

    onCompare([...array], [i, j]);
    await delay(delayMs);
    
    return true;
}

async function partition(array, low, high, onCompare, delayMs, isPaused, isReset) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (isReset()) return -1;
        
        // Visualize comparison with pivot
        onCompare([...array], [j, high]);
        await delay(delayMs);

        if (array[j] < pivot) {
            i++;
            const success = await swap(array, i, j, onCompare, delayMs, isPaused, isReset);
            if (!success) return -1;
        }
    }

    const success = await swap(array, i + 1, high, onCompare, delayMs, isPaused, isReset);
    if (!success) return -1;

    return i + 1;
}

async function quickSortHelper(array, low, high, onCompare, delayMs, isPaused, isReset) {
    if (low < high) {
        const pi = await partition(array, low, high, onCompare, delayMs, isPaused, isReset);
        if (pi === -1) return; // Sorting was reset

        await quickSortHelper(array, low, pi - 1, onCompare, delayMs, isPaused, isReset);
        if (isReset()) return;

        await quickSortHelper(array, pi + 1, high, onCompare, delayMs, isPaused, isReset);
    }
}

export async function quickSort(array, onCompare, delayMs, isPaused, isReset) {
    const arrayCopy = [...array];
    await quickSortHelper(arrayCopy, 0, arrayCopy.length - 1, onCompare, delayMs, isPaused, isReset);
    return arrayCopy;
}