import OverallStat from '../models/OverallStat.js';

export const getSales = async (req, res) => {
	try {
		const overallStats = await OverallStat.find();

		res.status(200).json(overallStats[0]);
	} catch (error) {
		console.log('Error in getSales controller: ', error.message);
		res.status(404).json({ message: error.message });
	}
};
