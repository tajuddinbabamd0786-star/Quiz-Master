import java.util.*;

class Quiz {
    String title;
    int maxMarks, passMarks;

    Quiz(String title, int maxMarks, int passMarks) {
        this.title = title;
        this.maxMarks = maxMarks;
        this.passMarks = passMarks;
    }
}

class Student {
    String name;
    int[] marks;

    Student(String name, int n) {
        this.name = name;
        marks = new int[n];
        Arrays.fill(marks, -1);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number of quizzes: ");
        int q = sc.nextInt();
        sc.nextLine();

        Quiz[] quizzes = new Quiz[q];

        for (int i = 0; i < q; i++) {
            System.out.print("Quiz title: ");
            String title = sc.nextLine();

            System.out.print("Maximum marks: ");
            int max = sc.nextInt();

            System.out.print("Pass marks: ");
            int pass = sc.nextInt();
            sc.nextLine();

            quizzes[i] = new Quiz(title, max, pass);
        }

        System.out.print("Enter number of students: ");
        int n = sc.nextInt();
        sc.nextLine();

        Student[] students = new Student[n];

        for (int i = 0; i < n; i++) {
            System.out.print("Student name: ");
            students[i] = new Student(sc.nextLine(), q);

            for (int j = 0; j < q; j++) {
                System.out.print("Marks in " + quizzes[j].title + ": ");
                students[i].marks[j] = sc.nextInt();
            }
            sc.nextLine();
        }

        for (int j = 0; j < q; j++) {
            int highest = Integer.MIN_VALUE;
            int lowest = Integer.MAX_VALUE;
            int total = 0;

            System.out.println("\nQuiz: " + quizzes[j].title);
            System.out.println("Student\tMarks\tResult");

            for (Student s : students) {
                int m = s.marks[j];

                String result = m >= quizzes[j].passMarks
                        ? "PASS" : "FAIL";

                System.out.println(s.name + "\t" + m + "\t" + result);

                highest = Math.max(highest, m);
                lowest = Math.min(lowest, m);
                total += m;
            }

            System.out.println("Highest Marks: " + highest);
            System.out.println("Lowest Marks: " + lowest);
            System.out.println("Average Marks: " + (double) total / n);
        }

        sc.close();
    }
}