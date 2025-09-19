import { checkDomainSmart } from "../utils/checkDomainFull.js";

export const getDomainInfo = async (req, res) => {
  try {
    let { domain } = req.query;
    if (!domain) {
      return res.status(400).json({ message: "Vui lòng nhập tên miền cần kiểm tra" });
    }

    const results = await checkDomainSmart(domain);

    res.json({
      input: domain,
      results: Array.isArray(results) ? results : [results],
    });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi khi kiểm tra domain", error: error.message });
  }
};
