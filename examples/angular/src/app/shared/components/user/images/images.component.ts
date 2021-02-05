import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

import { NoticeService } from 'le5le-components/notice';
import { UserImagesService } from './images.service';

@Component({
  selector: 'app-user-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  providers: [UserImagesService],
})
export class UserImagesComponent implements OnInit {
  @Input() image = '';
  @Output() imageChange = new EventEmitter<string>();

  @Input() tool = false;

  images: { id: string; filePath: string; }[];
  constructor(private service: UserImagesService, public el: ElementRef) {
  }

  async ngOnInit() {
    this.images = await this.service.GetImages();
  }

  onImageUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = async event => {
      const elem: any = event.target;
      if (elem.files && elem.files[0]) {
        const {result} = await this.service.Upload(elem.files[0], elem.files[0].name);
        if (result != 'true') {
          return;
        }       
        this.imageChange.emit(this.image);
        this.images = await this.service.GetImages(false);
      }
    };
    input.click();
  }

  onImageUrl() {
    const _noticeService: NoticeService = new NoticeService();
    _noticeService.input({
      title: '图片URL',
      theme: 'default',
      text: '',
      label: '图片URL',
      type: 'text',
      callback: async (ret: string) => {
        if (!ret) {
          return;
        }

        this.image = ret;
         await this.service.AddImage(ret);
        this.imageChange.emit(this.image);
        this.images = await this.service.GetImages();
      }
    });
  }

  async onRemoveImage(event: MouseEvent, item: any, i: number) {
    event.stopPropagation();
    if (await this.service.RemoveImage(item.id)) {
      this.images.splice(i, 1);
    }
  }

  onClickImage(item: any) {
    this.image = item.filePath;
    this.imageChange.emit(this.image);
  }

  onDrag(event: DragEvent, image: any) {
    if (image) {
      event.dataTransfer.setData('Text', JSON.stringify({
        name: 'image',
        rect: {
          width: 100,
          height: 100
        },
        image: image.filePath
      }));
    }
  }

  onTouchstart(item: any) {
    // this.canvas.touchedNode = item.data;
  }
}
