import { NgModule } from '@angular/core';

// ADF modules
import { CoreModule } from 'ng2-alfresco-core';
import { DataTableModule } from 'ng2-alfresco-datatable';
import { ViewerModule } from 'ng2-alfresco-viewer';
import { LoginModule } from 'ng2-alfresco-login';
import { UploadModule } from 'ng2-alfresco-upload';
import { SearchModule } from 'ng2-alfresco-search';
import { UserInfoModule } from 'ng2-alfresco-userinfo';
import { ActivitiFormModule } from 'ng2-activiti-form';
import { ActivitiTaskListModule } from 'ng2-activiti-tasklist';
import { ActivitiProcessListModule } from 'ng2-activiti-processlist';
import { DiagramsModule } from 'ng2-activiti-diagrams';
import { AnalyticsModule } from 'ng2-activiti-analytics';

import { DocumentListModule, SocialModule, TagModule, WebScriptModule } from '@adf/content-service';

export function modules() {
  return [
    // ADF modules
    CoreModule,
    DataTableModule,
    DocumentListModule,
    LoginModule,
    SearchModule,
    SocialModule,
    TagModule,
    UploadModule,
    UserInfoModule,
    ViewerModule,
    WebScriptModule,
    ActivitiFormModule,
    ActivitiTaskListModule,
    ActivitiProcessListModule,
    DiagramsModule,
    AnalyticsModule
  ];
}

@NgModule({
  imports: modules(),
  exports: modules()
})
export class AdfModule {}
