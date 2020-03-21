import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeIndex: number;
  editMode = false;
  recipeForm: FormGroup;
  submitted = false;
  editedRecipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipeIndex = params['id'];
      this.editMode = params['id'] != null; // Will be true if id exists, false when id oesnt exist and we create a new recipe
      this.initForm();
    });
    // Resolver is running before Edit component
    // Return value of resolver can be feched by subscribing to data in this component
    this.route.data.subscribe(response => {
      console.log(response);
    });
  }

  initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.editedRecipe = this.recipeService.getRecipeById(this.recipeIndex);
      recipeName = this.editedRecipe.name;
      recipeImagePath = this.editedRecipe.imagePath;
      recipeDescription = this.editedRecipe.description;
      // Check if recipes exist or not
      if (this.editedRecipe['ingredients']) {
        for (let ingredient of this.editedRecipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern('^[1-9]+[0-9]*$')
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, [
        Validators.required,
        Validators.minLength(20)
      ]),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      ingredients: recipeIngredients
    });
  }

  submitForm() {
    this.submitted = true;
    console.log(this.recipeForm);
    if (this.recipeForm.valid) {
      // Recipe form is exact replica of Recipe structure
      // const newRecipe = new Recipe(
      //   this.recipeForm.value['name'],
      //   this.recipeForm.value['description'],
      //   this.recipeForm.value['imagePath'],
      //   this.recipeForm.value['ingredients']
      // );
      if (this.editMode) {
        this.editMode = false;
        this.recipeService.updateRecipe(
          this.recipeIndex,
          this.recipeForm.value
        );
      } else {
        this.recipeService.addRecipe(this.recipeForm.value);
      }
      this.submitted = false;
      this.recipeForm.reset();
      while (this.formIngredientsArray.length > 0) {
        this.formIngredientsArray.removeAt(0);
      }
      this.onCancel();
    }
  }

  onCancel() {
    this.router.navigate(['../']);
  }

  // Removes the row from elemnt
  onDeleteIngredientsRow(index: number) {
    this.formIngredientsArray.removeAt(index);
  }

  // Add a new row in Form array
  onAddIngredientsRow() {
    this.formIngredientsArray.push(this.createRow());
  }

  // Created a getter to return ingredients form array
  get formIngredientsArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  createRow() {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$')
      ])
    });
  }

  // "recipeForm.get('ingredients').controls in .html gives error in production build
  // To fix this we use
  // get ingredientsControl(){
  //   return (this.recipeForm.get('ingredients') as FormArray).controls;
  // }
}
