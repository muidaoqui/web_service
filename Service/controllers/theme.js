import Theme from "../model/theme.js";

// Lấy tất cả theme
export const getThemes = async (req, res) => {
  try {
    const themes = await Theme.find();
    res.status(200).json(themes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy 1 theme theo id
export const getThemeById = async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id);
    if (!theme) return res.status(404).json({ message: "Theme not found" });
    res.status(200).json(theme);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo theme mới
export const createTheme = async (req, res) => {
  try {
    const newTheme = new Theme(req.body);
    await newTheme.save();
    res.status(201).json(newTheme);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật theme
export const updateTheme = async (req, res) => {
  try {
    const updatedTheme = await Theme.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTheme) return res.status(404).json({ message: "Theme not found" });
    res.status(200).json(updatedTheme);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa theme
export const deleteTheme = async (req, res) => {
  try {
    const deletedTheme = await Theme.findByIdAndDelete(req.params.id);
    if (!deletedTheme) return res.status(404).json({ message: "Theme not found" });
    res.status(200).json({ message: "Theme deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};