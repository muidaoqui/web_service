import whois from "whois-json";

async function checkDomain(domain) {
  try {
    const result = await whois(domain);
    return {
      domain,
      available: !result.domainName, // nếu không có domainName nghĩa là chưa đăng ký
      registrar: result.registrar || null,
      creationDate: result.creationDate || null,
      expirationDate: result.registryExpiryDate || null,
    };
  } catch (error) {
    return {
      domain,
      available: null,
      error: error.message,
    };
  }
}

export default checkDomain;
