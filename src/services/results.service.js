const results = [
  {
    session_id: "00000000-0000-0000-0000-000000000001",
    ended_at: "2024-01-15T10:00:00.000Z",
    players: [
      { user_id: "user-1", score: 100, completed: true },
      { user_id: "user-2", score: 80, completed: true },
      { user_id: "user-3", score: 90, completed: true },
    ],
  },
];

exports.getResults = async (query) => {
  const { since } = query;
  if (since) {
    const sinceDate = new Date(since);
    const resultDate = new Date(results[0].ended_at);
    if (sinceDate > resultDate) {
      return [];
    }
  }
  return results;
};