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
         * @private
         * @return Alert
         */
        createAlert: function () {
            var oAlertToaster = this,
                //@todo Update this so it's the alert only - it's the alert, alone, that's created only the once
                //@todo Z-index should be controlled by the toaster, probably
                oAlert = (function () {
                    var oAlert = this;

                    /**
                     * @private
                     * @type {Integer}
                     */
                    this.baseZIndex = 9999;

                    /**
                     * @private
                     * @type {jQuery}
                     */
                    this.oButtonEl = jQuery('<a href="#"><span>OK</span></a>')
                        .click(function () {
                            oAlert.hide();
                            return false;
                        });

                    /**
                     * @private
                     * @type {jQuery}
                     */
                    this.oButtonContainerEl = jQuery('<p id="alerttoaster-button" />')
                        .append(this.oButtonEl);

                    /**
                     * @private
                     * @type {jQuery}
                     */
                    this.oMessageEl = jQuery('<p id="alerttoaster-message" />');

                    /**
                     * @private
                     * @type {jQuery}
                     */
                    this.oAlertEl = jQuery('<div id="alerttoaster-alert" />')
                        .css({
                            position: 'absolute',
                            top: 0,
                            zIndex: oAlert.baseZIndex + 1,
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
                        .append(this.oButtonContainerEl)
                        .appendTo('body');

                    /**
                     * @private
                     * @type {jQuery}
                     */
                    this.oBackgroundEl = jQuery('<div id="alerttoaster-background" />')
                        .css({
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            zIndex: oAlert.baseZIndex,
                            display: 'none',
                            width: '100%',
                            height: '100%'
                        })
                        .click(function () {
                            //Makes sure the alert is focused so the escape-key handler works
                            oAlert.oButtonEl.focus();
                        })
                        .appendTo('body');

                    /**
                     * Returns the alert's jQuery
                     * 
                     * @return jQuery
                     */
                    this.getEl = function () {
                        return this.oAlertEl;
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
                     * Displays the specified message
                     * 
                     * @param {String} p_message
                     */
                    this.show = function (p_message) {
                        var oAlert = this;

                        this.setMessage(p_message);

                        this.oBackgroundEl.fadeIn('fast', function () {
                            oAlert.getEl().slideDown('fast');
                            oAlert.oButtonEl.focus();
                        });
                    };

                    /**
                     * Hides the message
                     */
                    this.hide = function () {
                        var oAlert = this;

                        this.getEl().slideUp('fast', function () {
                            oAlert.setMessage('');
                            oAlert.oBackgroundEl.fadeOut('fast');
                        });
                    };

                    return this;
                }());

            jQuery(window).resize(function () {
                oAlertToaster.positionAlert();
            });

            return oAlert;
        },

        /**
         * Returns the Alert object, creating it first if necessary
         * 
         * @private
         * @return Alert
         */
        getAlert: function () {
            if (this._getAlert() === null) {
                this.setAlert(this.createAlert());
            }

            return this._getAlert();
        },

        /**
         * Horizontally-centres the alert in the window
         * 
         * @private
         */
        positionAlert: function () {
            var oAlertEl = this.getAlert().getEl();
            oAlertEl.css('left', ((jQuery(window).width() / 2) - (oAlertEl.width() / 2)) + 'px');
        },

        /**
         * Displays the alert with the specified message
         * 
         * @param {String} p_message
         * @todo Block until the message can be displayed?
         */
        showAlert: function (p_message) {
            var oAlert = this.getAlert();
            this.positionAlert();
            oAlert.show(p_message);
        },

        /**
         * Hides the alert
         */
        hideAlert: function () {
            this.getAlert().hide();
        }
    }
});