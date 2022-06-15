const dataset = {
    tasks: {
        "task-1": { id: "task-1", content: "Content for task 1" },
        "task-2": { id: "task-2", content: "Content for task-2" },
        "task-3": { id: "task-3", content: "Content for task-3" },
        "task-4": { id: "task-4", content: "Content for task-4" },
        "task-5": { id: "task-5", content: "Content for task-5" },
        "task-6": { id: "task-6", content: "Content for task-6" },
        "task-7": { id: "task-7", content: "Content for task-7" },
        "task-8": { id: "task-8", content: "Content for task-8" },
        "task-9": { id: "task-9", content: "Content for task-9" },
        "task-10": { id: "task-10", content: "Content for task-10" }
    },
    columns: {
        "column-1": { id: "column-1", bgcolor: "#15B5B0", title: "Project Overview", taskIds: ['task-1', 'task-2', 'task-3', 'task-4'] },
        "column-2": { id: "column-2", bgcolor: "#F9BDC0", title: "Tasks", taskIds: ['task-5'] },
        "column-3": { id: "column-3", bgcolor: "#FBE698", title: "In-Progress", taskIds: ['task-6','task-7'] },
        "column-4": { id: "column-4", bgcolor: "#BD10E0", title: "In-Review", taskIds: ['task-8'] },
        "column-5": { id: "column-5", bgcolor: "#A7EC60", title: "Completed", taskIds: ['task-9','task-10'] },
    },
    columnOrder: ["column-1", "column-2", "column-3", "column-4", "column-5"]
}
export default dataset;