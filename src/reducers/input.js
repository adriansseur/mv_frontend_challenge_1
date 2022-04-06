const inputReducer = (state = 0, action) => {
    switch (action.type) {
        case "VALID_INPUT":
            return action.payload
        default:
            return state
    }
}

export default inputReducer