var janin = {};

janin.currency = {
    createCurrency: function (name, networkVersion, privateKeyPrefix, WIF_Start, CWIF_Start, donate) {
        var currency = {};
        currency.name = name;
        currency.networkVersion = networkVersion;
        currency.privateKeyPrefix = privateKeyPrefix;
        currency.WIF_Start = WIF_Start;
        currency.CWIF_Start = CWIF_Start;
        currency.donate = donate;
        return currency;
    },
    
    name: function() {
        return janin.selectedCurrency.name;
    },

    networkVersion: function() {
        return janin.selectedCurrency.networkVersion;
    },
    
    privateKeyPrefix: function() {
        return janin.selectedCurrency.privateKeyPrefix;
    },
    
    WIF_RegEx: function() {
        return new RegExp("^" + janin.selectedCurrency.WIF_Start + "[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{50}$");
    },
    
    CWIF_RegEx: function() {
        return new RegExp("^" + janin.selectedCurrency.CWIF_Start + "[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{51}$");
    },
    
    // Switch currency
    useCurrency: function(index) {
        janin.selectedCurrency = janin.currencies[index];

        var coinImgUrl = "logos/" + janin.currency.name().toLowerCase() + ".png";
        document.getElementById("coinLogoImg").src = coinImgUrl;
        
        // Update title depending on currency
        document.title = janin.currency.name() + "'s paper wallet generator";
        
        // Regenerate a new wallet when not expensive
        ninja.wallets.singlewallet.generateNewAddressAndKey();
        ninja.wallets.paperwallet.build(document.getElementById('paperpassphrase').value);
        ninja.wallets.brainwallet.view();
        
        // Reset wallet tab when expensive or not applicable
        document.getElementById("bulktextarea").value = "";
        document.getElementById("vanitypubkey").innerHTML = "";
        document.getElementById("vanityprivatekey").innerHTML = "";
        document.getElementById("vanityinput1").value = "";
        document.getElementById("vanityinput2").value = "";
        document.getElementById("vanityaddress").innerHTML = "";
        document.getElementById("vanitypublickeyhex").innerHTML = "";
        document.getElementById("vanityprivatekeywif").innerHTML = "";
        
        
        
        
    },
};

janin.currencies = [
    //                    name, networkVersion, privateKeyPrefix, WIF_Start, CWIF_Start, donate
   	janin.currency.createCurrency ("LimecoinX",   0x66, 0xcc, "7",    "X"    , ""),
    janin.currency.createCurrency ("Megacoin",   0x32, 0xb2, "6",    "T"    , ""),
                   ];
