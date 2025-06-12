
interface EventParams {
  [key: string]: any;
}

export const trackEvent = (eventName: string, params: EventParams = {}) => {
  // GTM integration
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...params,
      timestamp: new Date().toISOString(),
      utm_source: new URLSearchParams(window.location.search).get('utm_source') || 'direct'
    });
  }

  // Console logging for development
  console.log(`Analytics Event: ${eventName}`, params);
};

// Initialize GTM
export const initializeGTM = () => {
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || [];
    
    // GTM script injection
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-5N6LTFX';
    document.head.appendChild(script);

    // GTM noscript fallback
    const noscript = document.createElement('noscript');
    noscript.innerHTML = '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5N6LTFX" height="0" width="0" style="display:none;visibility:hidden"></iframe>';
    document.body.appendChild(noscript);
  }
};
