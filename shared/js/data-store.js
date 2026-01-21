const defaultData = {
    users: [
        { id: 1, name: "Alice Freeman", email: "alice@test.com", role: "Leader", groupId: 1 },
        { id: 2, name: "John Doe", email: "john@test.com", role: "Member", groupId: 1 }
    ],
    groups: [
        { id: 1, name: "Group 1", day: "Monday", scores: [85, 90] },
        { id: 2, name: "Group 2", day: "Tuesday", scores: [70, 75] },
        { id: 3, name: "Group 1", day: "Monday", scores: [85, 90] },
        { id: 4, name: "Group 2", day: "Tuesday", scores: [70, 75] }
    ]
};

// Load from LocalStorage or use defaults
const DataStore = JSON.parse(localStorage.getItem('scoringAppData')) || defaultData;

// Function to save changes
function saveData() {
    localStorage.setItem('scoringAppData', JSON.stringify(DataStore));
}

// Helper: Get Group Average
function getGroupAvg(groupId) {
    const group = DataStore.groups.find(g => g.id === groupId);
    if (!group || !group.scores.length) return 0;
    return (group.scores.reduce((a, b) => a + b, 0) / group.scores.length).toFixed(1);
}