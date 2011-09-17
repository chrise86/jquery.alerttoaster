/*globals jQuery*/
/**
 * @copyright Copyright (c) 2011, Dan Bettles
 * @author <a href="mailto:dan@danbettles.net">Dan Bettles</a>
 * @license http://creativecommons.org/licenses/MIT/ MIT
 * @todo Review
 * @todo Document
 */
jQuery.extend(true, {

    /**
     * Interface for the Alert Toaster widget
     */
    alertToaster: {

        /**
         * @private
         * @type AlertToaster
         */
        oToaster: null,

        /**
         * @private
         * @param {AlertToaster} p_oToaster
         */
        setToaster: function (p_oToaster) {
            this.oToaster = p_oToaster;
        },

        /**
         * @private
         * @return AlertToaster
         */
        _getToaster: function () {
            return this.oToaster;
        },

        /**
         * Creates the AlertToaster object
         * 
         * @private
         * @return AlertToaster
         */
        createToaster: function () {
            return (function () {
                var oToaster = this;

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
                        oToaster.hide();
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
                this.oToastEl = jQuery('<div id="alerttoaster-toast" />')
                    .css({
                        position: 'absolute',
                        top: 0,
                        zIndex: oToaster.baseZIndex + 1,
                        display: 'none'
                    })
                    .click(function () {
                        //Makes sure the toast is focused so the escape-key handler works
                        oToaster.oButtonEl.focus();
                    })
                    .keydown(function (p_oEvent) {
                        if (p_oEvent.keyCode === 27) {
                            oToaster.hide();
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
                        zIndex: oToaster.baseZIndex,
                        display: 'none',
                        width: '100%',
                        height: '100%'
                    })
                    .click(function () {
                        //Makes sure the toast is focused so the escape-key handler works
                        oToaster.oButtonEl.focus();
                    })
                    .appendTo('body');

                /**
                 * Displays the specified message
                 * 
                 * @param {String} p_message
                 */
                this.show = function (p_message) {
                    var oToaster = this;

                    this.setMessage(p_message);

                    this.oBackgroundEl.fadeIn('fast', function () {
                        oToaster.oToastEl.slideDown('fast');
                        oToaster.oButtonEl.focus();
                    });
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
                 * Hides the message
                 */
                this.hide = function () {
                    var oToaster = this;

                    this.oToastEl.slideUp('fast', function () {
                        oToaster.setMessage('');
                        oToaster.oBackgroundEl.fadeOut('fast');
                    });
                };

                /**
                 * Positions the message
                 */
                this.positionToast = function () {
                    //Horizontally centre the toast in the window
                    this.oToastEl.css('left', ((jQuery(window).width() / 2) - (this.oToastEl.width() / 2)) + 'px');
                };

                jQuery(window).resize(function () {
                    oToaster.positionToast();
                });

                this.positionToast();

                return this;
            }());
        },

        /**
         * Returns the AlertToaster object, creating it first if necessary
         * 
         * @private
         * @return AlertToaster
         */
        getToaster: function () {
            if (this._getToaster() === null) {
                this.setToaster(this.createToaster());
            }

            return this._getToaster();
        },

        /**
         * Displays the specified message
         * 
         * @param {String} p_message
         * @todo Block until the message can be displayed
         */
        show: function (p_message) {
            this.getToaster().show(p_message);
        },

        /**
         * Hides the message
         */
        hide: function () {
            this.getToaster().hide();
        }
    }
});