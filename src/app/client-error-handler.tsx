'use client'

import { useEffect } from 'react';

export default function ClientErrorHandler() {
  useEffect(() => {
    // Lista de mensagens de erro conhecidas de extensões do navegador
    const EXTENSION_ERRORS = [
      'Could not establish connection. Receiving end does not exist',
      'Extension context invalidated',
      'message channel closed',
      'chrome-extension://',
      'moz-extension://',
      'safari-extension://',
      'Extension.sendMessage'
    ];

    const originalError = console.error;
  console.error = (...args: unknown[]) => {
      const errorMessage = args.join(' ');
      
      const isExtensionError = EXTENSION_ERRORS.some(pattern => 
        errorMessage.includes(pattern)
      );

      if (!isExtensionError || process.env.NODE_ENV === 'development') {
        originalError.apply(console, args);
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const errorMessage = event.reason?.message || event.reason || '';
      
      const isExtensionError = EXTENSION_ERRORS.some(pattern => 
        String(errorMessage).includes(pattern)
      );

      if (isExtensionError && process.env.NODE_ENV === 'production') {
        event.preventDefault();
      }
    };

    // Intercepta erros globais
    const handleError = (event: Event) => {
      const errorEvent = event as ErrorEvent;
      const errorMessage = errorEvent.message || '';
      const isExtensionError = EXTENSION_ERRORS.some(pattern => 
        errorMessage.includes(pattern) || 
        (errorEvent.filename && errorEvent.filename.includes('extension://'))
      );
      if (isExtensionError && process.env.NODE_ENV === 'production') {
        event.preventDefault?.();
      }
    };

    // Adiciona listeners
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
  window.addEventListener('error', handleError);

    // Cleanup
    return () => {
      console.error = originalError;
  window.removeEventListener('unhandledrejection', handleUnhandledRejection);
  window.removeEventListener('error', handleError);
    };
  }, []);

  return null;
}
