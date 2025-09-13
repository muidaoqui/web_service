import checkDomain from "../model/checkDomain.js";
import Domain from "../model/domain.js"; 

const COMMON_TLDS = [".com", ".net", ".org", ".vn"];

export const getDomainInfo = async (req, res) => {
  try {
    let { domain } = req.query;
    if (!domain) {
      return res.status(400).json({ message: "Vui lòng nhập tên miền cần kiểm tra" });
    }

    let results = [];

    if (!domain.includes(".")) {
      // Nếu nhập "tenmien" → check nhiều TLD
      results = await Promise.all(
        COMMON_TLDS.map(async (tld) => {
          const fullDomain = domain + tld;

          // 1️ Check WHOIS
          const whoisInfo = await checkDomain(fullDomain);

          // 2️ Lấy giá từ DB
          const dbInfo = await Domain.findOne({ name: tld.toUpperCase() }); // ví dụ lưu name = ".VN"

          return {
            ...whoisInfo,
            dbPrice: dbInfo ? dbInfo.newPrice : null,
            dbRenewPrice: dbInfo ? dbInfo.renewPrice : null,
            dbTransfer: dbInfo ? dbInfo.transfer : null,
          };
        })
      );
    } else {
      const whoisInfo = await checkDomain(domain);

      const ext = "." + domain.split(".").pop().toUpperCase();
      const dbInfo = await Domain.findOne({ name: ext });

      results = [
        {
          ...whoisInfo,
          dbPrice: dbInfo ? dbInfo.newPrice : null,
          dbRenewPrice: dbInfo ? dbInfo.renewPrice : null,
          dbTransfer: dbInfo ? dbInfo.transfer : null,
        },
      ];
    }

    res.json({ input: domain, results });
  } catch (error) {
    console.error("❌ Lỗi:", error);
    res.status(500).json({ message: "Có lỗi khi kiểm tra domain", error: error.message });
  }
};
