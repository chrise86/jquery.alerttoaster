# jQuery Alert Toaster #

jquery.alerttoaster is a jQuery plugin that displays alerts on a Mac OS X-style slide-down sheet.

## Installation Instructions ##

1. Load `<plugin root>/public/jquery.alerttoaster.css` and `<plugin root>/public/jquery.alerttoaster.min.js` in the head
of your page.
1. Replace the browser's alert box with the slide-down sheet with something like the following.

        jQuery(function () {
            window.alert = function () {
                jQuery.alertToaster.showAlert.apply(jQuery.alertToaster, arguments);
            };
        });
