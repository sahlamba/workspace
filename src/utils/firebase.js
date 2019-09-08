import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

app.initializeApp(firebaseConfig)

export const uiConfig = {
  signInFlow: 'redirect',
  signInOptions: [
    {
      provider: app.auth.PhoneAuthProvider.PROVIDER_ID,
    },
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => true,
  },
}

export const logout = async () => {
  try {
    const result = await app.auth().signOut()
    return result
  } catch (error) {
    // eslint-disable-next-line
    console.error({ error })
    return error
  }
}

export { app as firebase }
