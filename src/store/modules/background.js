const state = () => {
    return {
        backgroundImage: null,
        backgroundRepeat: null,
        backgroundAttachment: null,
        backgroundPosition: null,
        backgroundSize: null, 
    }
}

const mutations = {
    update_background: (state,background) => {
        state.backgroundImage = background.backgroundImage
        state.backgroundRepeat = background.backgroundRepeat
        state.backgroundAttachment = background.backgroundAttachment
        state.backgroundPosition = background.backgroundPosition
        state.backgroundSize = background.backgroundSize
    }
}

export default {
    namespaced:true,
    state,
    mutations
}
