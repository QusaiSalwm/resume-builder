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
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ResumeDialogComponent } from '../resume-dialog/resume-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PdfService } from '../../services/pdf.service';
import { DialogConfig } from '@angular/cdk/dialog';
import { LanguageService } from '../../services/language.service';
import { MatSelectModule } from '@angular/material/select';
import { CustomDateAdapter } from '../../shared/date-adapter';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
    ImageCropperComponent,
    MatSnackBarModule,
    MatSelectModule
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  templateUrl: './resume-form.component.html',
  styleUrl: './resume-form.component.scss',
})
export class ResumeFormComponent implements OnInit {
  form: FormGroup;
  profileImage: string | ArrayBuffer | null = null;
  resumeData: any;
  showCropper: boolean = false;
  imageChangedEvent: any = null;
  currentLanguage: any;

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private pdfService: PdfService,
    private languageService: LanguageService
  ) {
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
      languages: this.fb.array([]),
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
    { name: 'Reading', icon: 'menu_book' },
    { name: 'Writing', icon: 'edit_note' },
    { name: 'Traveling', icon: 'flight_takeoff' },
    { name: 'Photography', icon: 'photo_camera' },
    { name: 'Exercising', icon: 'fitness_center' },
    { name: 'Volunteering', icon: 'volunteer_activism' },
    { name: 'Programming', icon: 'code' },
    { name: 'Music', icon: 'music_note' },
    { name: 'Movies', icon: 'movie' },
    { name: 'Video Games', icon: 'sports_esports' },
    { name: 'Cooking', icon: 'restaurant_menu' },
    { name: 'Drawing', icon: 'brush' },
    { name: 'Self-Learning', icon: 'school' },
  ];

  careerLevels = [
    { value: 'student', label: 'Student / Intern' },
    { value: 'entry_level', label: 'Entry-Level Professional' },
    { value: 'experienced', label: 'Experienced Professional' },
    {
      value: 'manager',
      label: 'Manager (with or without personnel responsibility)',
    },
    { value: 'director', label: 'Director (Department Head, VP, SVP etc.)' },
    { value: 'executive', label: 'Executive (CEO, GF etc.)' },
  ];

  printForm() {
    console.log(this.form.value);
  }

  ngOnInit(): void {
    this.loadFromLocalStorage();
    this.resumeData = this.resumeService.getResumeData();
    this.languageService.currentLang$.subscribe((lang) => {
      this.currentLanguage = lang;
    });
  }

  // onImageSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.profileImage = reader.result;
  //       this.form.get('profileImage')?.setValue(reader.result); // Store in form control
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageChangedEvent = event; // Set the event for the cropper
      this.showCropper = true; // Show the cropper modal
    }
  }

  // Convert Blob to Base64
  convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string); // Resolve with Base64 string
      };
      reader.onerror = reject; // Handle errors
      reader.readAsDataURL(blob); // Convert Blob to Base64
    });
  }

  imageCropped(event: any): void {
    const blob = event.blob;
    if (blob) {
      this.convertBlobToBase64(blob).then((base64) => {
        this.profileImage = base64;
      });
    }
  }

  // Save the cropped image and close the modal
  saveCroppedImage(): void {
    this.showCropper = false; // Hide the cropper modal
    this.form.get('profileImage')?.setValue(this.profileImage); // Store in form control
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

  get languagesControls() {
    return this.form.get('languages') as FormArray;
  }

  // get hobbiesControls() {
  //   return this.form.get('hobbies') as FormArray;
  // }

  get hobbiesControls() {
    return (this.form.get('hobbies') as FormArray).controls;
  }

  addHobby(hobbyName: string) {
    const hobbiesArray = this.form.get('hobbies') as FormArray;

    const isDuplicate = hobbiesArray.controls.some(
      (control) => control.value === hobbyName
    );

    if (!isDuplicate) {
      hobbiesArray.push(this.fb.control(hobbyName));
    } else {
      this.snackBar.open(`Hobby "${hobbyName}" already exists.`, 'Close', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    }
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
        stillInWork: false,
        tasks: this.fb.array([]),
      })
    );
  }

  onStillInWorkChange(index: number) {
    const experienceGroup = this.experienceControls.at(index) as FormGroup;
    const stillInWorkControl = experienceGroup.get('stillInWork');
    const endDateControl = experienceGroup.get('endDate');

    if (stillInWorkControl?.value) {
      endDateControl?.disable();
    } else {
      endDateControl?.enable();
    }
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

  addLanguage() {
    this.languagesControls.push(
      this.fb.group({
        language: [''],
        level: [''],
      })
    );
  }

  removeLanguge(index: number) {
    this.languagesControls.removeAt(index);
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
                stillInWork: exp.stillInWork || false,
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

          if (jsonData.languages) {
            this.languagesControls.clear();
            jsonData.languages.forEach((lang: any) => {
              this.languagesControls.push(
                this.fb.group({
                  language: lang.language || '', // Ensure this control exists
                  level: lang.level || '', // Ensure this control exists
                })
              );
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
              stillInWork: exp.stillInWork || false,
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

        if (jsonData.languages) {
          this.languagesControls.clear();
          jsonData.languages.forEach((lang: any) => {
            this.languagesControls.push(
              this.fb.group({
                language: lang.language || '', // Ensure this control exists
                level: lang.level || '', // Ensure this control exists
              })
            );
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

  openPreviewDialog() {
    let lang = localStorage.getItem('lang');
    let dir = lang == 'ar' ? 'rtl' : 'ltr';

    const dialogConf = new MatDialogConfig();
    dialogConf.width = '100%';
    dialogConf.maxWidth = '100vw';
    dialogConf.height = '100%';
    dialogConf.maxHeight = '100vh';
    dialogConf.disableClose = true;
    dialogConf.autoFocus = false;
    dialogConf.panelClass = 'full-screen-dialog';

    if (lang === 'ar') {
      dialogConf.direction = 'rtl';
    } else {
      dialogConf.direction = 'ltr';
    }

    dialogConf.enterAnimationDuration = '700ms';

    const dialogRef = this.dialog.open(ResumeDialogComponent, dialogConf);
  }

  downloadPDF() {
    // Trigger the download event
    this.pdfService.triggerDownloadPdf();
  }
}
