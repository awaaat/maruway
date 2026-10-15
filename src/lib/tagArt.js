// Picks an illustration for an insight by its tag. Data articles use the Data and AI set.
const MAP = { Networks: 'network-rack', CCTV: 'cctv-plan', 'Managed IT': 'managed-it-flow', Audio: 'pa-coverage', Telecom: 'telecom-link', Data: 'dai-analytics' };
export const tagArt = (tag) => MAP[tag] || 'dai-brain';
