import React from 'react';
import Script from 'next/script';

const AnalyticsScripts = () => {
  return (
    <>
      <Script src="https://web.cmp.usercentrics.eu/modules/autoblocker.js" strategy="afterInteractive" />
      <Script id="usercentrics-cmp" src="https://web.cmp.usercentrics.eu/ui/loader.js" data-settings-id="E8nUb-X5G5UeAm" strategy="afterInteractive" />
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MH44M4M')`,
        }}
      />
    </>
  );
};

export default AnalyticsScripts;
