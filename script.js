let quizzes = [];
let students = [];

function addQuiz() {

    let title = document.getElementById("quizTitle").value;
    let max = Number(document.getElementById("maxMarks").value);
    let pass = Number(document.getElementById("passMarks").value);

    if (!title || max <= 0 || pass < 0 || pass > max) {
        alert("Enter valid quiz details");
        return;
    }

    quizzes.push({
        title: title,
        maxMarks: max,
        passMarks: pass
    });

    alert("Quiz Created Successfully!");

    document.getElementById("quizTitle").value = "";
    document.getElementById("maxMarks").value = "";
    document.getElementById("passMarks").value = "";

    updateMarksForm();
}

function addStudent() {

    let name = document.getElementById("studentName").value;

    if (!name.trim()) {
        alert("Enter student name");
        return;
    }

    students.push({
        name: name.trim(),
        marks: Array(quizzes.length).fill(null)
    });

    alert("Student Added Successfully!");

    document.getElementById("studentName").value = "";

    updateMarksForm();
}

function updateMarksForm() {

    let html = "";

    if (students.length === 0 || quizzes.length === 0) {
        document.getElementById("marksForm").innerHTML =
            "<p>Add quizzes and students first.</p>";
        return;
    }

    students.forEach((student, i) => {

        html += `<h3>${student.name}</h3>`;

        quizzes.forEach((quiz, j) => {

            html += `
                <label>${quiz.title} (Max: ${quiz.maxMarks})</label>

                <input type="number"
                id="mark_${i}_${j}"
                min="0"
                max="${quiz.maxMarks}"
                placeholder="Enter marks">
            `;
        });

    });

    document.getElementById("marksForm").innerHTML = html;
}

function recordMarks() {

    if (!students.length || !quizzes.length) {
        alert("Add quizzes and students first");
        return;
    }

    for (let i = 0; i < students.length; i++) {

        for (let j = 0; j < quizzes.length; j++) {

            let input = document.getElementById(`mark_${i}_${j}`);

            let value = input.value === ""
                ? null
                : Number(input.value);

            if (value === null || value < 0 ||
                value > quizzes[j].maxMarks) {

                alert("Enter valid marks for " + students[i].name);
                return;
            }

            students[i].marks[j] = value;
        }
    }

    displayResults();
}

function displayResults() {

    let html = "";

    quizzes.forEach((quiz, j) => {

        let highest = -Infinity;
        let lowest = Infinity;
        let total = 0;

        html += `
            <h2>${quiz.title}</h2>

            <table>
            <tr>
                <th>Student</th>
                <th>Marks</th>
                <th>Result</th>
            </tr>
        `;

        students.forEach(student => {

            let marks = student.marks[j];

            let status = marks >= quiz.passMarks
                ? "PASS" : "FAIL";

            let css = status === "PASS" ? "pass" : "fail";

            html += `
                <tr>
                    <td>${student.name}</td>
                    <td>${marks}</td>
                    <td class="${css}">${status}</td>
                </tr>
            `;

            highest = Math.max(highest, marks);
            lowest = Math.min(lowest, marks);
            total += marks;
        });

        let average = total / students.length;

        html += `</table>`;

        html += `
            <p>Highest Marks: ${highest}</p>
            <p>Lowest Marks: ${lowest}</p>
            <p>Average Marks: ${average.toFixed(2)}</p>
            <hr>
        `;
    });

    document.getElementById("result").innerHTML = html;

    document.getElementById("statistics").innerHTML = `
        <p>Total Quizzes: ${quizzes.length}</p>
        <p>Total Students: ${students.length}</p>
    `;
}