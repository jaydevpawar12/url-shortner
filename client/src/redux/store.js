import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { authApi } from "./api/authApi";
import authSlice from "./slice/authSlice";
import { urlApi } from "./api/urlApi";
import { adminApi } from "./api/adminApi";


const reduxStore = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [urlApi.reducerPath]: urlApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        auth: authSlice
    },
    middleware: def => [
        ...def(),
        authApi.middleware,
        userApi.middleware,
        urlApi.middleware,
        adminApi.middleware
    ]
})

export default reduxStore