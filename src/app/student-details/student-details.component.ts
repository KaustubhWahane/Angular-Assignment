// src/app/student-details/student-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  student: Student;

  constructor(private route: ActivatedRoute, private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudentDetails();
  }

  loadStudentDetails(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        const studentId = +params['id'];
        this.studentService.getStudentById(studentId).subscribe((student) => {
          this.student = student;
        });
      }
    });
  }
}
