import React from 'react';

const AnalyticsScripts = () => {
  return (
    <>
      <script src="https://web.cmp.usercentrics.eu/modules/autoblocker.js"></script>
      <script id="usercentrics-cmp" src="https://web.cmp.usercentrics.eu/ui/loader.js" data-settings-id="E8nUb-X5G5UeAm" async></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MH44M4M')`,
        }}
      ></script>
    </>
  );
};

export default AnalyticsScripts;
