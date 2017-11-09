"use strict";
/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:component-selector  */
var core_1 = require("@angular/core");
var RowEditorComponent = (function () {
    function RowEditorComponent() {
        this.save = new core_1.EventEmitter();
        this.cancel = new core_1.EventEmitter();
        this.validationSummary = { isValid: true, text: null };
    }
    RowEditorComponent.prototype.onCancelChanges = function () {
        this.cancel.emit({
            table: this.table,
            row: this.row,
            column: this.column
        });
    };
    RowEditorComponent.prototype.onSaveChanges = function () {
        this.validate();
        if (this.isValid()) {
            this.save.emit({
                table: this.table,
                row: this.row,
                column: this.column
            });
        }
    };
    RowEditorComponent.prototype.isValid = function () {
        return this.validationSummary && this.validationSummary.isValid;
    };
    RowEditorComponent.prototype.validate = function () {
        this.validationSummary = this.table.validateRow(this.row);
    };
    __decorate([
        core_1.Input()
    ], RowEditorComponent.prototype, "table", void 0);
    __decorate([
        core_1.Input()
    ], RowEditorComponent.prototype, "row", void 0);
    __decorate([
        core_1.Input()
    ], RowEditorComponent.prototype, "column", void 0);
    __decorate([
        core_1.Output()
    ], RowEditorComponent.prototype, "save", void 0);
    __decorate([
        core_1.Output()
    ], RowEditorComponent.prototype, "cancel", void 0);
    RowEditorComponent = __decorate([
        core_1.Component({
            selector: 'row-editor',
            templateUrl: './row.editor.html',
            styleUrls: ['./row.editor.css']
        })
    ], RowEditorComponent);
    return RowEditorComponent;
}());
exports.RowEditorComponent = RowEditorComponent;
