const dataset = {
    tasks: {
        "task-1": { id: "task-1", content: "Content for task 1" },
        "task-2": { id: "task-2", content: "Content for task-2" },
        "task-3": { id: "task-3", content: "Content for task-3" },
        "task-4": { id: "task-4", content: "Content for task-4" }
    },
    columns: {
        "column-1": { id: "column-1", bgcolor:"#15B5B0", title: "Todo", taskIds: ['task-1', 'task-2', 'task-3', 'task-4'] },
        "column-2": { id: "column-2", bgcolor: "#F9BDC0", title: "In Progress", taskIds: [] },
        "column-3": { id: "column-3", bgcolor: "#FBE698", title: "Completed", taskIds: [] },
    },
    columnOrder: ["column-1", "column-2", "column-3"]
}
export default dataset;