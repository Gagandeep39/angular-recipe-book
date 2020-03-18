import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  index: number;
  editMode = false;
  recipeForm: FormGroup;
  submitted = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.index = params["id"];
      this.editMode = params["id"] != null; // Will be true if id exists, false when id oesnt exist and we create a new recipe
    });

    this.recipeForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', [Validators.required, Validators.minLength(20)]),
      'imagePath': new FormControl('', Validators.required)
    });
  }

  submitForm() {
    this.submitted = true;
    if (this.recipeForm.valid) {
      this.editMode = false;
      this.submitted = false;
    }
  }
}
