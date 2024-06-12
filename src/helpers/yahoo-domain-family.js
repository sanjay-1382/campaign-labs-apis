export function get_domain_family(domain) {
    const yahooFamily = new Set(["yahoo.com", "ymail.com", "rocketmail.com", "sbcglobal.net", "yahoo.ae", "yahoo.at", "yahoo.be", "yahoo.ca", "yahoo.ch", "yahoo.co.id", "yahoo.co.il", "yahoo.co.in", "yahoo.co.jp", "yahoo.co.nz", "yahoo.co.th", "yahoo.co.uk", "yahoo.co.za", "yahoo.com.ar", "yahoo.com.au", "yahoo.com.br", "yahoo.com.co", "yahoo.com.hk", "yahoo.com.hr", "yahoo.com.mx", "yahoo.com.my", "yahoo.com.ph", "yahoo.com.sg", "yahoo.com.tr", "yahoo.com.tw", "yahoo.com.vn", "yahoo.cz", "yahoo.de", "yahoo.dk", "yahoo.es", "yahoo.fi", "yahoo.fr", "yahoo.gr", "yahoo.hu", "yahoo.ie", "yahoo.in", "yahoo.it", "yahoo.nl", "yahoo.no", "yahoo.pl", "yahoo.pt", "yahoo.ro", "yahoo.ru", "yahoo.se"]);

    if (yahooFamily.has(domain)) { return Array.from(yahooFamily); }
    else if (domain === "gmail.com") { return "gmail.com"; }
    else { return domain; }
}