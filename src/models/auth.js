import * as LocalAuthentication from 'expo-local-authentication';

const authenticate = async () => {
  const config = {
    promptMessage: 'Authenticate to access your Sync account',
    disableDeviceFallback: false,
    cancelLabel: 'Cancel',
    fallbackLabel: 'Try Again' // iOS only
  };

  const hasHardwareAsync = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardwareAsync) {
    console.log('No biometric hardware available.');
    return 'error';
  }

  const supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();
  if (supportedBiometrics.length === 0) {
    console.log('No supported biometrics available.');
    return 'error';
  }

  // Wrap the authenticateAsync call inside a try-catch block and return a promise
  try {
    const result = await LocalAuthentication.authenticateAsync(config);
    if (result.success) {
      return 'success';
    } else {
      return 'error';
    }
  } catch (error) {
    return 'error';
  }
};

export default authenticate;