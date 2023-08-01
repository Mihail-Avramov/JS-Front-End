function solve(input) {
    let n = input.shift();

    let tasksData = input.splice(0, n).reduce((acc, current) => {
        let [assignee, taskId, title, status, estimatedPoints] = current.split(":");
        if (!acc.hasOwnProperty(assignee)) {
            acc[assignee] = [];
        }
        acc[assignee].push({ taskId, title, status, estimatedPoints });
        return acc;
    }, {});

    while (input.length > 0) {
        let [currentCommand, currentAssignee, ...currentArguments] = input.shift().split(":");

        const findCurrentAssignee = tasksData.hasOwnProperty(currentAssignee);
        if (!findCurrentAssignee) {
            console.log(`Assignee ${currentAssignee} does not exist on the board!`);
            continue;
        }

        if (currentCommand === "Add New") {
            let [taskId, title, status, estimatedPoints] = [...currentArguments];
            tasksData[currentAssignee].push({ taskId, title, status, estimatedPoints });
        } else if (currentCommand === "Change Status") {
            let [taskId, status] = [...currentArguments];
            const findTaskId = tasksData[currentAssignee].find((t) => t.taskId === taskId);
            if (findTaskId) {
                findTaskId.status = status;
            } else {
                console.log(`Task with ID ${taskId} does not exist for ${currentAssignee}!`);
            }
        } else if (currentCommand === "Remove Task") {
            let [index] = [...currentArguments];
            if (index < 0 || index > tasksData[currentAssignee].length - 1) {
                console.log("Index is out of range!");
            } else {
                tasksData[currentAssignee].splice(index, 1);
            }
        }
    }
    const counters = {
        ToDo: 0,
        "In Progress": 0,
        "Code Review": 0,
        Done: 0,
    };

    Object.values(tasksData).reduce((acc, current) => {
        current.forEach((task) => {
            acc[task.status] += Number(task.estimatedPoints);
        });
        return acc;
    }, counters);

    console.log(`ToDo: ${counters["ToDo"]}pts`);
    console.log(`In Progress: ${counters["In Progress"]}pts`);
    console.log(`Code Review: ${counters["Code Review"]}pts`);
    console.log(`Done Points: ${counters["Done"]}pts`);
    if (counters.Done >= counters["In Progress"] + counters["Code Review"] + counters.ToDo) {
        console.log(`Sprint was successful!`);
    } else {
        console.log(`Sprint was unsuccessful...`);
    }
}

solve([
    "5",
    "Kiril:BOP-1209:Fix Minor Bug:ToDo:3",
    "Mariya:BOP-1210:Fix Major Bug:In Progress:3",
    "Peter:BOP-1211:POC:Code Review:5",
    "Georgi:BOP-1212:Investigation Task:Done:2",
    "Mariya:BOP-1213:New Account Page:In Progress:13",
    "Add New:Kiril:BOP-1217:Add Info Page:In Progress:5",
    "Change Status:Peter:BOP-1290:ToDo",
    "Remove Task:Mariya:1",
    "Remove Task:Joro:1",
]);

// solve([
//     "4",
//     "Kiril:BOP-1213:Fix Typo:Done:1",
//     "Peter:BOP-1214:New Products Page:In Progress:2",
//     "Mariya:BOP-1215:Setup Routing:ToDo:8",
//     "Georgi:BOP-1216:Add Business Card:Code Review:3",
//     "Add New:Sam:BOP-1237:Testing Home Page:Done:3",
//     "Change Status:Georgi:BOP-1216:Done",
//     "Change Status:Will:BOP-1212:In Progress",
//     "Remove Task:Georgi:3",
//     "Change Status:Mariya:BOP-1215:Done",
// ]);
