import { Injectable } from "@angular/core";

import { Store } from "le5le-store";

import { HttpService } from "src/app/http/http.service";

@Injectable()
export class UserImagesService {
  constructor(protected http: HttpService) {}

  static images: { id: string; filePath: string }[];

  async Upload(blob: Blob, filename: string) {
    /*  const form = {
      'tobImage.isPublic': 'false',
      'file': blob
    }  */

    const form = new FormData();
    form.append("tenantId", localStorage.getItem("tenantId"));
    form.append("projectId", localStorage.getItem("projectId"));
    form.append("isPublic", "false");
    form.append("file", blob);
    const ret = await this.http.PostForm("/a/tob/tobImage/upload", form);  
    return ret;
  }

  async GetImages(cache = true) {
    if(cache){
    if (UserImagesService.images) {
      return UserImagesService.images;
    }
  }

    if (!localStorage.getItem("user")) {
      return [];
    }

    const { list } = await this.http
      .QueryString({
        pageIndex: 1,
        pageSize: 100,
        count: 0,
      })
      .Get("/a/tob/tobImage/listData.json");
    UserImagesService.images = list.map((x) => {
      if (x.filePath.startsWith('userfiles')) {
        x.filePath = "mz/" + x.filePath;
      }
      return x;
    });

    return UserImagesService.images ;
  }

  async AddImage(image: string) {
    let data = {
      tenantId: localStorage.getItem("tenantId"),
      projectId: localStorage.getItem("projectId"),
      isPublic: "false",
      filePath: image,
    };
    const ret = await this.http.Post("/a/tob/tobImage/save.json", data);
    return ret;
  }

  async RemoveImage(id: string) {
    const { result } = await this.http.Get(
      "/a/tob/tobImage/delete.json?id=" + id
    );
    if (result !== "true") {
      return false;
    }

    return true;
  }
}
