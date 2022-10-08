import {createStore} from "redux"
import userStore from "./store/userStore";

const store = createStore(userStore);
export default store;