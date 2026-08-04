(function () {
  "use strict";
  window.HSL = window.HSL || {};
  var data = (HSL.data = HSL.data || { scenarios: {}, order: [] });
  data.categories = [
    "checkin", "complaint", "upsell", "checkout", "privacy", "escalation",
    "fnb", "housekeeping", "overbooking"
  ];
  data.order = [
    "sc-01-checkin-standard", "sc-02-checkin-no-reservation",
    "sc-03-checkin-language-barrier", "sc-04-complaint-noise",
    "sc-05-complaint-billing", "sc-06-complaint-review-threat",
    "sc-07-upsell-arrival", "sc-08-upsell-services",
    "sc-09-checkout-rush", "sc-10-checkout-minibar-dispute",
    "sc-11-privacy-caller", "sc-12-escalation-collapse",
    "sc-13-fnb-breakfast-allergy", "sc-14-housekeeping-lost-property",
    "sc-15-overbooking-walk"
  ];
})();
