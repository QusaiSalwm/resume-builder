import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ResumeService } from '../../resume.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-resume-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    TranslateModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './resume-form.component.html',
  styleUrl: './resume-form.component.scss',
})
export class ResumeFormComponent implements OnInit {
  form: FormGroup;
  profileImage: string | ArrayBuffer | null = null;
  resumeData: any;

  constructor(private fb: FormBuilder, private resumeService: ResumeService) {
    this.form = this.fb.group({
      profileImage: [''],
      firstName: [''],
      lastName: [''],
      birthDate: [''],
      placeOfBirth: [''],
      address: [''],
      zipCode: [''],
      city: [''],
      country: new FormControl(''),
      phone: [''],
      aboutMe: [''],
      email: this.fb.array([]),
      experience: this.fb.array([]),
      training: this.fb.array([]),
      skills: this.fb.array([]),
      hobbies: this.fb.array([]),
    });

    this.form.valueChanges.subscribe((values) => {
      this.resumeService.updateResumeData(values);
      this.saveToLocalStorage();
    });
  }

  hobbiesList = [
    { name: 'Reading', icon: 'book' },
    { name: 'Traveling', icon: 'airplanemode_active' },
    { name: 'Cooking', icon: 'restaurant' },
    { name: 'Gaming', icon: 'videogame_asset' },
    { name: 'Music', icon: 'music_note' },
  ];

  printForm() {
    console.log(this.form.value);
  }

