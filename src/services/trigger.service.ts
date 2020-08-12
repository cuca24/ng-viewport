import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import {share} from 'rxjs/operators';

import { ScrollService } from './scroll.service';

@Injectable()
export class TriggerService {
	private _subj = new Subject<{}>();
	public observable = this._subj.pipe(share());

	constructor(scroll: ScrollService) {
		this.bind(scroll.onScroll);
	}

	public bind(obs: Observable<{}>):Subscription {
		return obs.subscribe(() => {
			this._subj.next();
		});
	}
}
