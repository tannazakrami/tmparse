var whois = require('freewhois');

module.exports = {
    whoisLookup: async function(domain){
        try{
            const data = await whois(domain)
            if(data.errorCode == 404){
                return "свободен"
            }
            else{
                return "занят"
            }
        }
        catch{
            return "свободен"
        }
    }
}