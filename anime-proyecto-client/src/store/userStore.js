const initialState = {
    login: false,
    user: {
        username: '',
        id: '',
        email: '',
    }
}
const userStore = (state = initialState, action) => {
    switch (action.type) {
        case "loginIn":
            // console.log(action.payload.value)
            if (action.payload.value == 1) {
                return {
                    user: {
                        username: action.payload.data.username,
                        email: action.payload.data.email,
                        id: action.payload.data.id,


                    },
                    login: state.login = true,
                }
            }
    }
    return state
}

export default userStore