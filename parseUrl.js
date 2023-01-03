const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const axios = require('axios');
const cheerio = require('cheerio');
var make = require('./makeObj.js');
var create = require('./createExcel.js');
var domains = require('./checkDomains.js');
const fs = require('fs');
const httpsProxyAgent = require('https-proxy-agent');
var count = 0;
const {proxy} = JSON.parse(fs.readFileSync('./proxy.json').toString());
const  {userAgent} = JSON.parse(fs.readFileSync('./userAgents.json').toString());
const setData = require('./setData');

const arrayObj = [];

module.exports = {
    parseUrl: async function(url){
        try{
            const opts = {
                headers: {
                    accept: '*/*',
                    'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'sec-ch-ua':
                      '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'x-requested-with': 'XMLHttpRequest',
                    'saa-fp': '140afb08af2eaad6f7f55865af4c96e9',
                    'saa-seller-id': 'null',
                    'saa-installation-id': '5e961e73-53f5-42f2-8ea0-c7bb005fcfae',
                    'accept-encoding': 'gzip, deflate, br',
                    cookie: `_gcl_au=1.1.414883987.1654864485;_gid=GA1.2.900111928.1654864491;G_ENABLED_IDPS=google;id=18424;key=c47803c5a34a3282ad7a01c2be0ca3a8;amp_206c6a=2TNklfK0T5tNF8rS0qF6Et.MTg0MjQ=..1g56pockq.1g56prrau.5.4.9;_ga=GA1.2.1299645822.1654864485;spark_token=eyJpdiI6Im1Lc3lGVnM4K1RIV0NXV0RNNDBmdEE9PSIsInZhbHVlIjoibURRSXI5YmRraVlIWG8xcm1mSUJyMkIwS2xOeXg5blczUnJnSzVBdkVtdEcyXC81Tk10cEhGOHN1aFwvcFltc2s2dXdKaDJ6cmhJNEo2c1RySXcxdzVSZWlFM2VjNmV4cW9rektXREdmUUo0XC9MM3R1NWxCV3YwOStRQ0REOTVYYVVXeWpjcTZUaGlNa2FVZzFRSFdxRWdsaUdWWFFiWllERHF6b3Jpc25zYlpCYTFVUkd5MWVxNTdwZ1RBbnFVN0dnT2p4dWM2OTJ2Y25HcGc0ZDhKWFdsYXFMSUlZbWt6OWx6VUR4MkZDQUYraDhrR2s2dk55N0NFUTlEaVBQNHFGN1wvY0tNMm1IanByd3Z6cG1xZm9ROVlnPT0iLCJtYWMiOiI1MWZjNjIxZjE1MjNlZjMwYjg0NDlkM2JlYjMyMTE2ZjE1Njg1YmI3ZWQ2YWRiNGM1YTgwYmMwMTUxMjNjY2ZmIn0%3D;XSRF-TOKEN=eyJpdiI6ImZNUnU2cnJGOFZmeVZtOG1sc1wvQ3NRPT0iLCJ2YWx1ZSI6IlJySlo5cjc3WlpqNlNUQWYyeEZTT0VvMHp4U2Zwb1VERTgxMm5KNjA3WGQxTlBVRml4T1VzM1wvYk84N2taOXdSIiwibWFjIjoiYzUxMTQ2ZjZiYzEzZDMxZGM3MTdiZDRhZDNjOWJjYmM1YzYxMDYxYmVhNjA1ZWNmZTJkOWE0ODUyZjM4NjZiMCJ9;seller_assistant_app_session=eyJpdiI6IldMRDRuWkVcLyt2TkZEVG05c1FrZmpBPT0iLCJ2YWx1ZSI6IkpIOUVhRWtZbXBheVd3NEV2VlNLSXp0WWIrTGl3V05EaStsaEl2R2JzaG11V3VJUlAyQVJBbzlUOGI3Y0V1M2QiLCJtYWMiOiIzYTIyMTkyODdkODNiNDViYmM0YWE2ZTM5ZWJmMWMwYmM2MDc5ZTQ1MGQ2MDFiMzczNTAyNGNiNDk2MjJmNTI0In0%3D;_ga_QZP6PSZWY9=GS1.1.1654864484.1.1.1654865831.56`,
                    'Referrer-Policy': 'strict-origin-when-cross-origin',
                }
            }
            count++;
            var arrCorr = [];
    
            const proxyServer = proxy[Math.floor(Math.random()* proxy.length)];
            const httpAgent = new httpsProxyAgent.HttpsProxyAgent(proxyServer);
            const axiosProxy = axios.create({httpAgent});
            opts.headers['User-Agent'] = userAgent[Math.floor(Math.random() * userAgent.length)]
            //var data = await fetch(url).then(res => res.text());
            var result = await axiosProxy.get(url, opts);
            var $ = cheerio.load(result.data);
            
            var name = $("#summary > div.double > div.row + div.value, div.markText").text().trim();
            var sNumber = $("#summary > div.double > div.row > div.value").text().trim().split(" ")[0].trim();
            var rNumber = $("#summary > div.double > div:nth-child(2) > div.value").text().split(" ")[0].replace(/[a-z.]/gi, '');
            var status = $("#summary > div:nth-child(5) > div.row > div:nth-child(3) > p:nth-child(1)").text().trim();
            
            var internationalClass = $("#data_container > div.expand_wrapper > div.toggle_container > div.sectionContainer > div:nth-child(3) > div.row > div:nth-child(2)").text().split("\n");
            var intClass = `${internationalClass[1]} ${internationalClass[2]}`;
            var apea;
            try{
                apea = $("#data_container > div.expand_wrapper > div.toggle_container > div.sectionContainer > div.double > div.row > div.value > a").attr('href');
                apea = apea.split(':')[1].toLowerCase();
            }
            catch{
                apea = ""
            }
            var checkApea;
            try{
                checkApea = await domains.whoisLookup(apea.split("@")[1]);
            }
            catch(e){
                return
            }
            
            var checkedApea = `${apea} - ${checkApea}`;
    
            var correspondent = $("#data_container > div.expand_wrapper > div.toggle_container > div.sectionContainer > div:nth-last-child(-n+2) > div.row > div.value").text().split("\n");
            for(var i = 0; i < correspondent.length; i++)
            {
                try{
                    correspondent[i] = correspondent[i].toLowerCase();
                    if(isValidEmail(correspondent[i].toLowerCase())){
                        var domainStatus = await domains.whoisLookup(correspondent[i].split("@")[1]);
                        arrCorr.push(`${correspondent[i]} - ${domainStatus}`);
                    }
                    else{
                        correspondent.splice(i, 1);
                    }
                }
                catch(e){
                    return
                }
            }
    
            var mySet = new Set();
            mySet.add(checkedApea);
            let ar =[]
            arrCorr.forEach((item) => mySet.add(item))
            if(status == "LIVE/REGISTRATION/Issued and Active")
            {
                ar = [name, sNumber, rNumber, status, intClass, checkedApea]
                for(let a of arrCorr){
                    ar.push(a)
                }
                console.log(ar)
                var obj = make.makeObj(name, sNumber, rNumber, status, intClass, checkedApea, Array.from(mySet));
            }
            else{
                return;
            }
            
            let searchItem = sNumber;
            
            if(arrayObj.find(item => item.SerialNumber === searchItem) != undefined){
                return;
            }
            else{
                if(obj.TradeMarkName != '' && obj.SerialNumber != ''){
                    for(let check of ar){
                        if(check.includes('свободен')){
                            await setData([ar])
                            return
                        }
                    }
                    arrayObj.push(obj);
                }
            }
            console.log('=============================================ARRAY LENGTH =================================================',arrayObj.length)
            console.log(`===========================================  ПРОВЕРЕНО ${count} страниц  =============================`)
            create.createExceleFile(arrayObj);
        }
        catch(e){
            return
        }
    }
}

function isValidEmail(email) { 
    return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email); 
} 