import fetch from "node-fetch";
import DomainModel from "../model/domain.js";

const RAPID_API_KEY = "0c58e102demsh61ba6556971d5b6p1b71d6jsn0c7370e5b42b"; 
const DOMAINR_HOST = "domainr.p.rapidapi.com";

const TLD_LIST = [".COM", ".NET", ".ORG", ".VN", ".COM.VN", ".EDU.VN"]; 

async function checkDomainr(domain) {
  const url = `https://${DOMAINR_HOST}/v2/status?domain=${domain}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": DOMAINR_HOST,
    },
  });

  const data = await res.json();
  if (data && data.status && data.status.length > 0) {
    const state = data.status[0].status;
    return {
      domain,
      available: state.includes("available"),
      state,
      source: "domainr",
    };
  }
  return { domain, available: null, state: null, source: "domainr" };
}

export async function checkDomainSmart(input) {
  const isFullDomain = /\./.test(input);

  if (isFullDomain) {
    const info = await checkDomainr(input);

    // Lấy đuôi domain (vd: .com, .com.vn) → chuyển sang IN HOA
    const tld = "." + input.split(".").slice(1).join(".").toUpperCase();
    const domainDoc = await DomainModel.findOne({ name: tld }).lean();

    return {
      ...info,
      price: domainDoc ? domainDoc.newPrice : null,
      renewPrice: domainDoc ? domainDoc.renewPrice : null,
      dbId: domainDoc ? domainDoc._id : null,
    };
  } else {
    const results = [];
    for (let tld of TLD_LIST) {
      const fullDomain = `${input}${tld.toLowerCase()}`; // để query API thì dùng chữ thường
      const info = await checkDomainr(fullDomain);

      // Lấy giá từ DB bằng tld viết HOA (khớp DB)
      const domainDoc = await DomainModel.findOne({ name: tld }).lean();
        console.log(`Searching for TLD: ${tld}, found in DB:`, !!domainDoc); 
      results.push({
        ...info,
        price: domainDoc ? domainDoc.newPrice : null,
        renewPrice: domainDoc ? domainDoc.renewPrice : null,
        dbId: domainDoc ? domainDoc._id : null,
      });
    }
    return results;
  }
}
