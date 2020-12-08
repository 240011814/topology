import { Injectable } from '@angular/core';
import { register as registerFlow } from '@topology/flow-diagram';
import { register as registerActivity } from '@topology/activity-diagram';
import { register as registerClass } from '@topology/class-diagram';
import { register as registerSequence } from '@topology/sequence-diagram';
import { register as registerChart } from '@topology/chart-diagram';

import { HttpService } from 'src/app/http/http.service';
import { registerNode } from '@topology/core';
import { Test } from '../device-diagram/test';

@Injectable()
export class WorkspaceService {
  constructor(protected http: HttpService) { }

  canvasRegister() {
    registerFlow();
    registerActivity();
    registerClass();
    registerSequence();
    registerChart();
    let test = new Test();
    registerNode('test', test.shape, null, test.iconRect, test.textRect);
  }

  async Get(data: any) {
    const ret = await this.http.Get('/a/tob/diagram/form.json?id=' + data.id);
    if (ret.error) {
      return null;
    }

    return ret;
  }

  async Upload(blob: Blob, shared = false, filename = '/topology/thumb.png') {
    const form = new FormData();
    form.append('path', filename);
    form.append('randomName', '1');
    form.append('public', shared + '');
    form.append('file', blob);
    const ret = await this.http.PostForm('/api/image', form);
    if (ret.error) {
      return null;
    }

    return ret;
  }

  async DelImage(image: string) {
    const ret = await this.http.Delete('/api' + image);
    if (ret.error) {
      return false;
    }

    return true;
  }

  async AddImage(image: string) {
    const ret = await this.http.Post('/api/user/image', { image: image });
    if (ret.error) {
      return '';
    }

    return ret.id;
  }

  async Save(data: any, blob) {
    data = Object.assign({}, data);
    for (const item of data.data.pens) {
      delete item.elementLoaded;
      delete item.elementRendered;
    }
    let ret: any;
    if (!data.name) {
      data.name = `Created at ${new Date().toLocaleString()}`;
    }
    const form = new FormData();
    if(data.id != '') {
      form.append("id", data.id);
    }
    form.append("tenantId", localStorage.getItem("tenantId"));
    form.append("projectId", localStorage.getItem("projectId"));
    form.append("file", blob);
    form.append("name", data.name);
    form.append("data", JSON.stringify(data.data));
    ret = await this.http.PostForm('/a/tob/diagram/save.json', form);
    return ret;
  }

  async Patch(data: any) {
    if (data.image) {
      const retImage = await this.http.Patch('/api' + data.image, {
        public: data.shared
      });
      if (retImage.error) {
        return false;
      }
    }

    delete data.image;
    const ret = await this.http.Patch('/api/user/topology', data);
    if (ret.error) {
      return false;
    }

    return true;
  }
}
