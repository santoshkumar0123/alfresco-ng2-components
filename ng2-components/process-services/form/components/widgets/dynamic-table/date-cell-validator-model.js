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
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:component-selector  */
var moment = require("moment");
var DateCellValidator = (function () {
    function DateCellValidator() {
        this.supportedTypes = [
            'Date'
        ];
    }
    DateCellValidator.prototype.isSupported = function (column) {
        return column && column.editable && this.supportedTypes.indexOf(column.type) > -1;
    };
    DateCellValidator.prototype.validate = function (row, column, summary) {
        if (this.isSupported(column)) {
            var value = row.value[column.id];
            var dateValue = moment(value, 'D-M-YYYY');
            if (!dateValue.isValid()) {
                if (summary) {
                    summary.isValid = false;
                    summary.text = "Invalid '" + column.name + "' format.";
                }
                return false;
            }
        }
        return true;
    };
    return DateCellValidator;
}());
exports.DateCellValidator = DateCellValidator;
