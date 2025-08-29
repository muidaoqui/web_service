import checkDomain from "../model/checkDomain.js";

const COMMON_TLDS = [".com", ".net", ".org", ".vn"];

export const getDomainInfo = async (req, res) => {
  try {
    let { domain } = req.query;
    if (!domain) {
      return res.status(400).json({ message: "Vui lòng nhập tên miền cần kiểm tra" });
    }

    let results = [];
    if (!domain.includes(".")) {
      // Nếu chỉ nhập tên (không có TLD) → check nhiều TLD
      results = await Promise.all(COMMON_TLDS.map(tld => checkDomain(domain + tld)));
    } else {
      results = [await checkDomain(domain)];
    }

    res.json({
      input: domain,
      results
    });

  } catch (error) {
    console.error("❌ Lỗi:", error);
    res.status(500).json({ message: "Có lỗi khi kiểm tra domain", error: error.message });
  }
};
