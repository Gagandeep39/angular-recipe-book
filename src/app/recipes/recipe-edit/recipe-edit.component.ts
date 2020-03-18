import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RecipeService } from "src/app/services/recipe.service";
import { Recipe } from "src/app/models/recipe.model";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  recipeIndex: number;
  editMode = false;
  recipeForm: FormGroup;
  submitted = false;
  editedRecipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipeIndex = params["id"];
      this.editMode = params["id"] != null; // Will be true if id exists, false when id oesnt exist and we create a new recipe
      this.initForm();
    });

    
  }

  initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";

    if (this.editMode) {
      this.editedRecipe = this.recipeService.getRecipeById(this.recipeIndex);
      recipeName = this.editedRecipe.name;
      recipeImagePath = this.editedRecipe.imagePath;
      recipeDescription = this.editedRecipe.description;
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, [
        Validators.required,
        Validators.minLength(20)
      ]),
      imagePath: new FormControl(recipeImagePath, Validators.required)
    });
  }

  submitForm() {
    this.submitted = true;
    if (this.recipeForm.valid) {
      // let name = this.recipeForm.value;
      // let description = this.recipeForm.value;

      // if (this.editMode){
      //   this.recipeService.updateRecipe(this.recipeIndex, newRecipe);
      // } else {
      //   this.recipeService.addRecipe(newRecipe);
      // }
      this.editMode = false;
      this.submitted = false;
    }
  }
}
