/**
 * Created by jtezva on 5/10/2017.
 */
Ext.define('Ice.view.field.NumberfieldIce', {
    extend: 'Ext.form.field.Number',
    xtype: 'numberfieldice',
    
    labelAlign: 'top',
    msgTarget: 'under',

    /**
     * JTEZVA 2 AGOSTO 2K17: SE COMENTA PORQUE ERA MOLESTO VER MENSAJES COMO ESTE: VALOR MINIMO 99999999999999999
     */
    // constructor: function (config) {
    //     var me = this,
    //         paso = 'Construyendo campo numerico';
    //     try {
    //         // los campos numericos no llevan minLength ni maxLength
    //         var maxLength = config.maxLength,
    //             minLength = config.minLength;
    //         delete config.maxLength;
    //         delete config.minLength;

    //         // si el campo no tiene maxValue pero tenia maxLength, se cambia (maxLength 5 = maxValue 99999)
    //         if (Ext.isEmpty(config.maxValue) && Number(maxLength || 0) > 0) {
    //             var maxval = '';
    //             for (var i = 0; i < Number(maxLength); i++) {
    //                 maxval = String(maxval) + String(9);
    //             }
    //             Ice.log('maxLength ', maxLength, ' to maxValue ', maxval);
    //             config.maxValue = Number(maxval);
    //         }

    //         // si el campo no tiene minValue pero tenia minLength, se cambia (minLength 3 = minValue 100)
    //         if (Ext.isEmpty(config.minValue) && Number(minLength || 0) > 0) {
    //             var minval;
    //             if (Number(minLength) === 1) {
    //                 minval = '0';
    //             } else {
    //                 minval = '1';
    //                 for (var i = 1; i < Number(minLength); i++) {
    //                     minval = String(minval) + String(0);
    //                 }
    //             }
    //             Ice.log('minLength ', minLength, ' to minValue ', minval);
    //             config.minValue = Number(minval);
    //         }
    //     } catch (e) {
    //         Ice.generaExcepcion(e, paso);
    //     }
    //     me.callParent(arguments);
    // },
    
    initComponent: function () {
        var me = this,
            configIce = me.config, // la configuracion recibida de TCONFSCR
            configTra = {};        // la transformacion en atributos ext (ejemplo: label se pasa a fieldLabel en toolkit classic)
        
        
        // label -> fieldLabel
        if (configIce.label) {
            configTra.fieldLabel = configIce.label;
        }
        
        
        Ext.apply(me, configTra);
        this.callParent(arguments);

        me.on({
            blur: function (me) {
                Ice.eventManager.change(me, me.getValue());
            }
        });
    },

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////// para el separador de miles /////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    /**
     * @cfg {Boolean} useThousandSeparator
     */
    useThousandSeparator: false,
    
    /**
     * @inheritdoc
     */
    toRawNumber: function (value) {
        
        var cadena = String(value).replace(this.decimalSeparator,'.').replace(new RegExp(Ext.util.Format.thousandSeparator, "g"), '');

        return cadena;
    },
    
    /**
     * @inheritdoc
     */
    getErrors: function (value) {
        if (!this.useThousandSeparator) return this.callParent(arguments);
        
        var me = this,
            errors = Ext.form.field.Text.prototype.getErrors.apply(me, arguments),
            format = Ext.String.format,
            num;

        value = Ext.isDefined(value) ? value : this.processRawValue(this.getRawValue());

        if (value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
            return errors;
        }

        value = me.toRawNumber(value);

        if (isNaN(value.replace(Ext.util.Format.thousandSeparator,''))) {
            errors.push(format(me.nanText, value));
        }

        num = me.parseValue(value);

        // if (me.minValue === 0 && num < 0) {
        //     errors.push(this.negativeText);
        // }
        // else
        if (num < me.minValue) {
            errors.push(format(me.minText, me.minValue));
        }

        if (num > me.maxValue) {
            errors.push(format(me.maxText, me.maxValue));
        }

        return errors;
    },
    
    /**
     * @inheritdoc
     */
    valueToRaw: function (value) {
        if (!this.useThousandSeparator) return this.callParent(arguments);
        
        var me = this;
        var format = "000,000";
        
        if (value && String(value).indexOf('.') !== -1) { // jtezva: solo si recibo algun punto
            for (var i = 0; i < me.decimalPrecision; i++) {
                if (i == 0) format += ".";
                format += "0";
            }
        }
        
        value = me.parseValue(Ext.util.Format.number(value, format));
        value = me.fixPrecision(value);
        value = Ext.isNumber(value) ? value : parseFloat(me.toRawNumber(value));
        value = isNaN(value) ? '' : String(Ext.util.Format.number(value, format)).replace('.', me.decimalSeparator);

        return value;
    },
    
    /**
     * @inheritdoc
     */
    getSubmitValue: function () {
        if (!this.useThousandSeparator)
            return this.callParent(arguments);
        var me = this,
            value = me.callParent();

        if (true||!me.submitLocaleSeparator) {
            value = me.toRawNumber(value);
        }
        return value;
    },
    
    /**
     * @inheritdoc
     */
    setMinValue: function (value) {
        if (!this.useThousandSeparator)
            return this.callParent(arguments);
        var me = this,
            allowed;

        me.minValue = Ext.Number.from(value, Number.NEGATIVE_INFINITY);
        me.toggleSpinners();

        // Build regexes for masking and stripping based on the configured options
        if (me.disableKeyFilter !== true) {
            allowed = me.baseChars + '';

            if (me.allowExponential) {
                allowed += me.decimalSeparator + 'e+-';
            }
            else {
                allowed += Ext.util.Format.thousandSeparator;
                if (me.allowDecimals) {
                    allowed += me.decimalSeparator;
                }
                if (me.minValue < 0) {
                    allowed += '-';
                }
            }

            allowed = Ext.String.escapeRegex(allowed);
            me.maskRe = new RegExp('[' + allowed + ']');
            if (me.autoStripChars) {
                me.stripCharsRe = new RegExp('[^' + allowed + ']', 'gi');
            }
        }
    },
    
    /**
     * @private
     */
    parseValue: function (value) {
        if (!this.useThousandSeparator)
            return this.callParent(arguments);
        value = parseFloat(this.toRawNumber(value));
        return isNaN(value) ? null : value;
    }
    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////// para el separador de miles /////////////////////////
    //////////////////////////////////////////////////////////////////////////////
});