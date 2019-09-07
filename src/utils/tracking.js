import ReactGA from 'react-ga'

const TRACKING_ID = 'UA-147259310-1'

export const initAnalytics = () => {
  const shouldEnable = process.env.NODE_ENV === 'production'

  if (shouldEnable) {
    ReactGA.initialize(TRACKING_ID)
  }
}

export const trackPage = ({ path }) => {
  ReactGA.pageview(path)
}

export const trackEvent = ({ category, action }) => {
  ReactGA.event({
    category,
    action,
  })
}
