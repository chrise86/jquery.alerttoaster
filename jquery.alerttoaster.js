/**
 * @copyright Copyright (c) 2011, Dan Bettles
 * @author <a href="mailto:dan@danbettles.net">Dan Bettles</a>
 * @license http://creativecommons.org/licenses/MIT/ MIT
 * @todo Review
 * @todo Document
 */
jQuery.alertToaster = {

    /**
     * @private
     * @type AlertToaster
     */
    oToaster: null,

    /**
     * Creates the AlertToaster object if necessary
     * 
     * @private
     */
    initToaster: function () {
        if (this._getToaster() === null) {
            this.setToaster(this.createToaster());
        }
    },

    /**
     * @private
     * @return {AlertToaster}
     */
    _getToaster: function () {
        return this.oToaster;
    },

    /**
     * @private
     * @param {AlertToaster} p_oToaster
     */
    setToaster: function (p_oToaster) {
        this.oToaster = p_oToaster;
    },

    /**
     * Creates a AlertToaster object
     * 
     * @private
     * @return {AlertToaster}
     */
    createToaster: function () {
        return (function () {
            var oToaster = this;
        
            /**
             * @private
             * @type {jQuery}
             */
            this.oButtonEl = jQuery('<p id="alerttoaster-button" />')
                .append(jQuery('<a href="#"><span>Okay</span></a>')
                    .click(function () {
                        oToaster.pushDown();
                        return false;
                    })
                );
        
            /**
             * @private
             * @type {jQuery}
             */
            this.oMessageEl = jQuery('<p id="alerttoaster-message" />');
        
            /**
             * @private
             * @type {jQuery}
             */
            this.oToastEl = jQuery('<div id="alerttoaster-toast" style="display: none" />')
                .append(this.oMessageEl)
                .append(this.oButtonEl);
        
            /**
             * @private
             * @type {jQuery}
             */
            this.oToasterEl = jQuery('<div id="alerttoaster" style="display: none" />')
                .append(this.oToastEl)
                .appendTo('body');
        
            /**
             * Displays the specified message
             * 
             * @param {String} p_message
             */
            this.popUp = function (p_message) {
                var oToaster = this;

                this.setMessage(p_message);

                this.oToasterEl.fadeIn('fast', function () {
                    oToaster.oToastEl.slideDown('fast');
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
            this.pushDown = function () {
                var oToaster = this;

                this.oToastEl.slideUp('fast', function () {
                    oToaster.setMessage('');
                    oToaster.oToasterEl.fadeOut('fast');
                });
            };

            return this;
        }());
    },

    /**
     * Displays the specified message
     * 
     * @param {String} p_message
     */
    popUp: function (p_message) {
        this.getToaster().popUp(p_message);
    },

    /**
     * Returns the AlertToaster object, creating it first if necessary
     * 
     * @private
     * @return {AlertToaster}
     */
    getToaster: function () {
        this.initToaster();
        return this._getToaster();
    },

    /**
     * Hides the message
     */
    pushDown: function () {
        this.getToaster().pushDown();
    }
};