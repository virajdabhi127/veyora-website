import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import { apiFetch } from './api'

const LOGIN_REQUESTED = 'auth/loginRequested'
const LOGIN_SUCCEEDED = 'auth/loginSucceeded'
const LOGIN_FAILED = 'auth/loginFailed'
const LOGIN_REDIRECT_HANDLED = 'auth/loginRedirectHandled'

export const loginRequested = (credentials) => ({
  type: LOGIN_REQUESTED,
  payload: credentials,
})

export const loginRedirectHandled = () => ({
  type: LOGIN_REDIRECT_HANDLED,
})

const initialAuthState = {
  loading: false,
  error: null,
  user: null,
  device: null,
  redirectTo: null,
}

function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return { ...state, loading: true, error: null, redirectTo: null }
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload.user,
        device: action.payload.device,
        redirectTo: action.payload.redirectTo,
      }
    case LOGIN_FAILED:
      return { ...state, loading: false, error: action.payload }
    case LOGIN_REDIRECT_HANDLED:
      return { ...state, redirectTo: null }
    default:
      return state
  }
}

function* handleLogin({ payload: credentials }) {
  try {
    const userid = credentials.userid.trim()
    const password = credentials.password.trim()

    if (!userid || !password) {
      throw new Error('Enter both user ID and password.')
    }

    const response = yield call(apiFetch, '/auth/login', {
      method: 'POST',
      skipAuthRedirect: true,
      body: JSON.stringify({ userid, password }),
    })

    if (!response) {
      throw new Error('Unable to connect to the server.')
    }

    const data = yield call([response, response.json])

    if (!response.ok) {
      throw new Error(data.message || 'Unable to sign in.')
    }

    if (data.user?.role === 'admin') {
      yield put({
        type: LOGIN_SUCCEEDED,
        payload: { user: data.user, device: null, redirectTo: '/admin' },
      })
      return
    }

    const deviceResponse = yield call(apiFetch, '/devices')
    if (!deviceResponse) {
      throw new Error('Unable to load assigned devices.')
    }

    const deviceData = yield call([deviceResponse, deviceResponse.json])
    if (!deviceResponse.ok) {
      throw new Error(deviceData.message || 'Unable to load assigned devices.')
    }

    const device = deviceData.devices?.[0]
    if (!device) {
      throw new Error('No device assigned.')
    }

    if (device.productCode !== 'EM') {
      throw new Error('No valid product assigned.')
    }

    yield put({
      type: LOGIN_SUCCEEDED,
      payload: { user: data.user, device, redirectTo: '/dashboard' },
    })
  } catch (error) {
    yield put({
      type: LOGIN_FAILED,
      payload: error instanceof Error ? error.message : 'Server error',
    })
  }
}

function* rootSaga() {
  yield takeLatest(LOGIN_REQUESTED, handleLogin)
}

const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({ auth: authReducer })

const store = legacy_createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
)

sagaMiddleware.run(rootSaga)

export default store
