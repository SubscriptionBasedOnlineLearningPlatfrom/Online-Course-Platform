import { createModule, getModulesByCourse } from '../../models/moduleModel.js';

export const addModule = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title } = req.body;

    if (!title) return res.status(400).json({ message: 'Module title is required' });

    const newModule = await createModule(courseId, title);
    res.status(201).json({ message: 'Module created', module: newModule });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Module creation failed', error: err.message });
  }
};

export const listModules = async (req, res) => {
  try {
    const { courseId } = req.params;
    const modules = await getModulesByCourse(courseId);
    res.status(200).json({ modules });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch modules', error: err.message });
  }
};
