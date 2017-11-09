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
var core_1 = require("@angular/core");
var ng2_alfresco_core_1 = require("ng2-alfresco-core");
var Rx_1 = require("rxjs/Rx");
var form_component_mock_1 = require("../assets/form.component.mock");
var form_service_1 = require("./../services/form.service");
var node_service_1 = require("./../services/node.service");
var widget_visibility_service_1 = require("./../services/widget-visibility.service");
var form_component_1 = require("./form.component");
var index_1 = require("./widgets/index");
describe('FormComponent', function () {
    var formService;
    var formComponent;
    var visibilityService;
    var nodeService;
    var logService;
    beforeEach(function () {
        logService = new ng2_alfresco_core_1.LogService(null);
        visibilityService = new widget_visibility_service_1.WidgetVisibilityService(null, logService);
        spyOn(visibilityService, 'refreshVisibility').and.stub();
        formService = new form_service_1.FormService(null, null, logService);
        nodeService = new node_service_1.NodeService(null);
        formComponent = new form_component_1.FormComponent(formService, visibilityService, null, nodeService);
    });
    it('should check form', function () {
        expect(formComponent.hasForm()).toBeFalsy();
        formComponent.form = new index_1.FormModel();
        expect(formComponent.hasForm()).toBeTruthy();
    });
    it('should allow title if task name available', function () {
        var formModel = new index_1.FormModel();
        formComponent.form = formModel;
        expect(formComponent.showTitle).toBeTruthy();
        expect(formModel.taskName).toBe(index_1.FormModel.UNSET_TASK_NAME);
        expect(formComponent.isTitleEnabled()).toBeTruthy();
        // override property as it's the readonly one
        Object.defineProperty(formModel, 'taskName', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: null
        });
        expect(formComponent.isTitleEnabled()).toBeFalsy();
    });
    it('should not allow title', function () {
        var formModel = new index_1.FormModel();
        formComponent.form = formModel;
        formComponent.showTitle = false;
        expect(formModel.taskName).toBe(index_1.FormModel.UNSET_TASK_NAME);
        expect(formComponent.isTitleEnabled()).toBeFalsy();
    });
    it('should not enable outcome button when model missing', function () {
        expect(formComponent.isOutcomeButtonVisible(null, false)).toBeFalsy();
    });
    it('should enable custom outcome buttons', function () {
        var formModel = new index_1.FormModel();
        formComponent.form = formModel;
        var outcome = new index_1.FormOutcomeModel(formModel, { id: 'action1', name: 'Action 1' });
        expect(formComponent.isOutcomeButtonVisible(outcome, formComponent.form.readOnly)).toBeTruthy();
    });
    it('should allow controlling [complete] button visibility', function () {
        var formModel = new index_1.FormModel();
        formComponent.form = formModel;
        var outcome = new index_1.FormOutcomeModel(formModel, { id: '$save', name: index_1.FormOutcomeModel.SAVE_ACTION });
        formComponent.showSaveButton = true;
        expect(formComponent.isOutcomeButtonVisible(outcome, formComponent.form.readOnly)).toBeTruthy();
        formComponent.showSaveButton = false;
        expect(formComponent.isOutcomeButtonVisible(outcome, formComponent.form.readOnly)).toBeFalsy();
    });
    it('should show only [complete] button with readOnly form ', function () {
        var formModel = new index_1.FormModel();
        formModel.readOnly = true;
        formComponent.form = formModel;
        var outcome = new index_1.FormOutcomeModel(formModel, { id: '$complete', name: index_1.FormOutcomeModel.COMPLETE_ACTION });
        formComponent.showCompleteButton = true;
        expect(formComponent.isOutcomeButtonVisible(outcome, formComponent.form.readOnly)).toBeTruthy();
    });
    it('should not show [save] button with readOnly form ', function () {
        var formModel = new index_1.FormModel();
        formModel.readOnly = true;
        formComponent.form = formModel;
        var outcome = new index_1.FormOutcomeModel(formModel, { id: '$save', name: index_1.FormOutcomeModel.SAVE_ACTION });
        formComponent.showSaveButton = true;
        expect(formComponent.isOutcomeButtonVisible(outcome, formComponent.form.readOnly)).toBeFalsy();
    });
    it('should show [custom-outcome] button with readOnly form and selected custom-outcome', function () {
        var formModel = new index_1.FormModel({ selectedOutcome: 'custom-outcome' });
        formModel.readOnly = true;
        formComponent.form = formModel;
        var outcome = new index_1.FormOutcomeModel(formModel, { id: '$customoutome', name: 'custom-outcome' });
        formComponent.showCompleteButton = true;
        formComponent.showSaveButton = true;
        expect(formComponent.isOutcomeButtonVisible(outcome, formComponent.form.readOnly)).toBeTruthy();
        outcome = new index_1.FormOutcomeModel(formModel, { id: '$customoutome2', name: 'custom-outcome2' });
        expect(formComponent.isOutcomeButtonVisible(outcome, formComponent.form.readOnly)).toBeFalsy();
    });
    it('should allow controlling [save] button visibility', function () {
        var formModel = new index_1.FormModel();
        formModel.readOnly = false;
        formComponent.form = formModel;
        var outcome = new index_1.FormOutcomeModel(formModel, { id: '$save', name: index_1.FormOutcomeModel.COMPLETE_ACTION });
        formComponent.showCompleteButton = true;
        expect(formComponent.isOutcomeButtonVisible(outcome, formComponent.form.readOnly)).toBeTruthy();
        formComponent.showCompleteButton = false;
        expect(formComponent.isOutcomeButtonVisible(outcome, formComponent.form.readOnly)).toBeFalsy();
    });
    it('should load form on refresh', function () {
        spyOn(formComponent, 'loadForm').and.stub();
        formComponent.onRefreshClicked();
        expect(formComponent.loadForm).toHaveBeenCalled();
    });
    it('should get form by task id on load', function () {
        spyOn(formComponent, 'getFormByTaskId').and.stub();
        var taskId = '123';
        formComponent.taskId = taskId;
        formComponent.loadForm();
        expect(formComponent.getFormByTaskId).toHaveBeenCalledWith(taskId);
    });
    it('should get process variable if is a process task', function () {
        spyOn(formService, 'getTaskForm').and.callFake(function (currentTaskId) {
            return Rx_1.Observable.create(function (observer) {
                observer.next({ taskId: currentTaskId });
                observer.complete();
            });
        });
        spyOn(visibilityService, 'getTaskProcessVariable').and.returnValue(Rx_1.Observable.of({}));
        spyOn(formService, 'getTask').and.callFake(function (currentTaskId) {
            return Rx_1.Observable.create(function (observer) {
                observer.next({ taskId: currentTaskId, processDefinitionId: '10201' });
                observer.complete();
            });
        });
        var taskId = '123';
        formComponent.taskId = taskId;
        formComponent.loadForm();
        expect(visibilityService.getTaskProcessVariable).toHaveBeenCalledWith(taskId);
    });
    it('should not get process variable if is not a process task', function () {
        spyOn(formService, 'getTaskForm').and.callFake(function (currentTaskId) {
            return Rx_1.Observable.create(function (observer) {
                observer.next({ taskId: currentTaskId });
                observer.complete();
            });
        });
        spyOn(visibilityService, 'getTaskProcessVariable').and.returnValue(Rx_1.Observable.of({}));
        spyOn(formService, 'getTask').and.callFake(function (currentTaskId) {
            return Rx_1.Observable.create(function (observer) {
                observer.next({ taskId: currentTaskId, processDefinitionId: 'null' });
                observer.complete();
            });
        });
        var taskId = '123';
        formComponent.taskId = taskId;
        formComponent.loadForm();
        expect(visibilityService.getTaskProcessVariable).toHaveBeenCalledWith(taskId);
    });
    it('should get form definition by form id on load', function () {
        spyOn(formComponent, 'getFormDefinitionByFormId').and.stub();
        var formId = '123';
        formComponent.formId = formId;
        formComponent.loadForm();
        expect(formComponent.getFormDefinitionByFormId).toHaveBeenCalledWith(formId);
    });
    it('should get form definition by form name on load', function () {
        spyOn(formComponent, 'getFormDefinitionByFormName').and.stub();
        var formName = '<form>';
        formComponent.formName = formName;
        formComponent.loadForm();
        expect(formComponent.getFormDefinitionByFormName).toHaveBeenCalledWith(formName);
    });
    it('should reload form by task id on binding changes', function () {
        spyOn(formComponent, 'getFormByTaskId').and.stub();
        var taskId = '<task id>';
        var change = new core_1.SimpleChange(null, taskId, true);
        formComponent.ngOnChanges({ 'taskId': change });
        expect(formComponent.getFormByTaskId).toHaveBeenCalledWith(taskId);
    });
    it('should reload form definition by form id on binding changes', function () {
        spyOn(formComponent, 'getFormDefinitionByFormId').and.stub();
        var formId = '123';
        var change = new core_1.SimpleChange(null, formId, true);
        formComponent.ngOnChanges({ 'formId': change });
        expect(formComponent.getFormDefinitionByFormId).toHaveBeenCalledWith(formId);
    });
    it('should reload form definition by name on binding changes', function () {
        spyOn(formComponent, 'getFormDefinitionByFormName').and.stub();
        var formName = '<form>';
        var change = new core_1.SimpleChange(null, formName, true);
        formComponent.ngOnChanges({ 'formName': change });
        expect(formComponent.getFormDefinitionByFormName).toHaveBeenCalledWith(formName);
    });
    it('should not get form on load', function () {
        spyOn(formComponent, 'getFormByTaskId').and.stub();
        spyOn(formComponent, 'getFormDefinitionByFormId').and.stub();
        spyOn(formComponent, 'getFormDefinitionByFormName').and.stub();
        formComponent.taskId = null;
        formComponent.formId = null;
        formComponent.formName = null;
        formComponent.loadForm();
        expect(formComponent.getFormByTaskId).not.toHaveBeenCalled();
        expect(formComponent.getFormDefinitionByFormId).not.toHaveBeenCalled();
        expect(formComponent.getFormDefinitionByFormName).not.toHaveBeenCalled();
    });
    it('should not reload form on binding changes', function () {
        spyOn(formComponent, 'getFormByTaskId').and.stub();
        spyOn(formComponent, 'getFormDefinitionByFormId').and.stub();
        spyOn(formComponent, 'getFormDefinitionByFormName').and.stub();
        formComponent.ngOnChanges({ 'tag': new core_1.SimpleChange(null, 'hello world', true) });
        expect(formComponent.getFormByTaskId).not.toHaveBeenCalled();
        expect(formComponent.getFormDefinitionByFormId).not.toHaveBeenCalled();
        expect(formComponent.getFormDefinitionByFormName).not.toHaveBeenCalled();
    });
    it('should complete form on custom outcome click', function () {
        var formModel = new index_1.FormModel();
        var outcomeName = 'Custom Action';
        var outcome = new index_1.FormOutcomeModel(formModel, { id: 'custom1', name: outcomeName });
        var saved = false;
        formComponent.form = formModel;
        formComponent.formSaved.subscribe(function (v) { return saved = true; });
        spyOn(formComponent, 'completeTaskForm').and.stub();
        var result = formComponent.onOutcomeClicked(outcome);
        expect(result).toBeTruthy();
        expect(saved).toBeTruthy();
        expect(formComponent.completeTaskForm).toHaveBeenCalledWith(outcomeName);
    });
    it('should save form on [save] outcome click', function () {
        var formModel = new index_1.FormModel();
        var outcome = new index_1.FormOutcomeModel(formModel, {
            id: form_component_1.FormComponent.SAVE_OUTCOME_ID,
            name: 'Save',
            isSystem: true
        });
        formComponent.form = formModel;
        spyOn(formComponent, 'saveTaskForm').and.stub();
        var result = formComponent.onOutcomeClicked(outcome);
        expect(result).toBeTruthy();
        expect(formComponent.saveTaskForm).toHaveBeenCalled();
    });
    it('should complete form on [complete] outcome click', function () {
        var formModel = new index_1.FormModel();
        var outcome = new index_1.FormOutcomeModel(formModel, {
            id: form_component_1.FormComponent.COMPLETE_OUTCOME_ID,
            name: 'Complete',
            isSystem: true
        });
        formComponent.form = formModel;
        spyOn(formComponent, 'completeTaskForm').and.stub();
        var result = formComponent.onOutcomeClicked(outcome);
        expect(result).toBeTruthy();
        expect(formComponent.completeTaskForm).toHaveBeenCalled();
    });
    it('should emit form saved event on custom outcome click', function () {
        var formModel = new index_1.FormModel();
        var outcome = new index_1.FormOutcomeModel(formModel, {
            id: form_component_1.FormComponent.CUSTOM_OUTCOME_ID,
            name: 'Custom',
            isSystem: true
        });
        var saved = false;
        formComponent.form = formModel;
        formComponent.formSaved.subscribe(function (v) { return saved = true; });
        var result = formComponent.onOutcomeClicked(outcome);
        expect(result).toBeTruthy();
        expect(saved).toBeTruthy();
    });
    it('should do nothing when clicking outcome for readonly form', function () {
        var formModel = new index_1.FormModel();
        var outcomeName = 'Custom Action';
        var outcome = new index_1.FormOutcomeModel(formModel, { id: 'custom1', name: outcomeName });
        formComponent.form = formModel;
        spyOn(formComponent, 'completeTaskForm').and.stub();
        expect(formComponent.onOutcomeClicked(outcome)).toBeTruthy();
        formComponent.readOnly = true;
        expect(formComponent.onOutcomeClicked(outcome)).toBeFalsy();
    });
    it('should require outcome model when clicking outcome', function () {
        formComponent.form = new index_1.FormModel();
        formComponent.readOnly = false;
        expect(formComponent.onOutcomeClicked(null)).toBeFalsy();
    });
    it('should require loaded form when clicking outcome', function () {
        var formModel = new index_1.FormModel();
        var outcomeName = 'Custom Action';
        var outcome = new index_1.FormOutcomeModel(formModel, { id: 'custom1', name: outcomeName });
        formComponent.readOnly = false;
        formComponent.form = null;
        expect(formComponent.onOutcomeClicked(outcome)).toBeFalsy();
    });
    it('should not execute unknown system outcome', function () {
        var formModel = new index_1.FormModel();
        var outcome = new index_1.FormOutcomeModel(formModel, { id: 'unknown', name: 'Unknown', isSystem: true });
        formComponent.form = formModel;
        expect(formComponent.onOutcomeClicked(outcome)).toBeFalsy();
    });
    it('should require custom action name to complete form', function () {
        var formModel = new index_1.FormModel();
        var outcome = new index_1.FormOutcomeModel(formModel, { id: 'custom' });
        formComponent.form = formModel;
        expect(formComponent.onOutcomeClicked(outcome)).toBeFalsy();
        outcome = new index_1.FormOutcomeModel(formModel, { id: 'custom', name: 'Custom' });
        spyOn(formComponent, 'completeTaskForm').and.stub();
        expect(formComponent.onOutcomeClicked(outcome)).toBeTruthy();
    });
    it('should fetch and parse form by task id', function (done) {
        spyOn(formService, 'getTask').and.returnValue(Rx_1.Observable.of({}));
        spyOn(formService, 'getTaskForm').and.callFake(function (currentTaskId) {
            return Rx_1.Observable.create(function (observer) {
                observer.next({ taskId: currentTaskId });
                observer.complete();
            });
        });
        var taskId = '456';
        formComponent.formLoaded.subscribe(function () {
            expect(formService.getTaskForm).toHaveBeenCalledWith(taskId);
            expect(formComponent.form).toBeDefined();
            expect(formComponent.form.taskId).toBe(taskId);
            done();
        });
        expect(formComponent.form).toBeUndefined();
        formComponent.getFormByTaskId(taskId);
    });
    it('should handle error when getting form by task id', function (done) {
        var error = 'Some error';
        spyOn(formService, 'getTask').and.returnValue(Rx_1.Observable.of({}));
        spyOn(formComponent, 'handleError').and.stub();
        spyOn(formService, 'getTaskForm').and.callFake(function (taskId) {
            return Rx_1.Observable.throw(error);
        });
        formComponent.getFormByTaskId('123').then(function (_) {
            expect(formComponent.handleError).toHaveBeenCalledWith(error);
            done();
        });
    });
    it('should apply readonly state when getting form by task id', function (done) {
        spyOn(formService, 'getTask').and.returnValue(Rx_1.Observable.of({}));
        spyOn(formService, 'getTaskForm').and.callFake(function (taskId) {
            return Rx_1.Observable.create(function (observer) {
                observer.next({ taskId: taskId });
                observer.complete();
            });
        });
        formComponent.readOnly = true;
        formComponent.getFormByTaskId('123').then(function (_) {
            expect(formComponent.form).toBeDefined();
            expect(formComponent.form.readOnly).toBe(true);
            done();
        });
    });
    it('should fetch and parse form definition by id', function () {
        spyOn(formService, 'getFormDefinitionById').and.callFake(function (currentFormId) {
            return Rx_1.Observable.create(function (observer) {
                observer.next({ id: currentFormId });
                observer.complete();
            });
        });
        var formId = '456';
        var loaded = false;
        formComponent.formLoaded.subscribe(function () { return loaded = true; });
        expect(formComponent.form).toBeUndefined();
        formComponent.getFormDefinitionByFormId(formId);
        expect(loaded).toBeTruthy();
        expect(formService.getFormDefinitionById).toHaveBeenCalledWith(formId);
        expect(formComponent.form).toBeDefined();
        expect(formComponent.form.id).toBe(formId);
    });
    it('should handle error when getting form by definition id', function () {
        var error = 'Some error';
        spyOn(formComponent, 'handleError').and.stub();
        spyOn(formService, 'getFormDefinitionById').and.callFake(function () { return Rx_1.Observable.throw(error); });
        formComponent.getFormDefinitionByFormId('123');
        expect(formService.getFormDefinitionById).toHaveBeenCalledWith('123');
        expect(formComponent.handleError).toHaveBeenCalledWith(error);
    });
    it('should fetch and parse form definition by form name', function () {
        spyOn(formService, 'getFormDefinitionByName').and.callFake(function (currentFormName) {
            return Rx_1.Observable.create(function (observer) {
                observer.next(currentFormName);
                observer.complete();
            });
        });
        spyOn(formService, 'getFormDefinitionById').and.callFake(function (currentFormName) {
            return Rx_1.Observable.create(function (observer) {
                observer.next({ name: currentFormName });
                observer.complete();
            });
        });
        var formName = '<form>';
        var loaded = false;
        formComponent.formLoaded.subscribe(function () { return loaded = true; });
        expect(formComponent.form).toBeUndefined();
        formComponent.getFormDefinitionByFormName(formName);
        expect(loaded).toBeTruthy();
        expect(formService.getFormDefinitionByName).toHaveBeenCalledWith(formName);
        expect(formComponent.form).toBeDefined();
        expect(formComponent.form.name).toBe(formName);
    });
    it('should save task form and raise corresponding event', function () {
        spyOn(formService, 'saveTaskForm').and.callFake(function () {
            return Rx_1.Observable.create(function (observer) {
                observer.next();
                observer.complete();
            });
        });
        var saved = false;
        var savedForm = null;
        formComponent.formSaved.subscribe(function (form) {
            saved = true;
            savedForm = form;
        });
        var formModel = new index_1.FormModel({
            taskId: '123',
            fields: [
                { id: 'field1' },
                { id: 'field2' }
            ]
        });
        formComponent.form = formModel;
        formComponent.saveTaskForm();
        expect(formService.saveTaskForm).toHaveBeenCalledWith(formModel.taskId, formModel.values);
        expect(saved).toBeTruthy();
        expect(savedForm).toEqual(formModel);
    });
    it('should handle error during form save', function () {
        var error = 'Error';
        spyOn(formService, 'saveTaskForm').and.callFake(function () { return Rx_1.Observable.throw(error); });
        spyOn(formComponent, 'handleError').and.stub();
        formComponent.form = new index_1.FormModel({ taskId: '123' });
        formComponent.saveTaskForm();
        expect(formComponent.handleError).toHaveBeenCalledWith(error);
    });
    it('should require form with task id to save', function () {
        spyOn(formService, 'saveTaskForm').and.stub();
        formComponent.form = null;
        formComponent.saveTaskForm();
        formComponent.form = new index_1.FormModel();
        formComponent.saveTaskForm();
        expect(formService.saveTaskForm).not.toHaveBeenCalled();
    });
    it('should require form with task id to complete', function () {
        spyOn(formService, 'completeTaskForm').and.stub();
        formComponent.form = null;
        formComponent.completeTaskForm('save');
        formComponent.form = new index_1.FormModel();
        formComponent.completeTaskForm('complete');
        expect(formService.completeTaskForm).not.toHaveBeenCalled();
    });
    it('should complete form form and raise corresponding event', function () {
        spyOn(formService, 'completeTaskForm').and.callFake(function () {
            return Rx_1.Observable.create(function (observer) {
                observer.next();
                observer.complete();
            });
        });
        var outcome = 'complete';
        var completed = false;
        formComponent.formCompleted.subscribe(function () { return completed = true; });
        var formModel = new index_1.FormModel({
            taskId: '123',
            fields: [
                { id: 'field1' },
                { id: 'field2' }
            ]
        });
        formComponent.form = formModel;
        formComponent.completeTaskForm(outcome);
        expect(formService.completeTaskForm).toHaveBeenCalledWith(formModel.taskId, formModel.values, outcome);
        expect(completed).toBeTruthy();
    });
    it('should require json to parse form', function () {
        expect(formComponent.parseForm(null)).toBeNull();
    });
    it('should parse form from json', function () {
        var form = formComponent.parseForm({
            id: '<id>',
            fields: [
                { id: 'field1', type: index_1.FormFieldTypes.CONTAINER }
            ]
        });
        expect(form).toBeDefined();
        expect(form.id).toBe('<id>');
        expect(form.fields.length).toBe(1);
        expect(form.fields[0].id).toBe('field1');
    });
    it('should provide outcomes for form definition', function () {
        spyOn(formComponent, 'getFormDefinitionOutcomes').and.callThrough();
        var form = formComponent.parseForm({ id: '<id>' });
        expect(formComponent.getFormDefinitionOutcomes).toHaveBeenCalledWith(form);
    });
    it('should prevent default outcome execution', function () {
        var outcome = new index_1.FormOutcomeModel(new index_1.FormModel(), {
            id: form_component_1.FormComponent.CUSTOM_OUTCOME_ID,
            name: 'Custom'
        });
        formComponent.form = new index_1.FormModel();
        formComponent.executeOutcome.subscribe(function (event) {
            expect(event.outcome).toBe(outcome);
            event.preventDefault();
            expect(event.defaultPrevented).toBeTruthy();
        });
        var result = formComponent.onOutcomeClicked(outcome);
        expect(result).toBeFalsy();
    });
    it('should not prevent default outcome execution', function () {
        var outcome = new index_1.FormOutcomeModel(new index_1.FormModel(), {
            id: form_component_1.FormComponent.CUSTOM_OUTCOME_ID,
            name: 'Custom'
        });
        formComponent.form = new index_1.FormModel();
        formComponent.executeOutcome.subscribe(function (event) {
            expect(event.outcome).toBe(outcome);
            expect(event.defaultPrevented).toBeFalsy();
        });
        spyOn(formComponent, 'completeTaskForm').and.callThrough();
        var result = formComponent.onOutcomeClicked(outcome);
        expect(result).toBeTruthy();
        expect(formComponent.completeTaskForm).toHaveBeenCalledWith(outcome.name);
    });
    it('should check visibility only if field with form provided', function () {
        formComponent.checkVisibility(null);
        expect(visibilityService.refreshVisibility).not.toHaveBeenCalled();
        var field = new index_1.FormFieldModel(null);
        formComponent.checkVisibility(field);
        expect(visibilityService.refreshVisibility).not.toHaveBeenCalled();
        field = new index_1.FormFieldModel(new index_1.FormModel());
        formComponent.checkVisibility(field);
        expect(visibilityService.refreshVisibility).toHaveBeenCalledWith(field.form);
    });
    it('should load form for ecm node', function () {
        var metadata = {};
        spyOn(nodeService, 'getNodeMetadata').and.returnValue(Rx_1.Observable.create(function (observer) {
            observer.next({ metadata: metadata });
            observer.complete();
        }));
        spyOn(formComponent, 'loadFormFromActiviti').and.stub();
        var nodeId = '<id>';
        var change = new core_1.SimpleChange(null, nodeId, false);
        formComponent.ngOnChanges({ 'nodeId': change });
        expect(nodeService.getNodeMetadata).toHaveBeenCalledWith(nodeId);
        expect(formComponent.loadFormFromActiviti).toHaveBeenCalled();
        expect(formComponent.data).toBe(metadata);
    });
    it('should disable outcome buttons for readonly form', function () {
        var formModel = new index_1.FormModel();
        formModel.readOnly = true;
        formComponent.form = formModel;
        var outcome = new index_1.FormOutcomeModel(new index_1.FormModel(), {
            id: form_component_1.FormComponent.CUSTOM_OUTCOME_ID,
            name: 'Custom'
        });
        expect(formComponent.isOutcomeButtonEnabled(outcome)).toBeFalsy();
    });
    it('should require outcome to eval button state', function () {
        formComponent.form = new index_1.FormModel();
        expect(formComponent.isOutcomeButtonEnabled(null)).toBeFalsy();
    });
    it('should always enable save outcome for writeable form', function () {
        var formModel = new index_1.FormModel();
        var field = new index_1.FormFieldModel(formModel, {
            type: 'text',
            value: null,
            required: true
        });
        formComponent.form = formModel;
        formModel.onFormFieldChanged(field);
        expect(formModel.isValid).toBeFalsy();
        var outcome = new index_1.FormOutcomeModel(new index_1.FormModel(), {
            id: form_component_1.FormComponent.SAVE_OUTCOME_ID,
            name: index_1.FormOutcomeModel.SAVE_ACTION
        });
        formComponent.readOnly = true;
        expect(formComponent.isOutcomeButtonEnabled(outcome)).toBeTruthy();
    });
    it('should disable oucome buttons for invalid form', function () {
        var formModel = new index_1.FormModel();
        var field = new index_1.FormFieldModel(formModel, {
            type: 'text',
            value: null,
            required: true
        });
        formComponent.form = formModel;
        formModel.onFormFieldChanged(field);
        expect(formModel.isValid).toBeFalsy();
        var outcome = new index_1.FormOutcomeModel(new index_1.FormModel(), {
            id: form_component_1.FormComponent.CUSTOM_OUTCOME_ID,
            name: 'Custom'
        });
        expect(formComponent.isOutcomeButtonEnabled(outcome)).toBeFalsy();
    });
    it('should disable complete outcome button when disableCompleteButton is true', function () {
        var formModel = new index_1.FormModel();
        formComponent.form = formModel;
        formComponent.disableCompleteButton = true;
        expect(formModel.isValid).toBeTruthy();
        var completeOutcome = formComponent.form.outcomes.find(function (outcome) { return outcome.name === index_1.FormOutcomeModel.COMPLETE_ACTION; });
        expect(formComponent.isOutcomeButtonEnabled(completeOutcome)).toBeFalsy();
    });
    it('should disable start process outcome button when disableStartProcessButton is true', function () {
        var formModel = new index_1.FormModel();
        formComponent.form = formModel;
        formComponent.disableStartProcessButton = true;
        expect(formModel.isValid).toBeTruthy();
        var startProcessOutcome = formComponent.form.outcomes.find(function (outcome) { return outcome.name === index_1.FormOutcomeModel.START_PROCESS_ACTION; });
        expect(formComponent.isOutcomeButtonEnabled(startProcessOutcome)).toBeFalsy();
    });
    it('should raise [executeOutcome] event for formService', function (done) {
        formService.executeOutcome.subscribe(function () {
            done();
        });
        var outcome = new index_1.FormOutcomeModel(new index_1.FormModel(), {
            id: form_component_1.FormComponent.CUSTOM_OUTCOME_ID,
            name: 'Custom'
        });
        formComponent.form = new index_1.FormModel();
        formComponent.onOutcomeClicked(outcome);
    });
    it('should refresh form values when data is changed', function () {
        formComponent.form = new index_1.FormModel(form_component_mock_1.fakeForm);
        var formFields = formComponent.form.getFormFields();
        var labelField = formFields.find(function (field) { return field.id === 'label'; });
        var radioField = formFields.find(function (field) { return field.id === 'raduio'; });
        expect(labelField.value).toBe('empty');
        expect(radioField.value).toBeNull();
        var formValues = {};
        formValues.label = {
            id: 'option_1',
            name: 'test1'
        };
        formValues.raduio = { id: 'option_1', name: 'Option 1' };
        var change = new core_1.SimpleChange(null, formValues, false);
        formComponent.data = formValues;
        formComponent.ngOnChanges({ 'data': change });
        formFields = formComponent.form.getFormFields();
        labelField = formFields.find(function (field) { return field.id === 'label'; });
        radioField = formFields.find(function (field) { return field.id === 'raduio'; });
        expect(labelField.value).toBe('option_1');
        expect(radioField.value).toBe('option_1');
    });
});
