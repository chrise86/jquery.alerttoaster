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
     * Creates the AlertToaster object
     * 
     * @private
     * @return {AlertToaster}
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
            this.oButtonEl = jQuery('<a href="#"><span>Okay</span></a>')
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
            this.oEdgeEl = jQuery('<div id="alerttoaster-edge" />');
        
            /**
             * @private
             * @type {jQuery}
             */
            this.oToastEl = jQuery('<div id="alerttoaster-toast" />')
                .css({
                    display: 'none',
                    zIndex: oToaster.baseZIndex + 1
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
                .append(this.oEdgeEl)
                .append(this.oMessageEl)
                .append(this.oButtonContainerEl)
                .appendTo('body');
        
            /**
             * @private
             * @type {jQuery}
             */
            this.oBackgroundEl = jQuery('<div id="alerttoaster-background" />')
                .css({
                    display: 'none',
                    zIndex: oToaster.baseZIndex
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
     * Displays the specified message
     * 
     * @param {String} p_message
     */
    show: function (p_message) {
        this.getToaster().show(p_message);
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
    hide: function () {
        this.getToaster().hide();
    }
};