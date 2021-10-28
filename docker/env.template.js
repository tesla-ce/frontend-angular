(function (window) {
  window.__env = window.__env || {};
  window.__env.apiUrl = '${API_URL}';
  window.__env.sentryDsn = '${SENTRY_DSN}';
  window.__env.sentryServerName = '${SENTRY_SERVER_NAME}';
  window.__env.sentryEnabled = '${SENTRY_ENABLED}';
  window.__env.version = '${VERSION}';
}(this));
