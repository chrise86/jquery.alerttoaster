/*globals jQuery*/
/**
 * @copyright Copyright (c) 2011, Dan Bettles
 * @author <a href="mailto:dan@danbettles.net">Dan Bettles</a>
 * @license http://creativecommons.org/licenses/MIT/ MIT
 */
jQuery.extend(true, {

    alertToaster: {

        /**
         * @private
         * @type Alert
         */
        oAlert: null,

        /**
         * Sets the Alert object
         * 
         * @private
         * @param {Alert} p_oAlert
         */
        setAlert: function (p_oAlert) {
            this.oAlert = p_oAlert;
        },

        /**
         * Returns the Alert object - only
         * 
         * @private
         * @return Alert
         */
        _getAlert: function () {
            return this.oAlert;
        },

        /**
         * Creates the Alert object
         * 
         * Only one alert is ever needed so only one is ever created
         * 
         * @private
         * @param {Object} [p_oOptions]
         * @return Alert
         */
        createAlert: function (p_oOptions) {
            var oOptions = jQuery.extend({
                buttonLabel: 'OK',
                baseZIndex: 9999
            }, jQuery.isPlainObject(p_oOptions) ? p_oOptions : {});

            return (function (p_oOptions) {
                var oAlert = this;

                /**
                 * @private
                 * @type Object
                 */
                this.oOptions = p_oOptions;

                /**
                 * @private
                 * @type jQuery
                 */
                this.oButtonEl = null;

                /**
                 * @private
                 * @type jQuery
                 */
                this.oButtonWrapperEl = null;

                /**
                 * @private
                 * @type jQuery
                 */
                this.oMessageEl = null;

                /**
                 * @private
                 * @type jQuery
                 */
                this.oAlertEl = null;

                /**
                 * @private
                 * @type jQuery
                 */
                this.oBackgroundEl = null;

                /**
                 * Returns the specified option, or all options if a name is not passed
                 * 
                 * @param {String} [p_name]
                 * @return Mixed
                 * @throws "The option does not exist" if the requested option does not exist
                 */
                this.getOptions = function (p_name) {
                    if (typeof p_name === 'string') {
                        if (typeof this.oOptions[p_name] === 'undefined') {
                            throw 'The option does not exist';
                        }

                        return this.oOptions[p_name];
                    }

                    return this.oOptions;
                };

                /**
                 * Sets the message
                 * 
                 * @private
                 * @param {String} p_message
                 */
                this.setMessage = function (p_message) {
                    this.oMessageEl.html(p_message);
                };

                /**
                 * Clears the message
                 * 
                 * @private
                 */
                this.clearMessage = function () {
                    this.setMessage('');
                };

                /**
                 * Sets the position of the alert
                 *
                 * @param {Number} p_left
                 * @param {Number} p_top
                 */
                this.setPosition = function (p_left, p_top) {
                    this.oAlertEl.css({ left: p_left, top: p_top });
                };

                /**
                 * Returns the dimensions of the alert
                 *
                 * @return Object
                 */
                this.getDimensions = function () {
                    var oAlert = this;

                    return {
                        width: oAlert.oAlertEl.width(),
                        height: oAlert.oAlertEl.height()
                    };
                };

                /**
                 * Displays the specified message
                 * 
                 * @param {String} p_message
                 */
                this.show = function (p_message) {
                    var oAlert = this;

                    this.setMessage(p_message);

                    this.oBackgroundEl.fadeIn('fast', function () {
                        oAlert.oAlertEl.slideDown('fast');
                        oAlert.oButtonEl.focus();
                    });
                };

                /**
                 * Hides the alert
                 */
                this.hide = function () {
                    var oAlert = this;

                    this.oAlertEl.slideUp('fast', function () {
                        oAlert.oBackgroundEl.fadeOut('fast');
                        oAlert.clearMessage();
                    });
                };

                this.oButtonEl = jQuery('<a href="#"/>')
                    .append(jQuery('<span/>').html(this.getOptions('buttonLabel')))
                    .click(function () {
                        oAlert.hide();
                        return false;
                    });

                this.oButtonWrapperEl = jQuery('<p id="alerttoaster-button" />')
                    .append(this.oButtonEl);

                this.oMessageEl = jQuery('<p id="alerttoaster-message" />');

                this.oAlertEl = jQuery('<div id="alerttoaster-alert" />')
                    .css({
                        position: 'absolute',
                        top: 0,
                        zIndex: oAlert.getOptions('baseZIndex') + 1,
                        display: 'none'
                    })
                    .click(function () {
                        //Makes sure the alert is focused so the escape-key handler works
                        oAlert.oButtonEl.focus();
                    })
                    .keydown(function (p_oEvent) {
                        if (p_oEvent.keyCode === 27) {
                            oAlert.hide();
                        }
                    })
                    .append(this.oMessageEl)
                    .append(this.oButtonWrapperEl)
                    .appendTo('body');

                this.oBackgroundEl = jQuery('<div id="alerttoaster-background" />')
                    .css({
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        zIndex: oAlert.getOptions('baseZIndex'),
                        display: 'none',
                        width: '100%',
                        height: '100%'
                    })
                    .click(function () {
                        //Makes sure the alert is focused so the escape-key handler works
                        oAlert.oButtonEl.focus();
                    })
                    .appendTo('body');

                return this;
            }(oOptions));
        },

        /**
         * Horizontally-centres the alert in the window
         * 
         * @private
         */
        positionAlert: function () {
            this.getAlert().setPosition(
                parseInt((jQuery(window).width() / 2) - (this.getAlert().getDimensions().width / 2), 10) + 'px',
                0
            );
        },

        /**
         * Returns the Alert object, creating it first if necessary
         * 
         * @private
         * @return Alert
         */
        getAlert: function () {
            var oAlertToaster = this;

            if (this._getAlert() === null) {
                this.setAlert(this.createAlert());

                jQuery(window).resize(function () {
                    oAlertToaster.positionAlert();
                });
            }

            return this._getAlert();
        },

        /**
         * Displays the alert with the specified message
         * 
         * @param {String} p_message
         * @todo Block until the message can be displayed?
         */
        showAlert: function (p_message) {
            this.positionAlert();
            this.getAlert().show(p_message);
        },

        /**
         * Hides the alert
         */
        hideAlert: function () {
            this.getAlert().hide();
        }
    }
});