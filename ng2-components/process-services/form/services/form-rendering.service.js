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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_alfresco_core_1 = require("ng2-alfresco-core");
var index_1 = require("./../components/widgets/index");
var FormRenderingService = (function (_super) {
    __extends(FormRenderingService, _super);
    function FormRenderingService() {
        var _this = _super.call(this) || this;
        _this.defaultValue = index_1.UnknownWidgetComponent;
        _this.types = {
            'text': ng2_alfresco_core_1.DynamicComponentResolver.fromType(index_1.TextWidgetComponent),
            'string': ng2_alfresco_core_1.DynamicComponentResolver.fromType(index_1.TextWidgetComponent),
            'integer': ng2_alfresco_core_1.DynamicComponentResolver.fromType(index_1.NumberWidgetComponent),
            'multi-line-text': ng2_alfresco_core_1.DynamicComponentResolver.fromType(index_1.MultilineTextWidgetComponentComponent),
            'boolean': ng2_alfresco_core_1.DynamicComponentResolver.fromType(index_1.CheckboxWidgetComponent),
            'dropdown': ng2_alfresco_core_1.DynamicComponentResolver.fromType(index_1.DropdownWidgetComponent),
            'date': ng2_alfresco_core_1.DynamicComponentResolver.fromType(index_1.DateWidgetComponent),
            'amount': ng2_alfresco_core_1.DynamicComponentResolver.fromType(index_1.AmountWidgetComponent),
            'radio-buttons': ng2_alfresco_core_1.DynamicComponentResolver.fromType(index_1.RadioButtonsWidgetComponent),
            'hyperlink': ng2_alfresco_core_1.DynamicComponentResolver.fromType(index_1.HyperlinkWidgetComponent),
            'readonly-text': ng2_alfresco_core_1.DynamicComponentResolver.fromType(index_1.DisplayTextWidgetComponentComponent),
            'typeahead': ng2_alfresco_core_1.DynamicComponentResolver.fromType(index_1.TypeaheadWidgetComponent),
            'people': ng2_alfresco_core_1.DynamicComponentResolver.fromType(index_1.PeopleWidgetComponent),
            'functional-group': ng2_alfresco_core_1.DynamicComponentResolver.fromType(index_1.FunctionalGroupWidgetComponent),
            'dynamic-table': ng2_alfresco_core_1.DynamicComponentResolver.fromType(index_1.DynamicTableWidgetComponent),
            'container': ng2_alfresco_core_1.DynamicComponentResolver.fromType(index_1.ContainerWidgetComponent),
            'group': ng2_alfresco_core_1.DynamicComponentResolver.fromType(index_1.ContainerWidgetComponent),
            'document': ng2_alfresco_core_1.DynamicComponentResolver.fromType(index_1.DocumentWidgetComponent)
        };
        _this.types['upload'] = function (field) {
            if (field) {
                var params = field.params;
                if (params && params.link) {
                    return index_1.AttachWidgetComponent;
                }
                return index_1.UploadWidgetComponent;
            }
            return index_1.UnknownWidgetComponent;
        };
        return _this;
    }
    FormRenderingService = __decorate([
        core_1.Injectable()
    ], FormRenderingService);
    return FormRenderingService;
}(ng2_alfresco_core_1.DynamicComponentMapper));
exports.FormRenderingService = FormRenderingService;
