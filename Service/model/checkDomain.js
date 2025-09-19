import whoiser from "whoiser";

async function checkDomain(domain) {
  try {
    const result = await whoiser(domain, { timeout: 5000 });

    // Lấy thông tin chính
    const registryData = result[Object.keys(result)[0]] || {};

    return {
      domain,
      available: registryData["Domain Name"] ? false : true, // check Domain Name
      registrar: registryData["Registrar"] || null,
      creationDate: registryData["Creation Date"] || null,
      expirationDate: registryData["Registry Expiry Date"] || null,
      nameServers: registryData["Name Server"]
        ? Array.isArray(registryData["Name Server"])
          ? registryData["Name Server"]
          : [registryData["Name Server"]]
        : [],
      status: registryData["Domain Status"]
        ? Array.isArray(registryData["Domain Status"])
          ? registryData["Domain Status"]
          : [registryData["Domain Status"]]
        : [],
    };
  } catch (error) {
    return {
      domain,
      available: null,
      error: error.message,
    };
  }
}

export const getDomainInfo = async (req, res) => {
  try {
    let { domain } = req.query;
    if (!domain) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập tên miền cần kiểm tra" });
    }

    let results = [await checkDomain(domain)];

    res.json({
      input: domain,
      results,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Có lỗi khi kiểm tra domain", error: error.message });
  }
};
