import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
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

    console.log(this.recipeForm)
  }

  initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]); 

    if (this.editMode) {
      this.editedRecipe = this.recipeService.getRecipeById(this.recipeIndex);
      recipeName = this.editedRecipe.name;
      recipeImagePath = this.editedRecipe.imagePath;
      recipeDescription = this.editedRecipe.description;
      // Check if recipes exist or not
      if(this.editedRecipe['ingredients']){
        for (let ingredient of this.editedRecipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, [
        Validators.required,
        Validators.minLength(20)
      ]),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  submitForm() {
    this.submitted = true;
    if (this.recipeForm.valid) {
      const newRecipe = new Recipe(
        this.recipeForm.value['name'],
        this.recipeForm.value['description'],
        this.recipeForm.value['imagePath'],
        this.recipeForm.value['ingredients']
      );
      if (this.editMode){
        this.recipeService.updateRecipe(this.recipeIndex, newRecipe);
      } else {
        this.recipeService.addRecipe(newRecipe);
      }
      this.editMode = false;
      this.submitted = false;
    }
  }

  onDeleteIngredient(index: number){}
}
