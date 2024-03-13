// src/app/student-form/student-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  isEditMode: boolean = false;
  studentId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  initializeForm(): void {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0)]],
      grade: ['', Validators.required],
    });
  }

  checkEditMode(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.studentId = +params['id'];
        this.loadStudentData();
      }
    });
  }

  loadStudentData(): void {
    if (this.studentId !== undefined) {
      this.studentService.getStudentById(this.studentId).subscribe((student) => {
        this.studentForm.patchValue(student);
      });
    }
  }

  submitForm(): void {
    const formData = this.studentForm.value;

    if (this.isEditMode) {
      this.studentService.updateStudent(this.studentId, formData).subscribe(() => this.router.navigate(['/']));
    } else {
      this.studentService.createStudent(formData).subscribe(() => this.router.navigate(['/']));
    }
  }
}
