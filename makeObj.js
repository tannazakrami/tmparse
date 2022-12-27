module.exports = {
    makeObj: function(name, sNumber, rNumber, status, internationalClass, apea, correspondent){
        return {
            "TradeMarkName": name,
            "SerialNumber": sNumber,
            "RegistrationNumber": rNumber,
            "Status": status,
            "International Class" : internationalClass,
            "PrimaryEmailAddress": apea,
            "Correspondent": correspondent
        }
    }
}