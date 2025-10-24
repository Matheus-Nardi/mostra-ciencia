
export function setupErrorHandler() {
  if (typeof window === 'undefined') return;

  const EXTENSION_ERRORS = [
    'Could not establish connection. Receiving end does not exist',
    'Extension context invalidated',
    'message channel closed',
    'chrome-extension://',
    'moz-extension://',
    'safari-extension://',
    'Extension.sendMessage'
  ];

  const originalError = window.console.error;
  window.console.error = (...args: unknown[]) => {
    const errorMessage = args.join(' ');
    
    const isExtensionError = EXTENSION_ERRORS.some(pattern => 
      errorMessage.includes(pattern)
    );

    if (!isExtensionError || process.env.NODE_ENV === 'development') {
      originalError.apply(console, args);
    }
  };

  window.addEventListener('unhandledrejection', (event) => {
    const errorMessage = event.reason?.message || event.reason || '';
    
    const isExtensionError = EXTENSION_ERRORS.some(pattern => 
      String(errorMessage).includes(pattern)
    );

    if (isExtensionError && process.env.NODE_ENV === 'production') {
      event.preventDefault();
    }
  });

  // Intercepta erros globais
  const originalOnError = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    const errorMessage = String(message);
    
    const isExtensionError = EXTENSION_ERRORS.some(pattern => 
      errorMessage.includes(pattern) || 
      (source && source.includes('extension://'))
    );

    if (!isExtensionError || process.env.NODE_ENV === 'development') {
      if (originalOnError) {
        return originalOnError(message, source, lineno, colno, error);
      }
    }
    
    return isExtensionError && process.env.NODE_ENV === 'production';
  };
}