  ngOnInit(): void {
    this.loadFromLocalStorage();
    this.resumeData = this.resumeService.getResumeData();
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
        this.form.get('profileImage')?.setValue(reader.result); // Store in form control
      };
      reader.readAsDataURL(file);
    }
  }

  get experienceControls() {
    return this.form.get('experience') as FormArray;
  }

  get emailControls() {
    return this.form.get('email') as FormArray;
  }

  get trainingControls() {
    return this.form.get('training') as FormArray;
  }

  get skillsControls() {
    return this.form.get('skills') as FormArray;
  }

  // get hobbiesControls() {
  //   return this.form.get('hobbies') as FormArray;
  // }

  get hobbiesControls() {
    return (this.form.get('hobbies') as FormArray).controls;
  }

  addHobby(hobbyName: string) {
    const hobbiesArray = this.form.get('hobbies') as FormArray;
    hobbiesArray.push(this.fb.control(hobbyName));
  }

  removeHobby(index: number) {
    const hobbiesArray = this.form.get('hobbies') as FormArray;
    hobbiesArray.removeAt(index);
  }

  addExperience() {
    this.experienceControls.push(
      this.fb.group({
        jobTitle: [''],
        employer: [''],
        industry: [''],
        fieldOfActivity: [''],
        careerLevel: [''],
        startDate: [''],
        endDate: [''],
        tasks: this.fb.array([]),
      })
    );
  }

  // Function to create a new task entry
  createTask(): FormControl {
    return this.fb.control('');
  }

  removeExperience(index: number) {
    this.experienceControls.removeAt(index);
  }

  getTasksControls(expIndex: number): FormArray {
    return this.experienceControls.at(expIndex).get('tasks') as FormArray;
  }

  addTask(expIndex: number) {
    this.getTasksControls(expIndex).push(this.createTask());
  }

  removeTask(expIndex: number, taskIndex: number) {
    this.getTasksControls(expIndex).removeAt(taskIndex);
  }

  addEducation() {
    this.trainingControls.push(
      this.fb.group({
        specialization: [''],
        college: [''],
        diploma: [''],
        startDate: [''],
        endDate: [''],
      })
    );
  }

  removeEducation(index: number) {
    this.trainingControls.removeAt(index);
  }

  // Methods to dynamically add/remove skills
  addSkill() {
    this.skillsControls.push(this.fb.control(''));
  }

  removeSkill(index: number) {
    this.skillsControls.removeAt(index);
  }

  // addHobby() {
  //   this.hobbiesControls.push(this.fb.control(''));
  // }

  // removeHobby(index: number) {
  //   this.hobbiesControls.removeAt(index);
  // }

  addEmail() {
    this.emailControls.push(this.fb.control(''));
  }

  removeEmail(index: number) {
    this.emailControls.removeAt(index);
  }

  exportJson() {
    const formData = JSON.stringify(this.form.value, null, 2);
    const blob = new Blob([formData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const firstName = this.form.get('firstName')?.value || 'resume';
    const lastName = this.form.get('lastName')?.value || 'file';
    a.download = `${firstName}_${lastName}_resume.json`;
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          this.form.patchValue(jsonData);

          // Handle Experience FormArray
          if (jsonData.experience) {
            this.experienceControls.clear();
            jsonData.experience.forEach((exp: any) => {
              const experienceGroup = this.fb.group({
                jobTitle: exp.jobTitle || '',
                employer: exp.employer || '',
                industry: exp.industry || '',
                fieldOfActivity: exp.fieldOfActivity || '',
                careerLevel: exp.careerLevel || '',
                startDate: exp.startDate || '',
                endDate: exp.endDate || '',
                tasks: this.fb.array([]),
              });

              // Populate tasks array
              if (exp.tasks && Array.isArray(exp.tasks)) {
                const tasksArray = experienceGroup.get('tasks') as FormArray;
                exp.tasks.forEach((task: string) => {
                  tasksArray.push(this.fb.control(task));
                });
              }

              this.experienceControls.push(experienceGroup);
            });
          }

          if (jsonData.training) {
            // Instead of jsonData.education
            this.trainingControls.clear();
            jsonData.training.forEach((edu: any) => {
              this.trainingControls.push(this.fb.group(edu));
            });
          }

          if (jsonData.eamil) {
            // Instead of jsonData.education
            this.emailControls.clear();
            jsonData.eamail.forEach((edu: any) => {
              this.emailControls.push(this.fb.control(edu));
            });
          }

          if (jsonData.skills) {
            this.skillsControls.clear();
            jsonData.skills.forEach((skill: string) => {
              this.skillsControls.push(this.fb.control(skill));
            });
          }
        } catch (error) {
          console.error('Invalid JSON file', error);
        }
      };
      reader.readAsText(file);
    }
  }

  saveToLocalStorage() {
    const formData = this.form.value;
    localStorage.setItem('resumeData', JSON.stringify(formData));
  }

  loadFromLocalStorage() {
    if (typeof window !== 'undefined') {
      const savedData: any = localStorage.getItem('resumeData');

      if (savedData) {
        const jsonData = JSON.parse(savedData);
        this.form.patchValue(jsonData);

        console.log(savedData);

        // Handle Experience FormArray
        if (jsonData.experience) {
          this.experienceControls.clear();
          jsonData.experience.forEach((exp: any) => {
            const experienceGroup = this.fb.group({
              jobTitle: exp.jobTitle || '',
              employer: exp.employer || '',
              industry: exp.industry || '',
              fieldOfActivity: exp.fieldOfActivity || '',
              careerLevel: exp.careerLevel || '',
              startDate: exp.startDate || '',
              endDate: exp.endDate || '',
              tasks: this.fb.array([]),
            });

            // Populate tasks array
            if (exp.tasks && Array.isArray(exp.tasks)) {
              const tasksArray = experienceGroup.get('tasks') as FormArray;
              exp.tasks.forEach((task: string) => {
                tasksArray.push(this.fb.control(task));
              });
            }

            this.experienceControls.push(experienceGroup);
          });
        }

        if (jsonData.training) {
          // Instead of jsonData.education
          this.trainingControls.clear();
          jsonData.training.forEach((edu: any) => {
            this.trainingControls.push(this.fb.group(edu));
          });
        }

         if (jsonData.email) {
           // Instead of jsonData.education
           this.emailControls.clear();
           jsonData.email.forEach((edu: any) => {
             this.emailControls.push(this.fb.control(edu));
           });
         }

        if (jsonData.skills) {
          this.skillsControls.clear();
          jsonData.skills.forEach((skill: string) => {
            this.skillsControls.push(this.fb.control(skill));
          });
        }

        if (jsonData.hobbies) {
          this.hobbiesControls.slice();
          jsonData.hobbies.forEach((hobby: string) => {
            this.hobbiesControls.push(this.fb.control(hobby));
          });
        }
      }
    }
  }
}
