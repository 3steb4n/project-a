const initialState = {
    login: false,
    user: {}
}
const userStore = (state = initialState, action) => {
    switch (action.type) {
        case "loginIn":
            // console.log(action.payload.value)
            if (action.payload.value == 1) {
                return {
                    ...state,
                    login: state.login = true,
                }
            }
    }
    return state
}

export default userStore