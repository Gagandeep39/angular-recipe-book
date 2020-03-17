import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  index: number;
  editMode = false;

  constructor(private service: ActivatedRoute) {}

  ngOnInit() {
    this.service.params.subscribe((params: Params) => {
      this.index = params["id"];
      this.editMode = params["id"] != null; // Will be true if id exists, false when id oesnt exist and we create a new recipe
    });
  }
}
