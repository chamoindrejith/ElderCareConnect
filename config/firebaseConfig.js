const { initializeApp, applicationDefault }= require('firebase-admin/app');

initializeApp({
  credential: applicationDefault(),
  projectId: 'eldercare-connect',
});