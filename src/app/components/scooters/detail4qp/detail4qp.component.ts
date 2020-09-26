import {Detail4Component} from '../detail4/detail4.component';
import {Component} from '@angular/core';
@Component({
  selector: 'baseComponent',
  templateUrl: '../detail4/detail4.component.html',
})

export class Detail4qpComponent extends Detail4Component{


  ngOnInit(): void {
    this.paramsSubscription = this.activeRouter.queryParamMap
      .subscribe((params) => {
        let id = Number(params['params'].id);
      this.hasChanged = false;
      this.selectedScooterId = id;
    });
  }
}
